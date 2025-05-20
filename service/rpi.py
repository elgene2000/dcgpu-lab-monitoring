import os
import cv2
import re
import easyocr
import paramiko
import requests
import numpy as np
from scp import SCPClient
from paramiko import AuthenticationException
from PIL import Image, ImageEnhance
from dotenv import load_dotenv

load_dotenv()


class RPI:
    def __init__(self):
        RPI_HOSTNAME = os.environ.get("RPI_HOSTNAME", "")
        RPI_USERNAME = os.environ.get("RPI_USERNAME", "")
        RPI_PASSWORD = os.environ.get("RPI_PASSWORD", "")
        RPI_REMOTE_FILE_PATH = os.environ.get("RPI_REMOTE_FILE_PATH", "")

        self.rpi_hostname = RPI_HOSTNAME
        self.rpi_username = RPI_USERNAME
        self.rpi_password = RPI_PASSWORD
        self.remote_file_path = RPI_REMOTE_FILE_PATH
        self.local_file_path = "./ssb/current.jpg"
        self.warped_image_path = "./ssb/warped.jpg"
        self.cropped_image_path = "./ssb/cropped.jpg"
        self.finalized_image_path = "./ssb/finalized.jpg"
        self.snapshot_url = f"http://{RPI_HOSTNAME}:8080/0/action/snapshot"

    def capture_snapshot(self) -> None:
        """
        Perform capture action of current footage
        :return: None
        """
        try:
            response = requests.get(self.snapshot_url)

            if response.status_code == 200:
                print("Downloaded snapshot")
            else:
                print("Failed to download snapshot")
        except:
            print("Failed to download snapshot")

    def save_snapshot(self) -> None:
        """
        Save snapshot to local file
        :return: None
        """
        try:
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            ssh.connect(
                self.rpi_hostname,
                username=self.rpi_username,
                password=self.rpi_password,
            )

            with SCPClient(ssh.get_transport()) as scp:
                scp.get(self.remote_file_path, self.local_file_path)

            print(f"File saved locally as {self.local_file_path}")
        except AuthenticationException:
            print("Authentication failed")
        except Exception as e:
            print(e)

    ### IMAGE PROCESSING RELATED
    def crop_image(self, file_path: str, roi: tuple) -> str:
        """
        Crop image
        :param file_path: Image path to be read (e.g. "./sample.jpg")
        :param roi: Region of interest (e.g. ((0, 0), (100, 100)))
        :return: Cropped image path
        """
        try:
            print("CROPPING IMAGE...")
            image = cv2.imread(file_path)

            if image is None:
                print("Failed to load image.")
                return ""

            x_start, y_start = roi[0][0], roi[0][1]  # Top-left corner of the cutout
            x_end, y_end = roi[1][0], roi[1][1]  # Bottom-right corner of the cutout

            # Crop the region
            cropped_cutout = image[y_start:y_end, x_start:x_end]

            if cropped_cutout.size == 0:
                raise ValueError(
                    "Cropped region is empty. Please ensure ROI coordinates are valid."
                )

            cv2.imwrite(self.cropped_image_path, cropped_cutout)
            return self.cropped_image_path
        except Exception as e:
            print(e)

    def change_contrast(self, file_path: str, factor: float = 3.0) -> str:
        """
        Change contrast
        :param file_path: Image path to be read (e.g. "./sample.jpg")
        :param factor: Floating point value to control the enhancement
        :return: Contrast image path
        """
        try:
            print("CHANGING CONTRAST...")
            contrast_output_path = "./ssb/contrast.jpg"

            im = Image.open(file_path)
            enhancer = ImageEnhance.Contrast(im)
            im_output = enhancer.enhance(factor)
            im_output.save(contrast_output_path)

            return contrast_output_path
        except Exception as e:
            print(e)

    def preprocess_image(self, ori_file_path: str) -> str:
        """
        Perform image processing using CV2
        :param ori_file_path: Original image path to be read (e.g. "./sample.jpg")
        :param contrast_file_path: Contrasted image path to be read (e.g. "./sample_CONTRAST.jpg")
        :return: Finalized image path
        """
        warp_image = False
        ori_image = cv2.imread(ori_file_path)
        # contrast_image = cv2.imread(contrast_file_path)
        if ori_image is None:
            print("Failed to load image.")
            return

        # CONVERT TO GRAYSCALE
        gray = cv2.cvtColor(ori_image, cv2.COLOR_BGR2GRAY)
        cv2.imwrite("./ssb/gray.jpg", gray)

        # APPLY THRESHOLDING
        _, thresh_gray = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY_INV)
        cv2.imwrite("./ssb/thresh_gray.jpg", thresh_gray)

        # FIND CONTOURS
        contours, _ = cv2.findContours(
            thresh_gray, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE
        )

        # FIND MAX AREA
        max_area = 0
        max_cont = None
        # max_bbox = None
        for cont in contours:
            _, _, w, h = cv2.boundingRect(cont)
            area = w * h
            if area > max_area:
                max_area = area
                max_cont = cont
                # max_bbox = (x, y, w, h)

        # DRAW MAX_CONT
        if max_cont is not None:
            hull = cv2.convexHull(max_cont)
            epsilon = 0.02 * cv2.arcLength(hull, True)
            approx_corners = cv2.approxPolyDP(hull, epsilon, True)
            corners = approx_corners.reshape(-1, 2)  # Shape: (4, 2)

            if len(corners) == 4:
                image_with_rectangle = ori_image.copy()
                cv2.polylines(
                    image_with_rectangle,
                    [corners],
                    isClosed=True,
                    color=(0, 255, 0),
                    thickness=2,
                )
                cv2.imwrite("./ssb/image_with_rectangle.jpg", image_with_rectangle)

                src_points = self.order_points(corners.astype("float32"))
                dst_points = np.float32([[0, 0], [500, 0], [500, 500], [0, 500]])

                # WARP IMAGE
                matrix = cv2.getPerspectiveTransform(src_points, dst_points)
                result = cv2.warpPerspective(ori_image, matrix, (500, 500))
                cv2.imwrite(self.warped_image_path, result)
                warp_image = True

        if warp_image:
            # CROP TO SPECIFIC CUTOUT
            warped_image = cv2.imread(self.warped_image_path)
            if warped_image is None:
                print("Failed to load image.")
                return ""

            x_start, y_start = 290, 235  # Top-left corner of the cutout
            x_end, y_end = 420, 285  # Bottom-right corner of the cutout

            # Crop the region
            cropped_cutout = warped_image[y_start:y_end, x_start:x_end]

            # Save the cropped image
            cv2.imwrite(self.finalized_image_path, cropped_cutout)
            return self.finalized_image_path

    ### OCR RELATED
    def ocr_read_text(self, file_path: str) -> list:
        """
        Perform OCR reading from image
        :param file_path: Image path to be read (e.g. "./sample.jpg")
        :return: List of text
        """
        try:
            reader = easyocr.Reader(["en"], gpu=False)
            result = reader.readtext(file_path, detail=0, allowlist="0123456789.")

            return result
        except Exception as e:
            print(e)

    def temp_write_result(self, result: str | float) -> None:
        """
        Write result to file
        :param result: Result to be written
        :return: None
        """
        with open("./snapshots/results.log", "a") as f:
            f.write(self.local_file_path + " - " + str(result) + "\n")
    
    def temp_dump_high_readings(self, date) -> None:
        """
        Dump high readings to file
        :return: None
        """
        import shutil
        try:
            shutil.copy(self.local_file_path, f"./dumps/{str(date.strftime("%Y-%m-%d_%H_%M_%S"))}.jpg")
        except:
            print("Failed to dump high readings")

    def order_points(self, points):
        """
        [top-left, top-right, bottom-right, bottom-left].
        :param result: Result to be written
        :return: None
        """
        points = np.array(points, dtype="float32")
        print(points)
        # Sort points by y-coordinate (row-wise), breaking ties by x-coordinate
        y_sorted = points[np.argsort(points[:, 1])]

        # Top points (smaller y-values)
        top_points = y_sorted[:2]
        # Bottom points (larger y-values)
        bottom_points = y_sorted[2:]

        # Sort top points by x-coordinate
        top_left, top_right = top_points[np.argsort(top_points[:, 0])]

        # Sort bottom points by x-coordinate
        bottom_left, bottom_right = bottom_points[np.argsort(bottom_points[:, 0])]

        # Return sorted points in the order: top-left, top-right, bottom-right, bottom-left
        return np.array(
            [top_left, top_right, bottom_right, bottom_left], dtype="float32"
        )

    def validate_result(self, result: str) -> bool:
        """
        Validate result
        :param result: Result to be validated
        :return: Boolean
        """
        pattern = r"^\d{1,2}\.\d+$"
        return bool(re.match(pattern, result))
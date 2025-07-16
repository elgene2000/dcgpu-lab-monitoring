"use client";
import { useTheme } from "next-themes";

interface ThermometerProps {
  reading: number | null | undefined;
}

const Thermometer = ({ reading }: ThermometerProps) => {
  const { theme } = useTheme();

  const ThermometerColorConfig = {
    stroke: theme == "dark" ? "#404759" : "#F6F8FA",
  };

  return (
    <>
      <svg
        className="max-w-20 max-h-40"
        viewBox="0 0 114 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.4 118.196V36.6C26.4 19.7001 40.1001 6 57 6C73.8999 6 87.6 19.7001 87.6 36.6V118.196C99.9874 127.501 108 142.315 108 159C108 187.167 85.1665 210 57 210C28.8335 210 6 187.167 6 159C6 142.315 14.0126 127.501 26.4 118.196Z"
          fill="url(#paint0_linear_1261_5)"
          stroke={ThermometerColorConfig.stroke}
          strokeWidth="11"
          strokeLinejoin="round"
        />
        <path
          d="M57 72.3V138.6"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56.9996 179.4C68.2662 179.4 77.3996 170.267 77.3996 159C77.3996 147.733 68.2662 138.6 56.9996 138.6C45.733 138.6 36.5996 147.733 36.5996 159C36.5996 170.267 45.733 179.4 56.9996 179.4Z"
          fill={
            reading == null
              ? "#D1D5DB"
              : reading < 20
                ? "#43CCF8"
                : reading <= 40
                  ? "#4ADE80"
                  : "#FB2C36"
          }
          stroke="white"
          strokeWidth="11"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1261_5"
            x1="41.649"
            y1="8.601"
            x2="93.363"
            y2="206.277"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={
                reading == null
                  ? "#D1D5DB"
                  : reading < 20
                    ? "#00A6F4"
                    : reading <= 40
                      ? "#4ADE80"
                      : "#FB2C36"
              }
            />
            <stop
              offset="1"
              stopColor={
                reading == null
                  ? "#D1D5DB"
                  : reading < 20
                    ? "#73D4FF"
                    : reading <= 40
                      ? "#A7F3D0"
                      : "#FF6467"
              }
            />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export { Thermometer };

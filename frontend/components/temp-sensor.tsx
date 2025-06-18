import React, { Fragment } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface TempSensorProps extends React.HTMLAttributes<SVGCircleElement> {
  theme?: string;
  datahall: string;
  location: string;
  cx: number;
  cy: number;
  temperature: number | null | undefined;
}
const TempSensor = ({
  theme,
  cx,
  cy,
  datahall,
  location,
  temperature,
}: TempSensorProps) => {
  const router = useRouter();
  return (
    <Fragment>
      <circle
        cx={cx}
        cy={cy}
        r="15"
        className={
          temperature == null
            ? "fill-gray-200"
            : temperature <= 18
              ? "fill-sky-400"
              : temperature <= 24
                ? "fill-amber-300"
                : "fill-red-400"
        }
      >
        <animate
          attributeName="r"
          from="15"
          to="30"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
          keySplines="0.4 0 0.2 1"
        />
        <animate
          attributeName="opacity"
          from={theme == "dark" ? "0.2" : "0.4"} //accessbility
          to="0"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
          keySplines="0.4 0 0.2 1"
        />
      </circle>
      <Tooltip>
        <TooltipTrigger asChild>
          <circle
            cx={cx}
            cy={cy}
            r="4"
            opacity={theme == "dark" ? 0.6 : 1}
            className={
              temperature == null
                ? "fill-gray-200 cursor-pointer"
                : temperature <= 18
                  ? "fill-sky-400 cursor-pointer"
                  : temperature <= 24
                    ? "fill-amber-300 cursor-pointer"
                    : "fill-red-400 cursor-pointer"
            }
            onClick={() =>
              router.push(`/opendc/${datahall}/temperature/${location}`)
            }
          />
        </TooltipTrigger>
        <TooltipContent className="dark:bg-secondary-dark dark:border-none dark:text-white bg-white border text-black">
          <p className="">
            {temperature ? temperature.toFixed(1) + "°C" : "- -°C"}
          </p>
        </TooltipContent>
      </Tooltip>
    </Fragment>
  );
};

export { TempSensor };

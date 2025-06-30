"use client";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const totalPowerAvailability: Record<
  "odcdh1" | "odcdh2" | "odcdh3" | "odcdh4" | "odcdh5",
  number
> = {
  odcdh1: 286000,
  odcdh2: 462000,
  odcdh3: 264000,
  odcdh4: 165000,
  odcdh5: 209000,
};

interface TotalPowerCardProps {
  index: number;
  totalPower: number;
  theme?: string;
  datahall: keyof typeof totalPowerAvailability;
}

const TotalPowerCard = ({
  index,
  totalPower,
  theme,
  datahall,
}: TotalPowerCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/opendc/dh${index}/total-power`)}
      className="transform hover:cursor-pointer hover:scale-[1.03] overflow-visible transition-transform duration-500 ease-in-out"
    >
      <Card className="w-full p-2">
        <CardHeader className="text-left ">
          <CardTitle className="flex items-center">
            <DoorOpen
              className="dark:bg-[#363E50] bg-[#E9EDEF] p-1 rounded-md h-7 w-7"
              color={theme == "dark" ? "#7B8499" : "#A8ABBE"}
            />
            <span className="ml-2">Data Hall {index}</span>
          </CardTitle>
          <div className="mt-4 pt-4">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Progress
                  value={(totalPower / totalPowerAvailability[datahall]) * 100}
                />
              </TooltipTrigger>
              <TooltipContent className="dark:bg-secondary-dark dark:border-none dark:text-white bg-white border text-black">
                <p className="font-semibold">
                  {(totalPower / 1000).toFixed(2)} kW
                </p>
              </TooltipContent>
              <p className="text-right font-light text-xs">
                {totalPowerAvailability[datahall] / 1000} kW
              </p>
            </Tooltip>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export { TotalPowerCard };

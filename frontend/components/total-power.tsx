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
}: {
  index: number;
  totalPower: number;
  theme?: string;
}) => {
  return (
    <Card className="w-full p-2">
      <CardHeader className="text-left ">
        <CardTitle className="flex items-center">
          <DoorOpen
            className="dark:bg-[#363E50] bg-[#E9EDEF] p-1 rounded-md h-7 w-7"
            color={theme == "dark" ? "#7B8499" : "#A8ABBE"}
          />
          <span className="ml-2">Data Hall {index}</span>
        </CardTitle>
        <p className="text-2xl font-bold pt-4">
          {(totalPower / 1000).toFixed(2)} kW
        </p>
        <p className="text-xs font-light">Current month</p>
      </CardHeader>
    </Card>
  );
};


export { TotalPowerCard };

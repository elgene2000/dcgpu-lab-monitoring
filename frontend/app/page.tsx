"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TempInfo } from "@/components/temp-info";
import { PowerInfo } from "@/components/power-info";
import { USTLab3 } from "@/components/room-visualizer/ust-lab3";
import { OpenDC } from "@/components/room-visualizer/opendc";
import { TotalPowerCard } from "@/components/total-power";

type DatahallKey = "odcdh1" | "odcdh2" | "odcdh3" | "odcdh4" | "odcdh5";

export default function Home() {
  const { theme } = useTheme();

  // STATES
  const [totalPowerUsage, setTotalPowerUsage] = useState<
    Record<string, number>
  >({});
  const [totalPowerUsageLoading, setTotalPowerUsageLoading] =
    useState<boolean>(true);
  const [tempData, setTempData] = useState<any[]>([]);

  // FUNCTIONS
  const getTotalPowerUsage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
      );
      if (response && response.status === 200) {
        setTotalPowerUsage(response.data || {});
      } else {
        console.error("Failed to fetch data");
      }

      setTotalPowerUsageLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //EFFECTS
  useEffect(() => {
    const fetchCurrData = async () => {
      getTotalPowerUsage();
    };
    fetchCurrData();
    const intervalId = setInterval(fetchCurrData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">Home</p>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col items-start space-y-3 w-full xl:w-5/6">
          <div className="grid grid-cols-3 items-center justify-between w-full gap-3">
            {totalPowerUsageLoading ? (
              <>
                <Card className="w-full min-h-32 p-2 relative overflow-hidden">
                  <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
                </Card>
                <Card className="w-full min-h-32 p-2 relative overflow-hidden">
                  <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
                </Card>
                <Card className="w-full min-h-32 p-2 relative overflow-hidden">
                  <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
                </Card>
                <Card className="w-full min-h-32 p-2 relative overflow-hidden">
                  <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
                </Card>
                <Card className="w-full min-h-32 p-2 relative overflow-hidden">
                  <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
                </Card>
              </>
            ) : (
              <>
                {Object.keys(totalPowerUsage).map((key, index) => (
                  <TotalPowerCard
                    key={index}
                    index={index + 1}
                    theme={theme}
                    totalPower={totalPowerUsage[key]}
                    datahall={key as DatahallKey}
                  />
                ))}
              </>
            )}
          </div>
          <Card className="w-full p-2">
            <CardHeader className="text-left">
              <CardTitle>OpenDC</CardTitle>
              <CardDescription>{/* Last checked */}</CardDescription>
              <div className="mx-auto w-full h-auto relative overflow-hidden rounded-lg p-2 border-slate-200 dark:border-[#424C5E] border">
                <OpenDC theme={theme} />
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full p-2" delay={0.4}>
            <CardHeader className="text-left">
              <CardTitle>UST - Lab 3</CardTitle>
              <CardDescription></CardDescription>
              <div className="mx-auto w-full h-auto relative overflow-hidden rounded-lg p-2 border-slate-200 dark:border-[#424C5E] border">
                <USTLab3
                  theme={theme}
                />
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="w-1/6 xl:block space-y-3">
          <TempInfo />
          <PowerInfo />
        </div>
      </div>
    </>
  );
}

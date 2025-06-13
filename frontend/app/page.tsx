"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { TempInfo } from "@/components/temp-info";
import { PowerInfo } from "@/components/power-info";
import { USTLab3 } from "@/components/room-visualizer/ust-lab3";
import { OpenDC } from "@/components/room-visualizer/opendc";

//CHART COLORS, CONFIGS, ETC.
const chartConfig = {
  sensor0013: {
    label: "Sensor0013",
    color: "#f87171",
    cx: 980,
    cy: 240,
  },
  sensor0019: {
    label: "Sensor0019",
    color: "#f59e0b",
    cx: 780,
    cy: 720,
  },
  sensor0111: {
    label: "Sensor0111",
    color: "#2dd4bf",
    cx: 980,
    cy: 0,
  },
  sensor0114: {
    label: "Sensor0114",
    color: "#2563eb",
    cx: 880,
    cy: 475,
  },
  sensor0118: {
    label: "Sensor0118",
    color: "#0891b2",
    cx: 880,
    cy: 240,
  },
  power: {
    label: "power",
    color: "#a78bfa",
  },
} satisfies ChartConfig;

//INTERFACES
type DateRange = "24h" | "7d" | "1mnth";

//UTILS FUNCTION
const findByLabel = (label: string) => {
  return Object.values(chartConfig).find((config) => config.label === label);
};

const formatDate = (rawDate: Date | string) => {
  if (rawDate === "NA") return "NA";
  const date = new Date(rawDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  // STATES
  const [currData, setCurrData] = useState<any[]>([]);
  const [tempData, setTempData] = useState<any[]>([]);
  const [ssbData, setSSBData] = useState<any[]>([]);

  const [tempTicks, setTempTicks] = useState<string[]>([]);
  const [ssbTicks, setSSBTicks] = useState<string[]>([]);

  const [selectedTempRange, setSelectedTempRange] = useState<DateRange>("24h");
  const [selectedSSBRange, setSelectedSSBRange] = useState<DateRange>("24h");

  // FUNCTIONS
  const getCurrUSTData = async () => {
    try {
      const currDataList = [];
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/current_read`,
      );
      if (response && response.status === 200) {
        //temp = Temporary data
        const tempData = response.data.data;
        for (const currTemp of Object.keys(tempData)) {
          currDataList.push({ key: currTemp, ...tempData[currTemp] });
        }
        setCurrData(currDataList);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //EFFECTS
  useEffect(() => {
    const fetchDashboardData = async () => {
      getCurrUSTData();
    };
    fetchDashboardData();

    const intervalId = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">Home</p>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col items-start space-y-3 w-full xl:w-5/6">
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
                  chartConfig={chartConfig}
                  sensorData={currData}
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

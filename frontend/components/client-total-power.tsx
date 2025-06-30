"use client";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

//CONSTANTS
const chartColors = ["#3B82F6"];

//INTERFACES
interface ClientTotalPowerProps {
  datahall: string;
  site: string;
}
type DateRange = "24h" | "7d" | "1mnth";
type GroupedTotalPower = {
  created: string;
  [location: string]: number | string;
};
type CurrPowerUsageProps = {
  odcdh1?: number;
  odcdh2?: number;
  odcdh3?: number;
  odcdh4?: number;
  odcdh5?: number;
};

export default function ClientTotalPower({
  datahall,
  site,
}: ClientTotalPowerProps) {
  const { theme } = useTheme();

  const [currPowerUsage, setCurrPowerUsage] = useState<CurrPowerUsageProps>({});
  const [allPowerUsage, setAllPowerUsage] = useState<any[]>([]);
  const [filteredPowerUsageData, setFilteredPowerUsageData] = useState<any[]>(
    [],
  );
  const [currPowerUsageLoading, setCurrPowerUsageLoading] =
    useState<boolean>(true);
  const [allPowerUsageLoading, setAllPowerUsageLoading] =
    useState<boolean>(true);

  //CHARTS STATES
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [selectedPowerUsageRange, setSelectedPowerUsageRange] =
    useState<DateRange>("24h");

  //FUNCTIONS
  const getcurrPowerUsage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`, // Fetching latest power usage data,
      );
      if (response && response.status === 200) {
        setCurrPowerUsage(response.data || []);
      } else {
        console.error("Failed to fetch data");
      }
      setCurrPowerUsageLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllPowerUsage = async (dateRange: DateRange) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-power?site=${site}&timeline=${dateRange}`,
      );
      if (response && response.status === 200) {
        console.log(response.data);
        setAllPowerUsage(response.data || []);
      } else {
        console.error("Failed to fetch data");
      }
      setAllPowerUsageLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filterPowerUsageData = () => {
    const grouped = allPowerUsage.reduce<GroupedTotalPower[]>((acc, curr) => {
      const { created, site, reading } = curr;

      let group = acc.find((item) => item.created === created);

      if (!group) {
        group = { created };
        acc.push(group);
      }

      group[site] = reading;

      return acc;
    }, []);

    if (grouped.length > 0) {
      setFilteredPowerUsageData(grouped);
    }
  };

  const updateChartConfig = () => {
    if (!chartConfig[site]) {
      chartConfig[site] = {
        label: site,
      };
      setChartConfig(chartConfig);
    }
  };

  //EFFECTS
  useEffect(() => {
    const fetchCurrData = async () => {
      getcurrPowerUsage();
      getAllPowerUsage(selectedPowerUsageRange);
    };
    fetchCurrData();
    const intervalId = setInterval(fetchCurrData, 60000);
    return () => clearInterval(intervalId);
  }, [selectedPowerUsageRange, setSelectedPowerUsageRange]);

  useEffect(() => {
    if (allPowerUsage.length > 0) {
      filterPowerUsageData();
    }
  }, [allPowerUsage, setAllPowerUsage]);

  useEffect(() => {
    if (currPowerUsage && Object.keys(chartConfig).length === 0) {
      updateChartConfig();
    }
  }, [currPowerUsage, setCurrPowerUsage]);

  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">
        {datahall.toUpperCase()}
      </p>
      <div className="flex flex-row space-x-3 mb-3">
        {currPowerUsageLoading ? (
          <Card className="w-96 min-h-64 relative overflow-hidden">
            <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-left min-w-96">
              <CardTitle>Total Power Usage</CardTitle>
              {/* <CardDescription>
                                {"Last checked " + formatDate(temperature.created)}
                            </CardDescription> */}
              <div className="pt-4 pb-0 w-full h-full flex items-center space-x-5">
                <div className="text-blue-500 w-full">
                  <p className="text-4xl font-extrabold mb-4">
                    {currPowerUsage[site as keyof typeof currPowerUsage] ??
                      0 / 1000}
                    kW
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>
      <Card className="w-full relative overflow-hidden min-h-64" delay={0.5}>
        {allPowerUsageLoading ? (
          <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
        ) : allPowerUsage.length > 0 ? (
          <>
            <CardHeader className="text-left">
              <div className="flex justify-between w-full items-center gap-2 text-sm">
                <div>
                  <CardTitle>Total Power Usage Overview</CardTitle>
                  <CardDescription>
                    {"Last checked " +
                      formatDate(
                        allPowerUsage[allPowerUsage.length - 1]?.created,
                      )}
                  </CardDescription>
                </div>
                <Select
                  defaultValue="24h"
                  onValueChange={(value: DateRange) =>
                    setSelectedPowerUsageRange(value)
                  }
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder={selectedPowerUsageRange} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Last</SelectLabel>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="1mnth">1 month</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <ChartContainer
                config={chartConfig as any}
                className="aspect-auto h-[250px] w-full"
              >
                <LineChart data={filteredPowerUsageData}>
                  <CartesianGrid
                    vertical={false}
                    stroke={theme == "dark" ? "#424C5E" : "#D9DEE3"}
                  />
                  <XAxis
                    dataKey="created"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tick={{ fill: theme === "dark" ? "#CBD5E1" : "#334155" }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        month: "2-digit",
                        day: "numeric",
                        hour12: false,
                        timeZone: "UTC",
                      });
                    }}
                  />
                  <YAxis
                    width={50}
                    axisLine={{
                      stroke: theme === "dark" ? "#424C5E" : "#D9DEE3",
                    }}
                    tickLine={{
                      stroke: theme === "dark" ? "#424C5E" : "#D9DEE3",
                    }}
                    tick={{ fill: theme === "dark" ? "#CBD5E1" : "#334155" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            month: "short",
                            day: "numeric",
                            hour12: false,
                            timeZone: "UTC",
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />
                  <Line
                    dataKey={site}
                    type="monotone"
                    stroke={chartColors[0]}
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-left">
              <div className="w-full">
                <div>
                  <CardTitle>Total Power Usage Overview</CardTitle>
                  <div className="py-10 text-center mx-auto space-y-3">
                    <img
                      className="h-28 w-28 mx-auto"
                      src={
                        theme === "dark"
                          ? "/cube-3d-dark.webp"
                          : "/cube-3d.webp"
                      }
                      alt="Cube"
                    />
                    <p className="text-sm font-light italic text-slate-500 dark:text-slate-400">
                      No data available
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </>
        )}
      </Card>
    </>
  );
}

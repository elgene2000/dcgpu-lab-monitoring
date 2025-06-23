"use client";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Thermometer } from "@/components/thermometer";
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
const chartColors = ["#00A6F4"];

//INTERFACES
interface ClientTemperatureProps {
  location: string;
  datahall: string;
  site: string;
}
type DateRange = "24h" | "7d" | "1mnth";
type GroupedTemperature = {
  created: string;
  [location: string]: number | string;
};

export default function ClientTemperature({
  location,
  datahall,
  site,
}: ClientTemperatureProps) {
  const { theme } = useTheme();

  const [currTemperature, setCurrTemperature] = useState<any[]>([]);
  const [allTemperature, setAllTemperature] = useState<any[]>([]);
  const [filteredTemperature, setfilteredTemperature] = useState<any[]>([]);
  const [currTemperatureLoading, setCurrTemperatureLoading] =
    useState<boolean>(true);
  const [allTemperatureLoading, setAllTemperatureLoading] =
    useState<boolean>(true);

  //CHARTS STATES
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [selectedTemperatureRange, setSelectedTemperatureRange] =
    useState<DateRange>("24h");

  //FUNCTIONS
  const getCurrTemperature = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/temperature/latest?site=${site}&location=${location}`, // Fetching latest temperature data,
      );
      if (response && response.status === 200) {
        console.log("Current Temperature Data:", response.data);
        setCurrTemperature(response.data || []);
      } else {
        console.error("Failed to fetch data");
      }
      setCurrTemperatureLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllTemperature = async (dateRange: DateRange) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/temperature?site=${site}&location=${location}&timeline=${dateRange}`,
      );
      if (response && response.status === 200) {
        setAllTemperature(response.data || []);
      } else {
        console.error("Failed to fetch data");
      }
      setAllTemperatureLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filterTemperatureData = () => {
    const grouped = allTemperature.reduce<GroupedTemperature[]>((acc, curr) => {
      const { created, location, reading } = curr;

      let group = acc.find((item) => item.created === created);

      if (!group) {
        group = { created };
        acc.push(group);
      }

      group[location] = reading;

      return acc;
    }, []);

    if (grouped.length > 0) {
      setfilteredTemperature(grouped);
    }
  };

  const updateChartConfig = () => {
    if (Object.keys(chartConfig).length === 0) {
      currTemperature.forEach((temperature) => {
        const location = temperature.location;
        if (!chartConfig[location]) {
          chartConfig[location] = {
            label: location,
          };
        }
      });
      setChartConfig(chartConfig);
    }
  };

  //EFFECTS
  useEffect(() => {
    const fetchCurrData = async () => {
      getCurrTemperature();
      getAllTemperature(selectedTemperatureRange);
    };
    fetchCurrData();
    const intervalId = setInterval(fetchCurrData, 60000);
    return () => clearInterval(intervalId);
  }, [selectedTemperatureRange, setSelectedTemperatureRange]);

  useEffect(() => {
    if (allTemperature.length > 0) {
      filterTemperatureData();
    }
  }, [allTemperature, setAllTemperature]);

  useEffect(() => {
    if (currTemperature.length > 0 && Object.keys(chartConfig).length === 0) {
      updateChartConfig();
    }
  }, [currTemperature, setCurrTemperature]);

  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">
        {datahall.toUpperCase()} - {location.toUpperCase()}
      </p>
      <div className="flex flex-row space-x-3 mb-3">
        {currTemperatureLoading ? (
          <Card className="w-96 min-h-64 relative overflow-hidden">
            <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
          </Card>
        ) : currTemperature.length > 0 ? (
          currTemperature.map((temperature, index) => (
            <Card key={index}>
              <CardHeader className="text-left min-w-96">
                <CardTitle>Sensor Reading</CardTitle>
                <CardDescription>
                  {"Last checked " + formatDate(temperature.created)}
                </CardDescription>
                <div className="pt-4 pb-0 w-full h-full flex items-center space-x-5">
                  <Thermometer reading={temperature.reading} />
                  <div className="text-slate-500 dark:text-slate-400 w-full">
                    <p
                      className={cn(
                        "text-4xl font-extrabold mb-4",
                        temperature.reading <= 18
                          ? "text-sky-400"
                          : temperature.reading > 18 &&
                              temperature.reading <= 24
                            ? "text-amber-300"
                            : "text-rose-500",
                      )}
                    >
                      {" "}
                      {temperature.reading}
                      {temperature.symbol}
                    </p>
                    <p className="text-sm font-light">
                      PDU:{" "}
                      <a
                        className="inline-flex items-center underline gap-1 decoration-inherit"
                        target="_blank"
                        href={`https://${temperature.pdu_hostname}`}
                      >
                        <span>{temperature.pdu_hostname}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card className="w-96 min-h-64">
            <CardHeader className="text-left">
              <div className="w-full">
                <div>
                  <CardTitle>Sensor Reading</CardTitle>
                  <div className="py-10 text-center mx-auto space-y-3">
                    <img
                      className="h-20 w-20 mx-auto"
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
          </Card>
        )}
      </div>
      <Card className="w-full relative overflow-hidden min-h-64" delay={0.5}>
        {allTemperatureLoading ? (
          <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
        ) : currTemperature.length > 0 ? (
          <>
            <CardHeader className="text-left">
              <div className="flex justify-between w-full items-center gap-2 text-sm">
                <div>
                  <CardTitle>Temperature Overview</CardTitle>
                  <CardDescription>
                    {"Last checked " + formatDate(currTemperature[0]?.created)}
                  </CardDescription>
                </div>
                <Select
                  defaultValue="24h"
                  onValueChange={(value: DateRange) =>
                    setSelectedTemperatureRange(value)
                  }
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder={selectedTemperatureRange} />
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
                <LineChart data={filteredTemperature}>
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
                    width={35}
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
                  {currTemperature.length > 0 &&
                    currTemperature.map((temperature, index) => (
                      <Line
                        key={index}
                        dataKey={temperature.location}
                        type="monotone"
                        stroke={chartColors[index % chartColors.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
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
                  <CardTitle>Temperature Overview</CardTitle>
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

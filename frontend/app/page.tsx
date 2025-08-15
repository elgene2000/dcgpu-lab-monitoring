"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";

const chartColors = [
  "#a78bfa",
  "#f472b6",
  "#00A6F4",
  "#9AE600",
  "#FFB347",
  "#FF6961",
  "#77DD77",
  "#AEC6CF",
  "#CFCFC4",
  "#B39EB5",
];

const getTemperatureColor = (location: string) => {
  if (location.includes("-up")) return "#FF6961";
  if (location.includes("-down")) return "#00A6F4";
  return chartColors[0];
};

// --------------- PowerChart (single site) -----------------
const PowerChart = ({ site }: { site: string }) => {
  const { theme } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [highlightedKey, setHighlightedKey] = useState<string>();

  const [selectedRange, setSelectedRange] = useState<"24h" | "7d" | "1mnth">(
    "24h"
  );

  const fetchPower = async () => {
    try {
      const response = await axios.get(
        `/api/power?site=${site}&timeline=${selectedRange}`
      );
      setData(response.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  // group data
  useEffect(() => {
    const grouped: any[] = [];
    const cfg: any = {};

    data.forEach((entry) => {
      let gp = grouped.find((g) => g.created === entry.created);
      if (!gp) {
        gp = { created: entry.created };
        grouped.push(gp);
      }
      gp[entry.location] = entry.reading;
      if (!cfg[entry.location]) {
        cfg[entry.location] = { label: entry.location };
      }
    });
    setFiltered(grouped);
    setConfig(cfg);
  }, [data]);

  useEffect(() => {
    fetchPower();
    const interval = setInterval(fetchPower, 60000);
    return () => clearInterval(interval);
  }, [selectedRange]);

  return (
    <Card className="w-full relative overflow-hidden min-h-64 mb-6">
      <CardHeader className="text-left">
        <CardTitle>Combined Power Overview ({site.toUpperCase()})</CardTitle>
        <CardDescription>Power data for {site.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
          <LineChart data={filtered}>
            <CartesianGrid
              vertical={false}
              stroke={theme === "dark" ? "#424C5E" : "#D9DEE3"}
            />
            <XAxis
              dataKey="created"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{
                fill: theme === "dark" ? "#CBD5E1" : "#334155",
              }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "2-digit",
                  day: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })
              }
            />
            <YAxis
              width={35}
              axisLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
              tickLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
              tick={{ fill: theme === "dark" ? "#CBD5E1" : "#334155" }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                      hour12: false,
                      timeZone: "UTC",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {Object.keys(config).map((location, index) => {
              const isHighlighted =
                !highlightedKey || highlightedKey === location;
              return (
                <Line
                  key={location}
                  dataKey={location}
                  type="monotone"
                  stroke={chartColors[index % chartColors.length]}
                  strokeWidth={highlightedKey === location ? 4 : 2}
                  dot={false}
                  opacity={isHighlighted ? 1 : 0.3}
                  style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
                />
              );
            })}
            <ChartLegend
              content={
                <ChartLegendContent
                  onLegendHover={setHighlightedKey}
                  highlightedKey={highlightedKey}
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// --------------- TemperatureChart (single site) -----------------
const TemperatureChart = ({ site }: { site: string }) => {
  const { theme } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [highlightedKey, setHighlightedKey] = useState<string>();

  const [selectedRange, setSelectedRange] = useState<"24h" | "7d" | "1mnth">(
    "24h"
  );

  const fetchTemp = async () => {
    try {
      const response = await axios.get(
        `/api/temperature?site=${site}&timeline=${selectedRange}`
      );
      setData(response.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const grouped: any[] = [];
    const cfg: any = {};

    data.forEach((entry) => {
      let gp = grouped.find((g) => g.created === entry.created);
      if (!gp) {
        gp = { created: entry.created };
        grouped.push(gp);
      }
      gp[entry.location] = entry.reading;
      if (!cfg[entry.location]) {
        cfg[entry.location] = { label: entry.location };
      }
    });
    setFiltered(grouped);
    setConfig(cfg);
  }, [data]);

  useEffect(() => {
    fetchTemp();
    const interval = setInterval(fetchTemp, 60000);
    return () => clearInterval(interval);
  }, [selectedRange]);

  return (
    <Card className="w-full relative overflow-hidden min-h-64">
      <CardHeader className="text-left">
        <CardTitle>
          Combined Temperature Overview ({site.toUpperCase()})
        </CardTitle>
        <CardDescription>Temperature data for {site.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
          <LineChart data={filtered}>
            <CartesianGrid
              vertical={false}
              stroke={theme === "dark" ? "#424C5E" : "#D9DEE3"}
            />
            <XAxis
              dataKey="created"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{
                fill: theme === "dark" ? "#CBD5E1" : "#334155",
              }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "2-digit",
                  day: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })
              }
            />
            <YAxis
              width={35}
              axisLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
              tickLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
              tick={{ fill: theme === "dark" ? "#CBD5E1" : "#334155" }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                      hour12: false,
                      timeZone: "UTC",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {Object.keys(config).map((location, index) => {
              const isHighlighted =
                !highlightedKey || highlightedKey === location;
              return (
                <Line
                  key={location}
                  dataKey={location}
                  type="monotone"
                  stroke={getTemperatureColor(location)}
                  strokeWidth={highlightedKey === location ? 4 : 2}
                  dot={false}
                  opacity={isHighlighted ? 1 : 0.3}
                  style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
                />
              );
            })}
            <ChartLegend
              content={
                <ChartLegendContent
                  onLegendHover={setHighlightedKey}
                  highlightedKey={highlightedKey}
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// --------- Main Page: render 2x charts for each site -----------
export default function Home() {
  const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh5"];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-4xl font-bold mb-4">Overall View</h1>

      <div className="w-full max-w-5xl space-y-16">
        {sites.map((site) => (
          <div key={site}>
            <PowerChart site={site} />
            <TemperatureChart site={site} />
          </div>
        ))}
      </div>
    </main>
  );
}

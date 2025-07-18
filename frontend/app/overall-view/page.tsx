"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";

const chartColors = ["#a78bfa", "#f472b6", "#00A6F4", "#9AE600", "#FFB347", "#FF6961", "#77DD77", "#AEC6CF", "#CFCFC4", "#B39EB5"];

export default function OverallView() {
  const { theme } = useTheme();
  const [powerData, setPowerData] = useState<any[]>([]);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [filteredPower, setFilteredPower] = useState<any[]>([]);
  const [filteredTemperature, setFilteredTemperature] = useState<any[]>([]);
  const [powerChartConfig, setPowerChartConfig] = useState<any>({});
  const [temperatureChartConfig, setTemperatureChartConfig] = useState<any>({});
  const [selectedRange, setSelectedRange] = useState<"24h"|"7d"|"1mnth">("24h");
  const [highlightedPowerKey, setHighlightedPowerKey] = useState<string | undefined>(undefined);
  const [highlightedTempKey, setHighlightedTempKey] = useState<string | undefined>(undefined);

  // Fetch all power and temperature data for DH3
  const fetchData = async () => {
    try {
      const powerRes = await axios.get(`/api/power?site=odcdh3&timeline=${selectedRange}`);
      setPowerData(powerRes.data || []);
      const tempRes = await axios.get(`/api/temperature?site=odcdh3&timeline=${selectedRange}`);
      setTemperatureData(tempRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Group data by timestamp, each rack/sensor as a line
  useEffect(() => {
    // Power
    const groupedPower: any[] = [];
    const powerConfig: any = {};
    powerData.forEach((entry: any) => {
      let group = groupedPower.find((g) => g.created === entry.created);
      if (!group) {
        group = { created: entry.created };
        groupedPower.push(group);
      }
      group[entry.location] = entry.reading;
      if (!powerConfig[entry.location]) {
        powerConfig[entry.location] = { label: entry.location };
      }
    });
    setFilteredPower(groupedPower);
    setPowerChartConfig(powerConfig);
    // Temperature
    const groupedTemp: any[] = [];
    const tempConfig: any = {};
    temperatureData.forEach((entry: any) => {
      let group = groupedTemp.find((g) => g.created === entry.created);
      if (!group) {
        group = { created: entry.created };
        groupedTemp.push(group);
      }
      group[entry.location] = entry.reading;
      if (!tempConfig[entry.location]) {
        tempConfig[entry.location] = { label: entry.location };
      }
    });
    setFilteredTemperature(groupedTemp);
    setTemperatureChartConfig(tempConfig);
  }, [powerData, temperatureData]);

  // Fetch on mount and every minute
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [selectedRange]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-4xl font-bold mb-4">Overall View</h1>
      <div className="w-full max-w-5xl space-y-8">
        {/* Power Chart */}
        <Card className="w-full relative overflow-hidden min-h-64">
          <CardHeader className="text-left">
            <CardTitle>Combined Power Overview (DH3)</CardTitle>
            <CardDescription>
              This graph combines all racks' power data in DH3. Updates every minute.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <ChartContainer config={powerChartConfig} className="aspect-auto h-[300px] w-full">
              <LineChart data={filteredPower}>
                <CartesianGrid vertical={false} stroke={theme == "dark" ? "#424C5E" : "#D9DEE3"} />
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
                  axisLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
                  tickLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
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
                {Object.keys(powerChartConfig).map((location, index) => {
                  const isHighlighted = !highlightedPowerKey || highlightedPowerKey === location;
                  return (
                    <Line
                      key={location}
                      dataKey={location}
                      type="monotone"
                      stroke={chartColors[index % chartColors.length]}
                      strokeWidth={highlightedPowerKey === location ? 4 : 2}
                      dot={false}
                      opacity={isHighlighted ? 1 : 0.3}
                      style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                    />
                  );
                })}
                <ChartLegend content={
                  <ChartLegendContent
                    onLegendHover={setHighlightedPowerKey}
                    highlightedKey={highlightedPowerKey}
                  />
                } />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* Temperature Chart */}
        <Card className="w-full relative overflow-hidden min-h-64">
          <CardHeader className="text-left">
            <CardTitle>Combined Temperature Overview (DH3)</CardTitle>
            <CardDescription>
              This graph combines all sensors' temperature data in DH3. Updates every minute.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <ChartContainer config={temperatureChartConfig} className="aspect-auto h-[300px] w-full">
              <LineChart data={filteredTemperature}>
                <CartesianGrid vertical={false} stroke={theme == "dark" ? "#424C5E" : "#D9DEE3"} />
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
                  axisLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
                  tickLine={{ stroke: theme === "dark" ? "#424C5E" : "#D9DEE3" }}
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
                {Object.keys(temperatureChartConfig).map((location, index) => {
                  const isHighlighted = !highlightedTempKey || highlightedTempKey === location;
                  return (
                    <Line
                      key={location}
                      dataKey={location}
                      type="monotone"
                      stroke={chartColors[index % chartColors.length]}
                      strokeWidth={highlightedTempKey === location ? 4 : 2}
                      dot={false}
                      opacity={isHighlighted ? 1 : 0.3}
                      style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                    />
                  );
                })}
                <ChartLegend content={
                  <ChartLegendContent
                    onLegendHover={setHighlightedTempKey}
                    highlightedKey={highlightedTempKey}
                  />
                } />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 
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
import { Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { MonthlyPowerTable } from "@/components/monthly-power-table";

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

// Monthly Power Usage Card Component with batched queries
const MonthlyPowerCard = () => {
  const { theme } = useTheme();
  const [monthlyData, setMonthlyData] = useState<{
    totalPower: number;
    previousMonth: number;
    percentageChange: number;
    siteBreakdown: Record<string, {
      current: number;
      previous: number;
      change: number;
    }>;
    loading: boolean;
    error?: string;
  }>({
    totalPower: 0,
    previousMonth: 0,
    percentageChange: 0,
    siteBreakdown: {},
    loading: true,
  });

  const fetchMonthlyPowerData = async () => {
    try {
      const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh5"];
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const firstDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      
      // Use the updated API with batched queries (timeline=1mnth handles batching internally)
      const promises = sites.map(async site => {
        try {
          const response = await axios.get(`/api/power`, {
            params: {
              site: site,
              timeline: "1mnth" // Backend automatically handles batching for this timeline
            }
          });
          
          if (response.status === 200 && response.data) {
            let siteCurrentTotal = 0;
            let sitePreviousTotal = 0;

            response.data.forEach((reading: any) => {
              const readingDate = new Date(reading.created);
              // Convert power reading to energy consumption
              // Each reading represents 10 minutes = 10/60 = 0.1667 hours
              const energyWh = (reading.reading || 0) * (10 / 60); // Watt-hours
              
              if (readingDate >= firstDayOfMonth) {
                siteCurrentTotal += energyWh;
              }
              if (readingDate >= firstDayOfPrevMonth && readingDate <= lastDayOfPrevMonth) {
                sitePreviousTotal += energyWh;
              }
            });

            const siteChange = sitePreviousTotal > 0 
              ? ((siteCurrentTotal - sitePreviousTotal) / sitePreviousTotal) * 100 
              : 0;

            return {
              site,
              current: siteCurrentTotal,
              previous: sitePreviousTotal,
              change: siteChange,
              success: true
            };
          }
          
          return {
            site,
            current: 0,
            previous: 0,
            change: 0,
            success: false
          };
        } catch (error) {
          console.error(`Error fetching data for ${site}:`, error);
          return {
            site,
            current: 0,
            previous: 0,
            change: 0,
            success: false
          };
        }
      });
      
      const results = await Promise.all(promises);
      
      let currentMonthTotal = 0;
      let previousMonthTotal = 0;
      const siteBreakdown: Record<string, { current: number; previous: number; change: number }> = {};
      let failedSites = 0;

      results.forEach(({ site, current, previous, change, success }) => {
        if (!success) failedSites++;
        
        siteBreakdown[site] = {
          current,
          previous,
          change,
        };

        currentMonthTotal += current;
        previousMonthTotal += previous;
      });

      const percentageChange = previousMonthTotal > 0 
        ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 
        : 0;

      setMonthlyData({
        totalPower: currentMonthTotal,
        previousMonth: previousMonthTotal,
        percentageChange,
        siteBreakdown,
        loading: false,
        error: failedSites > 0 ? `Warning: ${failedSites} site(s) failed to load data` : undefined
      });
    } catch (error) {
      console.error("Error fetching monthly power data:", error);
      setMonthlyData(prev => ({ 
        ...prev, 
        loading: false,
        error: "Failed to load monthly power data due to query limitations"
      }));
    }
  };

  useEffect(() => {
    fetchMonthlyPowerData();
    // Refresh every hour
    const interval = setInterval(fetchMonthlyPowerData, 3600000);
    return () => clearInterval(interval);
  }, []);

  const formatPowerValue = (wattHours: number) => {
    // Convert Watt-hours to more readable units
    if (wattHours >= 1000000000) {
      return `${(wattHours / 1000000000).toFixed(2)} GWh`;
    } else if (wattHours >= 1000000) {
      return `${(wattHours / 1000000).toFixed(2)} MWh`;
    } else if (wattHours >= 1000) {
      return `${(wattHours / 1000).toFixed(2)} kWh`;
    }
    return `${wattHours.toFixed(2)} Wh`;
  };

  const getSiteDisplayName = (site: string) => {
    const siteMap: Record<string, string> = {
      odcdh1: "Data Hall 1",
      odcdh2: "Data Hall 2", 
      odcdh3: "Data Hall 3",
      odcdh5: "Data Hall 5",
    };
    return siteMap[site] || site.toUpperCase();
  };

  const currentMonth = new Date().toLocaleDateString("en-US", { 
    month: "long", 
    year: "numeric" 
  });

  if (monthlyData.loading) {
    return (
      <Card className="w-full mb-8 relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Monthly Power Usage
          </CardTitle>
          <CardDescription>Loading current month data using batched queries...</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Zap className="h-5 w-5" />
          Monthly Power Usage - {currentMonth}
        </CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-400">
          Total energy consumed across all data halls (using batched queries)
          {monthlyData.error && (
            <div className="flex items-center gap-1 mt-1 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{monthlyData.error}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* Overall Summary */}
        <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
              {formatPowerValue(monthlyData.totalPower)}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Total energy consumed
            </p>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1">
              <TrendingUp 
                className={`h-4 w-4 ${
                  monthlyData.percentageChange >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`} 
              />
              <p className={`text-sm font-medium ${
                monthlyData.percentageChange >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {monthlyData.percentageChange >= 0 ? '+' : ''}
                {monthlyData.percentageChange.toFixed(1)}%
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              vs last month ({formatPowerValue(monthlyData.previousMonth)})
            </p>
          </div>
        </div>

        {/* Individual Data Halls Breakdown */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Individual Data Hall Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["odcdh1", "odcdh2", "odcdh3", "odcdh5"].map((site) => {
              const data = monthlyData.siteBreakdown[site];
              if (!data) return null;
              
              return (
                <div
                  key={site}
                  className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-blue-100 dark:border-blue-800/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {getSiteDisplayName(site)}
                    </h4>
                    <div className="flex items-center gap-1">
                      <TrendingUp 
                        className={`h-3 w-3 ${
                          data.change >= 0 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`} 
                      />
                      <span className={`text-xs font-medium ${
                        data.change >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {data.change >= 0 ? '+' : ''}
                        {data.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {formatPowerValue(data.current)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Previous: {formatPowerValue(data.previous)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --------------- PowerChart (single site) with improved error handling -----------------
const PowerChart = ({ site }: { site: string }) => {
  const { theme } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [highlightedKey, setHighlightedKey] = useState<string>();
  const [error, setError] = useState<string>();

  const [selectedRange, setSelectedRange] = useState<"24h" | "7d" | "1mnth">(
    "24h"
  );

  const fetchPower = async () => {
    try {
      setError(undefined);
      const response = await axios.get(
        `/api/power?site=${site}&timeline=${selectedRange}`
      );
      setData(response.data || []);
    } catch (e) {
      console.error(e);
      setError(`Failed to load power data for ${site.toUpperCase()}`);
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
        <CardDescription>
          Power data for {site.toUpperCase()} 
          {selectedRange === "1mnth" && " (using batched queries for large date range)"}
          {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        {error ? (
          <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 mx-auto" />
              <p>Unable to load power data</p>
              <button 
                onClick={fetchPower}
                className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

// --------------- TemperatureChart (single site) with improved error handling -----------------
const TemperatureChart = ({ site }: { site: string }) => {
  const { theme } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [highlightedKey, setHighlightedKey] = useState<string>();
  const [error, setError] = useState<string>();

  const [selectedRange, setSelectedRange] = useState<"24h" | "7d" | "1mnth">(
    "24h"
  );

  const fetchTemp = async () => {
    try {
      setError(undefined);
      const response = await axios.get(
        `/api/temperature?site=${site}&timeline=${selectedRange}`
      );
      setData(response.data || []);
    } catch (e) {
      console.error(e);
      setError(`Failed to load temperature data for ${site.toUpperCase()}`);
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
        <CardDescription>
          Temperature data for {site.toUpperCase()}
          {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        {error ? (
          <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 mx-auto" />
              <p>Unable to load temperature data</p>
              <button 
                onClick={fetchTemp}
                className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

// --------- Main Page: render monthly card + charts for each site -----------
export default function Home() {
  const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh5"];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-4xl font-bold mb-4">Overall View</h1>

      <div className="w-full max-w-5xl space-y-16">
        {/* Monthly Power Usage Card */}
        <MonthlyPowerCard />
        
        {/* Monthly Power Data Table*/} 
        <MonthlyPowerTable />
        
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
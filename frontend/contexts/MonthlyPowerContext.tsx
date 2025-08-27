// contexts/MonthlyPowerContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface MonthlyPowerData {
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
  monthInfo?: {
    current_month: string;
    previous_month: string;
  };
}

interface MonthlyPowerContextType {
  data: MonthlyPowerData;
  refreshData: () => Promise<void>;
}

const MonthlyPowerContext = createContext<MonthlyPowerContextType | undefined>(undefined);

export const useMonthlyPower = () => {
  const context = useContext(MonthlyPowerContext);
  if (!context) {
    throw new Error("useMonthlyPower must be used within a MonthlyPowerProvider");
  }
  return context;
};

interface MonthlyPowerProviderProps {
  children: ReactNode;
}

export const MonthlyPowerProvider = ({ children }: MonthlyPowerProviderProps) => {
  const [data, setData] = useState<MonthlyPowerData>({
    totalPower: 0,
    previousMonth: 0,
    percentageChange: 0,
    siteBreakdown: {},
    loading: true,
  });

  const fetchMonthlyPowerData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: undefined }));
      
      // Single API call for monthly summary
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/power/monthly-summary`, {
        params: { sites: "odcdh1,odcdh2,odcdh3,odcdh4,odcdh5" }
      });
      
      if (response.data.status === "error") {
        throw new Error(response.data.data);
      }

      const { sites, totals, month_info } = response.data;
      
      // Transform the server response
      const siteBreakdown: Record<string, { current: number; previous: number; change: number }> = {};
      let hasErrors = false;

      Object.entries(sites).forEach(([site, siteData]: [string, any]) => {
        if (siteData.error) {
          hasErrors = true;
          console.error(`Error for ${site}:`, siteData.error);
        }
        
        siteBreakdown[site] = {
          current: siteData.current_month_kwh * 1000, // Convert to Wh for consistency
          previous: siteData.previous_month_kwh * 1000,
          change: siteData.percentage_change,
        };
      });

      setData({
        totalPower: totals.current_month_kwh * 1000, // Convert to Wh
        previousMonth: totals.previous_month_kwh * 1000,
        percentageChange: totals.percentage_change,
        siteBreakdown,
        loading: false,
        error: hasErrors ? "Some sites had data collection issues" : undefined,
        monthInfo: month_info,
      });

    } catch (error) {
      console.error("Error fetching monthly power data:", error);
      setData(prev => ({ 
        ...prev, 
        loading: false,
        error: "Failed to load monthly power summary"
      }));
    }
  };

  useEffect(() => {
    fetchMonthlyPowerData();
    // Refresh every 30 minutes
    const interval = setInterval(fetchMonthlyPowerData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    data,
    refreshData: fetchMonthlyPowerData,
  };

  return (
    <MonthlyPowerContext.Provider value={value}>
      {children}
    </MonthlyPowerContext.Provider>
  );
};
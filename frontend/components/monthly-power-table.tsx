// Monthly Power Table Component - Uses Shared Context
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Edit3, Check, X, AlertTriangle, RefreshCw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMonthlyPower } from "@/contexts/MonthlyPowerContext";

interface MonthlyData {
  month: string;
  dh1: number;
  dh2: number;
  dh3: number;
  dh4: number;
  dh5: number;
  total: number;
  openDcFacilityPower: number;
  pue: number;
}

const MonthlyPowerTable = () => {
  const { data: contextData, refreshData } = useMonthlyPower();
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  // Format month for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      year: "numeric" 
    });
  };

  // Get current month and previous months
  const getMonthsToDisplay = () => {
    const months = [];
    const currentDate = new Date();
    
    // Get last 3 months including current month
    for (let i = 2; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(formatMonth(date));
    }
    return months;
  };

  // Fetch historical data from JSON file
  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get(`/api/monthly-power-data`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  };

  // Get current month totals from shared context data
  const getCurrentMonthTotals = () => {
    if (!contextData || contextData.loading || !contextData.siteBreakdown) {
      return {};
    }

    const monthlyTotals: Record<string, number> = {};
    
    Object.entries(contextData.siteBreakdown).forEach(([site, siteData]) => {
      // Convert site names to table column names and convert back to kWh
      const columnMap: Record<string, string> = {
        odcdh1: 'dh1',
        odcdh2: 'dh2', 
        odcdh3: 'dh3',
        odcdh4: 'dh4',
        odcdh5: 'dh5'
      };
      
      if (columnMap[site]) {
        // Convert from Wh to kWh
        monthlyTotals[columnMap[site]] = (siteData.current / 1000) || 0;
      }
    });
    
    return monthlyTotals;
  };

  // Fetch historical summary using the optimized historical-summary endpoint
  const fetchHistoricalSummary = async (monthsBack: number = 3) => {
    try {
      // We can reuse the same endpoint but for historical data
      // In practice, you might want a separate historical endpoint
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/power/monthly-summary`, {
        params: { sites: "odcdh1,odcdh2,odcdh3,odcdh4,odcdh5" }
      });
      
      if (response.data.status === "error") {
        throw new Error(response.data.data);
      }

      return response.data.months || [];
    } catch (error) {
      console.error('Error fetching historical summary:', error);
      throw error;
    }
  };

  // Load all data using shared context for current month
  const loadData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const currentMonth = formatMonth(new Date());
      const monthsToDisplay = getMonthsToDisplay();

      // Fetch saved historical data
      const historicalData = await fetchHistoricalData();

      const tableData: MonthlyData[] = [];

      for (const month of monthsToDisplay) {
        const savedData = historicalData.find((item: MonthlyData) => item.month === month);

        if (savedData) {
          // Use saved data if available
          tableData.push(savedData);
        } else if (month === currentMonth) {
          // Use shared context data for current month
          const currentMonthTotals = getCurrentMonthTotals();
          const total = Object.values(currentMonthTotals).reduce((sum, val) => sum + val, 0);

          tableData.push({
            month,
            dh1: currentMonthTotals.dh1 || 0,
            dh2: currentMonthTotals.dh2 || 0,
            dh3: currentMonthTotals.dh3 || 0,
            dh4: currentMonthTotals.dh4 || 0,
            dh5: currentMonthTotals.dh5 || 0,
            total,
            openDcFacilityPower: 0,
            pue: 0,
          });
        } else {
          // Fallback empty row for historical months not in saved data
          tableData.push({
            month,
            dh1: 0,
            dh2: 0,
            dh3: 0,
            dh4: 0,
            dh5: 0,
            total: 0,
            openDcFacilityPower: 0,
            pue: 0,
          });
        }
      }

      setData(tableData);

    } catch (error) {
      console.error('Error loading data:', error);
      setError(
        `Failed to load monthly power data: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function - also refreshes shared context
  const handleRefresh = async () => {
    await refreshData(); // Refresh shared context data
    await loadData(); // Reload table data
  };

  // Save data to JSON file
  const saveData = async () => {
    setSaving(true);
    try {
      await axios.post(`/api/monthly-power-data`, { data });
      alert("Monthly power data saved successfully");
    } catch (error) {
      console.error('Error saving data:', error);
      alert("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  // Handle edit start
  const startEdit = (month: string, currentValue: number) => {
    setEditingMonth(month);
    setEditValue(currentValue.toString());
  };

  // Handle edit save
  const saveEdit = () => {
    if (!editingMonth) return;
    
    const numValue = parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0) {
      alert("Please enter a valid positive number");
      return;
    }
    
    setData(prevData => 
      prevData.map(row => {
        if (row.month === editingMonth) {
          const updatedRow = { ...row, openDcFacilityPower: numValue };
          // Recalculate PUE
          updatedRow.pue = updatedRow.total > 0 ? updatedRow.openDcFacilityPower / updatedRow.total : 0;
          return updatedRow;
        }
        return row;
      })
    );
    
    setEditingMonth(null);
    setEditValue('');
  };

  // Handle edit cancel
  const cancelEdit = () => {
    setEditingMonth(null);
    setEditValue('');
  };

  // Format number for display
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  // Load data when component mounts or context data changes
  useEffect(() => {
    if (!contextData.loading) {
      loadData();
    }
  }, [contextData.loading]);

  // Auto-refresh every 30 minutes (but rely on context for API calls)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!contextData.loading) {
        loadData();
      }
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [contextData.loading]);

  if (loading || contextData.loading) {
    return (
      <Card className="w-full mb-8 relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
        <CardHeader>
          <CardTitle>Monthly Power Consumption History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Loading shared monthly summaries...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-green-700 dark:text-green-300">
            Monthly Power Consumption History
          </CardTitle>
          {(error || contextData.error) && (
            <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{error || contextData.error}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={saveData} 
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Month</TableHead>
                <TableHead className="text-right font-semibold">DH1 (kWh)</TableHead>
                <TableHead className="text-right font-semibold">DH2 (kWh)</TableHead>
                <TableHead className="text-right font-semibold">DH3 (kWh)</TableHead>
                <TableHead className="text-right font-semibold">DH4 (kWh)</TableHead>
                <TableHead className="text-right font-semibold">DH5 (kWh)</TableHead>
                <TableHead className="text-right font-semibold">Total (kWh)</TableHead>
                <TableHead className="text-right font-semibold">Facility Power (kWh)</TableHead>
                <TableHead className="text-right font-semibold">PUE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.dh1)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.dh2)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.dh3)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.dh4)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.dh5)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatNumber(row.total)}</TableCell>
                  <TableCell className="text-right">
                    {editingMonth === row.month ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 h-8"
                          min="0"
                          step="0.01"
                        />
                        <Button size="sm" variant="ghost" onClick={saveEdit}>
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{formatNumber(row.openDcFacilityPower)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => startEdit(row.month, row.openDcFacilityPower)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    <span className={row.pue > 2 ? 'text-red-600' : row.pue > 1.5 ? 'text-yellow-600' : 'text-green-600'}>
                      {row.pue > 0 ? formatNumber(row.pue) : '-'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Performance and info indicators */}
        <div className="mt-4 space-y-2">
          <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 p-2 rounded">
            ⚡ Using shared context: Single API call shared between components (~1KB total)
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>• Current month: Uses shared context data (no additional API calls)</p>
            <p>• Historical months: Loaded from saved JSON file</p>
            <p>• Facility Power must be entered manually for each month</p>
            <p>• PUE = Facility Power ÷ Total IT Power</p>
            <p>• PUE Color coding: Green (&lt;1.5), Yellow (1.5-2.0), Red (&gt;2.0)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MonthlyPowerTable };
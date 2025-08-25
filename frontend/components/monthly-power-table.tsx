// Monthly Power Table Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Edit3, Check, X } from 'lucide-react';
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
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Format month for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      year: "numeric" 
    });
  };

  // Get current month and previous months (only last 3 months)
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

  // Fetch historical data with better error handling
  const fetchHistoricalData = async () => {
    try {
      console.log('Attempting to fetch historical data...');
      const response = await axios.get(`/api/monthly-power-data`);
      console.log('Historical data response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // If the monthly data endpoint doesn't work, return empty array
      // The component will still work with live data
      return [];
    }
  };

  // Fetch current month data using the same method as graphs
  const fetchCurrentMonthData = async () => {
    try {
      const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"];
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      const promises = sites.map(async (site) => {
        try {
          // Use the same API call pattern as the working graphs
          const response = await axios.get(`/api/power`, {
            params: {
              site: site,
              timeline: "1mnth"
            }
          });
          return { site, data: response.data || [] };
        } catch (error) {
          console.error(`Error fetching current month data for ${site}:`, error);
          return { site, data: [] };
        }
      });
      
      const responses = await Promise.all(promises);
      const monthlyTotals: Record<string, number> = {};
      
      responses.forEach(({ site, data }) => {
        let siteTotal = 0;
        
        // Process the data exactly like the working components
        data.forEach((reading: any) => {
          const readingDate = new Date(reading.created);
          // Only include readings from current month
          if (readingDate >= firstDayOfMonth) {
            // Convert power reading to energy (10-minute intervals)
            const energyWh = (reading.reading || 0) * (10 / 60);
            siteTotal += energyWh;
          }
        });
        
        // Convert site names to table column names
        const columnMap: Record<string, string> = {
          odcdh1: 'dh1',
          odcdh2: 'dh2', 
          odcdh3: 'dh3',
          odcdh4: 'dh4',
          odcdh5: 'dh5'
        };
        
        monthlyTotals[columnMap[site]] = siteTotal / 1000; // Convert to kWh
      });
      
      return monthlyTotals;
    } catch (error) {
      console.error('Error fetching current month data:', error);
      return {};
    }
  };

  // Fetch data for a specific month (simplified for last 3 months only)
  const fetchMonthData = async (year: number, month: number) => {
    try {
      const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh4", "odcdh5"];
      
      // Use the existing historical data if available, don't make additional API calls
      // This function is now mainly for fallback
      const monthlyTotals: Record<string, number> = {
        dh1: 0, dh2: 0, dh3: 0, dh4: 0, dh5: 0
      };
      
      return monthlyTotals;
    } catch (error) {
      console.error('Error fetching month data:', error);
      return { dh1: 0, dh2: 0, dh3: 0, dh4: 0, dh5: 0 };
    }
  };

  // Load all data (optimized and with better error handling)
  const loadData = async () => {
    setLoading(true);
    try {
      const monthsToDisplay = getMonthsToDisplay();
      const currentMonth = formatMonth(new Date());
      
      console.log('Loading data for months:', monthsToDisplay);
      console.log('Current month:', currentMonth);
      
      // Always try to fetch current month data, handle historical data separately
      const currentMonthTotals = await fetchCurrentMonthData();
      console.log('Current month totals:', currentMonthTotals);
      
      // Try to fetch historical data, but don't fail if it's not available
      let historicalData = [];
      try {
        historicalData = await fetchHistoricalData();
      } catch (error) {
        console.warn('Historical data not available, using live data only');
      }
      
      const tableData: MonthlyData[] = [];
      
      for (const month of monthsToDisplay) {
        console.log('Processing month:', month);
        
        // Check if we have historical data for this month
        const existingData = historicalData.find((item: MonthlyData) => item.month === month);
        
        if (existingData) {
          console.log('Found historical data for', month);
          tableData.push(existingData);
        } else if (month === currentMonth) {
          // For current month, use live data
          console.log('Using live data for current month:', month);
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
          // For past months without saved data, show empty row
          console.log('No data available for past month:', month);
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
      
      console.log('Final table data:', tableData);
      setData(tableData);
    } catch (error) {
      console.error('Error loading data:', error);
      // Don't show alert for every error, just log it
      console.warn("Failed to load some monthly power data, showing available data");
      
      // Set minimal data so the component doesn't break
      const monthsToDisplay = getMonthsToDisplay();
      const fallbackData = monthsToDisplay.map(month => ({
        month,
        dh1: 0, dh2: 0, dh3: 0, dh4: 0, dh5: 0,
        total: 0, openDcFacilityPower: 0, pue: 0,
      }));
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Save data with better error handling
  const saveData = async () => {
    setSaving(true);
    try {
      console.log('Attempting to save data:', data);
      const response = await axios.post(`/api/monthly-power-data`, { data });
      console.log('Save response:', response.data);
      alert("Monthly power data saved successfully");
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      alert("Failed to save data. Check console for details.");
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
      alert("Please enter a valid number");
      return;
    }
    
    setData(prevData => 
      prevData.map(row => {
        if (row.month === editingMonth) {
          const updatedRow = { ...row, openDcFacilityPower: numValue };
          // Recalculate PUE
          updatedRow.pue = updatedRow.total > 0 ? (updatedRow.total + updatedRow.openDcFacilityPower) / updatedRow.total : 0;
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

  useEffect(() => {
    loadData();
    // Reload data every hour
    const interval = setInterval(loadData, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle>Monthly Power Consumption History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monthly Power Consumption History</CardTitle>
        <Button 
          onClick={saveData} 
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
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
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>• Showing last 3 months of data for optimal performance</p>
          <p>• Current month data is automatically calculated from live readings</p>
          <p>• Facility Power must be entered manually for each month</p>
          <p>• PUE (Power Usage Effectiveness) is calculated as (Total IT Power + Facility Power) ÷ Total IT Power</p>
          <p>• PUE Color coding: Green (&lt;1.5), Yellow (1.5-2.0), Red (&gt;2.0)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export { MonthlyPowerTable };
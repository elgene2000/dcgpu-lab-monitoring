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

  // Get current month and previous months
  const getMonthsToDisplay = () => {
    const months = [];
    const currentDate = new Date();
    
    // Get last 12 months including current month
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(formatMonth(date));
    }
    return months;
  };

  // Fetch historical data from JSON file
  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('/api/monthly-power-data');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  };

  // Fetch current month data for each data hall
  const fetchCurrentMonthData = async () => {
    try {
      const sites = ["odcdh1", "odcdh2", "odcdh3", "odcdh5"];
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      const promises = sites.map(site =>
        axios.get(`/api/power?site=${site}&timeline=1mnth`)
      );
      
      const responses = await Promise.all(promises);
      const monthlyTotals: Record<string, number> = {};
      
      responses.forEach((response, index) => {
        const site = sites[index];
        let siteTotal = 0;
        
        if (response.status === 200 && response.data) {
          response.data.forEach((reading: any) => {
            const readingDate = new Date(reading.created);
            if (readingDate >= firstDayOfMonth) {
              // Convert power reading to energy (10-minute intervals)
              const energyWh = (reading.reading || 0) * (10 / 60);
              siteTotal += energyWh;
            }
          });
        }
        
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

  // Load all data
  const loadData = async () => {
    setLoading(true);
    try {
      const [historicalData, currentMonthTotals] = await Promise.all([
        fetchHistoricalData(),
        fetchCurrentMonthData()
      ]);
      
      const monthsToDisplay = getMonthsToDisplay();
      const currentMonth = formatMonth(new Date());
      
      const tableData: MonthlyData[] = monthsToDisplay.map(month => {
        // Check if we have historical data for this month
        const existingData = historicalData.find((item: MonthlyData) => item.month === month);
        
        if (existingData) {
          return existingData;
        }
        
        // For current month, use live data
        if (month === currentMonth) {
          const total = Object.values(currentMonthTotals).reduce((sum, val) => sum + val, 0);
          return {
            month,
            dh1: currentMonthTotals.dh1 || 0,
            dh2: currentMonthTotals.dh2 || 0,
            dh3: currentMonthTotals.dh3 || 0,
            dh4: currentMonthTotals.dh4 || 0,
            dh5: currentMonthTotals.dh5 || 0,
            total,
            openDcFacilityPower: 0,
            pue: 0,
          };
        }
        
        // For months without data, return empty row
        return {
          month,
          dh1: 0,
          dh2: 0,
          dh3: 0,
          dh4: 0,
          dh5: 0,
          total: 0,
          openDcFacilityPower: 0,
          pue: 0,
        };
      });
      
      setData(tableData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert("Failed to load monthly power data");

    } finally {
      setLoading(false);
    }
  };

  // Save data to JSON file
  const saveData = async () => {
    setSaving(true);
    try {
      await axios.post('/api/monthly-power-data', { data });
      alert("Data saved successfully");
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
          <p>• Current month data is automatically calculated from live readings</p>
          <p>• Facility Power must be entered manually for each month</p>
          <p>• PUE (Power Usage Effectiveness) is calculated as Facility Power ÷ Total IT Power</p>
          <p>• PUE Color coding: Green (&lt;1.5), Yellow (1.5-2.0), Red (&gt;2.0)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export { MonthlyPowerTable };
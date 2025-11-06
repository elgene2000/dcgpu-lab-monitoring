// frontend/components/power-capacity-card.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Zap, History, Download, RefreshCw, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PowerCapacityData {
  month: string;
  dh1_max: number;
  dh1_median: number;
  dh2_max: number;
  dh2_median: number;
  dh3_max: number;
  dh3_median: number;
  dh4_max: number;
  dh4_median: number;
  dh5_max: number;
  dh5_median: number;
  all_max: number;
  all_median: number;
  auto_saved?: boolean;
  saved_date?: string;
}

interface CurrentPreviousData {
  current: PowerCapacityData | null;
  previous: PowerCapacityData | null;
}

const PowerCapacityCard = () => {
  const [data, setData] = useState<CurrentPreviousData>({ current: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [historyData, setHistoryData] = useState<PowerCapacityData[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Fetch current and previous month data
  const fetchCapacityData = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/power-capacity/current-previous`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch capacity data');
      }
      
      setData(response.data);
    } catch (err) {
      console.error('Error fetching capacity data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load capacity data');
    } finally {
      setLoading(false);
    }
  };

  // Load full history for the modal
  const loadHistoryData = async () => {
    setHistoryLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/power-capacity`);
      setHistoryData(response.data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Download history as CSV
  const downloadHistoryCSV = () => {
    if (historyData.length === 0) return;

    const headers = [
      'Month',
      'DH1 Max (kW)', 'DH1 Median (kW)',
      'DH2 Max (kW)', 'DH2 Median (kW)',
      'DH3 Max (kW)', 'DH3 Median (kW)',
      'DH4 Max (kW)', 'DH4 Median (kW)',
      'DH5 Max (kW)', 'DH5 Median (kW)',
      'All Max (kW)', 'All Median (kW)',
      'Auto Saved', 'Saved Date'
    ];

    const rows = historyData.map(row => [
      row.month,
      row.dh1_max.toFixed(2), row.dh1_median.toFixed(2),
      row.dh2_max.toFixed(2), row.dh2_median.toFixed(2),
      row.dh3_max.toFixed(2), row.dh3_median.toFixed(2),
      row.dh4_max.toFixed(2), row.dh4_median.toFixed(2),
      row.dh5_max.toFixed(2), row.dh5_median.toFixed(2),
      row.all_max.toFixed(2), row.all_median.toFixed(2),
      row.auto_saved ? 'Yes' : 'No',
      row.saved_date || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `power_capacity_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format number for display
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 3, 
      maximumFractionDigits: 3 
    });
  };

  // Calculate percentage change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Load data on mount
  useEffect(() => {
    fetchCapacityData();
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchCapacityData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Load history when modal opens
  useEffect(() => {
    if (isHistoryOpen && historyData.length === 0) {
      loadHistoryData();
    }
  }, [isHistoryOpen]);

  if (loading) {
    return (
      <Card className="w-full mb-8 relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full -translate-x-full animate-[shimmer_2s_infinite] overflow-hidden bg-gradient-to-r from-transparent via-slate-200/30 to-transparent dark:via-slate-200/10" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Power Capacity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  const sites = [
    { key: 'dh1', label: 'Data Hall 1' },
    { key: 'dh2', label: 'Data Hall 2' },
    { key: 'dh3', label: 'Data Hall 3' },
    { key: 'dh4', label: 'Data Hall 4' },
    { key: 'dh5', label: 'Data Hall 5' },
    { key: 'all', label: 'All Data Halls' }
  ];

  return (
    <Card className="w-full mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Power Capacity Analysis
          </CardTitle>
          <CardDescription className="text-purple-600 dark:text-purple-400">
            Maximum and median power consumption comparison
          </CardDescription>
          {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                View All History
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-6xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Complete Power Capacity History</SheetTitle>
                <SheetDescription>
                  All historical power capacity data (max and median)
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-end">
                  <Button 
                    onClick={downloadHistoryCSV}
                    disabled={historyLoading || historyData.length === 0}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download CSV
                  </Button>
                </div>

                {historyLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  </div>
                ) : historyData.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No historical data available
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Month</TableHead>
                          <TableHead className="text-right font-semibold">DH1 Max (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH1 Median (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH2 Max (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH2 Median (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH3 Max (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH3 Median (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH4 Max (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH4 Median (W)</TableHead>
                          <TableHead className="text-right font-semibold">DH5 Max (kW)</TableHead>
                          <TableHead className="text-right font-semibold">DH5 Median (kW)</TableHead>
                          <TableHead className="text-right font-semibold">All Max (kW)</TableHead>
                          <TableHead className="text-right font-semibold">All Median (kW)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historyData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{row.month}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh1_max)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh1_median)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh2_max)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh2_median)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh3_max)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh3_median)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh4_max)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh4_median)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh5_max)}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.dh5_median)}</TableCell>
                            <TableCell className="text-right font-semibold">{formatNumber(row.all_max)}</TableCell>
                            <TableCell className="text-right font-semibold">{formatNumber(row.all_median)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            onClick={fetchCapacityData} 
            disabled={loading}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!data.current && !data.previous ? (
          <div className="text-center py-12 text-gray-500">
            No capacity data available
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Data Hall</TableHead>
                  <TableHead className="text-right font-semibold">Current Max (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Previous Max (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Change</TableHead>
                  <TableHead className="text-right font-semibold">Current Median (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Previous Median (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => {
                  const currentMax = data.current?.[`${site.key}_max` as keyof PowerCapacityData] as number || 0;
                  const previousMax = data.previous?.[`${site.key}_max` as keyof PowerCapacityData] as number || 0;
                  const currentMedian = data.current?.[`${site.key}_median` as keyof PowerCapacityData] as number || 0;
                  const previousMedian = data.previous?.[`${site.key}_median` as keyof PowerCapacityData] as number || 0;
                  
                  const maxChange = calculateChange(currentMax, previousMax);
                  const medianChange = calculateChange(currentMedian, previousMedian);

                  return (
                    <TableRow key={site.key} className={site.key === 'all' ? 'font-semibold bg-purple-50 dark:bg-purple-950/30' : ''}>
                      <TableCell>{site.label}</TableCell>
                      <TableCell className="text-right">{formatNumber(currentMax)}</TableCell>
                      <TableCell className="text-right">{formatNumber(previousMax)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {maxChange > 0 ? (
                            <>
                              <TrendingUp className="h-3 w-3 text-red-500" />
                              <span className="text-red-500">+{maxChange.toFixed(1)}%</span>
                            </>
                          ) : maxChange < 0 ? (
                            <>
                              <TrendingDown className="h-3 w-3 text-green-500" />
                              <span className="text-green-500">{maxChange.toFixed(1)}%</span>
                            </>
                          ) : (
                            <span className="text-gray-500">0%</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatNumber(currentMedian)}</TableCell>
                      <TableCell className="text-right">{formatNumber(previousMedian)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {medianChange > 0 ? (
                            <>
                              <TrendingUp className="h-3 w-3 text-red-500" />
                              <span className="text-red-500">+{medianChange.toFixed(1)}%</span>
                            </>
                          ) : medianChange < 0 ? (
                            <>
                              <TrendingDown className="h-3 w-3 text-green-500" />
                              <span className="text-green-500">{medianChange.toFixed(1)}%</span>
                            </>
                          ) : (
                            <span className="text-gray-500">0%</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <div className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 p-2 rounded">
            📊 <strong>Individual DH Max:</strong> Highest aggregated power in any 10-min segment | <strong>All Max:</strong> Highest total across all DHs in any 10-min segment | <strong>Median:</strong> Middle value showing typical operating power
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>• Current month: {data.current?.month || 'N/A'}</p>
            <p>• Previous month: {data.previous?.month || 'N/A'}</p>
            <p>• <strong>Max calculation:</strong> Readings aggregated per 10-min segment, highest segment shown</p>
            <p>• <strong>Median calculation:</strong> Median of all individual power readings</p>
            <p>• <strong>"All" values:</strong> Combined metrics across all data halls</p>
            <p>• Data automatically saved at the end of each month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerCapacityCard;
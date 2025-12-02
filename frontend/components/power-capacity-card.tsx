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
  dh1_planned: number;
  dh1_max: number;
  dh1_available: number;
  dh2_planned: number;
  dh2_max: number;
  dh2_available: number;
  dh3_planned: number;
  dh3_max: number;
  dh3_available: number;
  dh4_planned: number;
  dh4_max: number;
  dh4_available: number;
  dh5_planned: number;
  dh5_max: number;
  dh5_available: number;
  total_planned: number;
  total_max: number;
  total_available: number;
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
      'DH1 Planned (kW)', 'DH1 Max (kW)', 'DH1 Available (kW)',
      'DH2 Planned (kW)', 'DH2 Max (kW)', 'DH2 Available (kW)',
      'DH3 Planned (kW)', 'DH3 Max (kW)', 'DH3 Available (kW)',
      'DH4 Planned (kW)', 'DH4 Max (kW)', 'DH4 Available (kW)',
      'DH5 Planned (kW)', 'DH5 Max (kW)', 'DH5 Available (kW)',
      'Total Planned (kW)', 'Total Max (kW)', 'Total Available (kW)',
      'Auto Saved', 'Saved Date'
    ];

    const rows = historyData.map(row => [
      row.month,
      row.dh1_planned.toFixed(2), row.dh1_max.toFixed(2), row.dh1_available.toFixed(2),
      row.dh2_planned.toFixed(2), row.dh2_max.toFixed(2), row.dh2_available.toFixed(2),
      row.dh3_planned.toFixed(2), row.dh3_max.toFixed(2), row.dh3_available.toFixed(2),
      row.dh4_planned.toFixed(2), row.dh4_max.toFixed(2), row.dh4_available.toFixed(2),
      row.dh5_planned.toFixed(2), row.dh5_max.toFixed(2), row.dh5_available.toFixed(2),
      row.total_planned.toFixed(2), row.total_max.toFixed(2), row.total_available.toFixed(2),
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
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
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
    { key: 'total', label: 'Total' }
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
            Planned capacity vs maximum observed capacity
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
                View History
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-6xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Complete Power Capacity History</SheetTitle>
                <SheetDescription>
                  Historical power capacity analysis data
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
                          <TableHead className="text-right font-semibold">Data Hall</TableHead>
                          <TableHead className="text-right font-semibold">Planned (kW)</TableHead>
                          <TableHead className="text-right font-semibold">Max (kW)</TableHead>
                          <TableHead className="text-right font-semibold">Available (kW)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historyData.map((row, index) => (
                          <React.Fragment key={index}>
                            {sites.map((site) => {
                              const planned = row[`${site.key}_planned` as keyof PowerCapacityData] as number;
                              const max = row[`${site.key}_max` as keyof PowerCapacityData] as number;
                              const available = row[`${site.key}_available` as keyof PowerCapacityData] as number;
                              
                              return (
                                <TableRow key={`${index}-${site.key}`} className={site.key === 'total' ? 'font-semibold bg-purple-50 dark:bg-purple-950/30' : ''}>
                                  {site.key === 'dh1' && (
                                    <TableCell rowSpan={6} className="font-medium align-top">
                                      {row.month}
                                    </TableCell>
                                  )}
                                  <TableCell className="text-right">{site.label}</TableCell>
                                  <TableCell className="text-right">{formatNumber(planned)}</TableCell>
                                  <TableCell className="text-right">{formatNumber(max)}</TableCell>
                                  <TableCell className="text-right">
                                    <span className={available < 0 ? 'text-red-600' : available < 50 ? 'text-yellow-600' : 'text-green-600'}>
                                      {formatNumber(available)}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </React.Fragment>
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
                  <TableHead className="text-right font-semibold">Planned Capacity (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Max Capacity (kW)</TableHead>
                  <TableHead className="text-right font-semibold">Available Capacity (kW)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => {
                  const planned = data.current?.[`${site.key}_planned` as keyof PowerCapacityData] as number || 0;
                  const currentMax = data.current?.[`${site.key}_max` as keyof PowerCapacityData] as number || 0;
                  const available = data.current?.[`${site.key}_available` as keyof PowerCapacityData] as number || 0;

                  return (
                    <TableRow key={site.key} className={site.key === 'total' ? 'font-semibold bg-purple-50 dark:bg-purple-950/30' : ''}>
                      <TableCell>{site.label}</TableCell>
                      <TableCell className="text-right">{formatNumber(planned)}</TableCell>
                      <TableCell className="text-right">{formatNumber(currentMax)}</TableCell>
                      <TableCell className="text-right">
                        <span className={available < 0 ? 'text-red-600 font-semibold' : available < 50 ? 'text-yellow-600' : 'text-green-600'}>
                          {formatNumber(available)}
                        </span>
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
            📊 <strong>Calculation Method:</strong> For each day, find the maximum power reading per system, sum these maximums across all systems in a data hall, then take the highest daily sum as the Max Capacity for the month
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>• <strong>Planned Capacity:</strong> Target capacity allocation per data hall</p>
            <p>• <strong>Max Capacity:</strong> Highest observed daily total (sum of system maximums)</p>
            <p>• <strong>Available Capacity:</strong> Planned Capacity - Max Capacity</p>
            <p>• <strong>Color coding:</strong> Green (≥50 kW), Yellow (&lt;50 kW), Red (negative/over capacity)</p>
            <p>• Current month: {data.current?.month || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerCapacityCard;
"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { 
  AlertTriangle, 
  Thermometer, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock,
  Server 
} from "lucide-react";

interface SystemTemperature {
  _id: string;
  system: string;
  bmc_ip: string;
  reading: number;
  symbol: string;
  created: string;
  updated: string;
}

interface SystemCoverage {
  total_expected_systems: number;
  systems_with_temperature_data: number;
  systems_never_reported: string[];
  unexpected_systems: string[];
}

interface ApiResponse {
  temperature_data: SystemTemperature[];
  system_coverage: SystemCoverage;
}

const SystemTemperaturesPage = () => {
  const [data, setData] = useState<SystemTemperature[]>([]);
  const [coverage, setCoverage] = useState<SystemCoverage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [lastUpdated, setLastUpdated] = useState<Date>();

  const fetchSystemTemperatures = async () => {
    try {
      setError(undefined);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/system-temperature/latest`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      // Handle both old and new API response formats
      if (result.temperature_data && result.system_coverage) {
        // New format with coverage data
        setData(result.temperature_data || []);
        setCoverage(result.system_coverage);
      } else {
        // Fallback for old format (array of temperature data)
        const tempData = Array.isArray(result) ? result : [];
        setData(tempData);
        setCoverage(null);
      }
      
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setError("Failed to load system temperature data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemTemperatures();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchSystemTemperatures, 300000);
    return () => clearInterval(interval);
  }, []);

  const getTemperatureStatus = (temperature: number) => {
    if (temperature < 70) return { status: "normal", color: "text-green-600", bg: "bg-green-50" };
    if (temperature < 80) return { status: "warning", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { status: "critical", color: "text-red-600", bg: "bg-red-50" };
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kuala_Lumpur",
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const isStale = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins > 30; // Consider stale if older than 30 minutes
  };

  // Statistics - now using coverage data when available
  const totalSystems = coverage?.total_expected_systems || data.length;
  const activeSystems = data.filter(item => !isStale(item.created)).length;
  const avgTemperature = data.length > 0 
    ? data.reduce((sum, item) => sum + item.reading, 0) / data.length 
    : 0;
  const criticalSystems = data.filter(item => 
    getTemperatureStatus(item.reading).status === "critical"
  ).length;

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
        <div className="w-full max-w-6xl space-y-6">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <h1 className="text-4xl font-bold">System Temperatures</h1>
            <p className="text-gray-600">Loading temperature data...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Thermometer className="h-8 w-8 text-blue-600" />
            System Temperatures
          </h1>
          <p className="text-gray-600">
            Real-time temperature monitoring via IPMI
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-800">{totalSystems}</div>
              <div className="text-sm text-blue-600">Total Systems</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-800">{activeSystems}</div>
              <div className="text-sm text-green-600">Active Systems</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-800">{avgTemperature.toFixed(1)}°C</div>
              <div className="text-sm text-purple-600">Average Temp</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-800">{criticalSystems}</div>
              <div className="text-sm text-red-600">Critical Temps</div>
            </CardContent>
          </Card>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <p className="text-red-800 mb-3">{error}</p>
              <button
                onClick={fetchSystemTemperatures}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </CardContent>
          </Card>
        )}

        {/* Systems Grid */}
        {!error && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">System Status</h2>
              <button
                onClick={fetchSystemTemperatures}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Coverage Information - only show when coverage data is available */}
            {coverage && (coverage.systems_never_reported.length > 0 || coverage.unexpected_systems.length > 0) && (
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                <CardHeader>
                  <CardTitle className="text-yellow-800 dark:text-yellow-200 text-lg">
                    System Coverage Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {coverage.systems_never_reported.length > 0 && (
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        Systems Never Reported ({coverage.systems_never_reported.length}):
                      </h4>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 flex flex-wrap gap-2">
                        {coverage.systems_never_reported.map((systemName) => (
                          <span key={systemName} className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                            {systemName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {coverage.unexpected_systems.length > 0 && (
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        Unexpected Systems ({coverage.unexpected_systems.length}):
                      </h4>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 flex flex-wrap gap-2">
                        {coverage.unexpected_systems.map((systemName) => (
                          <span key={systemName} className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                            {systemName}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                        These systems are reporting temperatures but are not in the systems collection.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.map((system) => {
                const tempStatus = getTemperatureStatus(system.reading);
                const stale = isStale(system.created);
                
                return (
                  <Card 
                    key={system._id} 
                    className={`relative transition-all duration-200 hover:shadow-md ${
                      stale ? 'border-gray-300 opacity-70' : 'border-gray-200'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="truncate">{system.system}</span>
                        {stale ? (
                          <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        BMC: {system.bmc_ip}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className={`rounded-lg p-4 ${tempStatus.bg} border border-opacity-20`}>
                        <div className="flex items-center justify-center mb-2">
                          <Thermometer className={`h-8 w-8 ${tempStatus.color}`} />
                        </div>
                        <div className={`text-3xl font-bold text-center ${tempStatus.color}`}>
                          {system.reading.toFixed(1)}{system.symbol}
                        </div>
                        <div className={`text-sm text-center mt-1 capitalize ${tempStatus.color}`}>
                          {tempStatus.status}
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500 text-center">
                        <div>Last reading: {formatTimestamp(system.created)}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {data.length === 0 && !loading && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Server className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No system temperature data available</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Check if the IPMI collection task is running
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default SystemTemperaturesPage;
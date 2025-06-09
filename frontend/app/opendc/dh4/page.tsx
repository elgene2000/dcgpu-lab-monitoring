"use client";
import axios from "axios";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TempInfo } from "@/components/temp-info";
import { useTheme } from "next-themes";
import { OpenDCDH4 } from "@/components/room-visualizer/opendc-dh4";
import { useState, useEffect } from "react";

export default function OpenDCRoom4() {
  const { theme, setTheme } = useTheme();
  const [currPower, setCurrPower] = useState([]);

  // FUNCTIONS
  const getCurrPower = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/power/latest?site=odcdh4`, // Fetching latest power data for Data Hall 3,
      );
      if (response && response.status === 200) {
        //temp = Temporary data
        setCurrPower(response.data || []);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //EFFECTS
  useEffect(() => {
    const fetchCurrData = async () => {
      getCurrPower();
    };
    fetchCurrData();
    const intervalId = setInterval(fetchCurrData, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">
        OpenDC - Data Hall 4
      </p>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col items-start space-y-3 w-5/6">
          <Card className="w-full p-2">
            <CardHeader className="text-left">
              <CardTitle>Data Hall 4</CardTitle>
              <CardDescription>{/* Last checked */}</CardDescription>
              <div className="w-full h-full relative rounded-lg p-2 bg-background/40 dark:bg-secondary-dark/40 border-slate-200 dark:border-[#424C5E] border">
                <OpenDCDH4 theme={theme} powerData={currPower} />
              </div>
            </CardHeader>
          </Card>
        </div>
        <TempInfo />
      </div>
    </>
  );
}

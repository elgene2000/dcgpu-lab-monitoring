"use client"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TempInfo } from "@/components/temp-info";
import { USTLab3 } from "@/components/room-visualizer/ust-lab3";
import { useTheme } from "next-themes"

export default function Home() {

  const { theme } = useTheme()

  return (
    <>
      <p className="text-xl font-bold text-left flex flex-col pb-3">UST - Lab 3</p>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col items-start space-y-3 w-5/6">
          <Card className="w-full p-2">
            <CardHeader className="text-left">
              <CardTitle>Room Visualizer</CardTitle>
              <CardDescription>
              </CardDescription>
              <div className="mx-auto w-full h-auto relative overflow-hidden rounded-lg p-2 border-slate-200 dark:border-[#424C5E] border">
                <USTLab3 theme={theme} />
              </div>
            </CardHeader>
          </Card>
        </div>
        <TempInfo />
      </div>
    </>
  );
}

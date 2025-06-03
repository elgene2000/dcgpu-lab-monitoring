"use client";
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

export default function OpenDCRoom5() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <p className="flex text-xl font-bold text-left pb-3">
        OpenDC - Data Hall 5
      </p>
      <div className="flex w-full space-x-3">
        <div className="flex flex-col items-start space-y-3 w-5/6">
          <Card className="w-full p-2">
            <CardHeader className="text-left">
              <CardTitle>Data Hall 5</CardTitle>
              <CardDescription>{/* Last checked */}</CardDescription>
            </CardHeader>
            <div className="mx-auto text-center w-60 h-96 flex items-center justify-center">
              <Image
                alt="wip"
                src={theme === "dark" ? "/cube-3d-dark.webp" : "/cube-3d.webp"}
                width={100}
                height={100}
                className="mx-auto pb-20"
              />
            </div>
          </Card>
        </div>
        <TempInfo />
      </div>
    </>
  );
}

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
import { useTheme } from "next-themes"
import { OpenDCDH3 } from "@/components/room-visualizer/opendc-dh3";

export default function OpenDCRoom3() {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <p className="flex text-xl font-bold text-left pb-3">OpenDC - Data Hall 3</p>
            <div className="flex w-full space-x-3">
                <div className="flex flex-col items-start space-y-3 w-5/6">
                    <Card className="w-full p-2">
                        <CardHeader className="text-left">
                            <CardTitle>Room Visualiser</CardTitle>
                            <CardDescription>
                                {/* Last checked */}
                            </CardDescription>
                            <div className="w-full h-full relative rounded-lg p-2 bg-background/40 dark:bg-secondary-dark/40 border-slate-200 dark:border-[#424C5E] border">
                                <OpenDCDH3 theme={theme} />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <TempInfo />
            </div>
        </>)
}
"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BookOpen } from "lucide-react"
interface TempInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
import { useTheme } from "next-themes"

export function TempInfo({ className, ...props }: TempInfoProps) {
    const { theme } = useTheme()
    return (
        <Card className={cn("w-1/6 h-fit p-2 hidden md:block relative overflow-hidden", className)}>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.8,
                    delay: 0.3
                }}
                className="bg-sky-400/50 h-40 w-20 absolute -right-10 -top-16 rounded-full rotate-45 blur-3xl" />
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.8,
                    delay: 0.3
                }}
                className="bg-pink-400/70 h-16 w-16 absolute -right-0 -top-10 rounded-full rotate-45 blur-2xl" />
            <CardTitle className="p-3">
                <div className="flex items-center space-x-3">
                    <div className="dark:bg-[#363E50] bg-[#E9EDEF] rounded-md h-6 w-6 items-center flex justify-center">
                    <BookOpen size={15} color={theme=="dark" ? "#7B8499" : "#A8ABBE"} />
                    </div>
                    <p className="text-base">Info</p>
                </div>
            </CardTitle>
            <CardContent className="px-3 pt-2 text-sm dark:text-[#86899A] space-y-3">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-[#78E2B1] to-[#b7f5d8] w-6 h-6 rounded-md" />
                    <p>Below 18°C</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-[#FFE15E] to-[#FFF2B6] w-6 h-6 rounded-md" />
                    <p>18°C-24°C</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-[#FB7979] to-[#FFCBCB] w-6 h-6 rounded-md" />
                    <p>Above 24°C</p>
                </div>
            </CardContent>
        </Card>
    )
}
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
        <main className="items-center max-w-7xl w-full mx-auto min-h-screen p-8 pb-20 sm:p-20">
            <p className="text-xl font-bold text-left flex flex-col pb-3">UST - Lab 3</p>
            <div className="flex w-full space-x-3">
                <div className="flex flex-col items-start space-y-3 w-5/6">
                    <Card className="w-full p-2">
                        <CardHeader className="text-left">
                            <CardTitle>Room Visualizer</CardTitle>
                            <CardDescription>
                                Last checked
                            </CardDescription>
                            <div className="mx-auto w-full h-auto relative overflow-hidden rounded-lg p-2 border-slate-200 dark:border-[#424C5E] border">
                                <USTLab3 theme={theme} />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <TempInfo />
                {/* <Card className="w-1/6 h-60 p-2 hidden md:block relative overflow-hidden">
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
          <CardContent>
            <p>vs</p>
          </CardContent>

          <div className="mx-auto w-60 h-96">
          </div>
        </Card> */}
            </div>

            {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold ">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main> */}
        </main>
    );
}

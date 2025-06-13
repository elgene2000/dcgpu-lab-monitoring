"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plug2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface PowerInforProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
import { useTheme } from "next-themes";

export function PowerInfo({ className, ...props }: PowerInforProps) {
  const { theme } = useTheme();
  return (
    <Card
      className={cn("w-full overflow-hidden relative", className)}
      delay={0.1}
    >
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.8,
          delay: 0.7,
        }}
        className="bg-sky-400/50 h-40 w-20 absolute -right-10 -top-16 rounded-full rotate-45 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.8,
          delay: 0.7,
        }}
        className="bg-pink-400/70 h-16 w-16 absolute -right-0 -top-10 rounded-full rotate-45 blur-2xl"
      />
      <CardTitle className="p-3">
        <div className="flex items-center space-x-3">
          <div className="dark:bg-[#363E50] bg-[#E9EDEF] rounded-md h-6 w-6 items-center flex justify-center">
            <Plug2 size={15} color={theme == "dark" ? "#7B8499" : "#A8ABBE"} />
          </div>
          <p className="text-base">Power</p>
        </div>
      </CardTitle>
      <CardContent className="px-3 pt-2 text-sm dark:text-[#86899A] space-y-3">
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 fill-emerald-400"
            width="50"
            height="57"
            viewBox="0 0 50 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M49.9469 27.7789C49.8423 27.2606 49.5943 26.7828 49.2314 26.4008C48.8686 26.0187 48.4059 25.7481 47.8967 25.6201L28.8398 20.8154L35.8875 4.23692C36.132 3.66145 36.1782 3.02 36.0185 2.41501C35.8589 1.81002 35.5027 1.27639 35.0069 0.899378C34.5112 0.520525 33.9033 0.321099 33.2813 0.333291C32.6593 0.345484 32.0596 0.568584 31.5788 0.966577L1.02101 26.1661C0.622418 26.4948 0.322302 26.9286 0.154176 27.4192C-0.0139512 27.9098 -0.0434706 28.4378 0.0689127 28.9444C0.181296 29.4509 0.431159 29.916 0.790601 30.2877C1.15004 30.6593 1.60491 30.923 2.10442 31.0492L20.7697 35.7559L11.4773 52.1468C11.2367 52.5725 11.1112 53.0544 11.1132 53.5443C11.1151 54.0342 11.2446 54.515 11.4887 54.9387C11.7328 55.3624 12.0828 55.7141 12.504 55.9587C12.9251 56.2034 13.4026 56.3323 13.8886 56.3328C14.4897 56.3328 15.0746 56.1363 15.5554 55.7728L48.8912 30.5732C49.3112 30.2556 49.6333 29.8245 49.8201 29.33C50.007 28.8354 50.0509 28.2976 49.9469 27.7789Z" />
          </svg>
          <p>Below 2000W</p>
        </div>
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 fill-amber-400"
            width="50"
            height="57"
            viewBox="0 0 50 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M49.9469 27.7789C49.8423 27.2606 49.5943 26.7828 49.2314 26.4008C48.8686 26.0187 48.4059 25.7481 47.8967 25.6201L28.8398 20.8154L35.8875 4.23692C36.132 3.66145 36.1782 3.02 36.0185 2.41501C35.8589 1.81002 35.5027 1.27639 35.0069 0.899378C34.5112 0.520525 33.9033 0.321099 33.2813 0.333291C32.6593 0.345484 32.0596 0.568584 31.5788 0.966577L1.02101 26.1661C0.622418 26.4948 0.322302 26.9286 0.154176 27.4192C-0.0139512 27.9098 -0.0434706 28.4378 0.0689127 28.9444C0.181296 29.4509 0.431159 29.916 0.790601 30.2877C1.15004 30.6593 1.60491 30.923 2.10442 31.0492L20.7697 35.7559L11.4773 52.1468C11.2367 52.5725 11.1112 53.0544 11.1132 53.5443C11.1151 54.0342 11.2446 54.515 11.4887 54.9387C11.7328 55.3624 12.0828 55.7141 12.504 55.9587C12.9251 56.2034 13.4026 56.3323 13.8886 56.3328C14.4897 56.3328 15.0746 56.1363 15.5554 55.7728L48.8912 30.5732C49.3112 30.2556 49.6333 29.8245 49.8201 29.33C50.007 28.8354 50.0509 28.2976 49.9469 27.7789Z" />
          </svg>
          <p>2000W-8000W</p>
        </div>
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 fill-red-400"
            width="50"
            height="57"
            viewBox="0 0 50 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M49.9469 27.7789C49.8423 27.2606 49.5943 26.7828 49.2314 26.4008C48.8686 26.0187 48.4059 25.7481 47.8967 25.6201L28.8398 20.8154L35.8875 4.23692C36.132 3.66145 36.1782 3.02 36.0185 2.41501C35.8589 1.81002 35.5027 1.27639 35.0069 0.899378C34.5112 0.520525 33.9033 0.321099 33.2813 0.333291C32.6593 0.345484 32.0596 0.568584 31.5788 0.966577L1.02101 26.1661C0.622418 26.4948 0.322302 26.9286 0.154176 27.4192C-0.0139512 27.9098 -0.0434706 28.4378 0.0689127 28.9444C0.181296 29.4509 0.431159 29.916 0.790601 30.2877C1.15004 30.6593 1.60491 30.923 2.10442 31.0492L20.7697 35.7559L11.4773 52.1468C11.2367 52.5725 11.1112 53.0544 11.1132 53.5443C11.1151 54.0342 11.2446 54.515 11.4887 54.9387C11.7328 55.3624 12.0828 55.7141 12.504 55.9587C12.9251 56.2034 13.4026 56.3323 13.8886 56.3328C14.4897 56.3328 15.0746 56.1363 15.5554 55.7728L48.8912 30.5732C49.3112 30.2556 49.6333 29.8245 49.8201 29.33C50.007 28.8354 50.0509 28.2976 49.9469 27.7789Z" />
          </svg>
          <p>Above 8000W</p>
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChartConfig } from "@/components/ui/chart";
import { AnimatedCircles } from "../animated-circles";
import { Bolt } from "@/components/bolt";
import { useState, useEffect } from "react";

interface RoomVisualizerProps {
  theme?: string;
  powerData?: any[] | null | undefined;
}
const OpenDCDH4: React.FC<RoomVisualizerProps> = ({ theme, powerData }) => {
  const [benchPower, setBenchPower] = useState<any>({});

  const colorConfig = {
    particles: theme == "dark" ? "#FFFFFF" : "#8EC5FF",
    grill: theme == "dark" ? "#5F6A7E" : "#C6CBD3",
    block_fill: theme == "dark" ? "#272D3C" : "#F6F8FA",
    block_stroke: theme == "dark" ? "#424C5E" : "#e2e8f0",
    text: theme == "dark" ? "#A8ABBE" : "#5A5A5A",
    canvas_fill: theme == "dark" ? "#1F2430" : "#FFFFFF",
  };

  //EFFECTS
  useEffect(() => {
    const tempBenchPower: Record<string, number> = {};
    if (powerData && powerData.length > 0) {
      for (let i = 0; i < powerData.length; i++) {
        const rack = powerData[i].location.split("-")[0];
        const reading = powerData[i].reading;

        if (tempBenchPower[rack]) {
          tempBenchPower[rack] += reading;
        } else {
          tempBenchPower[rack] = reading;
        }
      }
    }
    setBenchPower(tempBenchPower);
  }, [powerData]);

  return (
    <svg
      className="w-full h-full max-h-[950px]"
      width="367"
      height="493"
      viewBox="0 0 367 493"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip0_709_17">
          <path d="M219 106H251V138H219V106Z" fill="white" />
        </clipPath>
        <clipPath id="clip1_709_17">
          <path d="M219 288H251V320H219V288Z" fill="white" />
        </clipPath>
        <clipPath id="clip2_709_17">
          <path d="M251 84H276V374H251V84Z" fill="white" />
        </clipPath>
        <clipPath id="clip3_709_17">
          <path d="M276 84H301V374H276V84Z" fill="white" />
        </clipPath>
        <mask id="semicircle-mask-1">
          <path d="M325,452 A130,200 0 0,0 235,452 Z" fill="white" />
        </mask>
        <mask id="semicircle-mask-2">
          <path d="M145,452 A130,200 0 0,0 55,452 Z" fill="white" />
        </mask>
        <mask id="semicircle-mask-3">
          <path d="M288,42 A130,200 0 0,1 198,42 Z" fill="white" />
        </mask>
        <mask id="semicircle-mask-4">
          <path d="M194,42 A130,200 0 0,1 104,42 Z" fill="white" />
        </mask>
      </defs>
      <mask id="path-1-inside-1_709_17" fill="white">
        <path d="M0 0H367V493H0V0Z" />
      </mask>
      <path d="M0 0H367V493H0V0Z" fill={colorConfig.canvas_fill} />
      <path
        d="M0 0V-1H-1V0H0ZM367 0H368V-1H367V0ZM367 493V494H368V493H367ZM0 493H-1V494H0V493ZM0 0V1H367V0V-1H0V0ZM367 0H366V493H367H368V0H367ZM367 493V492H0V493V494H367V493ZM0 493H1V0H0H-1V493H0Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-1-inside-1_709_17)"
      />
      <mask id="path-3-inside-2_709_17" fill="white">
        <path d="M301 106H333V173H301V106Z" />
      </mask>
      <g clipPath="url(#clip0_709_17)">
        <mask id="path-7-inside-4_709_17" fill="white">
          <path d="M219 106H251V138H219V106Z" />
        </mask>
        <path d="M219 106H251V138H219V106Z" fill={colorConfig.block_fill} />
        <path
          d="M214.603 138.035L256.226 99.162"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M207.801 130.501L249.424 91.6282"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M221.404 145.569L263.027 106.696"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M229.339 154.358L270.962 115.485"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M204.401 126.734L246.024 87.8613"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M218.003 141.802L259.626 102.929"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M211.202 134.268L252.825 95.3951"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M224.804 149.336L245.616 129.899L266.427 110.463"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M232.739 158.125L274.362 119.252"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M202.133 124.223L243.756 85.35"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M215.736 139.291L257.359 100.418"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M208.935 131.757L250.558 92.8838"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M222.538 146.825L264.161 107.951"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M230.472 155.614L272.095 116.741"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M205.534 127.99L247.157 89.1169"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M219.137 143.058L260.76 104.185"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M212.335 135.524L253.959 96.6507"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M225.938 150.591L267.562 111.718"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M203.267 125.479L244.89 86.6056"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M216.87 140.546L258.493 101.673"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M210.068 133.013L251.691 94.1394"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M223.671 148.08L265.294 109.207"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M231.606 156.87L273.229 117.997"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M206.668 129.246L248.291 90.3725"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M220.27 144.313L261.893 105.44"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M228.205 153.103L269.828 114.23"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M213.469 136.78L255.092 97.9064"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M227.072 151.847L268.695 112.974"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
      </g>
      <path
        d="M219 106V105H218V106H219ZM219 138H218V139H219V138ZM219 106V107H251V106V105H219V106ZM251 138V137H219V138V139H251V138ZM219 138H220V106H219H218V138H219Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-7-inside-4_709_17)"
      />
      <g clipPath="url(#clip1_709_17)">
        <mask id="path-37-inside-5_709_17" fill="white">
          <path d="M219 288H251V320H219V288Z" />
        </mask>
        <path d="M219 288H251V320H219V288Z" fill={colorConfig.block_fill} />
        <path
          d="M214.603 320.035L256.226 281.162"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M207.801 312.501L249.424 273.628"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M221.404 327.569L263.027 288.696"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M229.339 336.358L270.962 297.485"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M204.401 308.734L246.024 269.861"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M218.003 323.802L259.626 284.929"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M211.202 316.268L252.825 277.395"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M224.804 331.336L245.616 311.899L266.427 292.463"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M232.739 340.125L274.362 301.252"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M202.133 306.223L243.756 267.35"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M215.736 321.291L257.359 282.418"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M208.935 313.757L250.558 274.884"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M222.538 328.825L264.161 289.951"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M230.472 337.614L272.095 298.741"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M205.534 309.99L247.157 271.117"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M219.137 325.058L260.76 286.185"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M212.335 317.524L253.959 278.651"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M225.938 332.591L267.562 293.718"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M203.267 307.479L244.89 268.606"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M216.87 322.546L258.493 283.673"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M210.068 315.013L251.691 276.139"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M223.671 330.08L265.294 291.207"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M231.606 338.87L273.229 299.996"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M206.668 311.246L248.291 272.373"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M220.27 326.313L261.893 287.44"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M228.205 335.103L269.828 296.23"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M213.469 318.78L255.092 279.906"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
        <path
          d="M227.072 333.847L268.695 294.974"
          stroke={colorConfig.block_stroke}
          strokeWidth="0.5"
        />
      </g>
      <path
        d="M219 288V287H218V288H219ZM219 320H218V321H219V320ZM219 288V289H251V288V287H219V288ZM251 320V319H219V320V321H251V320ZM219 320H220V288H219H218V320H219Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-37-inside-5_709_17)"
      />
      <mask id="path-67-inside-6_709_17" fill="white">
        <path d="M219 221H251V288H219V221Z" />
      </mask>
      {/* A1 */}
      <path d="M40 106H72V173H40V106Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["a1"]}
        size={0.17857}
        x={51.5}
        y={135.5}
      />
      <path
        d="M40 106V105H39V106H40ZM72 106H73V105H72V106ZM40 106V107H72V106V105H40V106ZM72 106H71V173H72H73V106H72ZM40 173H41V106H40H39V173H40Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-79-inside-12_709_17)"
      />
      <mask id="path-81-inside-13_709_17" fill="white">
        <path d="M122 173H154V240H122V173Z" />
      </mask>
      {/* A2 */}
      <path d="M40 173H72V240H40V173Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["a2"]}
        size={0.17857}
        x={51.5}
        y={201.5}
      />
      <path
        d="M40 173V172H39V173H40ZM72 173H73V172H72V173ZM40 173V174H72V173V172H40V173ZM72 173H71V240H72H73V173H72ZM40 240H41V173H40H39V240H40Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-83-inside-14_709_17)"
      />
      <mask id="path-85-inside-15_709_17" fill="white">
        <path d="M122 240H154V307H122V240Z" />
      </mask>
      {/* A3 */}
      <path d="M40 240H72V307H40V240Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["a3"]}
        size={0.17857}
        x={51.5}
        y={268.5}
      />
      <path
        d="M40 240V239H39V240H40ZM72 240H73V239H72V240ZM40 240V241H72V240V239H40V240ZM72 240H71V307H72H73V240H72ZM40 307H41V240H40H39V307H40Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-87-inside-16_709_17)"
      />
      <mask id="path-89-inside-17_709_17" fill="white">
        <path d="M122 307H154V374H122V307Z" />
      </mask>
      {/* A4 */}
      <path d="M40 307H72V374H40V307Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["a4"]}
        size={0.17857}
        x={51.5}
        y={335.5}
      />
      <path
        d="M40 307V306H39V307H40ZM72 307H73V306H72V307ZM72 374V375H73V374H72ZM40 374H39V375H40V374ZM40 307V308H72V307V306H40V307ZM72 307H71V374H72H73V307H72ZM72 374V373H40V374V375H72V374ZM40 374H41V307H40H39V374H40Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-91-inside-18_709_17)"
      />
      {/* B1 */}
      <path d="M122 106H154V173H122V106Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["b1"]}
        size={0.17857}
        x={133}
        y={135.5}
      />
      <path
        d="M122 106V105H121V106H122ZM154 106H155V105H154V106ZM122 106V107H154V106V105H122V106ZM154 106H153V173H154H155V106H154ZM122 173H123V106H122H121V173H122Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-77-inside-11_709_17)"
      />
      <mask id="path-79-inside-12_709_17" fill="white">
        <path d="M40 106H72V173H40V106Z" />
      </mask>
      {/* B2 */}
      <path d="M122 173H154V240H122V173Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["b2"]}
        size={0.17857}
        x={133}
        y={201.5}
      />
      <path
        d="M122 173V172H121V173H122ZM154 173H155V172H154V173ZM122 173V174H154V173V172H122V173ZM154 173H153V240H154H155V173H154ZM122 240H123V173H122H121V240H122Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-81-inside-13_709_17)"
      />
      <mask id="path-83-inside-14_709_17" fill="white">
        <path d="M40 173H72V240H40V173Z" />
      </mask>
      {/* B3 */}
      <path d="M122 240H154V307H122V240Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["b3"]}
        size={0.17857}
        x={133}
        y={268.5}
      />
      <path
        d="M122 240V239H121V240H122ZM154 240H155V239H154V240ZM122 240V241H154V240V239H122V240ZM154 240H153V307H154H155V240H154ZM122 307H123V240H122H121V307H122Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-85-inside-15_709_17)"
      />
      <mask id="path-87-inside-16_709_17" fill="white">
        <path d="M40 240H72V307H40V240Z" />
      </mask>
      {/* B4 */}
      <path d="M122 307H154V374H122V307Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["b4"]}
        size={0.17857}
        x={133}
        y={335.5}
      />
      <path
        d="M122 307V306H121V307H122ZM154 307H155V306H154V307ZM154 374V375H155V374H154ZM122 374H121V375H122V374ZM122 307V308H154V307V306H122V307ZM154 307H153V374H154H155V307H154ZM154 374V373H122V374V375H154V374ZM122 374H123V307H122H121V374H122Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-89-inside-17_709_17)"
      />
      <mask id="path-91-inside-18_709_17" fill="white">
        <path d="M40 307H72V374H40V307Z" />
      </mask>
      {/* C1 */}
      <path d="M219 154H251V221H219V154Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["c1"]}
        size={0.17857}
        x={231.5}
        y={182.5}
      />
      <path
        d="M219 154V153H218V154H219ZM219 154V155H251V154V153H219V154ZM219 221H220V154H219H218V221H219Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-5-inside-3_709_17)"
      />
      {/* C2 */}
      <path d="M219 221H251V288H219V221Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["c2"]}
        size={0.17857}
        x={231.5}
        y={249.5}
      />
      <path
        d="M219 221V220H218V221H219ZM219 221V222H251V221V220H219V221ZM219 288H220V221H219H218V288H219Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-67-inside-6_709_17)"
      />
      <mask id="path-69-inside-7_709_17" fill="white">
        <path d="M301 173H333V240H301V173Z" />
      </mask>
      {/* C3 */}
      <path d="M219 333H251V400H219V333Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["c3"]}
        size={0.17857}
        x={230.5}
        y={361.5}
      />
      <path
        d="M219 333V332H218V333H219ZM251 333H252V332H251V333ZM251 400V401H252V400H251ZM219 400H218V401H219V400ZM219 333V334H251V333V332H219V333ZM251 333H250V400H251H252V333H251ZM251 400V399H219V400V401H251V400ZM219 400H220V333H219H218V400H219Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-75-inside-10_709_17)"
      />
      <mask id="path-77-inside-11_709_17" fill="white">
        <path d="M122 106H154V173H122V106Z" />
      </mask>
      {/* D1 */}
      <path d="M301 106H333V173H301V106Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["d1"]}
        size={0.17857}
        x={312}
        y={135.5}
      />
      <path
        d="M333 106H334V105H333V106ZM301 106V107H333V106V105H301V106ZM333 106H332V173H333H334V106H333Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-3-inside-2_709_17)"
      />
      <mask id="path-5-inside-3_709_17" fill="white">
        <path d="M219 154H251V221H219V154Z" />
      </mask>
      {/* D2 */}
      <path d="M301 173H333V240H301V173Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["d2"]}
        size={0.17857}
        x={312}
        y={201.5}
      />
      <path
        d="M333 173H334V172H333V173ZM301 173V174H333V173V172H301V173ZM333 173H332V240H333H334V173H333Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-69-inside-7_709_17)"
      />
      <mask id="path-71-inside-8_709_17" fill="white">
        <path d="M301 240H333V307H301V240Z" />
      </mask>
      {/* D3 */}
      <path d="M301 240H333V307H301V240Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["d3"]}
        size={0.17857}
        x={312}
        y={268.5}
      />
      <path
        d="M333 240H334V239H333V240ZM301 240V241H333V240V239H301V240ZM333 240H332V307H333H334V240H333Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-71-inside-8_709_17)"
      />
      <mask id="path-73-inside-9_709_17" fill="white">
        <path d="M301 307H333V374H301V307Z" />
      </mask>
      {/* D4 */}
      <path d="M301 307H333V374H301V307Z" fill={colorConfig.block_fill} />
      <Bolt
        theme={theme}
        power={benchPower["d4"]}
        size={0.17857}
        x={312}
        y={335.5}
      />
      <path
        d="M333 307H334V306H333V307ZM333 374V375H334V374H333ZM301 307V308H333V307V306H301V307ZM333 307H332V374H333H334V307H333ZM333 374V373H301V374V375H333V374Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-73-inside-9_709_17)"
      />
      <mask id="path-75-inside-10_709_17" fill="white">
        <path d="M219 333H251V400H219V333Z" />
      </mask>
      <g clipPath="url(#clip2_709_17)">
        <mask id="path-93-inside-19_709_17" fill="white">
          <path d="M251 84H276V374H251V84Z" />
        </mask>
        <path d="M251 84H276V374H251V84Z" fill={colorConfig.block_fill} />
        <path
          d="M255.853 369.101V372.851C255.853 372.933 255.919 373 256 373C256.081 373 256.147 372.933 256.147 372.851V369.101C256.147 369.019 256.081 368.953 256 368.953C255.919 368.953 255.853 369.019 255.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 370.828C254.066 370.828 254 370.894 254 370.976C254 371.058 254.066 371.125 254.147 371.125H257.853C257.934 371.125 258 371.058 258 370.976C258 370.894 257.934 370.828 257.853 370.828H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 361.007V364.757C255.853 364.839 255.919 364.905 256 364.905C256.081 364.905 256.147 364.839 256.147 364.757V361.007C256.147 360.925 256.081 360.858 256 360.858C255.919 360.858 255.853 360.925 255.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 362.733C254.066 362.733 254 362.8 254 362.882C254 362.964 254.066 363.03 254.147 363.03H257.853C257.934 363.03 258 362.964 258 362.882C258 362.8 257.934 362.733 257.853 362.733H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 352.912V356.662C255.853 356.744 255.919 356.811 256 356.811C256.081 356.811 256.147 356.744 256.147 356.662V352.912C256.147 352.83 256.081 352.763 256 352.763C255.919 352.763 255.853 352.83 255.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 354.638C254.066 354.638 254 354.705 254 354.787C254 354.869 254.066 354.936 254.147 354.936H257.853C257.934 354.936 258 354.869 258 354.787C258 354.705 257.934 354.638 257.853 354.638H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 344.817V348.567C255.853 348.65 255.919 348.716 256 348.716C256.081 348.716 256.147 348.65 256.147 348.567V344.817C256.147 344.735 256.081 344.669 256 344.669C255.919 344.669 255.853 344.735 255.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 346.544C254.066 346.544 254 346.61 254 346.692C254 346.774 254.066 346.841 254.147 346.841H257.853C257.934 346.841 258 346.774 258 346.692C258 346.61 257.934 346.544 257.853 346.544H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 336.723V340.473C255.853 340.555 255.919 340.621 256 340.621C256.081 340.621 256.147 340.555 256.147 340.473V336.723C256.147 336.641 256.081 336.574 256 336.574C255.919 336.574 255.853 336.641 255.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 338.449C254.066 338.449 254 338.516 254 338.598C254 338.68 254.066 338.746 254.147 338.746H257.853C257.934 338.746 258 338.68 258 338.598C258 338.516 257.934 338.449 257.853 338.449H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 328.628V332.378C255.853 332.46 255.919 332.527 256 332.527C256.081 332.527 256.147 332.46 256.147 332.378V328.628C256.147 328.546 256.081 328.479 256 328.479C255.919 328.479 255.853 328.546 255.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 330.355C254.066 330.355 254 330.421 254 330.503C254 330.585 254.066 330.652 254.147 330.652H257.853C257.934 330.652 258 330.585 258 330.503C258 330.421 257.934 330.355 257.853 330.355H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 320.533V324.284C255.853 324.366 255.919 324.432 256 324.432C256.081 324.432 256.147 324.366 256.147 324.284V320.533C256.147 320.451 256.081 320.385 256 320.385C255.919 320.385 255.853 320.451 255.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 322.26C254.066 322.26 254 322.326 254 322.408C254 322.49 254.066 322.557 254.147 322.557H257.853C257.934 322.557 258 322.49 258 322.408C258 322.326 257.934 322.26 257.853 322.26H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 312.439V316.189C255.853 316.271 255.919 316.338 256 316.338C256.081 316.338 256.147 316.271 256.147 316.189V312.439C256.147 312.357 256.081 312.29 256 312.29C255.919 312.29 255.853 312.357 255.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 314.165C254.066 314.165 254 314.232 254 314.314C254 314.396 254.066 314.462 254.147 314.462H257.853C257.934 314.462 258 314.396 258 314.314C258 314.232 257.934 314.165 257.853 314.165H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 304.344V308.094C255.853 308.176 255.919 308.243 256 308.243C256.081 308.243 256.147 308.176 256.147 308.094V304.344C256.147 304.262 256.081 304.196 256 304.196C255.919 304.196 255.853 304.262 255.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 306.071C254.066 306.071 254 306.137 254 306.219C254 306.301 254.066 306.368 254.147 306.368H257.853C257.934 306.368 258 306.301 258 306.219C258 306.137 257.934 306.071 257.853 306.071H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 296.25V300C255.853 300.082 255.919 300.148 256 300.148C256.081 300.148 256.147 300.082 256.147 300V296.25C256.147 296.167 256.081 296.101 256 296.101C255.919 296.101 255.853 296.167 255.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 297.976C254.066 297.976 254 298.042 254 298.124C254 298.207 254.066 298.273 254.147 298.273H257.853C257.934 298.273 258 298.207 258 298.124C258 298.042 257.934 297.976 257.853 297.976H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 288.155V291.905C255.853 291.987 255.919 292.054 256 292.054C256.081 292.054 256.147 291.987 256.147 291.905V288.155C256.147 288.073 256.081 288.006 256 288.006C255.919 288.006 255.853 288.073 255.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 289.881C254.066 289.881 254 289.948 254 290.03C254 290.112 254.066 290.178 254.147 290.178H257.853C257.934 290.178 258 290.112 258 290.03C258 289.948 257.934 289.881 257.853 289.881H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 280.06V283.81C255.853 283.892 255.919 283.959 256 283.959C256.081 283.959 256.147 283.892 256.147 283.81V280.06C256.147 279.978 256.081 279.912 256 279.912C255.919 279.912 255.853 279.978 255.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 281.787C254.066 281.787 254 281.853 254 281.935C254 282.017 254.066 282.084 254.147 282.084H257.853C257.934 282.084 258 282.017 258 281.935C258 281.853 257.934 281.787 257.853 281.787H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 271.966V275.716C255.853 275.798 255.919 275.864 256 275.864C256.081 275.864 256.147 275.798 256.147 275.716V271.966C256.147 271.883 256.081 271.817 256 271.817C255.919 271.817 255.853 271.883 255.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 273.692C254.066 273.692 254 273.759 254 273.841C254 273.923 254.066 273.989 254.147 273.989H257.853C257.934 273.989 258 273.923 258 273.841C258 273.759 257.934 273.692 257.853 273.692H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 263.871V267.621C255.853 267.703 255.919 267.77 256 267.77C256.081 267.77 256.147 267.703 256.147 267.621V263.871C256.147 263.789 256.081 263.722 256 263.722C255.919 263.722 255.853 263.789 255.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 265.597C254.066 265.597 254 265.664 254 265.746C254 265.828 254.066 265.895 254.147 265.895H257.853C257.934 265.895 258 265.828 258 265.746C258 265.664 257.934 265.597 257.853 265.597H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 255.776V259.526C255.853 259.608 255.919 259.675 256 259.675C256.081 259.675 256.147 259.608 256.147 259.526V255.776C256.147 255.694 256.081 255.628 256 255.628C255.919 255.628 255.853 255.694 255.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 257.503C254.066 257.503 254 257.569 254 257.651C254 257.733 254.066 257.8 254.147 257.8H257.853C257.934 257.8 258 257.733 258 257.651C258 257.569 257.934 257.503 257.853 257.503H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 247.682V251.432C255.853 251.514 255.919 251.58 256 251.58C256.081 251.58 256.147 251.514 256.147 251.432V247.682C256.147 247.6 256.081 247.533 256 247.533C255.919 247.533 255.853 247.6 255.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 249.408C254.066 249.408 254 249.475 254 249.557C254 249.639 254.066 249.705 254.147 249.705H257.853C257.934 249.705 258 249.639 258 249.557C258 249.475 257.934 249.408 257.853 249.408H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 239.587V243.337C255.853 243.419 255.919 243.486 256 243.486C256.081 243.486 256.147 243.419 256.147 243.337V239.587C256.147 239.505 256.081 239.438 256 239.438C255.919 239.438 255.853 239.505 255.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 241.313C254.066 241.313 254 241.38 254 241.462C254 241.544 254.066 241.611 254.147 241.611H257.853C257.934 241.611 258 241.544 258 241.462C258 241.38 257.934 241.313 257.853 241.313H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 231.492V235.242C255.853 235.324 255.919 235.391 256 235.391C256.081 235.391 256.147 235.324 256.147 235.242V231.492C256.147 231.41 256.081 231.344 256 231.344C255.919 231.344 255.853 231.41 255.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 233.219C254.066 233.219 254 233.285 254 233.367C254 233.449 254.066 233.516 254.147 233.516H257.853C257.934 233.516 258 233.449 258 233.367C258 233.285 257.934 233.219 257.853 233.219H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 223.398V227.148C255.853 227.23 255.919 227.296 256 227.296C256.081 227.296 256.147 227.23 256.147 227.148V223.398C256.147 223.316 256.081 223.249 256 223.249C255.919 223.249 255.853 223.316 255.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 225.124C254.066 225.124 254 225.191 254 225.273C254 225.355 254.066 225.421 254.147 225.421H257.853C257.934 225.421 258 225.355 258 225.273C258 225.191 257.934 225.124 257.853 225.124H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 369.101V372.851C263.853 372.933 263.919 373 264 373C264.081 373 264.147 372.933 264.147 372.851V369.101C264.147 369.019 264.081 368.953 264 368.953C263.919 368.953 263.853 369.019 263.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 370.828C262.066 370.828 262 370.894 262 370.976C262 371.058 262.066 371.125 262.147 371.125H265.853C265.934 371.125 266 371.058 266 370.976C266 370.894 265.934 370.828 265.853 370.828H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 361.007V364.757C263.853 364.839 263.919 364.905 264 364.905C264.081 364.905 264.147 364.839 264.147 364.757V361.007C264.147 360.925 264.081 360.858 264 360.858C263.919 360.858 263.853 360.925 263.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 362.733C262.066 362.733 262 362.8 262 362.882C262 362.964 262.066 363.03 262.147 363.03H265.853C265.934 363.03 266 362.964 266 362.882C266 362.8 265.934 362.733 265.853 362.733H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 352.912V356.662C263.853 356.744 263.919 356.811 264 356.811C264.081 356.811 264.147 356.744 264.147 356.662V352.912C264.147 352.83 264.081 352.763 264 352.763C263.919 352.763 263.853 352.83 263.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 354.638C262.066 354.638 262 354.705 262 354.787C262 354.869 262.066 354.936 262.147 354.936H265.853C265.934 354.936 266 354.869 266 354.787C266 354.705 265.934 354.638 265.853 354.638H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 344.817V348.567C263.853 348.65 263.919 348.716 264 348.716C264.081 348.716 264.147 348.65 264.147 348.567V344.817C264.147 344.735 264.081 344.669 264 344.669C263.919 344.669 263.853 344.735 263.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 346.544C262.066 346.544 262 346.61 262 346.692C262 346.774 262.066 346.841 262.147 346.841H265.853C265.934 346.841 266 346.774 266 346.692C266 346.61 265.934 346.544 265.853 346.544H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 336.723V340.473C263.853 340.555 263.919 340.621 264 340.621C264.081 340.621 264.147 340.555 264.147 340.473V336.723C264.147 336.641 264.081 336.574 264 336.574C263.919 336.574 263.853 336.641 263.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 338.449C262.066 338.449 262 338.516 262 338.598C262 338.68 262.066 338.746 262.147 338.746H265.853C265.934 338.746 266 338.68 266 338.598C266 338.516 265.934 338.449 265.853 338.449H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 328.628V332.378C263.853 332.46 263.919 332.527 264 332.527C264.081 332.527 264.147 332.46 264.147 332.378V328.628C264.147 328.546 264.081 328.479 264 328.479C263.919 328.479 263.853 328.546 263.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 330.355C262.066 330.355 262 330.421 262 330.503C262 330.585 262.066 330.652 262.147 330.652H265.853C265.934 330.652 266 330.585 266 330.503C266 330.421 265.934 330.355 265.853 330.355H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 320.533V324.284C263.853 324.366 263.919 324.432 264 324.432C264.081 324.432 264.147 324.366 264.147 324.284V320.533C264.147 320.451 264.081 320.385 264 320.385C263.919 320.385 263.853 320.451 263.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 322.26C262.066 322.26 262 322.326 262 322.408C262 322.49 262.066 322.557 262.147 322.557H265.853C265.934 322.557 266 322.49 266 322.408C266 322.326 265.934 322.26 265.853 322.26H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 312.439V316.189C263.853 316.271 263.919 316.338 264 316.338C264.081 316.338 264.147 316.271 264.147 316.189V312.439C264.147 312.357 264.081 312.29 264 312.29C263.919 312.29 263.853 312.357 263.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 314.165C262.066 314.165 262 314.232 262 314.314C262 314.396 262.066 314.462 262.147 314.462H265.853C265.934 314.462 266 314.396 266 314.314C266 314.232 265.934 314.165 265.853 314.165H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 304.344V308.094C263.853 308.176 263.919 308.243 264 308.243C264.081 308.243 264.147 308.176 264.147 308.094V304.344C264.147 304.262 264.081 304.196 264 304.196C263.919 304.196 263.853 304.262 263.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 306.071C262.066 306.071 262 306.137 262 306.219C262 306.301 262.066 306.368 262.147 306.368H265.853C265.934 306.368 266 306.301 266 306.219C266 306.137 265.934 306.071 265.853 306.071H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 296.25V300C263.853 300.082 263.919 300.148 264 300.148C264.081 300.148 264.147 300.082 264.147 300V296.25C264.147 296.167 264.081 296.101 264 296.101C263.919 296.101 263.853 296.167 263.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 297.976C262.066 297.976 262 298.042 262 298.124C262 298.207 262.066 298.273 262.147 298.273H265.853C265.934 298.273 266 298.207 266 298.124C266 298.042 265.934 297.976 265.853 297.976H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 288.155V291.905C263.853 291.987 263.919 292.054 264 292.054C264.081 292.054 264.147 291.987 264.147 291.905V288.155C264.147 288.073 264.081 288.006 264 288.006C263.919 288.006 263.853 288.073 263.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 289.881C262.066 289.881 262 289.948 262 290.03C262 290.112 262.066 290.178 262.147 290.178H265.853C265.934 290.178 266 290.112 266 290.03C266 289.948 265.934 289.881 265.853 289.881H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 280.06V283.81C263.853 283.892 263.919 283.959 264 283.959C264.081 283.959 264.147 283.892 264.147 283.81V280.06C264.147 279.978 264.081 279.912 264 279.912C263.919 279.912 263.853 279.978 263.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 281.787C262.066 281.787 262 281.853 262 281.935C262 282.017 262.066 282.084 262.147 282.084H265.853C265.934 282.084 266 282.017 266 281.935C266 281.853 265.934 281.787 265.853 281.787H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 271.966V275.716C263.853 275.798 263.919 275.864 264 275.864C264.081 275.864 264.147 275.798 264.147 275.716V271.966C264.147 271.883 264.081 271.817 264 271.817C263.919 271.817 263.853 271.883 263.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 273.692C262.066 273.692 262 273.759 262 273.841C262 273.923 262.066 273.989 262.147 273.989H265.853C265.934 273.989 266 273.923 266 273.841C266 273.759 265.934 273.692 265.853 273.692H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 263.871V267.621C263.853 267.703 263.919 267.77 264 267.77C264.081 267.77 264.147 267.703 264.147 267.621V263.871C264.147 263.789 264.081 263.722 264 263.722C263.919 263.722 263.853 263.789 263.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 265.597C262.066 265.597 262 265.664 262 265.746C262 265.828 262.066 265.895 262.147 265.895H265.853C265.934 265.895 266 265.828 266 265.746C266 265.664 265.934 265.597 265.853 265.597H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 255.776V259.526C263.853 259.608 263.919 259.675 264 259.675C264.081 259.675 264.147 259.608 264.147 259.526V255.776C264.147 255.694 264.081 255.628 264 255.628C263.919 255.628 263.853 255.694 263.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 257.503C262.066 257.503 262 257.569 262 257.651C262 257.733 262.066 257.8 262.147 257.8H265.853C265.934 257.8 266 257.733 266 257.651C266 257.569 265.934 257.503 265.853 257.503H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 247.682V251.432C263.853 251.514 263.919 251.58 264 251.58C264.081 251.58 264.147 251.514 264.147 251.432V247.682C264.147 247.6 264.081 247.533 264 247.533C263.919 247.533 263.853 247.6 263.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 249.408C262.066 249.408 262 249.475 262 249.557C262 249.639 262.066 249.705 262.147 249.705H265.853C265.934 249.705 266 249.639 266 249.557C266 249.475 265.934 249.408 265.853 249.408H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 239.587V243.337C263.853 243.419 263.919 243.486 264 243.486C264.081 243.486 264.147 243.419 264.147 243.337V239.587C264.147 239.505 264.081 239.438 264 239.438C263.919 239.438 263.853 239.505 263.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 241.313C262.066 241.313 262 241.38 262 241.462C262 241.544 262.066 241.611 262.147 241.611H265.853C265.934 241.611 266 241.544 266 241.462C266 241.38 265.934 241.313 265.853 241.313H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 231.492V235.242C263.853 235.324 263.919 235.391 264 235.391C264.081 235.391 264.147 235.324 264.147 235.242V231.492C264.147 231.41 264.081 231.344 264 231.344C263.919 231.344 263.853 231.41 263.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 233.219C262.066 233.219 262 233.285 262 233.367C262 233.449 262.066 233.516 262.147 233.516H265.853C265.934 233.516 266 233.449 266 233.367C266 233.285 265.934 233.219 265.853 233.219H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 223.398V227.148C263.853 227.23 263.919 227.296 264 227.296C264.081 227.296 264.147 227.23 264.147 227.148V223.398C264.147 223.316 264.081 223.249 264 223.249C263.919 223.249 263.853 223.316 263.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 225.124C262.066 225.124 262 225.191 262 225.273C262 225.355 262.066 225.421 262.147 225.421H265.853C265.934 225.421 266 225.355 266 225.273C266 225.191 265.934 225.124 265.853 225.124H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 369.101V372.851C271.853 372.933 271.919 373 272 373C272.081 373 272.147 372.933 272.147 372.851V369.101C272.147 369.019 272.081 368.953 272 368.953C271.919 368.953 271.853 369.019 271.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 370.828C270.066 370.828 270 370.894 270 370.976C270 371.058 270.066 371.125 270.147 371.125H273.853C273.934 371.125 274 371.058 274 370.976C274 370.894 273.934 370.828 273.853 370.828H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 361.007V364.757C271.853 364.839 271.919 364.905 272 364.905C272.081 364.905 272.147 364.839 272.147 364.757V361.007C272.147 360.925 272.081 360.858 272 360.858C271.919 360.858 271.853 360.925 271.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 362.733C270.066 362.733 270 362.8 270 362.882C270 362.964 270.066 363.03 270.147 363.03H273.853C273.934 363.03 274 362.964 274 362.882C274 362.8 273.934 362.733 273.853 362.733H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 352.912V356.662C271.853 356.744 271.919 356.811 272 356.811C272.081 356.811 272.147 356.744 272.147 356.662V352.912C272.147 352.83 272.081 352.763 272 352.763C271.919 352.763 271.853 352.83 271.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 354.638C270.066 354.638 270 354.705 270 354.787C270 354.869 270.066 354.936 270.147 354.936H273.853C273.934 354.936 274 354.869 274 354.787C274 354.705 273.934 354.638 273.853 354.638H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 344.817V348.567C271.853 348.65 271.919 348.716 272 348.716C272.081 348.716 272.147 348.65 272.147 348.567V344.817C272.147 344.735 272.081 344.669 272 344.669C271.919 344.669 271.853 344.735 271.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 346.544C270.066 346.544 270 346.61 270 346.692C270 346.774 270.066 346.841 270.147 346.841H273.853C273.934 346.841 274 346.774 274 346.692C274 346.61 273.934 346.544 273.853 346.544H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 336.723V340.473C271.853 340.555 271.919 340.621 272 340.621C272.081 340.621 272.147 340.555 272.147 340.473V336.723C272.147 336.641 272.081 336.574 272 336.574C271.919 336.574 271.853 336.641 271.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 338.449C270.066 338.449 270 338.516 270 338.598C270 338.68 270.066 338.746 270.147 338.746H273.853C273.934 338.746 274 338.68 274 338.598C274 338.516 273.934 338.449 273.853 338.449H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 328.628V332.378C271.853 332.46 271.919 332.527 272 332.527C272.081 332.527 272.147 332.46 272.147 332.378V328.628C272.147 328.546 272.081 328.479 272 328.479C271.919 328.479 271.853 328.546 271.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 330.355C270.066 330.355 270 330.421 270 330.503C270 330.585 270.066 330.652 270.147 330.652H273.853C273.934 330.652 274 330.585 274 330.503C274 330.421 273.934 330.355 273.853 330.355H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 320.533V324.284C271.853 324.366 271.919 324.432 272 324.432C272.081 324.432 272.147 324.366 272.147 324.284V320.533C272.147 320.451 272.081 320.385 272 320.385C271.919 320.385 271.853 320.451 271.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 322.26C270.066 322.26 270 322.326 270 322.408C270 322.49 270.066 322.557 270.147 322.557H273.853C273.934 322.557 274 322.49 274 322.408C274 322.326 273.934 322.26 273.853 322.26H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 312.439V316.189C271.853 316.271 271.919 316.338 272 316.338C272.081 316.338 272.147 316.271 272.147 316.189V312.439C272.147 312.357 272.081 312.29 272 312.29C271.919 312.29 271.853 312.357 271.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 314.165C270.066 314.165 270 314.232 270 314.314C270 314.396 270.066 314.462 270.147 314.462H273.853C273.934 314.462 274 314.396 274 314.314C274 314.232 273.934 314.165 273.853 314.165H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 304.344V308.094C271.853 308.176 271.919 308.243 272 308.243C272.081 308.243 272.147 308.176 272.147 308.094V304.344C272.147 304.262 272.081 304.196 272 304.196C271.919 304.196 271.853 304.262 271.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 306.071C270.066 306.071 270 306.137 270 306.219C270 306.301 270.066 306.368 270.147 306.368H273.853C273.934 306.368 274 306.301 274 306.219C274 306.137 273.934 306.071 273.853 306.071H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 296.25V300C271.853 300.082 271.919 300.148 272 300.148C272.081 300.148 272.147 300.082 272.147 300V296.25C272.147 296.167 272.081 296.101 272 296.101C271.919 296.101 271.853 296.167 271.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 297.976C270.066 297.976 270 298.042 270 298.124C270 298.207 270.066 298.273 270.147 298.273H273.853C273.934 298.273 274 298.207 274 298.124C274 298.042 273.934 297.976 273.853 297.976H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 288.155V291.905C271.853 291.987 271.919 292.054 272 292.054C272.081 292.054 272.147 291.987 272.147 291.905V288.155C272.147 288.073 272.081 288.006 272 288.006C271.919 288.006 271.853 288.073 271.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 289.881C270.066 289.881 270 289.948 270 290.03C270 290.112 270.066 290.178 270.147 290.178H273.853C273.934 290.178 274 290.112 274 290.03C274 289.948 273.934 289.881 273.853 289.881H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 280.06V283.81C271.853 283.892 271.919 283.959 272 283.959C272.081 283.959 272.147 283.892 272.147 283.81V280.06C272.147 279.978 272.081 279.912 272 279.912C271.919 279.912 271.853 279.978 271.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 281.787C270.066 281.787 270 281.853 270 281.935C270 282.017 270.066 282.084 270.147 282.084H273.853C273.934 282.084 274 282.017 274 281.935C274 281.853 273.934 281.787 273.853 281.787H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 271.966V275.716C271.853 275.798 271.919 275.864 272 275.864C272.081 275.864 272.147 275.798 272.147 275.716V271.966C272.147 271.883 272.081 271.817 272 271.817C271.919 271.817 271.853 271.883 271.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 273.692C270.066 273.692 270 273.759 270 273.841C270 273.923 270.066 273.989 270.147 273.989H273.853C273.934 273.989 274 273.923 274 273.841C274 273.759 273.934 273.692 273.853 273.692H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 263.871V267.621C271.853 267.703 271.919 267.77 272 267.77C272.081 267.77 272.147 267.703 272.147 267.621V263.871C272.147 263.789 272.081 263.722 272 263.722C271.919 263.722 271.853 263.789 271.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 265.597C270.066 265.597 270 265.664 270 265.746C270 265.828 270.066 265.895 270.147 265.895H273.853C273.934 265.895 274 265.828 274 265.746C274 265.664 273.934 265.597 273.853 265.597H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 255.776V259.526C271.853 259.608 271.919 259.675 272 259.675C272.081 259.675 272.147 259.608 272.147 259.526V255.776C272.147 255.694 272.081 255.628 272 255.628C271.919 255.628 271.853 255.694 271.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 257.503C270.066 257.503 270 257.569 270 257.651C270 257.733 270.066 257.8 270.147 257.8H273.853C273.934 257.8 274 257.733 274 257.651C274 257.569 273.934 257.503 273.853 257.503H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 247.682V251.432C271.853 251.514 271.919 251.58 272 251.58C272.081 251.58 272.147 251.514 272.147 251.432V247.682C272.147 247.6 272.081 247.533 272 247.533C271.919 247.533 271.853 247.6 271.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 249.408C270.066 249.408 270 249.475 270 249.557C270 249.639 270.066 249.705 270.147 249.705H273.853C273.934 249.705 274 249.639 274 249.557C274 249.475 273.934 249.408 273.853 249.408H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 239.587V243.337C271.853 243.419 271.919 243.486 272 243.486C272.081 243.486 272.147 243.419 272.147 243.337V239.587C272.147 239.505 272.081 239.438 272 239.438C271.919 239.438 271.853 239.505 271.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 241.313C270.066 241.313 270 241.38 270 241.462C270 241.544 270.066 241.611 270.147 241.611H273.853C273.934 241.611 274 241.544 274 241.462C274 241.38 273.934 241.313 273.853 241.313H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 231.492V235.242C271.853 235.324 271.919 235.391 272 235.391C272.081 235.391 272.147 235.324 272.147 235.242V231.492C272.147 231.41 272.081 231.344 272 231.344C271.919 231.344 271.853 231.41 271.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 233.219C270.066 233.219 270 233.285 270 233.367C270 233.449 270.066 233.516 270.147 233.516H273.853C273.934 233.516 274 233.449 274 233.367C274 233.285 273.934 233.219 273.853 233.219H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 223.398V227.148C271.853 227.23 271.919 227.296 272 227.296C272.081 227.296 272.147 227.23 272.147 227.148V223.398C272.147 223.316 272.081 223.249 272 223.249C271.919 223.249 271.853 223.316 271.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 225.124C270.066 225.124 270 225.191 270 225.273C270 225.355 270.066 225.421 270.147 225.421H273.853C273.934 225.421 274 225.355 274 225.273C274 225.191 273.934 225.124 273.853 225.124H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 223.398V227.148C255.853 227.23 255.919 227.296 256 227.296C256.081 227.296 256.147 227.23 256.147 227.148V223.398C256.147 223.316 256.081 223.249 256 223.249C255.919 223.249 255.853 223.316 255.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 225.124C254.066 225.124 254 225.191 254 225.273C254 225.355 254.066 225.421 254.147 225.421H257.853C257.934 225.421 258 225.355 258 225.273C258 225.191 257.934 225.124 257.853 225.124H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 215.303V219.053C255.853 219.135 255.919 219.202 256 219.202C256.081 219.202 256.147 219.135 256.147 219.053V215.303C256.147 215.221 256.081 215.154 256 215.154C255.919 215.154 255.853 215.221 255.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 217.029C254.066 217.029 254 217.096 254 217.178C254 217.26 254.066 217.327 254.147 217.327H257.853C257.934 217.327 258 217.26 258 217.178C258 217.096 257.934 217.029 257.853 217.029H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 207.208V210.958C255.853 211.041 255.919 211.107 256 211.107C256.081 211.107 256.147 211.041 256.147 210.958V207.208C256.147 207.126 256.081 207.06 256 207.06C255.919 207.06 255.853 207.126 255.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 208.935C254.066 208.935 254 209.001 254 209.083C254 209.165 254.066 209.232 254.147 209.232H257.853C257.934 209.232 258 209.165 258 209.083C258 209.001 257.934 208.935 257.853 208.935H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 199.114V202.864C255.853 202.946 255.919 203.012 256 203.012C256.081 203.012 256.147 202.946 256.147 202.864V199.114C256.147 199.032 256.081 198.965 256 198.965C255.919 198.965 255.853 199.032 255.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 200.84C254.066 200.84 254 200.907 254 200.989C254 201.071 254.066 201.137 254.147 201.137H257.853C257.934 201.137 258 201.071 258 200.989C258 200.907 257.934 200.84 257.853 200.84H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 191.019V194.769C255.853 194.851 255.919 194.918 256 194.918C256.081 194.918 256.147 194.851 256.147 194.769V191.019C256.147 190.937 256.081 190.87 256 190.87C255.919 190.87 255.853 190.937 255.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 192.746C254.066 192.746 254 192.812 254 192.894C254 192.976 254.066 193.043 254.147 193.043H257.853C257.934 193.043 258 192.976 258 192.894C258 192.812 257.934 192.746 257.853 192.746H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 182.924V186.675C255.853 186.757 255.919 186.823 256 186.823C256.081 186.823 256.147 186.757 256.147 186.675V182.924C256.147 182.842 256.081 182.776 256 182.776C255.919 182.776 255.853 182.842 255.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 184.651C254.066 184.651 254 184.717 254 184.799C254 184.882 254.066 184.948 254.147 184.948H257.853C257.934 184.948 258 184.882 258 184.799C258 184.717 257.934 184.651 257.853 184.651H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 174.83V178.58C255.853 178.662 255.919 178.729 256 178.729C256.081 178.729 256.147 178.662 256.147 178.58V174.83C256.147 174.748 256.081 174.681 256 174.681C255.919 174.681 255.853 174.748 255.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 176.556C254.066 176.556 254 176.623 254 176.705C254 176.787 254.066 176.853 254.147 176.853H257.853C257.934 176.853 258 176.787 258 176.705C258 176.623 257.934 176.556 257.853 176.556H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 166.735V170.485C255.853 170.567 255.919 170.634 256 170.634C256.081 170.634 256.147 170.567 256.147 170.485V166.735C256.147 166.653 256.081 166.587 256 166.587C255.919 166.587 255.853 166.653 255.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 168.462C254.066 168.462 254 168.528 254 168.61C254 168.692 254.066 168.759 254.147 168.759H257.853C257.934 168.759 258 168.692 258 168.61C258 168.528 257.934 168.462 257.853 168.462H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 158.64V162.391C255.853 162.473 255.919 162.539 256 162.539C256.081 162.539 256.147 162.473 256.147 162.391V158.64C256.147 158.558 256.081 158.492 256 158.492C255.919 158.492 255.853 158.558 255.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 160.367C254.066 160.367 254 160.433 254 160.516C254 160.598 254.066 160.664 254.147 160.664H257.853C257.934 160.664 258 160.598 258 160.516C258 160.433 257.934 160.367 257.853 160.367H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 150.546V154.296C255.853 154.378 255.919 154.445 256 154.445C256.081 154.445 256.147 154.378 256.147 154.296V150.546C256.147 150.464 256.081 150.397 256 150.397C255.919 150.397 255.853 150.464 255.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 152.272C254.066 152.272 254 152.339 254 152.421C254 152.503 254.066 152.569 254.147 152.569H257.853C257.934 152.569 258 152.503 258 152.421C258 152.339 257.934 152.272 257.853 152.272H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 142.451V146.201C255.853 146.283 255.919 146.35 256 146.35C256.081 146.35 256.147 146.283 256.147 146.201V142.451C256.147 142.369 256.081 142.303 256 142.303C255.919 142.303 255.853 142.369 255.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 144.178C254.066 144.178 254 144.244 254 144.326C254 144.408 254.066 144.475 254.147 144.475H257.853C257.934 144.475 258 144.408 258 144.326C258 144.244 257.934 144.178 257.853 144.178H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 134.356V138.107C255.853 138.189 255.919 138.255 256 138.255C256.081 138.255 256.147 138.189 256.147 138.107V134.356C256.147 134.274 256.081 134.208 256 134.208C255.919 134.208 255.853 134.274 255.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 136.083C254.066 136.083 254 136.149 254 136.232C254 136.314 254.066 136.38 254.147 136.38H257.853C257.934 136.38 258 136.314 258 136.232C258 136.149 257.934 136.083 257.853 136.083H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 126.262V130.012C255.853 130.094 255.919 130.161 256 130.161C256.081 130.161 256.147 130.094 256.147 130.012V126.262C256.147 126.18 256.081 126.113 256 126.113C255.919 126.113 255.853 126.18 255.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 127.988C254.066 127.988 254 128.055 254 128.137C254 128.219 254.066 128.286 254.147 128.286H257.853C257.934 128.286 258 128.219 258 128.137C258 128.055 257.934 127.988 257.853 127.988H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 118.167V121.917C255.853 121.999 255.919 122.066 256 122.066C256.081 122.066 256.147 121.999 256.147 121.917V118.167C256.147 118.085 256.081 118.019 256 118.019C255.919 118.019 255.853 118.085 255.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 119.894C254.066 119.894 254 119.96 254 120.042C254 120.124 254.066 120.191 254.147 120.191H257.853C257.934 120.191 258 120.124 258 120.042C258 119.96 257.934 119.894 257.853 119.894H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 110.073V113.823C255.853 113.905 255.919 113.971 256 113.971C256.081 113.971 256.147 113.905 256.147 113.823V110.073C256.147 109.99 256.081 109.924 256 109.924C255.919 109.924 255.853 109.99 255.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 111.799C254.066 111.799 254 111.866 254 111.948C254 112.03 254.066 112.096 254.147 112.096H257.853C257.934 112.096 258 112.03 258 111.948C258 111.866 257.934 111.799 257.853 111.799H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 101.978V105.728C255.853 105.81 255.919 105.877 256 105.877C256.081 105.877 256.147 105.81 256.147 105.728V101.978C256.147 101.896 256.081 101.829 256 101.829C255.919 101.829 255.853 101.896 255.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 103.705C254.066 103.705 254 103.771 254 103.853C254 103.935 254.066 104.002 254.147 104.002H257.853C257.934 104.002 258 103.935 258 103.853C258 103.771 257.934 103.705 257.853 103.705H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 93.8831V97.6333C255.853 97.7154 255.919 97.7819 256 97.7819C256.081 97.7819 256.147 97.7154 256.147 97.6333V93.8831C256.147 93.8011 256.081 93.7346 256 93.7346C255.919 93.7346 255.853 93.8011 255.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 95.6098C254.066 95.6098 254 95.6763 254 95.7583C254 95.8404 254.066 95.9069 254.147 95.9069H257.853C257.934 95.9069 258 95.8404 258 95.7583C258 95.6763 257.934 95.6098 257.853 95.6098H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 85.7885V89.5387C255.853 89.6208 255.919 89.6873 256 89.6873C256.081 89.6873 256.147 89.6208 256.147 89.5387V85.7885C256.147 85.7065 256.081 85.64 256 85.64C255.919 85.64 255.853 85.7065 255.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 87.5152C254.066 87.5152 254 87.5817 254 87.6638C254 87.7458 254.066 87.8123 254.147 87.8123H257.853C257.934 87.8123 258 87.7458 258 87.6638C258 87.5817 257.934 87.5152 257.853 87.5152H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M255.853 77.694V81.4442C255.853 81.5263 255.919 81.5928 256 81.5928C256.081 81.5928 256.147 81.5263 256.147 81.4442V77.694C256.147 77.6119 256.081 77.5454 256 77.5454C255.919 77.5454 255.853 77.6119 255.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M254.147 79.4206C254.066 79.4206 254 79.4871 254 79.5692C254 79.6512 254.066 79.7178 254.147 79.7178H257.853C257.934 79.7178 258 79.6512 258 79.5692C258 79.4871 257.934 79.4206 257.853 79.4206H254.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 223.398V227.148C263.853 227.23 263.919 227.296 264 227.296C264.081 227.296 264.147 227.23 264.147 227.148V223.398C264.147 223.316 264.081 223.249 264 223.249C263.919 223.249 263.853 223.316 263.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 225.124C262.066 225.124 262 225.191 262 225.273C262 225.355 262.066 225.421 262.147 225.421H265.853C265.934 225.421 266 225.355 266 225.273C266 225.191 265.934 225.124 265.853 225.124H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 215.303V219.053C263.853 219.135 263.919 219.202 264 219.202C264.081 219.202 264.147 219.135 264.147 219.053V215.303C264.147 215.221 264.081 215.154 264 215.154C263.919 215.154 263.853 215.221 263.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 217.029C262.066 217.029 262 217.096 262 217.178C262 217.26 262.066 217.327 262.147 217.327H265.853C265.934 217.327 266 217.26 266 217.178C266 217.096 265.934 217.029 265.853 217.029H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 207.208V210.958C263.853 211.041 263.919 211.107 264 211.107C264.081 211.107 264.147 211.041 264.147 210.958V207.208C264.147 207.126 264.081 207.06 264 207.06C263.919 207.06 263.853 207.126 263.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 208.935C262.066 208.935 262 209.001 262 209.083C262 209.165 262.066 209.232 262.147 209.232H265.853C265.934 209.232 266 209.165 266 209.083C266 209.001 265.934 208.935 265.853 208.935H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 199.114V202.864C263.853 202.946 263.919 203.012 264 203.012C264.081 203.012 264.147 202.946 264.147 202.864V199.114C264.147 199.032 264.081 198.965 264 198.965C263.919 198.965 263.853 199.032 263.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 200.84C262.066 200.84 262 200.907 262 200.989C262 201.071 262.066 201.137 262.147 201.137H265.853C265.934 201.137 266 201.071 266 200.989C266 200.907 265.934 200.84 265.853 200.84H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 191.019V194.769C263.853 194.851 263.919 194.918 264 194.918C264.081 194.918 264.147 194.851 264.147 194.769V191.019C264.147 190.937 264.081 190.87 264 190.87C263.919 190.87 263.853 190.937 263.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 192.746C262.066 192.746 262 192.812 262 192.894C262 192.976 262.066 193.043 262.147 193.043H265.853C265.934 193.043 266 192.976 266 192.894C266 192.812 265.934 192.746 265.853 192.746H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 182.924V186.675C263.853 186.757 263.919 186.823 264 186.823C264.081 186.823 264.147 186.757 264.147 186.675V182.924C264.147 182.842 264.081 182.776 264 182.776C263.919 182.776 263.853 182.842 263.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 184.651C262.066 184.651 262 184.717 262 184.799C262 184.882 262.066 184.948 262.147 184.948H265.853C265.934 184.948 266 184.882 266 184.799C266 184.717 265.934 184.651 265.853 184.651H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 174.83V178.58C263.853 178.662 263.919 178.729 264 178.729C264.081 178.729 264.147 178.662 264.147 178.58V174.83C264.147 174.748 264.081 174.681 264 174.681C263.919 174.681 263.853 174.748 263.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 176.556C262.066 176.556 262 176.623 262 176.705C262 176.787 262.066 176.853 262.147 176.853H265.853C265.934 176.853 266 176.787 266 176.705C266 176.623 265.934 176.556 265.853 176.556H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 166.735V170.485C263.853 170.567 263.919 170.634 264 170.634C264.081 170.634 264.147 170.567 264.147 170.485V166.735C264.147 166.653 264.081 166.587 264 166.587C263.919 166.587 263.853 166.653 263.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 168.462C262.066 168.462 262 168.528 262 168.61C262 168.692 262.066 168.759 262.147 168.759H265.853C265.934 168.759 266 168.692 266 168.61C266 168.528 265.934 168.462 265.853 168.462H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 158.64V162.391C263.853 162.473 263.919 162.539 264 162.539C264.081 162.539 264.147 162.473 264.147 162.391V158.64C264.147 158.558 264.081 158.492 264 158.492C263.919 158.492 263.853 158.558 263.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 160.367C262.066 160.367 262 160.433 262 160.516C262 160.598 262.066 160.664 262.147 160.664H265.853C265.934 160.664 266 160.598 266 160.516C266 160.433 265.934 160.367 265.853 160.367H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 150.546V154.296C263.853 154.378 263.919 154.445 264 154.445C264.081 154.445 264.147 154.378 264.147 154.296V150.546C264.147 150.464 264.081 150.397 264 150.397C263.919 150.397 263.853 150.464 263.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 152.272C262.066 152.272 262 152.339 262 152.421C262 152.503 262.066 152.569 262.147 152.569H265.853C265.934 152.569 266 152.503 266 152.421C266 152.339 265.934 152.272 265.853 152.272H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 142.451V146.201C263.853 146.283 263.919 146.35 264 146.35C264.081 146.35 264.147 146.283 264.147 146.201V142.451C264.147 142.369 264.081 142.303 264 142.303C263.919 142.303 263.853 142.369 263.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 144.178C262.066 144.178 262 144.244 262 144.326C262 144.408 262.066 144.475 262.147 144.475H265.853C265.934 144.475 266 144.408 266 144.326C266 144.244 265.934 144.178 265.853 144.178H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 134.356V138.107C263.853 138.189 263.919 138.255 264 138.255C264.081 138.255 264.147 138.189 264.147 138.107V134.356C264.147 134.274 264.081 134.208 264 134.208C263.919 134.208 263.853 134.274 263.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 136.083C262.066 136.083 262 136.149 262 136.232C262 136.314 262.066 136.38 262.147 136.38H265.853C265.934 136.38 266 136.314 266 136.232C266 136.149 265.934 136.083 265.853 136.083H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 126.262V130.012C263.853 130.094 263.919 130.161 264 130.161C264.081 130.161 264.147 130.094 264.147 130.012V126.262C264.147 126.18 264.081 126.113 264 126.113C263.919 126.113 263.853 126.18 263.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 127.988C262.066 127.988 262 128.055 262 128.137C262 128.219 262.066 128.286 262.147 128.286H265.853C265.934 128.286 266 128.219 266 128.137C266 128.055 265.934 127.988 265.853 127.988H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 118.167V121.917C263.853 121.999 263.919 122.066 264 122.066C264.081 122.066 264.147 121.999 264.147 121.917V118.167C264.147 118.085 264.081 118.019 264 118.019C263.919 118.019 263.853 118.085 263.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 119.894C262.066 119.894 262 119.96 262 120.042C262 120.124 262.066 120.191 262.147 120.191H265.853C265.934 120.191 266 120.124 266 120.042C266 119.96 265.934 119.894 265.853 119.894H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 110.073V113.823C263.853 113.905 263.919 113.971 264 113.971C264.081 113.971 264.147 113.905 264.147 113.823V110.073C264.147 109.99 264.081 109.924 264 109.924C263.919 109.924 263.853 109.99 263.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 111.799C262.066 111.799 262 111.866 262 111.948C262 112.03 262.066 112.096 262.147 112.096H265.853C265.934 112.096 266 112.03 266 111.948C266 111.866 265.934 111.799 265.853 111.799H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 101.978V105.728C263.853 105.81 263.919 105.877 264 105.877C264.081 105.877 264.147 105.81 264.147 105.728V101.978C264.147 101.896 264.081 101.829 264 101.829C263.919 101.829 263.853 101.896 263.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 103.705C262.066 103.705 262 103.771 262 103.853C262 103.935 262.066 104.002 262.147 104.002H265.853C265.934 104.002 266 103.935 266 103.853C266 103.771 265.934 103.705 265.853 103.705H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 93.8831V97.6333C263.853 97.7154 263.919 97.7819 264 97.7819C264.081 97.7819 264.147 97.7154 264.147 97.6333V93.8831C264.147 93.8011 264.081 93.7346 264 93.7346C263.919 93.7346 263.853 93.8011 263.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 95.6098C262.066 95.6098 262 95.6763 262 95.7583C262 95.8404 262.066 95.9069 262.147 95.9069H265.853C265.934 95.9069 266 95.8404 266 95.7583C266 95.6763 265.934 95.6098 265.853 95.6098H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 85.7885V89.5387C263.853 89.6208 263.919 89.6873 264 89.6873C264.081 89.6873 264.147 89.6208 264.147 89.5387V85.7885C264.147 85.7065 264.081 85.64 264 85.64C263.919 85.64 263.853 85.7065 263.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 87.5152C262.066 87.5152 262 87.5817 262 87.6638C262 87.7458 262.066 87.8123 262.147 87.8123H265.853C265.934 87.8123 266 87.7458 266 87.6638C266 87.5817 265.934 87.5152 265.853 87.5152H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M263.853 77.694V81.4442C263.853 81.5263 263.919 81.5928 264 81.5928C264.081 81.5928 264.147 81.5263 264.147 81.4442V77.694C264.147 77.6119 264.081 77.5454 264 77.5454C263.919 77.5454 263.853 77.6119 263.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M262.147 79.4206C262.066 79.4206 262 79.4871 262 79.5692C262 79.6512 262.066 79.7178 262.147 79.7178H265.853C265.934 79.7178 266 79.6512 266 79.5692C266 79.4871 265.934 79.4206 265.853 79.4206H262.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 223.398V227.148C271.853 227.23 271.919 227.296 272 227.296C272.081 227.296 272.147 227.23 272.147 227.148V223.398C272.147 223.316 272.081 223.249 272 223.249C271.919 223.249 271.853 223.316 271.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 225.124C270.066 225.124 270 225.191 270 225.273C270 225.355 270.066 225.421 270.147 225.421H273.853C273.934 225.421 274 225.355 274 225.273C274 225.191 273.934 225.124 273.853 225.124H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 215.303V219.053C271.853 219.135 271.919 219.202 272 219.202C272.081 219.202 272.147 219.135 272.147 219.053V215.303C272.147 215.221 272.081 215.154 272 215.154C271.919 215.154 271.853 215.221 271.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 217.029C270.066 217.029 270 217.096 270 217.178C270 217.26 270.066 217.327 270.147 217.327H273.853C273.934 217.327 274 217.26 274 217.178C274 217.096 273.934 217.029 273.853 217.029H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 207.208V210.958C271.853 211.041 271.919 211.107 272 211.107C272.081 211.107 272.147 211.041 272.147 210.958V207.208C272.147 207.126 272.081 207.06 272 207.06C271.919 207.06 271.853 207.126 271.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 208.935C270.066 208.935 270 209.001 270 209.083C270 209.165 270.066 209.232 270.147 209.232H273.853C273.934 209.232 274 209.165 274 209.083C274 209.001 273.934 208.935 273.853 208.935H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 199.114V202.864C271.853 202.946 271.919 203.012 272 203.012C272.081 203.012 272.147 202.946 272.147 202.864V199.114C272.147 199.032 272.081 198.965 272 198.965C271.919 198.965 271.853 199.032 271.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 200.84C270.066 200.84 270 200.907 270 200.989C270 201.071 270.066 201.137 270.147 201.137H273.853C273.934 201.137 274 201.071 274 200.989C274 200.907 273.934 200.84 273.853 200.84H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 191.019V194.769C271.853 194.851 271.919 194.918 272 194.918C272.081 194.918 272.147 194.851 272.147 194.769V191.019C272.147 190.937 272.081 190.87 272 190.87C271.919 190.87 271.853 190.937 271.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 192.746C270.066 192.746 270 192.812 270 192.894C270 192.976 270.066 193.043 270.147 193.043H273.853C273.934 193.043 274 192.976 274 192.894C274 192.812 273.934 192.746 273.853 192.746H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 182.924V186.675C271.853 186.757 271.919 186.823 272 186.823C272.081 186.823 272.147 186.757 272.147 186.675V182.924C272.147 182.842 272.081 182.776 272 182.776C271.919 182.776 271.853 182.842 271.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 184.651C270.066 184.651 270 184.717 270 184.799C270 184.882 270.066 184.948 270.147 184.948H273.853C273.934 184.948 274 184.882 274 184.799C274 184.717 273.934 184.651 273.853 184.651H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 174.83V178.58C271.853 178.662 271.919 178.729 272 178.729C272.081 178.729 272.147 178.662 272.147 178.58V174.83C272.147 174.748 272.081 174.681 272 174.681C271.919 174.681 271.853 174.748 271.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 176.556C270.066 176.556 270 176.623 270 176.705C270 176.787 270.066 176.853 270.147 176.853H273.853C273.934 176.853 274 176.787 274 176.705C274 176.623 273.934 176.556 273.853 176.556H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 166.735V170.485C271.853 170.567 271.919 170.634 272 170.634C272.081 170.634 272.147 170.567 272.147 170.485V166.735C272.147 166.653 272.081 166.587 272 166.587C271.919 166.587 271.853 166.653 271.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 168.462C270.066 168.462 270 168.528 270 168.61C270 168.692 270.066 168.759 270.147 168.759H273.853C273.934 168.759 274 168.692 274 168.61C274 168.528 273.934 168.462 273.853 168.462H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 158.64V162.391C271.853 162.473 271.919 162.539 272 162.539C272.081 162.539 272.147 162.473 272.147 162.391V158.64C272.147 158.558 272.081 158.492 272 158.492C271.919 158.492 271.853 158.558 271.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 160.367C270.066 160.367 270 160.433 270 160.516C270 160.598 270.066 160.664 270.147 160.664H273.853C273.934 160.664 274 160.598 274 160.516C274 160.433 273.934 160.367 273.853 160.367H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 150.546V154.296C271.853 154.378 271.919 154.445 272 154.445C272.081 154.445 272.147 154.378 272.147 154.296V150.546C272.147 150.464 272.081 150.397 272 150.397C271.919 150.397 271.853 150.464 271.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 152.272C270.066 152.272 270 152.339 270 152.421C270 152.503 270.066 152.569 270.147 152.569H273.853C273.934 152.569 274 152.503 274 152.421C274 152.339 273.934 152.272 273.853 152.272H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 142.451V146.201C271.853 146.283 271.919 146.35 272 146.35C272.081 146.35 272.147 146.283 272.147 146.201V142.451C272.147 142.369 272.081 142.303 272 142.303C271.919 142.303 271.853 142.369 271.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 144.178C270.066 144.178 270 144.244 270 144.326C270 144.408 270.066 144.475 270.147 144.475H273.853C273.934 144.475 274 144.408 274 144.326C274 144.244 273.934 144.178 273.853 144.178H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 134.356V138.107C271.853 138.189 271.919 138.255 272 138.255C272.081 138.255 272.147 138.189 272.147 138.107V134.356C272.147 134.274 272.081 134.208 272 134.208C271.919 134.208 271.853 134.274 271.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 136.083C270.066 136.083 270 136.149 270 136.232C270 136.314 270.066 136.38 270.147 136.38H273.853C273.934 136.38 274 136.314 274 136.232C274 136.149 273.934 136.083 273.853 136.083H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 126.262V130.012C271.853 130.094 271.919 130.161 272 130.161C272.081 130.161 272.147 130.094 272.147 130.012V126.262C272.147 126.18 272.081 126.113 272 126.113C271.919 126.113 271.853 126.18 271.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 127.988C270.066 127.988 270 128.055 270 128.137C270 128.219 270.066 128.286 270.147 128.286H273.853C273.934 128.286 274 128.219 274 128.137C274 128.055 273.934 127.988 273.853 127.988H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 118.167V121.917C271.853 121.999 271.919 122.066 272 122.066C272.081 122.066 272.147 121.999 272.147 121.917V118.167C272.147 118.085 272.081 118.019 272 118.019C271.919 118.019 271.853 118.085 271.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 119.894C270.066 119.894 270 119.96 270 120.042C270 120.124 270.066 120.191 270.147 120.191H273.853C273.934 120.191 274 120.124 274 120.042C274 119.96 273.934 119.894 273.853 119.894H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 110.073V113.823C271.853 113.905 271.919 113.971 272 113.971C272.081 113.971 272.147 113.905 272.147 113.823V110.073C272.147 109.99 272.081 109.924 272 109.924C271.919 109.924 271.853 109.99 271.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 111.799C270.066 111.799 270 111.866 270 111.948C270 112.03 270.066 112.096 270.147 112.096H273.853C273.934 112.096 274 112.03 274 111.948C274 111.866 273.934 111.799 273.853 111.799H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 101.978V105.728C271.853 105.81 271.919 105.877 272 105.877C272.081 105.877 272.147 105.81 272.147 105.728V101.978C272.147 101.896 272.081 101.829 272 101.829C271.919 101.829 271.853 101.896 271.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 103.705C270.066 103.705 270 103.771 270 103.853C270 103.935 270.066 104.002 270.147 104.002H273.853C273.934 104.002 274 103.935 274 103.853C274 103.771 273.934 103.705 273.853 103.705H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 93.8831V97.6333C271.853 97.7154 271.919 97.7819 272 97.7819C272.081 97.7819 272.147 97.7154 272.147 97.6333V93.8831C272.147 93.8011 272.081 93.7346 272 93.7346C271.919 93.7346 271.853 93.8011 271.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 95.6098C270.066 95.6098 270 95.6763 270 95.7583C270 95.8404 270.066 95.9069 270.147 95.9069H273.853C273.934 95.9069 274 95.8404 274 95.7583C274 95.6763 273.934 95.6098 273.853 95.6098H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 85.7885V89.5387C271.853 89.6208 271.919 89.6873 272 89.6873C272.081 89.6873 272.147 89.6208 272.147 89.5387V85.7885C272.147 85.7065 272.081 85.64 272 85.64C271.919 85.64 271.853 85.7065 271.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 87.5152C270.066 87.5152 270 87.5817 270 87.6638C270 87.7458 270.066 87.8123 270.147 87.8123H273.853C273.934 87.8123 274 87.7458 274 87.6638C274 87.5817 273.934 87.5152 273.853 87.5152H270.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M271.853 77.694V81.4442C271.853 81.5263 271.919 81.5928 272 81.5928C272.081 81.5928 272.147 81.5263 272.147 81.4442V77.694C272.147 77.6119 272.081 77.5454 272 77.5454C271.919 77.5454 271.853 77.6119 271.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M270.147 79.4206C270.066 79.4206 270 79.4871 270 79.5692C270 79.6512 270.066 79.7178 270.147 79.7178H273.853C273.934 79.7178 274 79.6512 274 79.5692C274 79.4871 273.934 79.4206 273.853 79.4206H270.147Z"
          fill={colorConfig.grill}
        />
      </g>
      <path
        d="M251 84V83H250V84H251ZM276 84H277V83H276V84ZM276 374V375H277V374H276ZM251 374H250V375H251V374ZM251 84V85H276V84V83H251V84ZM276 84H275V374H276H277V84H276ZM276 374V373H251V374V375H276V374ZM251 374H252V84H251H250V374H251Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-93-inside-19_709_17)"
      />
      <g clipPath="url(#clip3_709_17)">
        <mask id="path-96-inside-20_709_17" fill="white">
          <path d="M276 84H301V374H276V84Z" />
        </mask>
        <path d="M276 84H301V374H276V84Z" fill={colorConfig.block_fill} />
        <path
          d="M280.853 369.101V372.851C280.853 372.933 280.919 373 281 373C281.081 373 281.147 372.933 281.147 372.851V369.101C281.147 369.019 281.081 368.953 281 368.953C280.919 368.953 280.853 369.019 280.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 370.828C279.066 370.828 279 370.894 279 370.976C279 371.058 279.066 371.125 279.147 371.125H282.853C282.934 371.125 283 371.058 283 370.976C283 370.894 282.934 370.828 282.853 370.828H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 361.007V364.757C280.853 364.839 280.919 364.905 281 364.905C281.081 364.905 281.147 364.839 281.147 364.757V361.007C281.147 360.925 281.081 360.858 281 360.858C280.919 360.858 280.853 360.925 280.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 362.733C279.066 362.733 279 362.8 279 362.882C279 362.964 279.066 363.03 279.147 363.03H282.853C282.934 363.03 283 362.964 283 362.882C283 362.8 282.934 362.733 282.853 362.733H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 352.912V356.662C280.853 356.744 280.919 356.811 281 356.811C281.081 356.811 281.147 356.744 281.147 356.662V352.912C281.147 352.83 281.081 352.763 281 352.763C280.919 352.763 280.853 352.83 280.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 354.638C279.066 354.638 279 354.705 279 354.787C279 354.869 279.066 354.936 279.147 354.936H282.853C282.934 354.936 283 354.869 283 354.787C283 354.705 282.934 354.638 282.853 354.638H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 344.817V348.567C280.853 348.65 280.919 348.716 281 348.716C281.081 348.716 281.147 348.65 281.147 348.567V344.817C281.147 344.735 281.081 344.669 281 344.669C280.919 344.669 280.853 344.735 280.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 346.544C279.066 346.544 279 346.61 279 346.692C279 346.774 279.066 346.841 279.147 346.841H282.853C282.934 346.841 283 346.774 283 346.692C283 346.61 282.934 346.544 282.853 346.544H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 336.723V340.473C280.853 340.555 280.919 340.621 281 340.621C281.081 340.621 281.147 340.555 281.147 340.473V336.723C281.147 336.641 281.081 336.574 281 336.574C280.919 336.574 280.853 336.641 280.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 338.449C279.066 338.449 279 338.516 279 338.598C279 338.68 279.066 338.746 279.147 338.746H282.853C282.934 338.746 283 338.68 283 338.598C283 338.516 282.934 338.449 282.853 338.449H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 328.628V332.378C280.853 332.46 280.919 332.527 281 332.527C281.081 332.527 281.147 332.46 281.147 332.378V328.628C281.147 328.546 281.081 328.479 281 328.479C280.919 328.479 280.853 328.546 280.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 330.355C279.066 330.355 279 330.421 279 330.503C279 330.585 279.066 330.652 279.147 330.652H282.853C282.934 330.652 283 330.585 283 330.503C283 330.421 282.934 330.355 282.853 330.355H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 320.533V324.284C280.853 324.366 280.919 324.432 281 324.432C281.081 324.432 281.147 324.366 281.147 324.284V320.533C281.147 320.451 281.081 320.385 281 320.385C280.919 320.385 280.853 320.451 280.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 322.26C279.066 322.26 279 322.326 279 322.408C279 322.49 279.066 322.557 279.147 322.557H282.853C282.934 322.557 283 322.49 283 322.408C283 322.326 282.934 322.26 282.853 322.26H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 312.439V316.189C280.853 316.271 280.919 316.338 281 316.338C281.081 316.338 281.147 316.271 281.147 316.189V312.439C281.147 312.357 281.081 312.29 281 312.29C280.919 312.29 280.853 312.357 280.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 314.165C279.066 314.165 279 314.232 279 314.314C279 314.396 279.066 314.462 279.147 314.462H282.853C282.934 314.462 283 314.396 283 314.314C283 314.232 282.934 314.165 282.853 314.165H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 304.344V308.094C280.853 308.176 280.919 308.243 281 308.243C281.081 308.243 281.147 308.176 281.147 308.094V304.344C281.147 304.262 281.081 304.196 281 304.196C280.919 304.196 280.853 304.262 280.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 306.071C279.066 306.071 279 306.137 279 306.219C279 306.301 279.066 306.368 279.147 306.368H282.853C282.934 306.368 283 306.301 283 306.219C283 306.137 282.934 306.071 282.853 306.071H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 296.25V300C280.853 300.082 280.919 300.148 281 300.148C281.081 300.148 281.147 300.082 281.147 300V296.25C281.147 296.167 281.081 296.101 281 296.101C280.919 296.101 280.853 296.167 280.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 297.976C279.066 297.976 279 298.042 279 298.124C279 298.207 279.066 298.273 279.147 298.273H282.853C282.934 298.273 283 298.207 283 298.124C283 298.042 282.934 297.976 282.853 297.976H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 288.155V291.905C280.853 291.987 280.919 292.054 281 292.054C281.081 292.054 281.147 291.987 281.147 291.905V288.155C281.147 288.073 281.081 288.006 281 288.006C280.919 288.006 280.853 288.073 280.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 289.881C279.066 289.881 279 289.948 279 290.03C279 290.112 279.066 290.178 279.147 290.178H282.853C282.934 290.178 283 290.112 283 290.03C283 289.948 282.934 289.881 282.853 289.881H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 280.06V283.81C280.853 283.892 280.919 283.959 281 283.959C281.081 283.959 281.147 283.892 281.147 283.81V280.06C281.147 279.978 281.081 279.912 281 279.912C280.919 279.912 280.853 279.978 280.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 281.787C279.066 281.787 279 281.853 279 281.935C279 282.017 279.066 282.084 279.147 282.084H282.853C282.934 282.084 283 282.017 283 281.935C283 281.853 282.934 281.787 282.853 281.787H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 271.966V275.716C280.853 275.798 280.919 275.864 281 275.864C281.081 275.864 281.147 275.798 281.147 275.716V271.966C281.147 271.883 281.081 271.817 281 271.817C280.919 271.817 280.853 271.883 280.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 273.692C279.066 273.692 279 273.759 279 273.841C279 273.923 279.066 273.989 279.147 273.989H282.853C282.934 273.989 283 273.923 283 273.841C283 273.759 282.934 273.692 282.853 273.692H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 263.871V267.621C280.853 267.703 280.919 267.77 281 267.77C281.081 267.77 281.147 267.703 281.147 267.621V263.871C281.147 263.789 281.081 263.722 281 263.722C280.919 263.722 280.853 263.789 280.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 265.597C279.066 265.597 279 265.664 279 265.746C279 265.828 279.066 265.895 279.147 265.895H282.853C282.934 265.895 283 265.828 283 265.746C283 265.664 282.934 265.597 282.853 265.597H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 255.776V259.526C280.853 259.608 280.919 259.675 281 259.675C281.081 259.675 281.147 259.608 281.147 259.526V255.776C281.147 255.694 281.081 255.628 281 255.628C280.919 255.628 280.853 255.694 280.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 257.503C279.066 257.503 279 257.569 279 257.651C279 257.733 279.066 257.8 279.147 257.8H282.853C282.934 257.8 283 257.733 283 257.651C283 257.569 282.934 257.503 282.853 257.503H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 247.682V251.432C280.853 251.514 280.919 251.58 281 251.58C281.081 251.58 281.147 251.514 281.147 251.432V247.682C281.147 247.6 281.081 247.533 281 247.533C280.919 247.533 280.853 247.6 280.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 249.408C279.066 249.408 279 249.475 279 249.557C279 249.639 279.066 249.705 279.147 249.705H282.853C282.934 249.705 283 249.639 283 249.557C283 249.475 282.934 249.408 282.853 249.408H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 239.587V243.337C280.853 243.419 280.919 243.486 281 243.486C281.081 243.486 281.147 243.419 281.147 243.337V239.587C281.147 239.505 281.081 239.438 281 239.438C280.919 239.438 280.853 239.505 280.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 241.313C279.066 241.313 279 241.38 279 241.462C279 241.544 279.066 241.611 279.147 241.611H282.853C282.934 241.611 283 241.544 283 241.462C283 241.38 282.934 241.313 282.853 241.313H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 231.492V235.242C280.853 235.324 280.919 235.391 281 235.391C281.081 235.391 281.147 235.324 281.147 235.242V231.492C281.147 231.41 281.081 231.344 281 231.344C280.919 231.344 280.853 231.41 280.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 233.219C279.066 233.219 279 233.285 279 233.367C279 233.449 279.066 233.516 279.147 233.516H282.853C282.934 233.516 283 233.449 283 233.367C283 233.285 282.934 233.219 282.853 233.219H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 223.398V227.148C280.853 227.23 280.919 227.296 281 227.296C281.081 227.296 281.147 227.23 281.147 227.148V223.398C281.147 223.316 281.081 223.249 281 223.249C280.919 223.249 280.853 223.316 280.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 225.124C279.066 225.124 279 225.191 279 225.273C279 225.355 279.066 225.421 279.147 225.421H282.853C282.934 225.421 283 225.355 283 225.273C283 225.191 282.934 225.124 282.853 225.124H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 369.101V372.851C288.853 372.933 288.919 373 289 373C289.081 373 289.147 372.933 289.147 372.851V369.101C289.147 369.019 289.081 368.953 289 368.953C288.919 368.953 288.853 369.019 288.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 370.828C287.066 370.828 287 370.894 287 370.976C287 371.058 287.066 371.125 287.147 371.125H290.853C290.934 371.125 291 371.058 291 370.976C291 370.894 290.934 370.828 290.853 370.828H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 361.007V364.757C288.853 364.839 288.919 364.905 289 364.905C289.081 364.905 289.147 364.839 289.147 364.757V361.007C289.147 360.925 289.081 360.858 289 360.858C288.919 360.858 288.853 360.925 288.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 362.733C287.066 362.733 287 362.8 287 362.882C287 362.964 287.066 363.03 287.147 363.03H290.853C290.934 363.03 291 362.964 291 362.882C291 362.8 290.934 362.733 290.853 362.733H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 352.912V356.662C288.853 356.744 288.919 356.811 289 356.811C289.081 356.811 289.147 356.744 289.147 356.662V352.912C289.147 352.83 289.081 352.763 289 352.763C288.919 352.763 288.853 352.83 288.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 354.638C287.066 354.638 287 354.705 287 354.787C287 354.869 287.066 354.936 287.147 354.936H290.853C290.934 354.936 291 354.869 291 354.787C291 354.705 290.934 354.638 290.853 354.638H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 344.817V348.567C288.853 348.65 288.919 348.716 289 348.716C289.081 348.716 289.147 348.65 289.147 348.567V344.817C289.147 344.735 289.081 344.669 289 344.669C288.919 344.669 288.853 344.735 288.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 346.544C287.066 346.544 287 346.61 287 346.692C287 346.774 287.066 346.841 287.147 346.841H290.853C290.934 346.841 291 346.774 291 346.692C291 346.61 290.934 346.544 290.853 346.544H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 336.723V340.473C288.853 340.555 288.919 340.621 289 340.621C289.081 340.621 289.147 340.555 289.147 340.473V336.723C289.147 336.641 289.081 336.574 289 336.574C288.919 336.574 288.853 336.641 288.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 338.449C287.066 338.449 287 338.516 287 338.598C287 338.68 287.066 338.746 287.147 338.746H290.853C290.934 338.746 291 338.68 291 338.598C291 338.516 290.934 338.449 290.853 338.449H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 328.628V332.378C288.853 332.46 288.919 332.527 289 332.527C289.081 332.527 289.147 332.46 289.147 332.378V328.628C289.147 328.546 289.081 328.479 289 328.479C288.919 328.479 288.853 328.546 288.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 330.355C287.066 330.355 287 330.421 287 330.503C287 330.585 287.066 330.652 287.147 330.652H290.853C290.934 330.652 291 330.585 291 330.503C291 330.421 290.934 330.355 290.853 330.355H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 320.533V324.284C288.853 324.366 288.919 324.432 289 324.432C289.081 324.432 289.147 324.366 289.147 324.284V320.533C289.147 320.451 289.081 320.385 289 320.385C288.919 320.385 288.853 320.451 288.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 322.26C287.066 322.26 287 322.326 287 322.408C287 322.49 287.066 322.557 287.147 322.557H290.853C290.934 322.557 291 322.49 291 322.408C291 322.326 290.934 322.26 290.853 322.26H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 312.439V316.189C288.853 316.271 288.919 316.338 289 316.338C289.081 316.338 289.147 316.271 289.147 316.189V312.439C289.147 312.357 289.081 312.29 289 312.29C288.919 312.29 288.853 312.357 288.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 314.165C287.066 314.165 287 314.232 287 314.314C287 314.396 287.066 314.462 287.147 314.462H290.853C290.934 314.462 291 314.396 291 314.314C291 314.232 290.934 314.165 290.853 314.165H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 304.344V308.094C288.853 308.176 288.919 308.243 289 308.243C289.081 308.243 289.147 308.176 289.147 308.094V304.344C289.147 304.262 289.081 304.196 289 304.196C288.919 304.196 288.853 304.262 288.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 306.071C287.066 306.071 287 306.137 287 306.219C287 306.301 287.066 306.368 287.147 306.368H290.853C290.934 306.368 291 306.301 291 306.219C291 306.137 290.934 306.071 290.853 306.071H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 296.25V300C288.853 300.082 288.919 300.148 289 300.148C289.081 300.148 289.147 300.082 289.147 300V296.25C289.147 296.167 289.081 296.101 289 296.101C288.919 296.101 288.853 296.167 288.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 297.976C287.066 297.976 287 298.042 287 298.124C287 298.207 287.066 298.273 287.147 298.273H290.853C290.934 298.273 291 298.207 291 298.124C291 298.042 290.934 297.976 290.853 297.976H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 288.155V291.905C288.853 291.987 288.919 292.054 289 292.054C289.081 292.054 289.147 291.987 289.147 291.905V288.155C289.147 288.073 289.081 288.006 289 288.006C288.919 288.006 288.853 288.073 288.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 289.881C287.066 289.881 287 289.948 287 290.03C287 290.112 287.066 290.178 287.147 290.178H290.853C290.934 290.178 291 290.112 291 290.03C291 289.948 290.934 289.881 290.853 289.881H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 280.06V283.81C288.853 283.892 288.919 283.959 289 283.959C289.081 283.959 289.147 283.892 289.147 283.81V280.06C289.147 279.978 289.081 279.912 289 279.912C288.919 279.912 288.853 279.978 288.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 281.787C287.066 281.787 287 281.853 287 281.935C287 282.017 287.066 282.084 287.147 282.084H290.853C290.934 282.084 291 282.017 291 281.935C291 281.853 290.934 281.787 290.853 281.787H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 271.966V275.716C288.853 275.798 288.919 275.864 289 275.864C289.081 275.864 289.147 275.798 289.147 275.716V271.966C289.147 271.883 289.081 271.817 289 271.817C288.919 271.817 288.853 271.883 288.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 273.692C287.066 273.692 287 273.759 287 273.841C287 273.923 287.066 273.989 287.147 273.989H290.853C290.934 273.989 291 273.923 291 273.841C291 273.759 290.934 273.692 290.853 273.692H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 263.871V267.621C288.853 267.703 288.919 267.77 289 267.77C289.081 267.77 289.147 267.703 289.147 267.621V263.871C289.147 263.789 289.081 263.722 289 263.722C288.919 263.722 288.853 263.789 288.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 265.597C287.066 265.597 287 265.664 287 265.746C287 265.828 287.066 265.895 287.147 265.895H290.853C290.934 265.895 291 265.828 291 265.746C291 265.664 290.934 265.597 290.853 265.597H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 255.776V259.526C288.853 259.608 288.919 259.675 289 259.675C289.081 259.675 289.147 259.608 289.147 259.526V255.776C289.147 255.694 289.081 255.628 289 255.628C288.919 255.628 288.853 255.694 288.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 257.503C287.066 257.503 287 257.569 287 257.651C287 257.733 287.066 257.8 287.147 257.8H290.853C290.934 257.8 291 257.733 291 257.651C291 257.569 290.934 257.503 290.853 257.503H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 247.682V251.432C288.853 251.514 288.919 251.58 289 251.58C289.081 251.58 289.147 251.514 289.147 251.432V247.682C289.147 247.6 289.081 247.533 289 247.533C288.919 247.533 288.853 247.6 288.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 249.408C287.066 249.408 287 249.475 287 249.557C287 249.639 287.066 249.705 287.147 249.705H290.853C290.934 249.705 291 249.639 291 249.557C291 249.475 290.934 249.408 290.853 249.408H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 239.587V243.337C288.853 243.419 288.919 243.486 289 243.486C289.081 243.486 289.147 243.419 289.147 243.337V239.587C289.147 239.505 289.081 239.438 289 239.438C288.919 239.438 288.853 239.505 288.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 241.313C287.066 241.313 287 241.38 287 241.462C287 241.544 287.066 241.611 287.147 241.611H290.853C290.934 241.611 291 241.544 291 241.462C291 241.38 290.934 241.313 290.853 241.313H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 231.492V235.242C288.853 235.324 288.919 235.391 289 235.391C289.081 235.391 289.147 235.324 289.147 235.242V231.492C289.147 231.41 289.081 231.344 289 231.344C288.919 231.344 288.853 231.41 288.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 233.219C287.066 233.219 287 233.285 287 233.367C287 233.449 287.066 233.516 287.147 233.516H290.853C290.934 233.516 291 233.449 291 233.367C291 233.285 290.934 233.219 290.853 233.219H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 223.398V227.148C288.853 227.23 288.919 227.296 289 227.296C289.081 227.296 289.147 227.23 289.147 227.148V223.398C289.147 223.316 289.081 223.249 289 223.249C288.919 223.249 288.853 223.316 288.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 225.124C287.066 225.124 287 225.191 287 225.273C287 225.355 287.066 225.421 287.147 225.421H290.853C290.934 225.421 291 225.355 291 225.273C291 225.191 290.934 225.124 290.853 225.124H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 369.101V372.851C296.853 372.933 296.919 373 297 373C297.081 373 297.147 372.933 297.147 372.851V369.101C297.147 369.019 297.081 368.953 297 368.953C296.919 368.953 296.853 369.019 296.853 369.101Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 370.828C295.066 370.828 295 370.894 295 370.976C295 371.058 295.066 371.125 295.147 371.125H298.853C298.934 371.125 299 371.058 299 370.976C299 370.894 298.934 370.828 298.853 370.828H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 361.007V364.757C296.853 364.839 296.919 364.905 297 364.905C297.081 364.905 297.147 364.839 297.147 364.757V361.007C297.147 360.925 297.081 360.858 297 360.858C296.919 360.858 296.853 360.925 296.853 361.007Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 362.733C295.066 362.733 295 362.8 295 362.882C295 362.964 295.066 363.03 295.147 363.03H298.853C298.934 363.03 299 362.964 299 362.882C299 362.8 298.934 362.733 298.853 362.733H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 352.912V356.662C296.853 356.744 296.919 356.811 297 356.811C297.081 356.811 297.147 356.744 297.147 356.662V352.912C297.147 352.83 297.081 352.763 297 352.763C296.919 352.763 296.853 352.83 296.853 352.912Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 354.638C295.066 354.638 295 354.705 295 354.787C295 354.869 295.066 354.936 295.147 354.936H298.853C298.934 354.936 299 354.869 299 354.787C299 354.705 298.934 354.638 298.853 354.638H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 344.817V348.567C296.853 348.65 296.919 348.716 297 348.716C297.081 348.716 297.147 348.65 297.147 348.567V344.817C297.147 344.735 297.081 344.669 297 344.669C296.919 344.669 296.853 344.735 296.853 344.817Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 346.544C295.066 346.544 295 346.61 295 346.692C295 346.774 295.066 346.841 295.147 346.841H298.853C298.934 346.841 299 346.774 299 346.692C299 346.61 298.934 346.544 298.853 346.544H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 336.723V340.473C296.853 340.555 296.919 340.621 297 340.621C297.081 340.621 297.147 340.555 297.147 340.473V336.723C297.147 336.641 297.081 336.574 297 336.574C296.919 336.574 296.853 336.641 296.853 336.723Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 338.449C295.066 338.449 295 338.516 295 338.598C295 338.68 295.066 338.746 295.147 338.746H298.853C298.934 338.746 299 338.68 299 338.598C299 338.516 298.934 338.449 298.853 338.449H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 328.628V332.378C296.853 332.46 296.919 332.527 297 332.527C297.081 332.527 297.147 332.46 297.147 332.378V328.628C297.147 328.546 297.081 328.479 297 328.479C296.919 328.479 296.853 328.546 296.853 328.628Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 330.355C295.066 330.355 295 330.421 295 330.503C295 330.585 295.066 330.652 295.147 330.652H298.853C298.934 330.652 299 330.585 299 330.503C299 330.421 298.934 330.355 298.853 330.355H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 320.533V324.284C296.853 324.366 296.919 324.432 297 324.432C297.081 324.432 297.147 324.366 297.147 324.284V320.533C297.147 320.451 297.081 320.385 297 320.385C296.919 320.385 296.853 320.451 296.853 320.533Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 322.26C295.066 322.26 295 322.326 295 322.408C295 322.49 295.066 322.557 295.147 322.557H298.853C298.934 322.557 299 322.49 299 322.408C299 322.326 298.934 322.26 298.853 322.26H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 312.439V316.189C296.853 316.271 296.919 316.338 297 316.338C297.081 316.338 297.147 316.271 297.147 316.189V312.439C297.147 312.357 297.081 312.29 297 312.29C296.919 312.29 296.853 312.357 296.853 312.439Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 314.165C295.066 314.165 295 314.232 295 314.314C295 314.396 295.066 314.462 295.147 314.462H298.853C298.934 314.462 299 314.396 299 314.314C299 314.232 298.934 314.165 298.853 314.165H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 304.344V308.094C296.853 308.176 296.919 308.243 297 308.243C297.081 308.243 297.147 308.176 297.147 308.094V304.344C297.147 304.262 297.081 304.196 297 304.196C296.919 304.196 296.853 304.262 296.853 304.344Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 306.071C295.066 306.071 295 306.137 295 306.219C295 306.301 295.066 306.368 295.147 306.368H298.853C298.934 306.368 299 306.301 299 306.219C299 306.137 298.934 306.071 298.853 306.071H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 296.25V300C296.853 300.082 296.919 300.148 297 300.148C297.081 300.148 297.147 300.082 297.147 300V296.25C297.147 296.167 297.081 296.101 297 296.101C296.919 296.101 296.853 296.167 296.853 296.25Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 297.976C295.066 297.976 295 298.042 295 298.124C295 298.207 295.066 298.273 295.147 298.273H298.853C298.934 298.273 299 298.207 299 298.124C299 298.042 298.934 297.976 298.853 297.976H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 288.155V291.905C296.853 291.987 296.919 292.054 297 292.054C297.081 292.054 297.147 291.987 297.147 291.905V288.155C297.147 288.073 297.081 288.006 297 288.006C296.919 288.006 296.853 288.073 296.853 288.155Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 289.881C295.066 289.881 295 289.948 295 290.03C295 290.112 295.066 290.178 295.147 290.178H298.853C298.934 290.178 299 290.112 299 290.03C299 289.948 298.934 289.881 298.853 289.881H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 280.06V283.81C296.853 283.892 296.919 283.959 297 283.959C297.081 283.959 297.147 283.892 297.147 283.81V280.06C297.147 279.978 297.081 279.912 297 279.912C296.919 279.912 296.853 279.978 296.853 280.06Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 281.787C295.066 281.787 295 281.853 295 281.935C295 282.017 295.066 282.084 295.147 282.084H298.853C298.934 282.084 299 282.017 299 281.935C299 281.853 298.934 281.787 298.853 281.787H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 271.966V275.716C296.853 275.798 296.919 275.864 297 275.864C297.081 275.864 297.147 275.798 297.147 275.716V271.966C297.147 271.883 297.081 271.817 297 271.817C296.919 271.817 296.853 271.883 296.853 271.966Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 273.692C295.066 273.692 295 273.759 295 273.841C295 273.923 295.066 273.989 295.147 273.989H298.853C298.934 273.989 299 273.923 299 273.841C299 273.759 298.934 273.692 298.853 273.692H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 263.871V267.621C296.853 267.703 296.919 267.77 297 267.77C297.081 267.77 297.147 267.703 297.147 267.621V263.871C297.147 263.789 297.081 263.722 297 263.722C296.919 263.722 296.853 263.789 296.853 263.871Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 265.597C295.066 265.597 295 265.664 295 265.746C295 265.828 295.066 265.895 295.147 265.895H298.853C298.934 265.895 299 265.828 299 265.746C299 265.664 298.934 265.597 298.853 265.597H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 255.776V259.526C296.853 259.608 296.919 259.675 297 259.675C297.081 259.675 297.147 259.608 297.147 259.526V255.776C297.147 255.694 297.081 255.628 297 255.628C296.919 255.628 296.853 255.694 296.853 255.776Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 257.503C295.066 257.503 295 257.569 295 257.651C295 257.733 295.066 257.8 295.147 257.8H298.853C298.934 257.8 299 257.733 299 257.651C299 257.569 298.934 257.503 298.853 257.503H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 247.682V251.432C296.853 251.514 296.919 251.58 297 251.58C297.081 251.58 297.147 251.514 297.147 251.432V247.682C297.147 247.6 297.081 247.533 297 247.533C296.919 247.533 296.853 247.6 296.853 247.682Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 249.408C295.066 249.408 295 249.475 295 249.557C295 249.639 295.066 249.705 295.147 249.705H298.853C298.934 249.705 299 249.639 299 249.557C299 249.475 298.934 249.408 298.853 249.408H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 239.587V243.337C296.853 243.419 296.919 243.486 297 243.486C297.081 243.486 297.147 243.419 297.147 243.337V239.587C297.147 239.505 297.081 239.438 297 239.438C296.919 239.438 296.853 239.505 296.853 239.587Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 241.313C295.066 241.313 295 241.38 295 241.462C295 241.544 295.066 241.611 295.147 241.611H298.853C298.934 241.611 299 241.544 299 241.462C299 241.38 298.934 241.313 298.853 241.313H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 231.492V235.242C296.853 235.324 296.919 235.391 297 235.391C297.081 235.391 297.147 235.324 297.147 235.242V231.492C297.147 231.41 297.081 231.344 297 231.344C296.919 231.344 296.853 231.41 296.853 231.492Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 233.219C295.066 233.219 295 233.285 295 233.367C295 233.449 295.066 233.516 295.147 233.516H298.853C298.934 233.516 299 233.449 299 233.367C299 233.285 298.934 233.219 298.853 233.219H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 223.398V227.148C296.853 227.23 296.919 227.296 297 227.296C297.081 227.296 297.147 227.23 297.147 227.148V223.398C297.147 223.316 297.081 223.249 297 223.249C296.919 223.249 296.853 223.316 296.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 225.124C295.066 225.124 295 225.191 295 225.273C295 225.355 295.066 225.421 295.147 225.421H298.853C298.934 225.421 299 225.355 299 225.273C299 225.191 298.934 225.124 298.853 225.124H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 223.398V227.148C280.853 227.23 280.919 227.296 281 227.296C281.081 227.296 281.147 227.23 281.147 227.148V223.398C281.147 223.316 281.081 223.249 281 223.249C280.919 223.249 280.853 223.316 280.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 225.124C279.066 225.124 279 225.191 279 225.273C279 225.355 279.066 225.421 279.147 225.421H282.853C282.934 225.421 283 225.355 283 225.273C283 225.191 282.934 225.124 282.853 225.124H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 215.303V219.053C280.853 219.135 280.919 219.202 281 219.202C281.081 219.202 281.147 219.135 281.147 219.053V215.303C281.147 215.221 281.081 215.154 281 215.154C280.919 215.154 280.853 215.221 280.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 217.029C279.066 217.029 279 217.096 279 217.178C279 217.26 279.066 217.327 279.147 217.327H282.853C282.934 217.327 283 217.26 283 217.178C283 217.096 282.934 217.029 282.853 217.029H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 207.208V210.958C280.853 211.041 280.919 211.107 281 211.107C281.081 211.107 281.147 211.041 281.147 210.958V207.208C281.147 207.126 281.081 207.06 281 207.06C280.919 207.06 280.853 207.126 280.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 208.935C279.066 208.935 279 209.001 279 209.083C279 209.165 279.066 209.232 279.147 209.232H282.853C282.934 209.232 283 209.165 283 209.083C283 209.001 282.934 208.935 282.853 208.935H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 199.114V202.864C280.853 202.946 280.919 203.012 281 203.012C281.081 203.012 281.147 202.946 281.147 202.864V199.114C281.147 199.032 281.081 198.965 281 198.965C280.919 198.965 280.853 199.032 280.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 200.84C279.066 200.84 279 200.907 279 200.989C279 201.071 279.066 201.137 279.147 201.137H282.853C282.934 201.137 283 201.071 283 200.989C283 200.907 282.934 200.84 282.853 200.84H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 191.019V194.769C280.853 194.851 280.919 194.918 281 194.918C281.081 194.918 281.147 194.851 281.147 194.769V191.019C281.147 190.937 281.081 190.87 281 190.87C280.919 190.87 280.853 190.937 280.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 192.746C279.066 192.746 279 192.812 279 192.894C279 192.976 279.066 193.043 279.147 193.043H282.853C282.934 193.043 283 192.976 283 192.894C283 192.812 282.934 192.746 282.853 192.746H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 182.924V186.675C280.853 186.757 280.919 186.823 281 186.823C281.081 186.823 281.147 186.757 281.147 186.675V182.924C281.147 182.842 281.081 182.776 281 182.776C280.919 182.776 280.853 182.842 280.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 184.651C279.066 184.651 279 184.717 279 184.799C279 184.882 279.066 184.948 279.147 184.948H282.853C282.934 184.948 283 184.882 283 184.799C283 184.717 282.934 184.651 282.853 184.651H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 174.83V178.58C280.853 178.662 280.919 178.729 281 178.729C281.081 178.729 281.147 178.662 281.147 178.58V174.83C281.147 174.748 281.081 174.681 281 174.681C280.919 174.681 280.853 174.748 280.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 176.556C279.066 176.556 279 176.623 279 176.705C279 176.787 279.066 176.853 279.147 176.853H282.853C282.934 176.853 283 176.787 283 176.705C283 176.623 282.934 176.556 282.853 176.556H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 166.735V170.485C280.853 170.567 280.919 170.634 281 170.634C281.081 170.634 281.147 170.567 281.147 170.485V166.735C281.147 166.653 281.081 166.587 281 166.587C280.919 166.587 280.853 166.653 280.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 168.462C279.066 168.462 279 168.528 279 168.61C279 168.692 279.066 168.759 279.147 168.759H282.853C282.934 168.759 283 168.692 283 168.61C283 168.528 282.934 168.462 282.853 168.462H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 158.64V162.391C280.853 162.473 280.919 162.539 281 162.539C281.081 162.539 281.147 162.473 281.147 162.391V158.64C281.147 158.558 281.081 158.492 281 158.492C280.919 158.492 280.853 158.558 280.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 160.367C279.066 160.367 279 160.433 279 160.516C279 160.598 279.066 160.664 279.147 160.664H282.853C282.934 160.664 283 160.598 283 160.516C283 160.433 282.934 160.367 282.853 160.367H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 150.546V154.296C280.853 154.378 280.919 154.445 281 154.445C281.081 154.445 281.147 154.378 281.147 154.296V150.546C281.147 150.464 281.081 150.397 281 150.397C280.919 150.397 280.853 150.464 280.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 152.272C279.066 152.272 279 152.339 279 152.421C279 152.503 279.066 152.569 279.147 152.569H282.853C282.934 152.569 283 152.503 283 152.421C283 152.339 282.934 152.272 282.853 152.272H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 142.451V146.201C280.853 146.283 280.919 146.35 281 146.35C281.081 146.35 281.147 146.283 281.147 146.201V142.451C281.147 142.369 281.081 142.303 281 142.303C280.919 142.303 280.853 142.369 280.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 144.178C279.066 144.178 279 144.244 279 144.326C279 144.408 279.066 144.475 279.147 144.475H282.853C282.934 144.475 283 144.408 283 144.326C283 144.244 282.934 144.178 282.853 144.178H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 134.356V138.107C280.853 138.189 280.919 138.255 281 138.255C281.081 138.255 281.147 138.189 281.147 138.107V134.356C281.147 134.274 281.081 134.208 281 134.208C280.919 134.208 280.853 134.274 280.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 136.083C279.066 136.083 279 136.149 279 136.232C279 136.314 279.066 136.38 279.147 136.38H282.853C282.934 136.38 283 136.314 283 136.232C283 136.149 282.934 136.083 282.853 136.083H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 126.262V130.012C280.853 130.094 280.919 130.161 281 130.161C281.081 130.161 281.147 130.094 281.147 130.012V126.262C281.147 126.18 281.081 126.113 281 126.113C280.919 126.113 280.853 126.18 280.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 127.988C279.066 127.988 279 128.055 279 128.137C279 128.219 279.066 128.286 279.147 128.286H282.853C282.934 128.286 283 128.219 283 128.137C283 128.055 282.934 127.988 282.853 127.988H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 118.167V121.917C280.853 121.999 280.919 122.066 281 122.066C281.081 122.066 281.147 121.999 281.147 121.917V118.167C281.147 118.085 281.081 118.019 281 118.019C280.919 118.019 280.853 118.085 280.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 119.894C279.066 119.894 279 119.96 279 120.042C279 120.124 279.066 120.191 279.147 120.191H282.853C282.934 120.191 283 120.124 283 120.042C283 119.96 282.934 119.894 282.853 119.894H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 110.073V113.823C280.853 113.905 280.919 113.971 281 113.971C281.081 113.971 281.147 113.905 281.147 113.823V110.073C281.147 109.99 281.081 109.924 281 109.924C280.919 109.924 280.853 109.99 280.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 111.799C279.066 111.799 279 111.866 279 111.948C279 112.03 279.066 112.096 279.147 112.096H282.853C282.934 112.096 283 112.03 283 111.948C283 111.866 282.934 111.799 282.853 111.799H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 101.978V105.728C280.853 105.81 280.919 105.877 281 105.877C281.081 105.877 281.147 105.81 281.147 105.728V101.978C281.147 101.896 281.081 101.829 281 101.829C280.919 101.829 280.853 101.896 280.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 103.705C279.066 103.705 279 103.771 279 103.853C279 103.935 279.066 104.002 279.147 104.002H282.853C282.934 104.002 283 103.935 283 103.853C283 103.771 282.934 103.705 282.853 103.705H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 93.8831V97.6333C280.853 97.7154 280.919 97.7819 281 97.7819C281.081 97.7819 281.147 97.7154 281.147 97.6333V93.8831C281.147 93.8011 281.081 93.7346 281 93.7346C280.919 93.7346 280.853 93.8011 280.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 95.6098C279.066 95.6098 279 95.6763 279 95.7583C279 95.8404 279.066 95.9069 279.147 95.9069H282.853C282.934 95.9069 283 95.8404 283 95.7583C283 95.6763 282.934 95.6098 282.853 95.6098H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 85.7885V89.5387C280.853 89.6208 280.919 89.6873 281 89.6873C281.081 89.6873 281.147 89.6208 281.147 89.5387V85.7885C281.147 85.7065 281.081 85.64 281 85.64C280.919 85.64 280.853 85.7065 280.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 87.5152C279.066 87.5152 279 87.5817 279 87.6638C279 87.7458 279.066 87.8123 279.147 87.8123H282.853C282.934 87.8123 283 87.7458 283 87.6638C283 87.5817 282.934 87.5152 282.853 87.5152H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M280.853 77.694V81.4442C280.853 81.5263 280.919 81.5928 281 81.5928C281.081 81.5928 281.147 81.5263 281.147 81.4442V77.694C281.147 77.6119 281.081 77.5454 281 77.5454C280.919 77.5454 280.853 77.6119 280.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M279.147 79.4206C279.066 79.4206 279 79.4871 279 79.5692C279 79.6512 279.066 79.7178 279.147 79.7178H282.853C282.934 79.7178 283 79.6512 283 79.5692C283 79.4871 282.934 79.4206 282.853 79.4206H279.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 223.398V227.148C288.853 227.23 288.919 227.296 289 227.296C289.081 227.296 289.147 227.23 289.147 227.148V223.398C289.147 223.316 289.081 223.249 289 223.249C288.919 223.249 288.853 223.316 288.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 225.124C287.066 225.124 287 225.191 287 225.273C287 225.355 287.066 225.421 287.147 225.421H290.853C290.934 225.421 291 225.355 291 225.273C291 225.191 290.934 225.124 290.853 225.124H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 215.303V219.053C288.853 219.135 288.919 219.202 289 219.202C289.081 219.202 289.147 219.135 289.147 219.053V215.303C289.147 215.221 289.081 215.154 289 215.154C288.919 215.154 288.853 215.221 288.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 217.029C287.066 217.029 287 217.096 287 217.178C287 217.26 287.066 217.327 287.147 217.327H290.853C290.934 217.327 291 217.26 291 217.178C291 217.096 290.934 217.029 290.853 217.029H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 207.208V210.958C288.853 211.041 288.919 211.107 289 211.107C289.081 211.107 289.147 211.041 289.147 210.958V207.208C289.147 207.126 289.081 207.06 289 207.06C288.919 207.06 288.853 207.126 288.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 208.935C287.066 208.935 287 209.001 287 209.083C287 209.165 287.066 209.232 287.147 209.232H290.853C290.934 209.232 291 209.165 291 209.083C291 209.001 290.934 208.935 290.853 208.935H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 199.114V202.864C288.853 202.946 288.919 203.012 289 203.012C289.081 203.012 289.147 202.946 289.147 202.864V199.114C289.147 199.032 289.081 198.965 289 198.965C288.919 198.965 288.853 199.032 288.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 200.84C287.066 200.84 287 200.907 287 200.989C287 201.071 287.066 201.137 287.147 201.137H290.853C290.934 201.137 291 201.071 291 200.989C291 200.907 290.934 200.84 290.853 200.84H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 191.019V194.769C288.853 194.851 288.919 194.918 289 194.918C289.081 194.918 289.147 194.851 289.147 194.769V191.019C289.147 190.937 289.081 190.87 289 190.87C288.919 190.87 288.853 190.937 288.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 192.746C287.066 192.746 287 192.812 287 192.894C287 192.976 287.066 193.043 287.147 193.043H290.853C290.934 193.043 291 192.976 291 192.894C291 192.812 290.934 192.746 290.853 192.746H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 182.924V186.675C288.853 186.757 288.919 186.823 289 186.823C289.081 186.823 289.147 186.757 289.147 186.675V182.924C289.147 182.842 289.081 182.776 289 182.776C288.919 182.776 288.853 182.842 288.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 184.651C287.066 184.651 287 184.717 287 184.799C287 184.882 287.066 184.948 287.147 184.948H290.853C290.934 184.948 291 184.882 291 184.799C291 184.717 290.934 184.651 290.853 184.651H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 174.83V178.58C288.853 178.662 288.919 178.729 289 178.729C289.081 178.729 289.147 178.662 289.147 178.58V174.83C289.147 174.748 289.081 174.681 289 174.681C288.919 174.681 288.853 174.748 288.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 176.556C287.066 176.556 287 176.623 287 176.705C287 176.787 287.066 176.853 287.147 176.853H290.853C290.934 176.853 291 176.787 291 176.705C291 176.623 290.934 176.556 290.853 176.556H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 166.735V170.485C288.853 170.567 288.919 170.634 289 170.634C289.081 170.634 289.147 170.567 289.147 170.485V166.735C289.147 166.653 289.081 166.587 289 166.587C288.919 166.587 288.853 166.653 288.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 168.462C287.066 168.462 287 168.528 287 168.61C287 168.692 287.066 168.759 287.147 168.759H290.853C290.934 168.759 291 168.692 291 168.61C291 168.528 290.934 168.462 290.853 168.462H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 158.64V162.391C288.853 162.473 288.919 162.539 289 162.539C289.081 162.539 289.147 162.473 289.147 162.391V158.64C289.147 158.558 289.081 158.492 289 158.492C288.919 158.492 288.853 158.558 288.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 160.367C287.066 160.367 287 160.433 287 160.516C287 160.598 287.066 160.664 287.147 160.664H290.853C290.934 160.664 291 160.598 291 160.516C291 160.433 290.934 160.367 290.853 160.367H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 150.546V154.296C288.853 154.378 288.919 154.445 289 154.445C289.081 154.445 289.147 154.378 289.147 154.296V150.546C289.147 150.464 289.081 150.397 289 150.397C288.919 150.397 288.853 150.464 288.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 152.272C287.066 152.272 287 152.339 287 152.421C287 152.503 287.066 152.569 287.147 152.569H290.853C290.934 152.569 291 152.503 291 152.421C291 152.339 290.934 152.272 290.853 152.272H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 142.451V146.201C288.853 146.283 288.919 146.35 289 146.35C289.081 146.35 289.147 146.283 289.147 146.201V142.451C289.147 142.369 289.081 142.303 289 142.303C288.919 142.303 288.853 142.369 288.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 144.178C287.066 144.178 287 144.244 287 144.326C287 144.408 287.066 144.475 287.147 144.475H290.853C290.934 144.475 291 144.408 291 144.326C291 144.244 290.934 144.178 290.853 144.178H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 134.356V138.107C288.853 138.189 288.919 138.255 289 138.255C289.081 138.255 289.147 138.189 289.147 138.107V134.356C289.147 134.274 289.081 134.208 289 134.208C288.919 134.208 288.853 134.274 288.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 136.083C287.066 136.083 287 136.149 287 136.232C287 136.314 287.066 136.38 287.147 136.38H290.853C290.934 136.38 291 136.314 291 136.232C291 136.149 290.934 136.083 290.853 136.083H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 126.262V130.012C288.853 130.094 288.919 130.161 289 130.161C289.081 130.161 289.147 130.094 289.147 130.012V126.262C289.147 126.18 289.081 126.113 289 126.113C288.919 126.113 288.853 126.18 288.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 127.988C287.066 127.988 287 128.055 287 128.137C287 128.219 287.066 128.286 287.147 128.286H290.853C290.934 128.286 291 128.219 291 128.137C291 128.055 290.934 127.988 290.853 127.988H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 118.167V121.917C288.853 121.999 288.919 122.066 289 122.066C289.081 122.066 289.147 121.999 289.147 121.917V118.167C289.147 118.085 289.081 118.019 289 118.019C288.919 118.019 288.853 118.085 288.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 119.894C287.066 119.894 287 119.96 287 120.042C287 120.124 287.066 120.191 287.147 120.191H290.853C290.934 120.191 291 120.124 291 120.042C291 119.96 290.934 119.894 290.853 119.894H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 110.073V113.823C288.853 113.905 288.919 113.971 289 113.971C289.081 113.971 289.147 113.905 289.147 113.823V110.073C289.147 109.99 289.081 109.924 289 109.924C288.919 109.924 288.853 109.99 288.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 111.799C287.066 111.799 287 111.866 287 111.948C287 112.03 287.066 112.096 287.147 112.096H290.853C290.934 112.096 291 112.03 291 111.948C291 111.866 290.934 111.799 290.853 111.799H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 101.978V105.728C288.853 105.81 288.919 105.877 289 105.877C289.081 105.877 289.147 105.81 289.147 105.728V101.978C289.147 101.896 289.081 101.829 289 101.829C288.919 101.829 288.853 101.896 288.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 103.705C287.066 103.705 287 103.771 287 103.853C287 103.935 287.066 104.002 287.147 104.002H290.853C290.934 104.002 291 103.935 291 103.853C291 103.771 290.934 103.705 290.853 103.705H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 93.8831V97.6333C288.853 97.7154 288.919 97.7819 289 97.7819C289.081 97.7819 289.147 97.7154 289.147 97.6333V93.8831C289.147 93.8011 289.081 93.7346 289 93.7346C288.919 93.7346 288.853 93.8011 288.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 95.6098C287.066 95.6098 287 95.6763 287 95.7583C287 95.8404 287.066 95.9069 287.147 95.9069H290.853C290.934 95.9069 291 95.8404 291 95.7583C291 95.6763 290.934 95.6098 290.853 95.6098H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 85.7885V89.5387C288.853 89.6208 288.919 89.6873 289 89.6873C289.081 89.6873 289.147 89.6208 289.147 89.5387V85.7885C289.147 85.7065 289.081 85.64 289 85.64C288.919 85.64 288.853 85.7065 288.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 87.5152C287.066 87.5152 287 87.5817 287 87.6638C287 87.7458 287.066 87.8123 287.147 87.8123H290.853C290.934 87.8123 291 87.7458 291 87.6638C291 87.5817 290.934 87.5152 290.853 87.5152H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M288.853 77.694V81.4442C288.853 81.5263 288.919 81.5928 289 81.5928C289.081 81.5928 289.147 81.5263 289.147 81.4442V77.694C289.147 77.6119 289.081 77.5454 289 77.5454C288.919 77.5454 288.853 77.6119 288.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M287.147 79.4206C287.066 79.4206 287 79.4871 287 79.5692C287 79.6512 287.066 79.7178 287.147 79.7178H290.853C290.934 79.7178 291 79.6512 291 79.5692C291 79.4871 290.934 79.4206 290.853 79.4206H287.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 223.398V227.148C296.853 227.23 296.919 227.296 297 227.296C297.081 227.296 297.147 227.23 297.147 227.148V223.398C297.147 223.316 297.081 223.249 297 223.249C296.919 223.249 296.853 223.316 296.853 223.398Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 225.124C295.066 225.124 295 225.191 295 225.273C295 225.355 295.066 225.421 295.147 225.421H298.853C298.934 225.421 299 225.355 299 225.273C299 225.191 298.934 225.124 298.853 225.124H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 215.303V219.053C296.853 219.135 296.919 219.202 297 219.202C297.081 219.202 297.147 219.135 297.147 219.053V215.303C297.147 215.221 297.081 215.154 297 215.154C296.919 215.154 296.853 215.221 296.853 215.303Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 217.029C295.066 217.029 295 217.096 295 217.178C295 217.26 295.066 217.327 295.147 217.327H298.853C298.934 217.327 299 217.26 299 217.178C299 217.096 298.934 217.029 298.853 217.029H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 207.208V210.958C296.853 211.041 296.919 211.107 297 211.107C297.081 211.107 297.147 211.041 297.147 210.958V207.208C297.147 207.126 297.081 207.06 297 207.06C296.919 207.06 296.853 207.126 296.853 207.208Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 208.935C295.066 208.935 295 209.001 295 209.083C295 209.165 295.066 209.232 295.147 209.232H298.853C298.934 209.232 299 209.165 299 209.083C299 209.001 298.934 208.935 298.853 208.935H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 199.114V202.864C296.853 202.946 296.919 203.012 297 203.012C297.081 203.012 297.147 202.946 297.147 202.864V199.114C297.147 199.032 297.081 198.965 297 198.965C296.919 198.965 296.853 199.032 296.853 199.114Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 200.84C295.066 200.84 295 200.907 295 200.989C295 201.071 295.066 201.137 295.147 201.137H298.853C298.934 201.137 299 201.071 299 200.989C299 200.907 298.934 200.84 298.853 200.84H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 191.019V194.769C296.853 194.851 296.919 194.918 297 194.918C297.081 194.918 297.147 194.851 297.147 194.769V191.019C297.147 190.937 297.081 190.87 297 190.87C296.919 190.87 296.853 190.937 296.853 191.019Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 192.746C295.066 192.746 295 192.812 295 192.894C295 192.976 295.066 193.043 295.147 193.043H298.853C298.934 193.043 299 192.976 299 192.894C299 192.812 298.934 192.746 298.853 192.746H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 182.924V186.675C296.853 186.757 296.919 186.823 297 186.823C297.081 186.823 297.147 186.757 297.147 186.675V182.924C297.147 182.842 297.081 182.776 297 182.776C296.919 182.776 296.853 182.842 296.853 182.924Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 184.651C295.066 184.651 295 184.717 295 184.799C295 184.882 295.066 184.948 295.147 184.948H298.853C298.934 184.948 299 184.882 299 184.799C299 184.717 298.934 184.651 298.853 184.651H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 174.83V178.58C296.853 178.662 296.919 178.729 297 178.729C297.081 178.729 297.147 178.662 297.147 178.58V174.83C297.147 174.748 297.081 174.681 297 174.681C296.919 174.681 296.853 174.748 296.853 174.83Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 176.556C295.066 176.556 295 176.623 295 176.705C295 176.787 295.066 176.853 295.147 176.853H298.853C298.934 176.853 299 176.787 299 176.705C299 176.623 298.934 176.556 298.853 176.556H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 166.735V170.485C296.853 170.567 296.919 170.634 297 170.634C297.081 170.634 297.147 170.567 297.147 170.485V166.735C297.147 166.653 297.081 166.587 297 166.587C296.919 166.587 296.853 166.653 296.853 166.735Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 168.462C295.066 168.462 295 168.528 295 168.61C295 168.692 295.066 168.759 295.147 168.759H298.853C298.934 168.759 299 168.692 299 168.61C299 168.528 298.934 168.462 298.853 168.462H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 158.64V162.391C296.853 162.473 296.919 162.539 297 162.539C297.081 162.539 297.147 162.473 297.147 162.391V158.64C297.147 158.558 297.081 158.492 297 158.492C296.919 158.492 296.853 158.558 296.853 158.64Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 160.367C295.066 160.367 295 160.433 295 160.516C295 160.598 295.066 160.664 295.147 160.664H298.853C298.934 160.664 299 160.598 299 160.516C299 160.433 298.934 160.367 298.853 160.367H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 150.546V154.296C296.853 154.378 296.919 154.445 297 154.445C297.081 154.445 297.147 154.378 297.147 154.296V150.546C297.147 150.464 297.081 150.397 297 150.397C296.919 150.397 296.853 150.464 296.853 150.546Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 152.272C295.066 152.272 295 152.339 295 152.421C295 152.503 295.066 152.569 295.147 152.569H298.853C298.934 152.569 299 152.503 299 152.421C299 152.339 298.934 152.272 298.853 152.272H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 142.451V146.201C296.853 146.283 296.919 146.35 297 146.35C297.081 146.35 297.147 146.283 297.147 146.201V142.451C297.147 142.369 297.081 142.303 297 142.303C296.919 142.303 296.853 142.369 296.853 142.451Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 144.178C295.066 144.178 295 144.244 295 144.326C295 144.408 295.066 144.475 295.147 144.475H298.853C298.934 144.475 299 144.408 299 144.326C299 144.244 298.934 144.178 298.853 144.178H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 134.356V138.107C296.853 138.189 296.919 138.255 297 138.255C297.081 138.255 297.147 138.189 297.147 138.107V134.356C297.147 134.274 297.081 134.208 297 134.208C296.919 134.208 296.853 134.274 296.853 134.356Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 136.083C295.066 136.083 295 136.149 295 136.232C295 136.314 295.066 136.38 295.147 136.38H298.853C298.934 136.38 299 136.314 299 136.232C299 136.149 298.934 136.083 298.853 136.083H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 126.262V130.012C296.853 130.094 296.919 130.161 297 130.161C297.081 130.161 297.147 130.094 297.147 130.012V126.262C297.147 126.18 297.081 126.113 297 126.113C296.919 126.113 296.853 126.18 296.853 126.262Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 127.988C295.066 127.988 295 128.055 295 128.137C295 128.219 295.066 128.286 295.147 128.286H298.853C298.934 128.286 299 128.219 299 128.137C299 128.055 298.934 127.988 298.853 127.988H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 118.167V121.917C296.853 121.999 296.919 122.066 297 122.066C297.081 122.066 297.147 121.999 297.147 121.917V118.167C297.147 118.085 297.081 118.019 297 118.019C296.919 118.019 296.853 118.085 296.853 118.167Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 119.894C295.066 119.894 295 119.96 295 120.042C295 120.124 295.066 120.191 295.147 120.191H298.853C298.934 120.191 299 120.124 299 120.042C299 119.96 298.934 119.894 298.853 119.894H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 110.073V113.823C296.853 113.905 296.919 113.971 297 113.971C297.081 113.971 297.147 113.905 297.147 113.823V110.073C297.147 109.99 297.081 109.924 297 109.924C296.919 109.924 296.853 109.99 296.853 110.073Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 111.799C295.066 111.799 295 111.866 295 111.948C295 112.03 295.066 112.096 295.147 112.096H298.853C298.934 112.096 299 112.03 299 111.948C299 111.866 298.934 111.799 298.853 111.799H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 101.978V105.728C296.853 105.81 296.919 105.877 297 105.877C297.081 105.877 297.147 105.81 297.147 105.728V101.978C297.147 101.896 297.081 101.829 297 101.829C296.919 101.829 296.853 101.896 296.853 101.978Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 103.705C295.066 103.705 295 103.771 295 103.853C295 103.935 295.066 104.002 295.147 104.002H298.853C298.934 104.002 299 103.935 299 103.853C299 103.771 298.934 103.705 298.853 103.705H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 93.8831V97.6333C296.853 97.7154 296.919 97.7819 297 97.7819C297.081 97.7819 297.147 97.7154 297.147 97.6333V93.8831C297.147 93.8011 297.081 93.7346 297 93.7346C296.919 93.7346 296.853 93.8011 296.853 93.8831Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 95.6098C295.066 95.6098 295 95.6763 295 95.7583C295 95.8404 295.066 95.9069 295.147 95.9069H298.853C298.934 95.9069 299 95.8404 299 95.7583C299 95.6763 298.934 95.6098 298.853 95.6098H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 85.7885V89.5387C296.853 89.6208 296.919 89.6873 297 89.6873C297.081 89.6873 297.147 89.6208 297.147 89.5387V85.7885C297.147 85.7065 297.081 85.64 297 85.64C296.919 85.64 296.853 85.7065 296.853 85.7885Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 87.5152C295.066 87.5152 295 87.5817 295 87.6638C295 87.7458 295.066 87.8123 295.147 87.8123H298.853C298.934 87.8123 299 87.7458 299 87.6638C299 87.5817 298.934 87.5152 298.853 87.5152H295.147Z"
          fill={colorConfig.grill}
        />
        <path
          d="M296.853 77.694V81.4442C296.853 81.5263 296.919 81.5928 297 81.5928C297.081 81.5928 297.147 81.5263 297.147 81.4442V77.694C297.147 77.6119 297.081 77.5454 297 77.5454C296.919 77.5454 296.853 77.6119 296.853 77.694Z"
          fill={colorConfig.grill}
        />
        <path
          d="M295.147 79.4206C295.066 79.4206 295 79.4871 295 79.5692C295 79.6512 295.066 79.7178 295.147 79.7178H298.853C298.934 79.7178 299 79.6512 299 79.5692C299 79.4871 298.934 79.4206 298.853 79.4206H295.147Z"
          fill={colorConfig.grill}
        />
      </g>
      <path
        d="M301 84H302V83H301V84ZM301 374V375H302V374H301ZM276 84V85H301V84V83H276V84ZM301 84H300V374H301H302V84H301ZM301 374V373H276V374V375H301V374Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-96-inside-20_709_17)"
      />
      <mask id="path-99-inside-21_709_17" fill="white">
        <path d="M237 452H321V493H237V452Z" />
      </mask>
      {/* CRAC-1 */}
      <g mask="url(#semicircle-mask-1)">
        <AnimatedCircles
          color={colorConfig.particles}
          startX={237}
          startY={432}
        />
      </g>
      <path d="M237 452H321V493H237V452Z" fill={colorConfig.block_fill} />
      <path
        d="M237 452V451H236V452H237ZM321 452H322V451H321V452ZM237 452V453H321V452V451H237V452ZM321 452H320V493H321H322V452H321ZM237 493H238V452H237H236V493H237Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-99-inside-21_709_17)"
      />
      <path
        d="M271.312 471.181H269.983C269.946 470.963 269.876 470.77 269.774 470.602C269.672 470.432 269.546 470.287 269.394 470.169C269.242 470.051 269.07 469.962 268.876 469.903C268.684 469.841 268.477 469.81 268.254 469.81C267.859 469.81 267.508 469.91 267.203 470.109C266.898 470.305 266.658 470.594 266.486 470.975C266.313 471.354 266.226 471.817 266.226 472.364C266.226 472.92 266.313 473.389 266.486 473.77C266.661 474.149 266.9 474.435 267.203 474.629C267.508 474.821 267.858 474.917 268.251 474.917C268.468 474.917 268.672 474.888 268.861 474.832C269.053 474.772 269.225 474.686 269.376 474.572C269.53 474.459 269.659 474.319 269.763 474.153C269.87 473.988 269.943 473.798 269.983 473.585L271.312 473.592C271.262 473.938 271.154 474.262 270.988 474.565C270.825 474.868 270.611 475.136 270.346 475.368C270.081 475.598 269.77 475.777 269.415 475.908C269.06 476.036 268.666 476.099 268.233 476.099C267.594 476.099 267.023 475.951 266.521 475.656C266.019 475.36 265.624 474.932 265.335 474.374C265.046 473.815 264.902 473.145 264.902 472.364C264.902 471.58 265.047 470.91 265.339 470.354C265.63 469.795 266.026 469.368 266.528 469.072C267.03 468.776 267.598 468.628 268.233 468.628C268.638 468.628 269.014 468.685 269.362 468.798C269.71 468.912 270.02 469.079 270.292 469.299C270.565 469.517 270.788 469.784 270.964 470.102C271.141 470.416 271.257 470.776 271.312 471.181ZM272.518 476V468.727H275.245C275.804 468.727 276.273 468.824 276.652 469.018C277.033 469.213 277.32 469.485 277.515 469.835C277.711 470.183 277.809 470.589 277.809 471.053C277.809 471.52 277.71 471.924 277.511 472.268C277.315 472.609 277.025 472.873 276.641 473.06C276.257 473.244 275.786 473.337 275.228 473.337H273.285V472.243H275.05C275.377 472.243 275.644 472.198 275.853 472.108C276.061 472.016 276.215 471.882 276.314 471.707C276.416 471.529 276.467 471.311 276.467 471.053C276.467 470.795 276.416 470.575 276.314 470.393C276.212 470.208 276.057 470.068 275.849 469.974C275.641 469.877 275.372 469.828 275.043 469.828H273.836V476H272.518ZM276.275 472.705L278.076 476H276.605L274.837 472.705H276.275ZM279.956 476H278.55L281.11 468.727H282.737L285.3 476H283.894L281.952 470.219H281.895L279.956 476ZM280.002 473.148H283.837V474.207H280.002V473.148ZM292.142 471.181H290.814C290.776 470.963 290.706 470.77 290.604 470.602C290.502 470.432 290.376 470.287 290.224 470.169C290.073 470.051 289.9 469.962 289.706 469.903C289.514 469.841 289.307 469.81 289.084 469.81C288.689 469.81 288.338 469.91 288.033 470.109C287.728 470.305 287.489 470.594 287.316 470.975C287.143 471.354 287.056 471.817 287.056 472.364C287.056 472.92 287.143 473.389 287.316 473.77C287.491 474.149 287.73 474.435 288.033 474.629C288.338 474.821 288.688 474.917 289.081 474.917C289.298 474.917 289.502 474.888 289.691 474.832C289.883 474.772 290.055 474.686 290.206 474.572C290.36 474.459 290.489 474.319 290.593 474.153C290.7 473.988 290.773 473.798 290.814 473.585L292.142 473.592C292.092 473.938 291.984 474.262 291.819 474.565C291.655 474.868 291.441 475.136 291.176 475.368C290.911 475.598 290.6 475.777 290.245 475.908C289.89 476.036 289.496 476.099 289.063 476.099C288.424 476.099 287.853 475.951 287.351 475.656C286.849 475.36 286.454 474.932 286.165 474.374C285.876 473.815 285.732 473.145 285.732 472.364C285.732 471.58 285.877 470.91 286.169 470.354C286.46 469.795 286.856 469.368 287.358 469.072C287.86 468.776 288.428 468.628 289.063 468.628C289.468 468.628 289.844 468.685 290.192 468.798C290.54 468.912 290.85 469.079 291.123 469.299C291.395 469.517 291.618 469.784 291.794 470.102C291.971 470.416 292.087 470.776 292.142 471.181Z"
        fill={colorConfig.text}
      />
      <mask id="path-102-inside-22_709_17" fill="white">
        <path d="M58 452H142V493H58V452Z" />
      </mask>
      {/* CRAC-2 */}
      <g mask="url(#semicircle-mask-2)">
        <AnimatedCircles
          color={colorConfig.particles}
          startX={58}
          startY={432}
        />
      </g>
      <path d="M58 452H142V493H58V452Z" fill={colorConfig.block_fill} />
      <path
        d="M58 452V451H57V452H58ZM142 452H143V451H142V452ZM58 452V453H142V452V451H58V452ZM142 452H141V493H142H143V452H142ZM58 493H59V452H58H57V493H58Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-102-inside-22_709_17)"
      />
      <path
        d="M92.3116 471.181H90.9835C90.9456 470.963 90.8758 470.77 90.774 470.602C90.6722 470.432 90.5455 470.287 90.394 470.169C90.2425 470.051 90.0697 469.962 89.8755 469.903C89.6838 469.841 89.4766 469.81 89.2541 469.81C88.8587 469.81 88.5083 469.91 88.2029 470.109C87.8975 470.305 87.6584 470.594 87.4856 470.975C87.3128 471.354 87.2264 471.817 87.2264 472.364C87.2264 472.92 87.3128 473.389 87.4856 473.77C87.6608 474.149 87.8999 474.435 88.2029 474.629C88.5083 474.821 88.8575 474.917 89.2505 474.917C89.4683 474.917 89.6719 474.888 89.8613 474.832C90.0531 474.772 90.2247 474.686 90.3762 474.572C90.5301 474.459 90.6592 474.319 90.7633 474.153C90.8699 473.988 90.9432 473.798 90.9835 473.585L92.3116 473.592C92.2619 473.938 92.1542 474.262 91.9885 474.565C91.8251 474.868 91.6109 475.136 91.3457 475.368C91.0806 475.598 90.7704 475.777 90.4153 475.908C90.0602 476.036 89.666 476.099 89.2328 476.099C88.5936 476.099 88.023 475.951 87.5211 475.656C87.0192 475.36 86.6239 474.932 86.335 474.374C86.0462 473.815 85.9018 473.145 85.9018 472.364C85.9018 471.58 86.0474 470.91 86.3386 470.354C86.6298 469.795 87.0263 469.368 87.5282 469.072C88.0301 468.776 88.5983 468.628 89.2328 468.628C89.6376 468.628 90.014 468.685 90.362 468.798C90.71 468.912 91.0202 469.079 91.2924 469.299C91.5647 469.517 91.7884 469.784 91.9636 470.102C92.1412 470.416 92.2572 470.776 92.3116 471.181ZM93.5181 476V468.727H96.2454C96.8041 468.727 97.2728 468.824 97.6516 469.018C98.0328 469.213 98.3204 469.485 98.5146 469.835C98.7111 470.183 98.8093 470.589 98.8093 471.053C98.8093 471.52 98.7099 471.924 98.511 472.268C98.3145 472.609 98.0245 472.873 97.641 473.06C97.2575 473.244 96.7863 473.337 96.2276 473.337H94.2852V472.243H96.0501C96.3768 472.243 96.6443 472.198 96.8526 472.108C97.061 472.016 97.2148 471.882 97.3143 471.707C97.4161 471.529 97.467 471.311 97.467 471.053C97.467 470.795 97.4161 470.575 97.3143 470.393C97.2125 470.208 97.0574 470.068 96.8491 469.974C96.6407 469.877 96.372 469.828 96.043 469.828H94.8356V476H93.5181ZM97.2752 472.705L99.0756 476H97.6055L95.837 472.705H97.2752ZM100.956 476H99.5497L102.11 468.727H103.737L106.3 476H104.894L102.952 470.219H102.895L100.956 476ZM101.002 473.148H104.837V474.207H101.002V473.148ZM113.142 471.181H111.814C111.776 470.963 111.706 470.77 111.604 470.602C111.502 470.432 111.376 470.287 111.224 470.169C111.073 470.051 110.9 469.962 110.706 469.903C110.514 469.841 110.307 469.81 110.084 469.81C109.689 469.81 109.338 469.91 109.033 470.109C108.728 470.305 108.489 470.594 108.316 470.975C108.143 471.354 108.056 471.817 108.056 472.364C108.056 472.92 108.143 473.389 108.316 473.77C108.491 474.149 108.73 474.435 109.033 474.629C109.338 474.821 109.688 474.917 110.081 474.917C110.298 474.917 110.502 474.888 110.691 474.832C110.883 474.772 111.055 474.686 111.206 474.572C111.36 474.459 111.489 474.319 111.593 474.153C111.7 473.988 111.773 473.798 111.814 473.585L113.142 473.592C113.092 473.938 112.984 474.262 112.819 474.565C112.655 474.868 112.441 475.136 112.176 475.368C111.911 475.598 111.6 475.777 111.245 475.908C110.89 476.036 110.496 476.099 110.063 476.099C109.424 476.099 108.853 475.951 108.351 475.656C107.849 475.36 107.454 474.932 107.165 474.374C106.876 473.815 106.732 473.145 106.732 472.364C106.732 471.58 106.877 470.91 107.169 470.354C107.46 469.795 107.856 469.368 108.358 469.072C108.86 468.776 109.428 468.628 110.063 468.628C110.468 468.628 110.844 468.685 111.192 468.798C111.54 468.912 111.85 469.079 112.123 469.299C112.395 469.517 112.618 469.784 112.794 470.102C112.971 470.416 113.087 470.776 113.142 471.181Z"
        fill={colorConfig.text}
      />
      <mask id="path-105-inside-23_709_17" fill="white">
        <path d="M200 0H284V41H200V0Z" />
      </mask>
      {/* CRAC-3 */}
      <g mask="url(#semicircle-mask-3)">
        <AnimatedCircles
          color={colorConfig.particles}
          startX={200}
          startY={42}
        />
      </g>
      <path d="M200 0H284V41H200V0Z" fill={colorConfig.block_fill} />
      <path
        d="M284 41V42H285V41H284ZM200 41H199V42H200V41ZM284 0H283V41H284H285V0H284ZM284 41V40H200V41V42H284V41ZM200 41H201V0H200H199V41H200Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-105-inside-23_709_17)"
      />
      <path
        d="M234.312 19.1811H232.983C232.946 18.9633 232.876 18.7704 232.774 18.6023C232.672 18.4318 232.546 18.2874 232.394 18.169C232.242 18.0507 232.07 17.9619 231.876 17.9027C231.684 17.8411 231.477 17.8104 231.254 17.8104C230.859 17.8104 230.508 17.9098 230.203 18.1087C229.898 18.3052 229.658 18.594 229.486 18.9751C229.313 19.3539 229.226 19.8168 229.226 20.3636C229.226 20.92 229.313 21.3887 229.486 21.7699C229.661 22.1487 229.9 22.4351 230.203 22.6293C230.508 22.821 230.858 22.9169 231.251 22.9169C231.468 22.9169 231.672 22.8885 231.861 22.8317C232.053 22.7725 232.225 22.6861 232.376 22.5724C232.53 22.4588 232.659 22.3191 232.763 22.1534C232.87 21.9877 232.943 21.7983 232.983 21.5852L234.312 21.5923C234.262 21.938 234.154 22.2623 233.988 22.5653C233.825 22.8684 233.611 23.1359 233.346 23.3679C233.081 23.5975 232.77 23.7775 232.415 23.9077C232.06 24.0355 231.666 24.0994 231.233 24.0994C230.594 24.0994 230.023 23.9515 229.521 23.6555C229.019 23.3596 228.624 22.9323 228.335 22.3736C228.046 21.8149 227.902 21.1449 227.902 20.3636C227.902 19.58 228.047 18.91 228.339 18.3537C228.63 17.795 229.026 17.3677 229.528 17.0717C230.03 16.7758 230.598 16.6278 231.233 16.6278C231.638 16.6278 232.014 16.6847 232.362 16.7983C232.71 16.9119 233.02 17.0788 233.292 17.299C233.565 17.5168 233.788 17.7843 233.964 18.1016C234.141 18.4164 234.257 18.7763 234.312 19.1811ZM235.518 24V16.7273H238.245C238.804 16.7273 239.273 16.8243 239.652 17.0185C240.033 17.2126 240.32 17.4848 240.515 17.8352C240.711 18.1832 240.809 18.5893 240.809 19.0533C240.809 19.5196 240.71 19.9245 240.511 20.2678C240.315 20.6087 240.025 20.8726 239.641 21.0597C239.257 21.2443 238.786 21.3366 238.228 21.3366H236.285V20.2429H238.05C238.377 20.2429 238.644 20.1979 238.853 20.108C239.061 20.0156 239.215 19.8819 239.314 19.7067C239.416 19.5291 239.467 19.3113 239.467 19.0533C239.467 18.7952 239.416 18.575 239.314 18.3928C239.212 18.2081 239.057 18.0684 238.849 17.9737C238.641 17.8767 238.372 17.8281 238.043 17.8281H236.836V24H235.518ZM239.275 20.7045L241.076 24H239.605L237.837 20.7045H239.275ZM242.956 24H241.55L244.11 16.7273H245.737L248.3 24H246.894L244.952 18.2188H244.895L242.956 24ZM243.002 21.1484H246.837V22.2067H243.002V21.1484ZM255.142 19.1811H253.814C253.776 18.9633 253.706 18.7704 253.604 18.6023C253.502 18.4318 253.376 18.2874 253.224 18.169C253.073 18.0507 252.9 17.9619 252.706 17.9027C252.514 17.8411 252.307 17.8104 252.084 17.8104C251.689 17.8104 251.338 17.9098 251.033 18.1087C250.728 18.3052 250.489 18.594 250.316 18.9751C250.143 19.3539 250.056 19.8168 250.056 20.3636C250.056 20.92 250.143 21.3887 250.316 21.7699C250.491 22.1487 250.73 22.4351 251.033 22.6293C251.338 22.821 251.688 22.9169 252.081 22.9169C252.298 22.9169 252.502 22.8885 252.691 22.8317C252.883 22.7725 253.055 22.6861 253.206 22.5724C253.36 22.4588 253.489 22.3191 253.593 22.1534C253.7 21.9877 253.773 21.7983 253.814 21.5852L255.142 21.5923C255.092 21.938 254.984 22.2623 254.819 22.5653C254.655 22.8684 254.441 23.1359 254.176 23.3679C253.911 23.5975 253.6 23.7775 253.245 23.9077C252.89 24.0355 252.496 24.0994 252.063 24.0994C251.424 24.0994 250.853 23.9515 250.351 23.6555C249.849 23.3596 249.454 22.9323 249.165 22.3736C248.876 21.8149 248.732 21.1449 248.732 20.3636C248.732 19.58 248.877 18.91 249.169 18.3537C249.46 17.795 249.856 17.3677 250.358 17.0717C250.86 16.7758 251.428 16.6278 252.063 16.6278C252.468 16.6278 252.844 16.6847 253.192 16.7983C253.54 16.9119 253.85 17.0788 254.123 17.299C254.395 17.5168 254.618 17.7843 254.794 18.1016C254.971 18.4164 255.087 18.7763 255.142 19.1811Z"
        fill={colorConfig.text}
      />
      <mask id="path-108-inside-24_709_17" fill="white">
        <path d="M109 0H193V41H109V0Z" />
      </mask>
      {/* CRAC-4 */}
      <g mask="url(#semicircle-mask-4)">
        <AnimatedCircles
          color={colorConfig.particles}
          startX={109}
          startY={42}
        />
      </g>
      <path d="M109 0H193V41H109V0Z" fill={colorConfig.block_fill} />
      <path
        d="M193 41V42H194V41H193ZM109 41H108V42H109V41ZM193 0H192V41H193H194V0H193ZM193 41V40H109V41V42H193V41ZM109 41H110V0H109H108V41H109Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-108-inside-24_709_17)"
      />
      <path
        d="M143.312 19.1811H141.983C141.946 18.9633 141.876 18.7704 141.774 18.6023C141.672 18.4318 141.546 18.2874 141.394 18.169C141.242 18.0507 141.07 17.9619 140.876 17.9027C140.684 17.8411 140.477 17.8104 140.254 17.8104C139.859 17.8104 139.508 17.9098 139.203 18.1087C138.898 18.3052 138.658 18.594 138.486 18.9751C138.313 19.3539 138.226 19.8168 138.226 20.3636C138.226 20.92 138.313 21.3887 138.486 21.7699C138.661 22.1487 138.9 22.4351 139.203 22.6293C139.508 22.821 139.858 22.9169 140.251 22.9169C140.468 22.9169 140.672 22.8885 140.861 22.8317C141.053 22.7725 141.225 22.6861 141.376 22.5724C141.53 22.4588 141.659 22.3191 141.763 22.1534C141.87 21.9877 141.943 21.7983 141.983 21.5852L143.312 21.5923C143.262 21.938 143.154 22.2623 142.988 22.5653C142.825 22.8684 142.611 23.1359 142.346 23.3679C142.081 23.5975 141.77 23.7775 141.415 23.9077C141.06 24.0355 140.666 24.0994 140.233 24.0994C139.594 24.0994 139.023 23.9515 138.521 23.6555C138.019 23.3596 137.624 22.9323 137.335 22.3736C137.046 21.8149 136.902 21.1449 136.902 20.3636C136.902 19.58 137.047 18.91 137.339 18.3537C137.63 17.795 138.026 17.3677 138.528 17.0717C139.03 16.7758 139.598 16.6278 140.233 16.6278C140.638 16.6278 141.014 16.6847 141.362 16.7983C141.71 16.9119 142.02 17.0788 142.292 17.299C142.565 17.5168 142.788 17.7843 142.964 18.1016C143.141 18.4164 143.257 18.7763 143.312 19.1811ZM144.518 24V16.7273H147.245C147.804 16.7273 148.273 16.8243 148.652 17.0185C149.033 17.2126 149.32 17.4848 149.515 17.8352C149.711 18.1832 149.809 18.5893 149.809 19.0533C149.809 19.5196 149.71 19.9245 149.511 20.2678C149.315 20.6087 149.025 20.8726 148.641 21.0597C148.257 21.2443 147.786 21.3366 147.228 21.3366H145.285V20.2429H147.05C147.377 20.2429 147.644 20.1979 147.853 20.108C148.061 20.0156 148.215 19.8819 148.314 19.7067C148.416 19.5291 148.467 19.3113 148.467 19.0533C148.467 18.7952 148.416 18.575 148.314 18.3928C148.212 18.2081 148.057 18.0684 147.849 17.9737C147.641 17.8767 147.372 17.8281 147.043 17.8281H145.836V24H144.518ZM148.275 20.7045L150.076 24H148.605L146.837 20.7045H148.275ZM151.956 24H150.55L153.11 16.7273H154.737L157.3 24H155.894L153.952 18.2188H153.895L151.956 24ZM152.002 21.1484H155.837V22.2067H152.002V21.1484ZM164.142 19.1811H162.814C162.776 18.9633 162.706 18.7704 162.604 18.6023C162.502 18.4318 162.376 18.2874 162.224 18.169C162.073 18.0507 161.9 17.9619 161.706 17.9027C161.514 17.8411 161.307 17.8104 161.084 17.8104C160.689 17.8104 160.338 17.9098 160.033 18.1087C159.728 18.3052 159.489 18.594 159.316 18.9751C159.143 19.3539 159.056 19.8168 159.056 20.3636C159.056 20.92 159.143 21.3887 159.316 21.7699C159.491 22.1487 159.73 22.4351 160.033 22.6293C160.338 22.821 160.688 22.9169 161.081 22.9169C161.298 22.9169 161.502 22.8885 161.691 22.8317C161.883 22.7725 162.055 22.6861 162.206 22.5724C162.36 22.4588 162.489 22.3191 162.593 22.1534C162.7 21.9877 162.773 21.7983 162.814 21.5852L164.142 21.5923C164.092 21.938 163.984 22.2623 163.819 22.5653C163.655 22.8684 163.441 23.1359 163.176 23.3679C162.911 23.5975 162.6 23.7775 162.245 23.9077C161.89 24.0355 161.496 24.0994 161.063 24.0994C160.424 24.0994 159.853 23.9515 159.351 23.6555C158.849 23.3596 158.454 22.9323 158.165 22.3736C157.876 21.8149 157.732 21.1449 157.732 20.3636C157.732 19.58 157.877 18.91 158.169 18.3537C158.46 17.795 158.856 17.3677 159.358 17.0717C159.86 16.7758 160.428 16.6278 161.063 16.6278C161.468 16.6278 161.844 16.6847 162.192 16.7983C162.54 16.9119 162.85 17.0788 163.123 17.299C163.395 17.5168 163.618 17.7843 163.794 18.1016C163.971 18.4164 164.087 18.7763 164.142 19.1811Z"
        fill={colorConfig.text}
      />
      <mask id="path-111-inside-25_709_17" fill="white">
        <path d="M72 106H97V374H72V106Z" />
      </mask>
      <path d="M72 106H97V374H72V106Z" fill={colorConfig.block_fill} />
      <path
        d="M97 106H98V105H97V106ZM97 374V375H98V374H97ZM72 106V107H97V106V105H72V106ZM97 106H96V374H97H98V106H97ZM97 374V373H72V374V375H97V374Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-111-inside-25_709_17)"
      />
      <path
        d="M76.6678 369.491V372.866C76.6678 372.94 76.727 373 76.7999 373C76.8729 373 76.9321 372.94 76.9321 372.866V369.491C76.9321 369.417 76.8729 369.357 76.7999 369.357C76.727 369.357 76.6678 369.417 76.6678 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 371.045C75.0592 371.045 75 371.105 75 371.179C75 371.253 75.0592 371.312 75.1322 371.312H78.4679C78.5409 371.312 78.6 371.253 78.6 371.179C78.6 371.105 78.5409 371.045 78.4679 371.045H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 362.206V365.581C76.6678 365.655 76.727 365.715 76.7999 365.715C76.8729 365.715 76.9321 365.655 76.9321 365.581V362.206C76.9321 362.132 76.8729 362.072 76.7999 362.072C76.727 362.072 76.6678 362.132 76.6678 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 363.76C75.0592 363.76 75 363.82 75 363.893C75 363.967 75.0592 364.027 75.1322 364.027H78.4679C78.5409 364.027 78.6 363.967 78.6 363.893C78.6 363.82 78.5409 363.76 78.4679 363.76H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 354.921V358.296C76.6678 358.37 76.727 358.43 76.7999 358.43C76.8729 358.43 76.9321 358.37 76.9321 358.296V354.921C76.9321 354.847 76.8729 354.787 76.7999 354.787C76.727 354.787 76.6678 354.847 76.6678 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 356.475C75.0592 356.475 75 356.535 75 356.608C75 356.682 75.0592 356.742 75.1322 356.742H78.4679C78.5409 356.742 78.6 356.682 78.6 356.608C78.6 356.535 78.5409 356.475 78.4679 356.475H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 347.636V351.011C76.6678 351.085 76.727 351.144 76.7999 351.144C76.8729 351.144 76.9321 351.085 76.9321 351.011V347.636C76.9321 347.562 76.8729 347.502 76.7999 347.502C76.727 347.502 76.6678 347.562 76.6678 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 349.189C75.0592 349.189 75 349.249 75 349.323C75 349.397 75.0592 349.457 75.1322 349.457H78.4679C78.5409 349.457 78.6 349.397 78.6 349.323C78.6 349.249 78.5409 349.189 78.4679 349.189H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 340.35V343.726C76.6678 343.799 76.727 343.859 76.7999 343.859C76.8729 343.859 76.9321 343.799 76.9321 343.726V340.35C76.9321 340.277 76.8729 340.217 76.7999 340.217C76.727 340.217 76.6678 340.277 76.6678 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 341.904C75.0592 341.904 75 341.964 75 342.038C75 342.112 75.0592 342.172 75.1322 342.172H78.4679C78.5409 342.172 78.6 342.112 78.6 342.038C78.6 341.964 78.5409 341.904 78.4679 341.904H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 333.065V336.44C76.6678 336.514 76.727 336.574 76.7999 336.574C76.8729 336.574 76.9321 336.514 76.9321 336.44V333.065C76.9321 332.991 76.8729 332.932 76.7999 332.932C76.727 332.932 76.6678 332.991 76.6678 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 334.619C75.0592 334.619 75 334.679 75 334.753C75 334.827 75.0592 334.887 75.1322 334.887H78.4679C78.5409 334.887 78.6 334.827 78.6 334.753C78.6 334.679 78.5409 334.619 78.4679 334.619H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 325.78V329.155C76.6678 329.229 76.727 329.289 76.7999 329.289C76.8729 329.289 76.9321 329.229 76.9321 329.155V325.78C76.9321 325.706 76.8729 325.646 76.7999 325.646C76.727 325.646 76.6678 325.706 76.6678 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 327.334C75.0592 327.334 75 327.394 75 327.468C75 327.541 75.0592 327.601 75.1322 327.601H78.4679C78.5409 327.601 78.6 327.541 78.6 327.468C78.6 327.394 78.5409 327.334 78.4679 327.334H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 318.495V321.87C76.6678 321.944 76.727 322.004 76.7999 322.004C76.8729 322.004 76.9321 321.944 76.9321 321.87V318.495C76.9321 318.421 76.8729 318.361 76.7999 318.361C76.727 318.361 76.6678 318.421 76.6678 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 320.049C75.0592 320.049 75 320.109 75 320.182C75 320.256 75.0592 320.316 75.1322 320.316H78.4679C78.5409 320.316 78.6 320.256 78.6 320.182C78.6 320.109 78.5409 320.049 78.4679 320.049H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 311.21V314.585C76.6678 314.659 76.727 314.719 76.7999 314.719C76.8729 314.719 76.9321 314.659 76.9321 314.585V311.21C76.9321 311.136 76.8729 311.076 76.7999 311.076C76.727 311.076 76.6678 311.136 76.6678 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 312.764C75.0592 312.764 75 312.823 75 312.897C75 312.971 75.0592 313.031 75.1322 313.031H78.4679C78.5409 313.031 78.6 312.971 78.6 312.897C78.6 312.823 78.5409 312.764 78.4679 312.764H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 303.925V307.3C76.6678 307.374 76.727 307.433 76.7999 307.433C76.8729 307.433 76.9321 307.374 76.9321 307.3V303.925C76.9321 303.851 76.8729 303.791 76.7999 303.791C76.727 303.791 76.6678 303.851 76.6678 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 305.478C75.0592 305.478 75 305.538 75 305.612C75 305.686 75.0592 305.746 75.1322 305.746H78.4679C78.5409 305.746 78.6 305.686 78.6 305.612C78.6 305.538 78.5409 305.478 78.4679 305.478H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 296.639V300.014C76.6678 300.088 76.727 300.148 76.7999 300.148C76.8729 300.148 76.9321 300.088 76.9321 300.014V296.639C76.9321 296.565 76.8729 296.506 76.7999 296.506C76.727 296.506 76.6678 296.565 76.6678 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 298.193C75.0592 298.193 75 298.253 75 298.327C75 298.401 75.0592 298.461 75.1322 298.461H78.4679C78.5409 298.461 78.6 298.401 78.6 298.327C78.6 298.253 78.5409 298.193 78.4679 298.193H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 289.354V292.729C76.6678 292.803 76.727 292.863 76.7999 292.863C76.8729 292.863 76.9321 292.803 76.9321 292.729V289.354C76.9321 289.28 76.8729 289.22 76.7999 289.22C76.727 289.22 76.6678 289.28 76.6678 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 290.908C75.0592 290.908 75 290.968 75 291.042C75 291.116 75.0592 291.175 75.1322 291.175H78.4679C78.5409 291.175 78.6 291.116 78.6 291.042C78.6 290.968 78.5409 290.908 78.4679 290.908H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 282.069V285.444C76.6678 285.518 76.727 285.578 76.7999 285.578C76.8729 285.578 76.9321 285.518 76.9321 285.444V282.069C76.9321 281.995 76.8729 281.935 76.7999 281.935C76.727 281.935 76.6678 281.995 76.6678 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 283.623C75.0592 283.623 75 283.683 75 283.757C75 283.83 75.0592 283.89 75.1322 283.89H78.4679C78.5409 283.89 78.6 283.83 78.6 283.757C78.6 283.683 78.5409 283.623 78.4679 283.623H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 274.784V278.159C76.6678 278.233 76.727 278.293 76.7999 278.293C76.8729 278.293 76.9321 278.233 76.9321 278.159V274.784C76.9321 274.71 76.8729 274.65 76.7999 274.65C76.727 274.65 76.6678 274.71 76.6678 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 276.338C75.0592 276.338 75 276.397 75 276.471C75 276.545 75.0592 276.605 75.1322 276.605H78.4679C78.5409 276.605 78.6 276.545 78.6 276.471C78.6 276.397 78.5409 276.338 78.4679 276.338H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 267.499V270.874C76.6678 270.948 76.727 271.007 76.7999 271.007C76.8729 271.007 76.9321 270.948 76.9321 270.874V267.499C76.9321 267.425 76.8729 267.365 76.7999 267.365C76.727 267.365 76.6678 267.425 76.6678 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 269.053C75.0592 269.053 75 269.112 75 269.186C75 269.26 75.0592 269.32 75.1322 269.32H78.4679C78.5409 269.32 78.6 269.26 78.6 269.186C78.6 269.112 78.5409 269.053 78.4679 269.053H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 260.213V263.589C76.6678 263.662 76.727 263.722 76.7999 263.722C76.8729 263.722 76.9321 263.662 76.9321 263.589V260.213C76.9321 260.14 76.8729 260.08 76.7999 260.08C76.727 260.08 76.6678 260.14 76.6678 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 261.767C75.0592 261.767 75 261.827 75 261.901C75 261.975 75.0592 262.035 75.1322 262.035H78.4679C78.5409 262.035 78.6 261.975 78.6 261.901C78.6 261.827 78.5409 261.767 78.4679 261.767H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 252.928L76.6678 256.303C76.6678 256.377 76.727 256.437 76.7999 256.437C76.8729 256.437 76.9321 256.377 76.9321 256.303L76.9321 252.928C76.9321 252.854 76.8729 252.794 76.7999 252.794C76.727 252.794 76.6678 252.854 76.6678 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 254.482C75.0592 254.482 75 254.542 75 254.616C75 254.69 75.0592 254.75 75.1322 254.75H78.4679C78.5409 254.75 78.6 254.69 78.6 254.616C78.6 254.542 78.5409 254.482 78.4679 254.482H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 245.643V249.018C76.6678 249.092 76.727 249.152 76.7999 249.152C76.8729 249.152 76.9321 249.092 76.9321 249.018V245.643C76.9321 245.569 76.8729 245.509 76.7999 245.509C76.727 245.509 76.6678 245.569 76.6678 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 247.197C75.0592 247.197 75 247.257 75 247.331C75 247.405 75.0592 247.464 75.1322 247.464H78.4679C78.5409 247.464 78.6 247.405 78.6 247.331C78.6 247.257 78.5409 247.197 78.4679 247.197H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 238.358V241.733C76.6678 241.807 76.727 241.867 76.7999 241.867C76.8729 241.867 76.9321 241.807 76.9321 241.733V238.358C76.9321 238.284 76.8729 238.224 76.7999 238.224C76.727 238.224 76.6678 238.284 76.6678 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 239.912C75.0592 239.912 75 239.972 75 240.046C75 240.119 75.0592 240.179 75.1322 240.179H78.4679C78.5409 240.179 78.6 240.119 78.6 240.046C78.6 239.972 78.5409 239.912 78.4679 239.912H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 369.491V372.866C83.8679 372.94 83.927 373 84 373C84.073 373 84.1322 372.94 84.1322 372.866V369.491C84.1322 369.417 84.073 369.357 84 369.357C83.927 369.357 83.8679 369.417 83.8679 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 371.045C82.2591 371.045 82.1999 371.105 82.1999 371.179C82.1999 371.253 82.2591 371.312 82.3321 371.312H85.6678C85.7408 371.312 85.7999 371.253 85.7999 371.179C85.7999 371.105 85.7408 371.045 85.6678 371.045H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 362.206V365.581C83.8679 365.655 83.927 365.715 84 365.715C84.073 365.715 84.1322 365.655 84.1322 365.581V362.206C84.1322 362.132 84.073 362.072 84 362.072C83.927 362.072 83.8679 362.132 83.8679 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 363.76C82.2591 363.76 82.1999 363.82 82.1999 363.893C82.1999 363.967 82.2591 364.027 82.3321 364.027H85.6678C85.7408 364.027 85.7999 363.967 85.7999 363.893C85.7999 363.82 85.7408 363.76 85.6678 363.76H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 354.921V358.296C83.8679 358.37 83.927 358.43 84 358.43C84.073 358.43 84.1322 358.37 84.1322 358.296V354.921C84.1322 354.847 84.073 354.787 84 354.787C83.927 354.787 83.8679 354.847 83.8679 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 356.475C82.2591 356.475 82.1999 356.535 82.1999 356.608C82.1999 356.682 82.2591 356.742 82.3321 356.742H85.6678C85.7408 356.742 85.7999 356.682 85.7999 356.608C85.7999 356.535 85.7408 356.475 85.6678 356.475H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 347.636V351.011C83.8679 351.085 83.927 351.144 84 351.144C84.073 351.144 84.1322 351.085 84.1322 351.011V347.636C84.1322 347.562 84.073 347.502 84 347.502C83.927 347.502 83.8679 347.562 83.8679 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 349.189C82.2591 349.189 82.1999 349.249 82.1999 349.323C82.1999 349.397 82.2591 349.457 82.3321 349.457H85.6678C85.7408 349.457 85.7999 349.397 85.7999 349.323C85.7999 349.249 85.7408 349.189 85.6678 349.189H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 340.35V343.726C83.8679 343.799 83.927 343.859 84 343.859C84.073 343.859 84.1322 343.799 84.1322 343.726V340.35C84.1322 340.277 84.073 340.217 84 340.217C83.927 340.217 83.8679 340.277 83.8679 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 341.904C82.2591 341.904 82.1999 341.964 82.1999 342.038C82.1999 342.112 82.2591 342.172 82.3321 342.172H85.6678C85.7408 342.172 85.7999 342.112 85.7999 342.038C85.7999 341.964 85.7408 341.904 85.6678 341.904H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 333.065V336.44C83.8679 336.514 83.927 336.574 84 336.574C84.073 336.574 84.1322 336.514 84.1322 336.44V333.065C84.1322 332.991 84.073 332.932 84 332.932C83.927 332.932 83.8679 332.991 83.8679 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 334.619C82.2591 334.619 82.1999 334.679 82.1999 334.753C82.1999 334.827 82.2591 334.887 82.3321 334.887H85.6678C85.7408 334.887 85.7999 334.827 85.7999 334.753C85.7999 334.679 85.7408 334.619 85.6678 334.619H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 325.78V329.155C83.8679 329.229 83.927 329.289 84 329.289C84.073 329.289 84.1322 329.229 84.1322 329.155V325.78C84.1322 325.706 84.073 325.646 84 325.646C83.927 325.646 83.8679 325.706 83.8679 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 327.334C82.2591 327.334 82.1999 327.394 82.1999 327.468C82.1999 327.541 82.2591 327.601 82.3321 327.601H85.6678C85.7408 327.601 85.7999 327.541 85.7999 327.468C85.7999 327.394 85.7408 327.334 85.6678 327.334H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 318.495V321.87C83.8679 321.944 83.927 322.004 84 322.004C84.073 322.004 84.1322 321.944 84.1322 321.87V318.495C84.1322 318.421 84.073 318.361 84 318.361C83.927 318.361 83.8679 318.421 83.8679 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 320.049C82.2591 320.049 82.1999 320.109 82.1999 320.182C82.1999 320.256 82.2591 320.316 82.3321 320.316H85.6678C85.7408 320.316 85.7999 320.256 85.7999 320.182C85.7999 320.109 85.7408 320.049 85.6678 320.049H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 311.21V314.585C83.8679 314.659 83.927 314.719 84 314.719C84.073 314.719 84.1322 314.659 84.1322 314.585V311.21C84.1322 311.136 84.073 311.076 84 311.076C83.927 311.076 83.8679 311.136 83.8679 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 312.764C82.2591 312.764 82.1999 312.823 82.1999 312.897C82.1999 312.971 82.2591 313.031 82.3321 313.031H85.6678C85.7408 313.031 85.7999 312.971 85.7999 312.897C85.7999 312.823 85.7408 312.764 85.6678 312.764H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 303.925V307.3C83.8679 307.374 83.927 307.433 84 307.433C84.073 307.433 84.1322 307.374 84.1322 307.3V303.925C84.1322 303.851 84.073 303.791 84 303.791C83.927 303.791 83.8679 303.851 83.8679 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 305.478C82.2591 305.478 82.1999 305.538 82.1999 305.612C82.1999 305.686 82.2591 305.746 82.3321 305.746H85.6678C85.7408 305.746 85.7999 305.686 85.7999 305.612C85.7999 305.538 85.7408 305.478 85.6678 305.478H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 296.639V300.014C83.8679 300.088 83.927 300.148 84 300.148C84.073 300.148 84.1322 300.088 84.1322 300.014V296.639C84.1322 296.565 84.073 296.506 84 296.506C83.927 296.506 83.8679 296.565 83.8679 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 298.193C82.2591 298.193 82.1999 298.253 82.1999 298.327C82.1999 298.401 82.2591 298.461 82.3321 298.461H85.6678C85.7408 298.461 85.7999 298.401 85.7999 298.327C85.7999 298.253 85.7408 298.193 85.6678 298.193H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 289.354V292.729C83.8679 292.803 83.927 292.863 84 292.863C84.073 292.863 84.1322 292.803 84.1322 292.729V289.354C84.1322 289.28 84.073 289.22 84 289.22C83.927 289.22 83.8679 289.28 83.8679 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 290.908C82.2591 290.908 82.1999 290.968 82.1999 291.042C82.1999 291.116 82.2591 291.175 82.3321 291.175H85.6678C85.7408 291.175 85.7999 291.116 85.7999 291.042C85.7999 290.968 85.7408 290.908 85.6678 290.908H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 282.069V285.444C83.8679 285.518 83.927 285.578 84 285.578C84.073 285.578 84.1322 285.518 84.1322 285.444V282.069C84.1322 281.995 84.073 281.935 84 281.935C83.927 281.935 83.8679 281.995 83.8679 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 283.623C82.2591 283.623 82.1999 283.683 82.1999 283.757C82.1999 283.83 82.2591 283.89 82.3321 283.89H85.6678C85.7408 283.89 85.7999 283.83 85.7999 283.757C85.7999 283.683 85.7408 283.623 85.6678 283.623H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 274.784V278.159C83.8679 278.233 83.927 278.293 84 278.293C84.073 278.293 84.1322 278.233 84.1322 278.159V274.784C84.1322 274.71 84.073 274.65 84 274.65C83.927 274.65 83.8679 274.71 83.8679 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 276.338C82.2591 276.338 82.1999 276.397 82.1999 276.471C82.1999 276.545 82.2591 276.605 82.3321 276.605H85.6678C85.7408 276.605 85.7999 276.545 85.7999 276.471C85.7999 276.397 85.7408 276.338 85.6678 276.338H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 267.499V270.874C83.8679 270.948 83.927 271.007 84 271.007C84.073 271.007 84.1322 270.948 84.1322 270.874V267.499C84.1322 267.425 84.073 267.365 84 267.365C83.927 267.365 83.8679 267.425 83.8679 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 269.053C82.2591 269.053 82.1999 269.112 82.1999 269.186C82.1999 269.26 82.2591 269.32 82.3321 269.32H85.6678C85.7408 269.32 85.7999 269.26 85.7999 269.186C85.7999 269.112 85.7408 269.053 85.6678 269.053H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 260.213V263.589C83.8679 263.662 83.927 263.722 84 263.722C84.073 263.722 84.1322 263.662 84.1322 263.589V260.213C84.1322 260.14 84.073 260.08 84 260.08C83.927 260.08 83.8679 260.14 83.8679 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 261.767C82.2591 261.767 82.1999 261.827 82.1999 261.901C82.1999 261.975 82.2591 262.035 82.3321 262.035H85.6678C85.7408 262.035 85.7999 261.975 85.7999 261.901C85.7999 261.827 85.7408 261.767 85.6678 261.767H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 252.928V256.303C83.8679 256.377 83.927 256.437 84 256.437C84.073 256.437 84.1322 256.377 84.1322 256.303V252.928C84.1322 252.854 84.073 252.794 84 252.794C83.927 252.794 83.8679 252.854 83.8679 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 254.482C82.2591 254.482 82.1999 254.542 82.1999 254.616C82.1999 254.69 82.2591 254.75 82.3321 254.75H85.6678C85.7408 254.75 85.7999 254.69 85.7999 254.616C85.7999 254.542 85.7408 254.482 85.6678 254.482H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 245.643V249.018C83.8679 249.092 83.927 249.152 84 249.152C84.073 249.152 84.1322 249.092 84.1322 249.018V245.643C84.1322 245.569 84.073 245.509 84 245.509C83.927 245.509 83.8679 245.569 83.8679 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 247.197C82.2591 247.197 82.1999 247.257 82.1999 247.331C82.1999 247.405 82.2591 247.464 82.3321 247.464H85.6678C85.7408 247.464 85.7999 247.405 85.7999 247.331C85.7999 247.257 85.7408 247.197 85.6678 247.197H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 238.358V241.733C83.8679 241.807 83.927 241.867 84 241.867C84.073 241.867 84.1322 241.807 84.1322 241.733V238.358C84.1322 238.284 84.073 238.224 84 238.224C83.927 238.224 83.8679 238.284 83.8679 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 239.912C82.2591 239.912 82.1999 239.972 82.1999 240.046C82.1999 240.119 82.2591 240.179 82.3321 240.179H85.6678C85.7408 240.179 85.7999 240.119 85.7999 240.046C85.7999 239.972 85.7408 239.912 85.6678 239.912H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 369.491V372.866C91.0678 372.94 91.1269 373 91.1999 373C91.2729 373 91.3321 372.94 91.3321 372.866V369.491C91.3321 369.417 91.2729 369.357 91.1999 369.357C91.1269 369.357 91.0678 369.417 91.0678 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 371.045C89.4591 371.045 89.4 371.105 89.4 371.179C89.4 371.253 89.4591 371.312 89.5321 371.312H92.8678C92.9408 371.312 93 371.253 93 371.179C93 371.105 92.9408 371.045 92.8678 371.045H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 362.206V365.581C91.0678 365.655 91.1269 365.715 91.1999 365.715C91.2729 365.715 91.3321 365.655 91.3321 365.581V362.206C91.3321 362.132 91.2729 362.072 91.1999 362.072C91.1269 362.072 91.0678 362.132 91.0678 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 363.76C89.4591 363.76 89.4 363.82 89.4 363.893C89.4 363.967 89.4591 364.027 89.5321 364.027H92.8678C92.9408 364.027 93 363.967 93 363.893C93 363.82 92.9408 363.76 92.8678 363.76H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 354.921V358.296C91.0678 358.37 91.1269 358.43 91.1999 358.43C91.2729 358.43 91.3321 358.37 91.3321 358.296V354.921C91.3321 354.847 91.2729 354.787 91.1999 354.787C91.1269 354.787 91.0678 354.847 91.0678 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 356.475C89.4591 356.475 89.4 356.535 89.4 356.608C89.4 356.682 89.4591 356.742 89.5321 356.742H92.8678C92.9408 356.742 93 356.682 93 356.608C93 356.535 92.9408 356.475 92.8678 356.475H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 347.636V351.011C91.0678 351.085 91.1269 351.144 91.1999 351.144C91.2729 351.144 91.3321 351.085 91.3321 351.011V347.636C91.3321 347.562 91.2729 347.502 91.1999 347.502C91.1269 347.502 91.0678 347.562 91.0678 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 349.189C89.4591 349.189 89.4 349.249 89.4 349.323C89.4 349.397 89.4591 349.457 89.5321 349.457H92.8678C92.9408 349.457 93 349.397 93 349.323C93 349.249 92.9408 349.189 92.8678 349.189H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 340.35V343.726C91.0678 343.799 91.1269 343.859 91.1999 343.859C91.2729 343.859 91.3321 343.799 91.3321 343.726V340.35C91.3321 340.277 91.2729 340.217 91.1999 340.217C91.1269 340.217 91.0678 340.277 91.0678 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 341.904C89.4591 341.904 89.4 341.964 89.4 342.038C89.4 342.112 89.4591 342.172 89.5321 342.172H92.8678C92.9408 342.172 93 342.112 93 342.038C93 341.964 92.9408 341.904 92.8678 341.904H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 333.065V336.44C91.0678 336.514 91.1269 336.574 91.1999 336.574C91.2729 336.574 91.3321 336.514 91.3321 336.44V333.065C91.3321 332.991 91.2729 332.932 91.1999 332.932C91.1269 332.932 91.0678 332.991 91.0678 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 334.619C89.4591 334.619 89.4 334.679 89.4 334.753C89.4 334.827 89.4591 334.887 89.5321 334.887H92.8678C92.9408 334.887 93 334.827 93 334.753C93 334.679 92.9408 334.619 92.8678 334.619H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 325.78V329.155C91.0678 329.229 91.1269 329.289 91.1999 329.289C91.2729 329.289 91.3321 329.229 91.3321 329.155V325.78C91.3321 325.706 91.2729 325.646 91.1999 325.646C91.1269 325.646 91.0678 325.706 91.0678 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 327.334C89.4591 327.334 89.4 327.394 89.4 327.468C89.4 327.541 89.4591 327.601 89.5321 327.601H92.8678C92.9408 327.601 93 327.541 93 327.468C93 327.394 92.9408 327.334 92.8678 327.334H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 318.495V321.87C91.0678 321.944 91.1269 322.004 91.1999 322.004C91.2729 322.004 91.3321 321.944 91.3321 321.87V318.495C91.3321 318.421 91.2729 318.361 91.1999 318.361C91.1269 318.361 91.0678 318.421 91.0678 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 320.049C89.4591 320.049 89.4 320.109 89.4 320.182C89.4 320.256 89.4591 320.316 89.5321 320.316H92.8678C92.9408 320.316 93 320.256 93 320.182C93 320.109 92.9408 320.049 92.8678 320.049H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 311.21V314.585C91.0678 314.659 91.1269 314.719 91.1999 314.719C91.2729 314.719 91.3321 314.659 91.3321 314.585V311.21C91.3321 311.136 91.2729 311.076 91.1999 311.076C91.1269 311.076 91.0678 311.136 91.0678 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 312.764C89.4591 312.764 89.4 312.823 89.4 312.897C89.4 312.971 89.4591 313.031 89.5321 313.031H92.8678C92.9408 313.031 93 312.971 93 312.897C93 312.823 92.9408 312.764 92.8678 312.764H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 303.925V307.3C91.0678 307.374 91.1269 307.433 91.1999 307.433C91.2729 307.433 91.3321 307.374 91.3321 307.3V303.925C91.3321 303.851 91.2729 303.791 91.1999 303.791C91.1269 303.791 91.0678 303.851 91.0678 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 305.478C89.4591 305.478 89.4 305.538 89.4 305.612C89.4 305.686 89.4591 305.746 89.5321 305.746H92.8678C92.9408 305.746 93 305.686 93 305.612C93 305.538 92.9408 305.478 92.8678 305.478H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 296.639V300.014C91.0678 300.088 91.1269 300.148 91.1999 300.148C91.2729 300.148 91.3321 300.088 91.3321 300.014V296.639C91.3321 296.565 91.2729 296.506 91.1999 296.506C91.1269 296.506 91.0678 296.565 91.0678 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 298.193C89.4591 298.193 89.4 298.253 89.4 298.327C89.4 298.401 89.4591 298.461 89.5321 298.461H92.8678C92.9408 298.461 93 298.401 93 298.327C93 298.253 92.9408 298.193 92.8678 298.193H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 289.354V292.729C91.0678 292.803 91.1269 292.863 91.1999 292.863C91.2729 292.863 91.3321 292.803 91.3321 292.729V289.354C91.3321 289.28 91.2729 289.22 91.1999 289.22C91.1269 289.22 91.0678 289.28 91.0678 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 290.908C89.4591 290.908 89.4 290.968 89.4 291.042C89.4 291.116 89.4591 291.175 89.5321 291.175H92.8678C92.9408 291.175 93 291.116 93 291.042C93 290.968 92.9408 290.908 92.8678 290.908H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 282.069V285.444C91.0678 285.518 91.1269 285.578 91.1999 285.578C91.2729 285.578 91.3321 285.518 91.3321 285.444V282.069C91.3321 281.995 91.2729 281.935 91.1999 281.935C91.1269 281.935 91.0678 281.995 91.0678 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 283.623C89.4591 283.623 89.4 283.683 89.4 283.757C89.4 283.83 89.4591 283.89 89.5321 283.89H92.8678C92.9408 283.89 93 283.83 93 283.757C93 283.683 92.9408 283.623 92.8678 283.623H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 274.784V278.159C91.0678 278.233 91.1269 278.293 91.1999 278.293C91.2729 278.293 91.3321 278.233 91.3321 278.159V274.784C91.3321 274.71 91.2729 274.65 91.1999 274.65C91.1269 274.65 91.0678 274.71 91.0678 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 276.338C89.4591 276.338 89.4 276.397 89.4 276.471C89.4 276.545 89.4591 276.605 89.5321 276.605H92.8678C92.9408 276.605 93 276.545 93 276.471C93 276.397 92.9408 276.338 92.8678 276.338H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 267.499V270.874C91.0678 270.948 91.1269 271.007 91.1999 271.007C91.2729 271.007 91.3321 270.948 91.3321 270.874V267.499C91.3321 267.425 91.2729 267.365 91.1999 267.365C91.1269 267.365 91.0678 267.425 91.0678 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 269.053C89.4591 269.053 89.4 269.112 89.4 269.186C89.4 269.26 89.4591 269.32 89.5321 269.32H92.8678C92.9408 269.32 93 269.26 93 269.186C93 269.112 92.9408 269.053 92.8678 269.053H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 260.213V263.589C91.0678 263.662 91.1269 263.722 91.1999 263.722C91.2729 263.722 91.3321 263.662 91.3321 263.589V260.213C91.3321 260.14 91.2729 260.08 91.1999 260.08C91.1269 260.08 91.0678 260.14 91.0678 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 261.767C89.4591 261.767 89.4 261.827 89.4 261.901C89.4 261.975 89.4591 262.035 89.5321 262.035H92.8678C92.9408 262.035 93 261.975 93 261.901C93 261.827 92.9408 261.767 92.8678 261.767H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 252.928V256.303C91.0678 256.377 91.1269 256.437 91.1999 256.437C91.2729 256.437 91.3321 256.377 91.3321 256.303V252.928C91.3321 252.854 91.2729 252.794 91.1999 252.794C91.1269 252.794 91.0678 252.854 91.0678 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 254.482C89.4591 254.482 89.4 254.542 89.4 254.616C89.4 254.69 89.4591 254.75 89.5321 254.75H92.8678C92.9408 254.75 93 254.69 93 254.616C93 254.542 92.9408 254.482 92.8678 254.482H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 245.643V249.018C91.0678 249.092 91.1269 249.152 91.1999 249.152C91.2729 249.152 91.3321 249.092 91.3321 249.018V245.643C91.3321 245.569 91.2729 245.509 91.1999 245.509C91.1269 245.509 91.0678 245.569 91.0678 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 247.197C89.4591 247.197 89.4 247.257 89.4 247.331C89.4 247.405 89.4591 247.464 89.5321 247.464H92.8678C92.9408 247.464 93 247.405 93 247.331C93 247.257 92.9408 247.197 92.8678 247.197H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 238.358V241.733C91.0678 241.807 91.1269 241.867 91.1999 241.867C91.2729 241.867 91.3321 241.807 91.3321 241.733V238.358C91.3321 238.284 91.2729 238.224 91.1999 238.224C91.1269 238.224 91.0678 238.284 91.0678 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 239.912C89.4591 239.912 89.4 239.972 89.4 240.046C89.4 240.119 89.4591 240.179 89.5321 240.179H92.8678C92.9408 240.179 93 240.119 93 240.046C93 239.972 92.9408 239.912 92.8678 239.912H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 238.358V241.733C76.6678 241.807 76.727 241.867 76.7999 241.867C76.8729 241.867 76.9321 241.807 76.9321 241.733V238.358C76.9321 238.284 76.8729 238.224 76.7999 238.224C76.727 238.224 76.6678 238.284 76.6678 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 239.912C75.0592 239.912 75 239.972 75 240.046C75 240.119 75.0592 240.179 75.1322 240.179H78.4679C78.5409 240.179 78.6 240.119 78.6 240.046C78.6 239.972 78.5409 239.912 78.4679 239.912H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 231.073V234.448C76.6678 234.522 76.7269 234.582 76.7999 234.582C76.8729 234.582 76.9321 234.522 76.9321 234.448V231.073C76.9321 230.999 76.8729 230.939 76.7999 230.939C76.7269 230.939 76.6678 230.999 76.6678 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 232.626C75.0592 232.626 75 232.686 75 232.76C75 232.834 75.0592 232.894 75.1322 232.894H78.4679C78.5408 232.894 78.6 232.834 78.6 232.76C78.6 232.686 78.5408 232.626 78.4679 232.626H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 223.788V227.163C76.6678 227.236 76.7269 227.296 76.7999 227.296C76.8729 227.296 76.9321 227.236 76.9321 227.163V223.788C76.9321 223.714 76.8729 223.654 76.7999 223.654C76.7269 223.654 76.6678 223.714 76.6678 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 225.341C75.0592 225.341 75 225.401 75 225.475C75 225.549 75.0592 225.609 75.1322 225.609H78.4679C78.5408 225.609 78.6 225.549 78.6 225.475C78.6 225.401 78.5408 225.341 78.4679 225.341H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 216.502V219.877C76.6678 219.951 76.7269 220.011 76.7999 220.011C76.8729 220.011 76.9321 219.951 76.9321 219.877V216.502C76.9321 216.428 76.8729 216.369 76.7999 216.369C76.7269 216.369 76.6678 216.428 76.6678 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 218.056C75.0592 218.056 75 218.116 75 218.19C75 218.264 75.0592 218.324 75.1322 218.324H78.4679C78.5408 218.324 78.6 218.264 78.6 218.19C78.6 218.116 78.5408 218.056 78.4679 218.056H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 209.217V212.592C76.6678 212.666 76.7269 212.726 76.7999 212.726C76.8729 212.726 76.9321 212.666 76.9321 212.592V209.217C76.9321 209.143 76.8729 209.083 76.7999 209.083C76.7269 209.083 76.6678 209.143 76.6678 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 210.771C75.0592 210.771 75 210.831 75 210.905C75 210.979 75.0592 211.038 75.1322 211.038H78.4679C78.5408 211.038 78.6 210.979 78.6 210.905C78.6 210.831 78.5408 210.771 78.4679 210.771H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 201.932V205.307C76.6678 205.381 76.7269 205.441 76.7999 205.441C76.8729 205.441 76.9321 205.381 76.9321 205.307V201.932C76.9321 201.858 76.8729 201.798 76.7999 201.798C76.7269 201.798 76.6678 201.858 76.6678 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 203.486C75.0592 203.486 75 203.546 75 203.62C75 203.693 75.0592 203.753 75.1322 203.753H78.4679C78.5408 203.753 78.6 203.693 78.6 203.62C78.6 203.546 78.5408 203.486 78.4679 203.486H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 194.647V198.022C76.6678 198.096 76.7269 198.156 76.7999 198.156C76.8729 198.156 76.9321 198.096 76.9321 198.022V194.647C76.9321 194.573 76.8729 194.513 76.7999 194.513C76.7269 194.513 76.6678 194.573 76.6678 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 196.201C75.0592 196.201 75 196.26 75 196.334C75 196.408 75.0592 196.468 75.1322 196.468H78.4679C78.5408 196.468 78.6 196.408 78.6 196.334C78.6 196.26 78.5408 196.201 78.4679 196.201H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 187.362V190.737C76.6678 190.811 76.7269 190.871 76.7999 190.871C76.8729 190.871 76.9321 190.811 76.9321 190.737V187.362C76.9321 187.288 76.8729 187.228 76.7999 187.228C76.7269 187.228 76.6678 187.288 76.6678 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 188.915C75.0592 188.915 75 188.975 75 189.049C75 189.123 75.0592 189.183 75.1322 189.183H78.4679C78.5408 189.183 78.6 189.123 78.6 189.049C78.6 188.975 78.5408 188.915 78.4679 188.915H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 180.076V183.452C76.6678 183.525 76.7269 183.585 76.7999 183.585C76.8729 183.585 76.9321 183.525 76.9321 183.452V180.076C76.9321 180.003 76.8729 179.943 76.7999 179.943C76.7269 179.943 76.6678 180.003 76.6678 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 181.63C75.0592 181.63 75 181.69 75 181.764C75 181.838 75.0592 181.898 75.1322 181.898H78.4679C78.5408 181.898 78.6 181.838 78.6 181.764C78.6 181.69 78.5408 181.63 78.4679 181.63H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 172.791V176.166C76.6678 176.24 76.7269 176.3 76.7999 176.3C76.8729 176.3 76.9321 176.24 76.9321 176.166V172.791C76.9321 172.717 76.8729 172.658 76.7999 172.658C76.7269 172.658 76.6678 172.717 76.6678 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 174.345C75.0592 174.345 75 174.405 75 174.479C75 174.553 75.0592 174.612 75.1322 174.612H78.4679C78.5408 174.612 78.6 174.553 78.6 174.479C78.6 174.405 78.5408 174.345 78.4679 174.345H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 165.506V168.881C76.6678 168.955 76.7269 169.015 76.7999 169.015C76.8729 169.015 76.9321 168.955 76.9321 168.881V165.506C76.9321 165.432 76.8729 165.372 76.7999 165.372C76.7269 165.372 76.6678 165.432 76.6678 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 167.06C75.0592 167.06 75 167.12 75 167.194C75 167.267 75.0592 167.327 75.1322 167.327H78.4679C78.5408 167.327 78.6 167.267 78.6 167.194C78.6 167.12 78.5408 167.06 78.4679 167.06H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 158.221V161.596C76.6678 161.67 76.7269 161.73 76.7999 161.73C76.8729 161.73 76.9321 161.67 76.9321 161.596V158.221C76.9321 158.147 76.8729 158.087 76.7999 158.087C76.7269 158.087 76.6678 158.147 76.6678 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 159.775C75.0592 159.775 75 159.835 75 159.908C75 159.982 75.0592 160.042 75.1322 160.042H78.4679C78.5408 160.042 78.6 159.982 78.6 159.908C78.6 159.835 78.5408 159.775 78.4679 159.775H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 150.936V154.311C76.6678 154.385 76.7269 154.445 76.7999 154.445C76.8729 154.445 76.9321 154.385 76.9321 154.311V150.936C76.9321 150.862 76.8729 150.802 76.7999 150.802C76.7269 150.802 76.6678 150.862 76.6678 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 152.49C75.0592 152.49 75 152.549 75 152.623C75 152.697 75.0592 152.757 75.1322 152.757H78.4679C78.5408 152.757 78.6 152.697 78.6 152.623C78.6 152.549 78.5408 152.49 78.4679 152.49H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 143.65V147.026C76.6678 147.099 76.7269 147.159 76.7999 147.159C76.8729 147.159 76.9321 147.099 76.9321 147.026V143.65C76.9321 143.577 76.8729 143.517 76.7999 143.517C76.7269 143.517 76.6678 143.577 76.6678 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 145.204C75.0592 145.204 75 145.264 75 145.338C75 145.412 75.0592 145.472 75.1322 145.472H78.4679C78.5408 145.472 78.6 145.412 78.6 145.338C78.6 145.264 78.5408 145.204 78.4679 145.204H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 136.365V139.74C76.6678 139.814 76.7269 139.874 76.7999 139.874C76.8729 139.874 76.9321 139.814 76.9321 139.74V136.365C76.9321 136.291 76.8729 136.232 76.7999 136.232C76.7269 136.232 76.6678 136.291 76.6678 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 137.919C75.0592 137.919 75 137.979 75 138.053C75 138.127 75.0592 138.187 75.1322 138.187H78.4679C78.5408 138.187 78.6 138.127 78.6 138.053C78.6 137.979 78.5408 137.919 78.4679 137.919H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 129.08V132.455C76.6678 132.529 76.7269 132.589 76.7999 132.589C76.8729 132.589 76.9321 132.529 76.9321 132.455V129.08C76.9321 129.006 76.8729 128.946 76.7999 128.946C76.7269 128.946 76.6678 129.006 76.6678 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 130.634C75.0592 130.634 75 130.694 75 130.768C75 130.842 75.0592 130.902 75.1322 130.902H78.4679C78.5408 130.902 78.6 130.842 78.6 130.768C78.6 130.694 78.5408 130.634 78.4679 130.634H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 121.795V125.17C76.6678 125.244 76.7269 125.304 76.7999 125.304C76.8729 125.304 76.9321 125.244 76.9321 125.17V121.795C76.9321 121.721 76.8729 121.661 76.7999 121.661C76.7269 121.661 76.6678 121.721 76.6678 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 123.349C75.0592 123.349 75 123.409 75 123.483C75 123.556 75.0592 123.616 75.1322 123.616H78.4679C78.5408 123.616 78.6 123.556 78.6 123.483C78.6 123.409 78.5408 123.349 78.4679 123.349H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 114.51V117.885C76.6678 117.959 76.7269 118.019 76.7999 118.019C76.8729 118.019 76.9321 117.959 76.9321 117.885V114.51C76.9321 114.436 76.8729 114.376 76.7999 114.376C76.7269 114.376 76.6678 114.436 76.6678 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 116.064C75.0592 116.064 75 116.124 75 116.197C75 116.271 75.0592 116.331 75.1322 116.331H78.4679C78.5408 116.331 78.6 116.271 78.6 116.197C78.6 116.124 78.5408 116.064 78.4679 116.064H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M76.6678 107.225V110.6C76.6678 110.674 76.7269 110.734 76.7999 110.734C76.8729 110.734 76.9321 110.674 76.9321 110.6V107.225C76.9321 107.151 76.8729 107.091 76.7999 107.091C76.7269 107.091 76.6678 107.151 76.6678 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M75.1322 108.779C75.0592 108.779 75 108.838 75 108.912C75 108.986 75.0592 109.046 75.1322 109.046H78.4679C78.5408 109.046 78.6 108.986 78.6 108.912C78.6 108.838 78.5408 108.779 78.4679 108.779H75.1322Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8679 238.358V241.733C83.8679 241.807 83.927 241.867 84 241.867C84.073 241.867 84.1322 241.807 84.1322 241.733V238.358C84.1322 238.284 84.073 238.224 84 238.224C83.927 238.224 83.8679 238.284 83.8679 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 239.912C82.2591 239.912 82.1999 239.972 82.1999 240.046C82.1999 240.119 82.2591 240.179 82.3321 240.179H85.6678C85.7408 240.179 85.7999 240.119 85.7999 240.046C85.7999 239.972 85.7408 239.912 85.6678 239.912H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 231.073V234.448C83.8678 234.522 83.927 234.582 84 234.582C84.073 234.582 84.1322 234.522 84.1322 234.448V231.073C84.1322 230.999 84.073 230.939 84 230.939C83.927 230.939 83.8678 230.999 83.8678 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 232.626C82.2591 232.626 82.1999 232.686 82.1999 232.76C82.1999 232.834 82.2591 232.894 82.3321 232.894H85.6678C85.7407 232.894 85.7999 232.834 85.7999 232.76C85.7999 232.686 85.7407 232.626 85.6678 232.626H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 223.788V227.163C83.8678 227.236 83.927 227.296 84 227.296C84.073 227.296 84.1322 227.236 84.1322 227.163V223.788C84.1322 223.714 84.073 223.654 84 223.654C83.927 223.654 83.8678 223.714 83.8678 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 225.341C82.2591 225.341 82.1999 225.401 82.1999 225.475C82.1999 225.549 82.2591 225.609 82.3321 225.609H85.6678C85.7407 225.609 85.7999 225.549 85.7999 225.475C85.7999 225.401 85.7407 225.341 85.6678 225.341H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 216.502V219.877C83.8678 219.951 83.927 220.011 84 220.011C84.073 220.011 84.1322 219.951 84.1322 219.877V216.502C84.1322 216.428 84.073 216.369 84 216.369C83.927 216.369 83.8678 216.428 83.8678 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 218.056C82.2591 218.056 82.1999 218.116 82.1999 218.19C82.1999 218.264 82.2591 218.324 82.3321 218.324H85.6678C85.7407 218.324 85.7999 218.264 85.7999 218.19C85.7999 218.116 85.7407 218.056 85.6678 218.056H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 209.217V212.592C83.8678 212.666 83.927 212.726 84 212.726C84.073 212.726 84.1322 212.666 84.1322 212.592V209.217C84.1322 209.143 84.073 209.083 84 209.083C83.927 209.083 83.8678 209.143 83.8678 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 210.771C82.2591 210.771 82.1999 210.831 82.1999 210.905C82.1999 210.979 82.2591 211.038 82.3321 211.038H85.6678C85.7407 211.038 85.7999 210.979 85.7999 210.905C85.7999 210.831 85.7407 210.771 85.6678 210.771H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 201.932V205.307C83.8678 205.381 83.927 205.441 84 205.441C84.073 205.441 84.1322 205.381 84.1322 205.307V201.932C84.1322 201.858 84.073 201.798 84 201.798C83.927 201.798 83.8678 201.858 83.8678 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 203.486C82.2591 203.486 82.1999 203.546 82.1999 203.62C82.1999 203.693 82.2591 203.753 82.3321 203.753H85.6678C85.7407 203.753 85.7999 203.693 85.7999 203.62C85.7999 203.546 85.7407 203.486 85.6678 203.486H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 194.647V198.022C83.8678 198.096 83.927 198.156 84 198.156C84.073 198.156 84.1322 198.096 84.1322 198.022V194.647C84.1322 194.573 84.073 194.513 84 194.513C83.927 194.513 83.8678 194.573 83.8678 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 196.201C82.2591 196.201 82.1999 196.26 82.1999 196.334C82.1999 196.408 82.2591 196.468 82.3321 196.468H85.6678C85.7407 196.468 85.7999 196.408 85.7999 196.334C85.7999 196.26 85.7407 196.201 85.6678 196.201H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 187.362V190.737C83.8678 190.811 83.927 190.871 84 190.871C84.073 190.871 84.1322 190.811 84.1322 190.737V187.362C84.1322 187.288 84.073 187.228 84 187.228C83.927 187.228 83.8678 187.288 83.8678 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 188.915C82.2591 188.915 82.1999 188.975 82.1999 189.049C82.1999 189.123 82.2591 189.183 82.3321 189.183H85.6678C85.7407 189.183 85.7999 189.123 85.7999 189.049C85.7999 188.975 85.7407 188.915 85.6678 188.915H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 180.076V183.452C83.8678 183.525 83.927 183.585 84 183.585C84.073 183.585 84.1322 183.525 84.1322 183.452V180.076C84.1322 180.003 84.073 179.943 84 179.943C83.927 179.943 83.8678 180.003 83.8678 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 181.63C82.2591 181.63 82.1999 181.69 82.1999 181.764C82.1999 181.838 82.2591 181.898 82.3321 181.898H85.6678C85.7407 181.898 85.7999 181.838 85.7999 181.764C85.7999 181.69 85.7407 181.63 85.6678 181.63H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 172.791V176.166C83.8678 176.24 83.927 176.3 84 176.3C84.073 176.3 84.1322 176.24 84.1322 176.166V172.791C84.1322 172.717 84.073 172.658 84 172.658C83.927 172.658 83.8678 172.717 83.8678 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 174.345C82.2591 174.345 82.1999 174.405 82.1999 174.479C82.1999 174.553 82.2591 174.612 82.3321 174.612H85.6678C85.7407 174.612 85.7999 174.553 85.7999 174.479C85.7999 174.405 85.7407 174.345 85.6678 174.345H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 165.506V168.881C83.8678 168.955 83.927 169.015 84 169.015C84.073 169.015 84.1322 168.955 84.1322 168.881V165.506C84.1322 165.432 84.073 165.372 84 165.372C83.927 165.372 83.8678 165.432 83.8678 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 167.06C82.2591 167.06 82.1999 167.12 82.1999 167.194C82.1999 167.267 82.2591 167.327 82.3321 167.327H85.6678C85.7407 167.327 85.7999 167.267 85.7999 167.194C85.7999 167.12 85.7407 167.06 85.6678 167.06H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 158.221V161.596C83.8678 161.67 83.927 161.73 84 161.73C84.073 161.73 84.1322 161.67 84.1322 161.596V158.221C84.1322 158.147 84.073 158.087 84 158.087C83.927 158.087 83.8678 158.147 83.8678 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 159.775C82.2591 159.775 82.1999 159.835 82.1999 159.908C82.1999 159.982 82.2591 160.042 82.3321 160.042H85.6678C85.7407 160.042 85.7999 159.982 85.7999 159.908C85.7999 159.835 85.7407 159.775 85.6678 159.775H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 150.936V154.311C83.8678 154.385 83.927 154.445 84 154.445C84.073 154.445 84.1322 154.385 84.1322 154.311V150.936C84.1322 150.862 84.073 150.802 84 150.802C83.927 150.802 83.8678 150.862 83.8678 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 152.49C82.2591 152.49 82.1999 152.549 82.1999 152.623C82.1999 152.697 82.2591 152.757 82.3321 152.757H85.6678C85.7407 152.757 85.7999 152.697 85.7999 152.623C85.7999 152.549 85.7407 152.49 85.6678 152.49H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 143.65V147.026C83.8678 147.099 83.927 147.159 84 147.159C84.073 147.159 84.1322 147.099 84.1322 147.026V143.65C84.1322 143.577 84.073 143.517 84 143.517C83.927 143.517 83.8678 143.577 83.8678 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 145.204C82.2591 145.204 82.1999 145.264 82.1999 145.338C82.1999 145.412 82.2591 145.472 82.3321 145.472H85.6678C85.7407 145.472 85.7999 145.412 85.7999 145.338C85.7999 145.264 85.7407 145.204 85.6678 145.204H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 136.365V139.74C83.8678 139.814 83.927 139.874 84 139.874C84.073 139.874 84.1322 139.814 84.1322 139.74V136.365C84.1322 136.291 84.073 136.232 84 136.232C83.927 136.232 83.8678 136.291 83.8678 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 137.919C82.2591 137.919 82.1999 137.979 82.1999 138.053C82.1999 138.127 82.2591 138.187 82.3321 138.187H85.6678C85.7407 138.187 85.7999 138.127 85.7999 138.053C85.7999 137.979 85.7407 137.919 85.6678 137.919H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 129.08V132.455C83.8678 132.529 83.927 132.589 84 132.589C84.073 132.589 84.1322 132.529 84.1322 132.455V129.08C84.1322 129.006 84.073 128.946 84 128.946C83.927 128.946 83.8678 129.006 83.8678 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 130.634C82.2591 130.634 82.1999 130.694 82.1999 130.768C82.1999 130.842 82.2591 130.902 82.3321 130.902H85.6678C85.7407 130.902 85.7999 130.842 85.7999 130.768C85.7999 130.694 85.7407 130.634 85.6678 130.634H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 121.795V125.17C83.8678 125.244 83.927 125.304 84 125.304C84.073 125.304 84.1322 125.244 84.1322 125.17V121.795C84.1322 121.721 84.073 121.661 84 121.661C83.927 121.661 83.8678 121.721 83.8678 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 123.349C82.2591 123.349 82.1999 123.409 82.1999 123.483C82.1999 123.556 82.2591 123.616 82.3321 123.616H85.6678C85.7407 123.616 85.7999 123.556 85.7999 123.483C85.7999 123.409 85.7407 123.349 85.6678 123.349H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 114.51V117.885C83.8678 117.959 83.927 118.019 84 118.019C84.073 118.019 84.1322 117.959 84.1322 117.885V114.51C84.1322 114.436 84.073 114.376 84 114.376C83.927 114.376 83.8678 114.436 83.8678 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 116.064C82.2591 116.064 82.1999 116.124 82.1999 116.197C82.1999 116.271 82.2591 116.331 82.3321 116.331H85.6678C85.7407 116.331 85.7999 116.271 85.7999 116.197C85.7999 116.124 85.7407 116.064 85.6678 116.064H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M83.8678 107.225V110.6C83.8678 110.674 83.927 110.734 84 110.734C84.073 110.734 84.1322 110.674 84.1322 110.6V107.225C84.1322 107.151 84.073 107.091 84 107.091C83.927 107.091 83.8678 107.151 83.8678 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M82.3321 108.779C82.2591 108.779 82.1999 108.838 82.1999 108.912C82.1999 108.986 82.2591 109.046 82.3321 109.046H85.6678C85.7407 109.046 85.7999 108.986 85.7999 108.912C85.7999 108.838 85.7407 108.779 85.6678 108.779H82.3321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0678 238.358V241.733C91.0678 241.807 91.1269 241.867 91.1999 241.867C91.2729 241.867 91.3321 241.807 91.3321 241.733V238.358C91.3321 238.284 91.2729 238.224 91.1999 238.224C91.1269 238.224 91.0678 238.284 91.0678 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 239.912C89.4591 239.912 89.4 239.972 89.4 240.046C89.4 240.119 89.4591 240.179 89.5321 240.179H92.8678C92.9408 240.179 93 240.119 93 240.046C93 239.972 92.9408 239.912 92.8678 239.912H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 231.073V234.448C91.0677 234.522 91.1269 234.582 91.1999 234.582C91.2729 234.582 91.3321 234.522 91.3321 234.448V231.073C91.3321 230.999 91.2729 230.939 91.1999 230.939C91.1269 230.939 91.0677 230.999 91.0677 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 232.626C89.4591 232.626 89.4 232.686 89.4 232.76C89.4 232.834 89.4591 232.894 89.5321 232.894H92.8678C92.9408 232.894 93 232.834 93 232.76C93 232.686 92.9408 232.626 92.8678 232.626H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 223.788V227.163C91.0677 227.236 91.1269 227.296 91.1999 227.296C91.2729 227.296 91.3321 227.236 91.3321 227.163V223.788C91.3321 223.714 91.2729 223.654 91.1999 223.654C91.1269 223.654 91.0677 223.714 91.0677 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 225.341C89.4591 225.341 89.4 225.401 89.4 225.475C89.4 225.549 89.4591 225.609 89.5321 225.609H92.8678C92.9408 225.609 93 225.549 93 225.475C93 225.401 92.9408 225.341 92.8678 225.341H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 216.502V219.877C91.0677 219.951 91.1269 220.011 91.1999 220.011C91.2729 220.011 91.3321 219.951 91.3321 219.877V216.502C91.3321 216.428 91.2729 216.369 91.1999 216.369C91.1269 216.369 91.0677 216.428 91.0677 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 218.056C89.4591 218.056 89.4 218.116 89.4 218.19C89.4 218.264 89.4591 218.324 89.5321 218.324H92.8678C92.9408 218.324 93 218.264 93 218.19C93 218.116 92.9408 218.056 92.8678 218.056H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 209.217V212.592C91.0677 212.666 91.1269 212.726 91.1999 212.726C91.2729 212.726 91.3321 212.666 91.3321 212.592V209.217C91.3321 209.143 91.2729 209.083 91.1999 209.083C91.1269 209.083 91.0677 209.143 91.0677 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 210.771C89.4591 210.771 89.4 210.831 89.4 210.905C89.4 210.979 89.4591 211.038 89.5321 211.038H92.8678C92.9408 211.038 93 210.979 93 210.905C93 210.831 92.9408 210.771 92.8678 210.771H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 201.932V205.307C91.0677 205.381 91.1269 205.441 91.1999 205.441C91.2729 205.441 91.3321 205.381 91.3321 205.307V201.932C91.3321 201.858 91.2729 201.798 91.1999 201.798C91.1269 201.798 91.0677 201.858 91.0677 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 203.486C89.4591 203.486 89.4 203.546 89.4 203.62C89.4 203.693 89.4591 203.753 89.5321 203.753H92.8678C92.9408 203.753 93 203.693 93 203.62C93 203.546 92.9408 203.486 92.8678 203.486H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 194.647V198.022C91.0677 198.096 91.1269 198.156 91.1999 198.156C91.2729 198.156 91.3321 198.096 91.3321 198.022V194.647C91.3321 194.573 91.2729 194.513 91.1999 194.513C91.1269 194.513 91.0677 194.573 91.0677 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 196.201C89.4591 196.201 89.4 196.26 89.4 196.334C89.4 196.408 89.4591 196.468 89.5321 196.468H92.8678C92.9408 196.468 93 196.408 93 196.334C93 196.26 92.9408 196.201 92.8678 196.201H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 187.362V190.737C91.0677 190.811 91.1269 190.871 91.1999 190.871C91.2729 190.871 91.3321 190.811 91.3321 190.737V187.362C91.3321 187.288 91.2729 187.228 91.1999 187.228C91.1269 187.228 91.0677 187.288 91.0677 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 188.915C89.4591 188.915 89.4 188.975 89.4 189.049C89.4 189.123 89.4591 189.183 89.5321 189.183H92.8678C92.9408 189.183 93 189.123 93 189.049C93 188.975 92.9408 188.915 92.8678 188.915H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 180.076V183.452C91.0677 183.525 91.1269 183.585 91.1999 183.585C91.2729 183.585 91.3321 183.525 91.3321 183.452V180.076C91.3321 180.003 91.2729 179.943 91.1999 179.943C91.1269 179.943 91.0677 180.003 91.0677 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 181.63C89.4591 181.63 89.4 181.69 89.4 181.764C89.4 181.838 89.4591 181.898 89.5321 181.898H92.8678C92.9408 181.898 93 181.838 93 181.764C93 181.69 92.9408 181.63 92.8678 181.63H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 172.791V176.166C91.0677 176.24 91.1269 176.3 91.1999 176.3C91.2729 176.3 91.3321 176.24 91.3321 176.166V172.791C91.3321 172.717 91.2729 172.658 91.1999 172.658C91.1269 172.658 91.0677 172.717 91.0677 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 174.345C89.4591 174.345 89.4 174.405 89.4 174.479C89.4 174.553 89.4591 174.612 89.5321 174.612H92.8678C92.9408 174.612 93 174.553 93 174.479C93 174.405 92.9408 174.345 92.8678 174.345H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 165.506V168.881C91.0677 168.955 91.1269 169.015 91.1999 169.015C91.2729 169.015 91.3321 168.955 91.3321 168.881V165.506C91.3321 165.432 91.2729 165.372 91.1999 165.372C91.1269 165.372 91.0677 165.432 91.0677 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 167.06C89.4591 167.06 89.4 167.12 89.4 167.194C89.4 167.267 89.4591 167.327 89.5321 167.327H92.8678C92.9408 167.327 93 167.267 93 167.194C93 167.12 92.9408 167.06 92.8678 167.06H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 158.221V161.596C91.0677 161.67 91.1269 161.73 91.1999 161.73C91.2729 161.73 91.3321 161.67 91.3321 161.596V158.221C91.3321 158.147 91.2729 158.087 91.1999 158.087C91.1269 158.087 91.0677 158.147 91.0677 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 159.775C89.4591 159.775 89.4 159.835 89.4 159.908C89.4 159.982 89.4591 160.042 89.5321 160.042H92.8678C92.9408 160.042 93 159.982 93 159.908C93 159.835 92.9408 159.775 92.8678 159.775H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 150.936V154.311C91.0677 154.385 91.1269 154.445 91.1999 154.445C91.2729 154.445 91.3321 154.385 91.3321 154.311V150.936C91.3321 150.862 91.2729 150.802 91.1999 150.802C91.1269 150.802 91.0677 150.862 91.0677 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 152.49C89.4591 152.49 89.4 152.549 89.4 152.623C89.4 152.697 89.4591 152.757 89.5321 152.757H92.8678C92.9408 152.757 93 152.697 93 152.623C93 152.549 92.9408 152.49 92.8678 152.49H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 143.65V147.026C91.0677 147.099 91.1269 147.159 91.1999 147.159C91.2729 147.159 91.3321 147.099 91.3321 147.026V143.65C91.3321 143.577 91.2729 143.517 91.1999 143.517C91.1269 143.517 91.0677 143.577 91.0677 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 145.204C89.4591 145.204 89.4 145.264 89.4 145.338C89.4 145.412 89.4591 145.472 89.5321 145.472H92.8678C92.9408 145.472 93 145.412 93 145.338C93 145.264 92.9408 145.204 92.8678 145.204H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 136.365V139.74C91.0677 139.814 91.1269 139.874 91.1999 139.874C91.2729 139.874 91.3321 139.814 91.3321 139.74V136.365C91.3321 136.291 91.2729 136.232 91.1999 136.232C91.1269 136.232 91.0677 136.291 91.0677 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 137.919C89.4591 137.919 89.4 137.979 89.4 138.053C89.4 138.127 89.4591 138.187 89.5321 138.187H92.8678C92.9408 138.187 93 138.127 93 138.053C93 137.979 92.9408 137.919 92.8678 137.919H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 129.08V132.455C91.0677 132.529 91.1269 132.589 91.1999 132.589C91.2729 132.589 91.3321 132.529 91.3321 132.455V129.08C91.3321 129.006 91.2729 128.946 91.1999 128.946C91.1269 128.946 91.0677 129.006 91.0677 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 130.634C89.4591 130.634 89.4 130.694 89.4 130.768C89.4 130.842 89.4591 130.902 89.5321 130.902H92.8678C92.9408 130.902 93 130.842 93 130.768C93 130.694 92.9408 130.634 92.8678 130.634H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 121.795V125.17C91.0677 125.244 91.1269 125.304 91.1999 125.304C91.2729 125.304 91.3321 125.244 91.3321 125.17V121.795C91.3321 121.721 91.2729 121.661 91.1999 121.661C91.1269 121.661 91.0677 121.721 91.0677 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 123.349C89.4591 123.349 89.4 123.409 89.4 123.483C89.4 123.556 89.4591 123.616 89.5321 123.616H92.8678C92.9408 123.616 93 123.556 93 123.483C93 123.409 92.9408 123.349 92.8678 123.349H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 114.51V117.885C91.0677 117.959 91.1269 118.019 91.1999 118.019C91.2729 118.019 91.3321 117.959 91.3321 117.885V114.51C91.3321 114.436 91.2729 114.376 91.1999 114.376C91.1269 114.376 91.0677 114.436 91.0677 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 116.064C89.4591 116.064 89.4 116.124 89.4 116.197C89.4 116.271 89.4591 116.331 89.5321 116.331H92.8678C92.9408 116.331 93 116.271 93 116.197C93 116.124 92.9408 116.064 92.8678 116.064H89.5321Z"
        fill={colorConfig.grill}
      />
      <path
        d="M91.0677 107.225V110.6C91.0677 110.674 91.1269 110.734 91.1999 110.734C91.2729 110.734 91.3321 110.674 91.3321 110.6V107.225C91.3321 107.151 91.2729 107.091 91.1999 107.091C91.1269 107.091 91.0677 107.151 91.0677 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M89.5321 108.779C89.4591 108.779 89.4 108.838 89.4 108.912C89.4 108.986 89.4591 109.046 89.5321 109.046H92.8678C92.9408 109.046 93 108.986 93 108.912C93 108.838 92.9408 108.779 92.8678 108.779H89.5321Z"
        fill={colorConfig.grill}
      />
      <mask id="path-114-inside-26_709_17" fill="white">
        <path d="M97 106H122V374H97V106Z" />
      </mask>
      <path d="M97 106H122V374H97V106Z" fill={colorConfig.block_fill} />
      <path
        d="M97 106V107H122V106V105H97V106ZM122 374V373H97V374V375H122V374Z"
        fill={colorConfig.block_stroke}
        mask="url(#path-114-inside-26_709_17)"
      />
      <path
        d="M101.668 369.491V372.866C101.668 372.94 101.727 373 101.8 373C101.873 373 101.932 372.94 101.932 372.866V369.491C101.932 369.417 101.873 369.357 101.8 369.357C101.727 369.357 101.668 369.417 101.668 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 371.045C100.059 371.045 100 371.105 100 371.179C100 371.253 100.059 371.312 100.132 371.312H103.468C103.541 371.312 103.6 371.253 103.6 371.179C103.6 371.105 103.541 371.045 103.468 371.045H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 362.206V365.581C101.668 365.655 101.727 365.715 101.8 365.715C101.873 365.715 101.932 365.655 101.932 365.581V362.206C101.932 362.132 101.873 362.072 101.8 362.072C101.727 362.072 101.668 362.132 101.668 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 363.76C100.059 363.76 100 363.82 100 363.893C100 363.967 100.059 364.027 100.132 364.027H103.468C103.541 364.027 103.6 363.967 103.6 363.893C103.6 363.82 103.541 363.76 103.468 363.76H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 354.921V358.296C101.668 358.37 101.727 358.43 101.8 358.43C101.873 358.43 101.932 358.37 101.932 358.296V354.921C101.932 354.847 101.873 354.787 101.8 354.787C101.727 354.787 101.668 354.847 101.668 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 356.475C100.059 356.475 100 356.535 100 356.608C100 356.682 100.059 356.742 100.132 356.742H103.468C103.541 356.742 103.6 356.682 103.6 356.608C103.6 356.535 103.541 356.475 103.468 356.475H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 347.636V351.011C101.668 351.085 101.727 351.144 101.8 351.144C101.873 351.144 101.932 351.085 101.932 351.011V347.636C101.932 347.562 101.873 347.502 101.8 347.502C101.727 347.502 101.668 347.562 101.668 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 349.189C100.059 349.189 100 349.249 100 349.323C100 349.397 100.059 349.457 100.132 349.457H103.468C103.541 349.457 103.6 349.397 103.6 349.323C103.6 349.249 103.541 349.189 103.468 349.189H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 340.35V343.726C101.668 343.799 101.727 343.859 101.8 343.859C101.873 343.859 101.932 343.799 101.932 343.726V340.35C101.932 340.277 101.873 340.217 101.8 340.217C101.727 340.217 101.668 340.277 101.668 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 341.904C100.059 341.904 100 341.964 100 342.038C100 342.112 100.059 342.172 100.132 342.172H103.468C103.541 342.172 103.6 342.112 103.6 342.038C103.6 341.964 103.541 341.904 103.468 341.904H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 333.065V336.44C101.668 336.514 101.727 336.574 101.8 336.574C101.873 336.574 101.932 336.514 101.932 336.44V333.065C101.932 332.991 101.873 332.932 101.8 332.932C101.727 332.932 101.668 332.991 101.668 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 334.619C100.059 334.619 100 334.679 100 334.753C100 334.827 100.059 334.887 100.132 334.887H103.468C103.541 334.887 103.6 334.827 103.6 334.753C103.6 334.679 103.541 334.619 103.468 334.619H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 325.78V329.155C101.668 329.229 101.727 329.289 101.8 329.289C101.873 329.289 101.932 329.229 101.932 329.155V325.78C101.932 325.706 101.873 325.646 101.8 325.646C101.727 325.646 101.668 325.706 101.668 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 327.334C100.059 327.334 100 327.394 100 327.468C100 327.541 100.059 327.601 100.132 327.601H103.468C103.541 327.601 103.6 327.541 103.6 327.468C103.6 327.394 103.541 327.334 103.468 327.334H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 318.495V321.87C101.668 321.944 101.727 322.004 101.8 322.004C101.873 322.004 101.932 321.944 101.932 321.87V318.495C101.932 318.421 101.873 318.361 101.8 318.361C101.727 318.361 101.668 318.421 101.668 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 320.049C100.059 320.049 100 320.109 100 320.182C100 320.256 100.059 320.316 100.132 320.316H103.468C103.541 320.316 103.6 320.256 103.6 320.182C103.6 320.109 103.541 320.049 103.468 320.049H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 311.21V314.585C101.668 314.659 101.727 314.719 101.8 314.719C101.873 314.719 101.932 314.659 101.932 314.585V311.21C101.932 311.136 101.873 311.076 101.8 311.076C101.727 311.076 101.668 311.136 101.668 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 312.764C100.059 312.764 100 312.823 100 312.897C100 312.971 100.059 313.031 100.132 313.031H103.468C103.541 313.031 103.6 312.971 103.6 312.897C103.6 312.823 103.541 312.764 103.468 312.764H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 303.925V307.3C101.668 307.374 101.727 307.433 101.8 307.433C101.873 307.433 101.932 307.374 101.932 307.3V303.925C101.932 303.851 101.873 303.791 101.8 303.791C101.727 303.791 101.668 303.851 101.668 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 305.478C100.059 305.478 100 305.538 100 305.612C100 305.686 100.059 305.746 100.132 305.746H103.468C103.541 305.746 103.6 305.686 103.6 305.612C103.6 305.538 103.541 305.478 103.468 305.478H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 296.639V300.014C101.668 300.088 101.727 300.148 101.8 300.148C101.873 300.148 101.932 300.088 101.932 300.014V296.639C101.932 296.565 101.873 296.506 101.8 296.506C101.727 296.506 101.668 296.565 101.668 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 298.193C100.059 298.193 100 298.253 100 298.327C100 298.401 100.059 298.461 100.132 298.461H103.468C103.541 298.461 103.6 298.401 103.6 298.327C103.6 298.253 103.541 298.193 103.468 298.193H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 289.354V292.729C101.668 292.803 101.727 292.863 101.8 292.863C101.873 292.863 101.932 292.803 101.932 292.729V289.354C101.932 289.28 101.873 289.22 101.8 289.22C101.727 289.22 101.668 289.28 101.668 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 290.908C100.059 290.908 100 290.968 100 291.042C100 291.116 100.059 291.175 100.132 291.175H103.468C103.541 291.175 103.6 291.116 103.6 291.042C103.6 290.968 103.541 290.908 103.468 290.908H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 282.069V285.444C101.668 285.518 101.727 285.578 101.8 285.578C101.873 285.578 101.932 285.518 101.932 285.444V282.069C101.932 281.995 101.873 281.935 101.8 281.935C101.727 281.935 101.668 281.995 101.668 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 283.623C100.059 283.623 100 283.683 100 283.757C100 283.83 100.059 283.89 100.132 283.89H103.468C103.541 283.89 103.6 283.83 103.6 283.757C103.6 283.683 103.541 283.623 103.468 283.623H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 274.784V278.159C101.668 278.233 101.727 278.293 101.8 278.293C101.873 278.293 101.932 278.233 101.932 278.159V274.784C101.932 274.71 101.873 274.65 101.8 274.65C101.727 274.65 101.668 274.71 101.668 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 276.338C100.059 276.338 100 276.397 100 276.471C100 276.545 100.059 276.605 100.132 276.605H103.468C103.541 276.605 103.6 276.545 103.6 276.471C103.6 276.397 103.541 276.338 103.468 276.338H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 267.499V270.874C101.668 270.948 101.727 271.007 101.8 271.007C101.873 271.007 101.932 270.948 101.932 270.874V267.499C101.932 267.425 101.873 267.365 101.8 267.365C101.727 267.365 101.668 267.425 101.668 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 269.053C100.059 269.053 100 269.112 100 269.186C100 269.26 100.059 269.32 100.132 269.32H103.468C103.541 269.32 103.6 269.26 103.6 269.186C103.6 269.112 103.541 269.053 103.468 269.053H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 260.213V263.589C101.668 263.662 101.727 263.722 101.8 263.722C101.873 263.722 101.932 263.662 101.932 263.589V260.213C101.932 260.14 101.873 260.08 101.8 260.08C101.727 260.08 101.668 260.14 101.668 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 261.767C100.059 261.767 100 261.827 100 261.901C100 261.975 100.059 262.035 100.132 262.035H103.468C103.541 262.035 103.6 261.975 103.6 261.901C103.6 261.827 103.541 261.767 103.468 261.767H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 252.928L101.668 256.303C101.668 256.377 101.727 256.437 101.8 256.437C101.873 256.437 101.932 256.377 101.932 256.303L101.932 252.928C101.932 252.854 101.873 252.794 101.8 252.794C101.727 252.794 101.668 252.854 101.668 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 254.482C100.059 254.482 100 254.542 100 254.616C100 254.69 100.059 254.75 100.132 254.75H103.468C103.541 254.75 103.6 254.69 103.6 254.616C103.6 254.542 103.541 254.482 103.468 254.482H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 245.643V249.018C101.668 249.092 101.727 249.152 101.8 249.152C101.873 249.152 101.932 249.092 101.932 249.018V245.643C101.932 245.569 101.873 245.509 101.8 245.509C101.727 245.509 101.668 245.569 101.668 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 247.197C100.059 247.197 100 247.257 100 247.331C100 247.405 100.059 247.464 100.132 247.464H103.468C103.541 247.464 103.6 247.405 103.6 247.331C103.6 247.257 103.541 247.197 103.468 247.197H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 238.358V241.733C101.668 241.807 101.727 241.867 101.8 241.867C101.873 241.867 101.932 241.807 101.932 241.733V238.358C101.932 238.284 101.873 238.224 101.8 238.224C101.727 238.224 101.668 238.284 101.668 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 239.912C100.059 239.912 100 239.972 100 240.046C100 240.119 100.059 240.179 100.132 240.179H103.468C103.541 240.179 103.6 240.119 103.6 240.046C103.6 239.972 103.541 239.912 103.468 239.912H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 369.491V372.866C108.868 372.94 108.927 373 109 373C109.073 373 109.132 372.94 109.132 372.866V369.491C109.132 369.417 109.073 369.357 109 369.357C108.927 369.357 108.868 369.417 108.868 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 371.045C107.259 371.045 107.2 371.105 107.2 371.179C107.2 371.253 107.259 371.312 107.332 371.312H110.668C110.741 371.312 110.8 371.253 110.8 371.179C110.8 371.105 110.741 371.045 110.668 371.045H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 362.206V365.581C108.868 365.655 108.927 365.715 109 365.715C109.073 365.715 109.132 365.655 109.132 365.581V362.206C109.132 362.132 109.073 362.072 109 362.072C108.927 362.072 108.868 362.132 108.868 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 363.76C107.259 363.76 107.2 363.82 107.2 363.893C107.2 363.967 107.259 364.027 107.332 364.027H110.668C110.741 364.027 110.8 363.967 110.8 363.893C110.8 363.82 110.741 363.76 110.668 363.76H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 354.921V358.296C108.868 358.37 108.927 358.43 109 358.43C109.073 358.43 109.132 358.37 109.132 358.296V354.921C109.132 354.847 109.073 354.787 109 354.787C108.927 354.787 108.868 354.847 108.868 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 356.475C107.259 356.475 107.2 356.535 107.2 356.608C107.2 356.682 107.259 356.742 107.332 356.742H110.668C110.741 356.742 110.8 356.682 110.8 356.608C110.8 356.535 110.741 356.475 110.668 356.475H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 347.636V351.011C108.868 351.085 108.927 351.144 109 351.144C109.073 351.144 109.132 351.085 109.132 351.011V347.636C109.132 347.562 109.073 347.502 109 347.502C108.927 347.502 108.868 347.562 108.868 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 349.189C107.259 349.189 107.2 349.249 107.2 349.323C107.2 349.397 107.259 349.457 107.332 349.457H110.668C110.741 349.457 110.8 349.397 110.8 349.323C110.8 349.249 110.741 349.189 110.668 349.189H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 340.35V343.726C108.868 343.799 108.927 343.859 109 343.859C109.073 343.859 109.132 343.799 109.132 343.726V340.35C109.132 340.277 109.073 340.217 109 340.217C108.927 340.217 108.868 340.277 108.868 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 341.904C107.259 341.904 107.2 341.964 107.2 342.038C107.2 342.112 107.259 342.172 107.332 342.172H110.668C110.741 342.172 110.8 342.112 110.8 342.038C110.8 341.964 110.741 341.904 110.668 341.904H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 333.065V336.44C108.868 336.514 108.927 336.574 109 336.574C109.073 336.574 109.132 336.514 109.132 336.44V333.065C109.132 332.991 109.073 332.932 109 332.932C108.927 332.932 108.868 332.991 108.868 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 334.619C107.259 334.619 107.2 334.679 107.2 334.753C107.2 334.827 107.259 334.887 107.332 334.887H110.668C110.741 334.887 110.8 334.827 110.8 334.753C110.8 334.679 110.741 334.619 110.668 334.619H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 325.78V329.155C108.868 329.229 108.927 329.289 109 329.289C109.073 329.289 109.132 329.229 109.132 329.155V325.78C109.132 325.706 109.073 325.646 109 325.646C108.927 325.646 108.868 325.706 108.868 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 327.334C107.259 327.334 107.2 327.394 107.2 327.468C107.2 327.541 107.259 327.601 107.332 327.601H110.668C110.741 327.601 110.8 327.541 110.8 327.468C110.8 327.394 110.741 327.334 110.668 327.334H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 318.495V321.87C108.868 321.944 108.927 322.004 109 322.004C109.073 322.004 109.132 321.944 109.132 321.87V318.495C109.132 318.421 109.073 318.361 109 318.361C108.927 318.361 108.868 318.421 108.868 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 320.049C107.259 320.049 107.2 320.109 107.2 320.182C107.2 320.256 107.259 320.316 107.332 320.316H110.668C110.741 320.316 110.8 320.256 110.8 320.182C110.8 320.109 110.741 320.049 110.668 320.049H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 311.21V314.585C108.868 314.659 108.927 314.719 109 314.719C109.073 314.719 109.132 314.659 109.132 314.585V311.21C109.132 311.136 109.073 311.076 109 311.076C108.927 311.076 108.868 311.136 108.868 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 312.764C107.259 312.764 107.2 312.823 107.2 312.897C107.2 312.971 107.259 313.031 107.332 313.031H110.668C110.741 313.031 110.8 312.971 110.8 312.897C110.8 312.823 110.741 312.764 110.668 312.764H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 303.925V307.3C108.868 307.374 108.927 307.433 109 307.433C109.073 307.433 109.132 307.374 109.132 307.3V303.925C109.132 303.851 109.073 303.791 109 303.791C108.927 303.791 108.868 303.851 108.868 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 305.478C107.259 305.478 107.2 305.538 107.2 305.612C107.2 305.686 107.259 305.746 107.332 305.746H110.668C110.741 305.746 110.8 305.686 110.8 305.612C110.8 305.538 110.741 305.478 110.668 305.478H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 296.639V300.014C108.868 300.088 108.927 300.148 109 300.148C109.073 300.148 109.132 300.088 109.132 300.014V296.639C109.132 296.565 109.073 296.506 109 296.506C108.927 296.506 108.868 296.565 108.868 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 298.193C107.259 298.193 107.2 298.253 107.2 298.327C107.2 298.401 107.259 298.461 107.332 298.461H110.668C110.741 298.461 110.8 298.401 110.8 298.327C110.8 298.253 110.741 298.193 110.668 298.193H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 289.354V292.729C108.868 292.803 108.927 292.863 109 292.863C109.073 292.863 109.132 292.803 109.132 292.729V289.354C109.132 289.28 109.073 289.22 109 289.22C108.927 289.22 108.868 289.28 108.868 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 290.908C107.259 290.908 107.2 290.968 107.2 291.042C107.2 291.116 107.259 291.175 107.332 291.175H110.668C110.741 291.175 110.8 291.116 110.8 291.042C110.8 290.968 110.741 290.908 110.668 290.908H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 282.069V285.444C108.868 285.518 108.927 285.578 109 285.578C109.073 285.578 109.132 285.518 109.132 285.444V282.069C109.132 281.995 109.073 281.935 109 281.935C108.927 281.935 108.868 281.995 108.868 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 283.623C107.259 283.623 107.2 283.683 107.2 283.757C107.2 283.83 107.259 283.89 107.332 283.89H110.668C110.741 283.89 110.8 283.83 110.8 283.757C110.8 283.683 110.741 283.623 110.668 283.623H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 274.784V278.159C108.868 278.233 108.927 278.293 109 278.293C109.073 278.293 109.132 278.233 109.132 278.159V274.784C109.132 274.71 109.073 274.65 109 274.65C108.927 274.65 108.868 274.71 108.868 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 276.338C107.259 276.338 107.2 276.397 107.2 276.471C107.2 276.545 107.259 276.605 107.332 276.605H110.668C110.741 276.605 110.8 276.545 110.8 276.471C110.8 276.397 110.741 276.338 110.668 276.338H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 267.499V270.874C108.868 270.948 108.927 271.007 109 271.007C109.073 271.007 109.132 270.948 109.132 270.874V267.499C109.132 267.425 109.073 267.365 109 267.365C108.927 267.365 108.868 267.425 108.868 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 269.053C107.259 269.053 107.2 269.112 107.2 269.186C107.2 269.26 107.259 269.32 107.332 269.32H110.668C110.741 269.32 110.8 269.26 110.8 269.186C110.8 269.112 110.741 269.053 110.668 269.053H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 260.213V263.589C108.868 263.662 108.927 263.722 109 263.722C109.073 263.722 109.132 263.662 109.132 263.589V260.213C109.132 260.14 109.073 260.08 109 260.08C108.927 260.08 108.868 260.14 108.868 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 261.767C107.259 261.767 107.2 261.827 107.2 261.901C107.2 261.975 107.259 262.035 107.332 262.035H110.668C110.741 262.035 110.8 261.975 110.8 261.901C110.8 261.827 110.741 261.767 110.668 261.767H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 252.928V256.303C108.868 256.377 108.927 256.437 109 256.437C109.073 256.437 109.132 256.377 109.132 256.303V252.928C109.132 252.854 109.073 252.794 109 252.794C108.927 252.794 108.868 252.854 108.868 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 254.482C107.259 254.482 107.2 254.542 107.2 254.616C107.2 254.69 107.259 254.75 107.332 254.75H110.668C110.741 254.75 110.8 254.69 110.8 254.616C110.8 254.542 110.741 254.482 110.668 254.482H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 245.643V249.018C108.868 249.092 108.927 249.152 109 249.152C109.073 249.152 109.132 249.092 109.132 249.018V245.643C109.132 245.569 109.073 245.509 109 245.509C108.927 245.509 108.868 245.569 108.868 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 247.197C107.259 247.197 107.2 247.257 107.2 247.331C107.2 247.405 107.259 247.464 107.332 247.464H110.668C110.741 247.464 110.8 247.405 110.8 247.331C110.8 247.257 110.741 247.197 110.668 247.197H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 238.358V241.733C108.868 241.807 108.927 241.867 109 241.867C109.073 241.867 109.132 241.807 109.132 241.733V238.358C109.132 238.284 109.073 238.224 109 238.224C108.927 238.224 108.868 238.284 108.868 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 239.912C107.259 239.912 107.2 239.972 107.2 240.046C107.2 240.119 107.259 240.179 107.332 240.179H110.668C110.741 240.179 110.8 240.119 110.8 240.046C110.8 239.972 110.741 239.912 110.668 239.912H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 369.491V372.866C116.068 372.94 116.127 373 116.2 373C116.273 373 116.332 372.94 116.332 372.866V369.491C116.332 369.417 116.273 369.357 116.2 369.357C116.127 369.357 116.068 369.417 116.068 369.491Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 371.045C114.459 371.045 114.4 371.105 114.4 371.179C114.4 371.253 114.459 371.312 114.532 371.312H117.868C117.941 371.312 118 371.253 118 371.179C118 371.105 117.941 371.045 117.868 371.045H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 362.206V365.581C116.068 365.655 116.127 365.715 116.2 365.715C116.273 365.715 116.332 365.655 116.332 365.581V362.206C116.332 362.132 116.273 362.072 116.2 362.072C116.127 362.072 116.068 362.132 116.068 362.206Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 363.76C114.459 363.76 114.4 363.82 114.4 363.893C114.4 363.967 114.459 364.027 114.532 364.027H117.868C117.941 364.027 118 363.967 118 363.893C118 363.82 117.941 363.76 117.868 363.76H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 354.921V358.296C116.068 358.37 116.127 358.43 116.2 358.43C116.273 358.43 116.332 358.37 116.332 358.296V354.921C116.332 354.847 116.273 354.787 116.2 354.787C116.127 354.787 116.068 354.847 116.068 354.921Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 356.475C114.459 356.475 114.4 356.535 114.4 356.608C114.4 356.682 114.459 356.742 114.532 356.742H117.868C117.941 356.742 118 356.682 118 356.608C118 356.535 117.941 356.475 117.868 356.475H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 347.636V351.011C116.068 351.085 116.127 351.144 116.2 351.144C116.273 351.144 116.332 351.085 116.332 351.011V347.636C116.332 347.562 116.273 347.502 116.2 347.502C116.127 347.502 116.068 347.562 116.068 347.636Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 349.189C114.459 349.189 114.4 349.249 114.4 349.323C114.4 349.397 114.459 349.457 114.532 349.457H117.868C117.941 349.457 118 349.397 118 349.323C118 349.249 117.941 349.189 117.868 349.189H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 340.35V343.726C116.068 343.799 116.127 343.859 116.2 343.859C116.273 343.859 116.332 343.799 116.332 343.726V340.35C116.332 340.277 116.273 340.217 116.2 340.217C116.127 340.217 116.068 340.277 116.068 340.35Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 341.904C114.459 341.904 114.4 341.964 114.4 342.038C114.4 342.112 114.459 342.172 114.532 342.172H117.868C117.941 342.172 118 342.112 118 342.038C118 341.964 117.941 341.904 117.868 341.904H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 333.065V336.44C116.068 336.514 116.127 336.574 116.2 336.574C116.273 336.574 116.332 336.514 116.332 336.44V333.065C116.332 332.991 116.273 332.932 116.2 332.932C116.127 332.932 116.068 332.991 116.068 333.065Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 334.619C114.459 334.619 114.4 334.679 114.4 334.753C114.4 334.827 114.459 334.887 114.532 334.887H117.868C117.941 334.887 118 334.827 118 334.753C118 334.679 117.941 334.619 117.868 334.619H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 325.78V329.155C116.068 329.229 116.127 329.289 116.2 329.289C116.273 329.289 116.332 329.229 116.332 329.155V325.78C116.332 325.706 116.273 325.646 116.2 325.646C116.127 325.646 116.068 325.706 116.068 325.78Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 327.334C114.459 327.334 114.4 327.394 114.4 327.468C114.4 327.541 114.459 327.601 114.532 327.601H117.868C117.941 327.601 118 327.541 118 327.468C118 327.394 117.941 327.334 117.868 327.334H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 318.495V321.87C116.068 321.944 116.127 322.004 116.2 322.004C116.273 322.004 116.332 321.944 116.332 321.87V318.495C116.332 318.421 116.273 318.361 116.2 318.361C116.127 318.361 116.068 318.421 116.068 318.495Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 320.049C114.459 320.049 114.4 320.109 114.4 320.182C114.4 320.256 114.459 320.316 114.532 320.316H117.868C117.941 320.316 118 320.256 118 320.182C118 320.109 117.941 320.049 117.868 320.049H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 311.21V314.585C116.068 314.659 116.127 314.719 116.2 314.719C116.273 314.719 116.332 314.659 116.332 314.585V311.21C116.332 311.136 116.273 311.076 116.2 311.076C116.127 311.076 116.068 311.136 116.068 311.21Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 312.764C114.459 312.764 114.4 312.823 114.4 312.897C114.4 312.971 114.459 313.031 114.532 313.031H117.868C117.941 313.031 118 312.971 118 312.897C118 312.823 117.941 312.764 117.868 312.764H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 303.925V307.3C116.068 307.374 116.127 307.433 116.2 307.433C116.273 307.433 116.332 307.374 116.332 307.3V303.925C116.332 303.851 116.273 303.791 116.2 303.791C116.127 303.791 116.068 303.851 116.068 303.925Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 305.478C114.459 305.478 114.4 305.538 114.4 305.612C114.4 305.686 114.459 305.746 114.532 305.746H117.868C117.941 305.746 118 305.686 118 305.612C118 305.538 117.941 305.478 117.868 305.478H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 296.639V300.014C116.068 300.088 116.127 300.148 116.2 300.148C116.273 300.148 116.332 300.088 116.332 300.014V296.639C116.332 296.565 116.273 296.506 116.2 296.506C116.127 296.506 116.068 296.565 116.068 296.639Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 298.193C114.459 298.193 114.4 298.253 114.4 298.327C114.4 298.401 114.459 298.461 114.532 298.461H117.868C117.941 298.461 118 298.401 118 298.327C118 298.253 117.941 298.193 117.868 298.193H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 289.354V292.729C116.068 292.803 116.127 292.863 116.2 292.863C116.273 292.863 116.332 292.803 116.332 292.729V289.354C116.332 289.28 116.273 289.22 116.2 289.22C116.127 289.22 116.068 289.28 116.068 289.354Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 290.908C114.459 290.908 114.4 290.968 114.4 291.042C114.4 291.116 114.459 291.175 114.532 291.175H117.868C117.941 291.175 118 291.116 118 291.042C118 290.968 117.941 290.908 117.868 290.908H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 282.069V285.444C116.068 285.518 116.127 285.578 116.2 285.578C116.273 285.578 116.332 285.518 116.332 285.444V282.069C116.332 281.995 116.273 281.935 116.2 281.935C116.127 281.935 116.068 281.995 116.068 282.069Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 283.623C114.459 283.623 114.4 283.683 114.4 283.757C114.4 283.83 114.459 283.89 114.532 283.89H117.868C117.941 283.89 118 283.83 118 283.757C118 283.683 117.941 283.623 117.868 283.623H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 274.784V278.159C116.068 278.233 116.127 278.293 116.2 278.293C116.273 278.293 116.332 278.233 116.332 278.159V274.784C116.332 274.71 116.273 274.65 116.2 274.65C116.127 274.65 116.068 274.71 116.068 274.784Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 276.338C114.459 276.338 114.4 276.397 114.4 276.471C114.4 276.545 114.459 276.605 114.532 276.605H117.868C117.941 276.605 118 276.545 118 276.471C118 276.397 117.941 276.338 117.868 276.338H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 267.499V270.874C116.068 270.948 116.127 271.007 116.2 271.007C116.273 271.007 116.332 270.948 116.332 270.874V267.499C116.332 267.425 116.273 267.365 116.2 267.365C116.127 267.365 116.068 267.425 116.068 267.499Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 269.053C114.459 269.053 114.4 269.112 114.4 269.186C114.4 269.26 114.459 269.32 114.532 269.32H117.868C117.941 269.32 118 269.26 118 269.186C118 269.112 117.941 269.053 117.868 269.053H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 260.213V263.589C116.068 263.662 116.127 263.722 116.2 263.722C116.273 263.722 116.332 263.662 116.332 263.589V260.213C116.332 260.14 116.273 260.08 116.2 260.08C116.127 260.08 116.068 260.14 116.068 260.213Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 261.767C114.459 261.767 114.4 261.827 114.4 261.901C114.4 261.975 114.459 262.035 114.532 262.035H117.868C117.941 262.035 118 261.975 118 261.901C118 261.827 117.941 261.767 117.868 261.767H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 252.928V256.303C116.068 256.377 116.127 256.437 116.2 256.437C116.273 256.437 116.332 256.377 116.332 256.303V252.928C116.332 252.854 116.273 252.794 116.2 252.794C116.127 252.794 116.068 252.854 116.068 252.928Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 254.482C114.459 254.482 114.4 254.542 114.4 254.616C114.4 254.69 114.459 254.75 114.532 254.75H117.868C117.941 254.75 118 254.69 118 254.616C118 254.542 117.941 254.482 117.868 254.482H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 245.643V249.018C116.068 249.092 116.127 249.152 116.2 249.152C116.273 249.152 116.332 249.092 116.332 249.018V245.643C116.332 245.569 116.273 245.509 116.2 245.509C116.127 245.509 116.068 245.569 116.068 245.643Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 247.197C114.459 247.197 114.4 247.257 114.4 247.331C114.4 247.405 114.459 247.464 114.532 247.464H117.868C117.941 247.464 118 247.405 118 247.331C118 247.257 117.941 247.197 117.868 247.197H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 238.358V241.733C116.068 241.807 116.127 241.867 116.2 241.867C116.273 241.867 116.332 241.807 116.332 241.733V238.358C116.332 238.284 116.273 238.224 116.2 238.224C116.127 238.224 116.068 238.284 116.068 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 239.912C114.459 239.912 114.4 239.972 114.4 240.046C114.4 240.119 114.459 240.179 114.532 240.179H117.868C117.941 240.179 118 240.119 118 240.046C118 239.972 117.941 239.912 117.868 239.912H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 238.358V241.733C101.668 241.807 101.727 241.867 101.8 241.867C101.873 241.867 101.932 241.807 101.932 241.733V238.358C101.932 238.284 101.873 238.224 101.8 238.224C101.727 238.224 101.668 238.284 101.668 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 239.912C100.059 239.912 100 239.972 100 240.046C100 240.119 100.059 240.179 100.132 240.179H103.468C103.541 240.179 103.6 240.119 103.6 240.046C103.6 239.972 103.541 239.912 103.468 239.912H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 231.073V234.448C101.668 234.522 101.727 234.582 101.8 234.582C101.873 234.582 101.932 234.522 101.932 234.448V231.073C101.932 230.999 101.873 230.939 101.8 230.939C101.727 230.939 101.668 230.999 101.668 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 232.626C100.059 232.626 100 232.686 100 232.76C100 232.834 100.059 232.894 100.132 232.894H103.468C103.541 232.894 103.6 232.834 103.6 232.76C103.6 232.686 103.541 232.626 103.468 232.626H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 223.788V227.163C101.668 227.236 101.727 227.296 101.8 227.296C101.873 227.296 101.932 227.236 101.932 227.163V223.788C101.932 223.714 101.873 223.654 101.8 223.654C101.727 223.654 101.668 223.714 101.668 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 225.341C100.059 225.341 100 225.401 100 225.475C100 225.549 100.059 225.609 100.132 225.609H103.468C103.541 225.609 103.6 225.549 103.6 225.475C103.6 225.401 103.541 225.341 103.468 225.341H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 216.502V219.877C101.668 219.951 101.727 220.011 101.8 220.011C101.873 220.011 101.932 219.951 101.932 219.877V216.502C101.932 216.428 101.873 216.369 101.8 216.369C101.727 216.369 101.668 216.428 101.668 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 218.056C100.059 218.056 100 218.116 100 218.19C100 218.264 100.059 218.324 100.132 218.324H103.468C103.541 218.324 103.6 218.264 103.6 218.19C103.6 218.116 103.541 218.056 103.468 218.056H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 209.217V212.592C101.668 212.666 101.727 212.726 101.8 212.726C101.873 212.726 101.932 212.666 101.932 212.592V209.217C101.932 209.143 101.873 209.083 101.8 209.083C101.727 209.083 101.668 209.143 101.668 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 210.771C100.059 210.771 100 210.831 100 210.905C100 210.979 100.059 211.038 100.132 211.038H103.468C103.541 211.038 103.6 210.979 103.6 210.905C103.6 210.831 103.541 210.771 103.468 210.771H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 201.932V205.307C101.668 205.381 101.727 205.441 101.8 205.441C101.873 205.441 101.932 205.381 101.932 205.307V201.932C101.932 201.858 101.873 201.798 101.8 201.798C101.727 201.798 101.668 201.858 101.668 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 203.486C100.059 203.486 100 203.546 100 203.62C100 203.693 100.059 203.753 100.132 203.753H103.468C103.541 203.753 103.6 203.693 103.6 203.62C103.6 203.546 103.541 203.486 103.468 203.486H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 194.647V198.022C101.668 198.096 101.727 198.156 101.8 198.156C101.873 198.156 101.932 198.096 101.932 198.022V194.647C101.932 194.573 101.873 194.513 101.8 194.513C101.727 194.513 101.668 194.573 101.668 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 196.201C100.059 196.201 100 196.26 100 196.334C100 196.408 100.059 196.468 100.132 196.468H103.468C103.541 196.468 103.6 196.408 103.6 196.334C103.6 196.26 103.541 196.201 103.468 196.201H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 187.362V190.737C101.668 190.811 101.727 190.871 101.8 190.871C101.873 190.871 101.932 190.811 101.932 190.737V187.362C101.932 187.288 101.873 187.228 101.8 187.228C101.727 187.228 101.668 187.288 101.668 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 188.915C100.059 188.915 100 188.975 100 189.049C100 189.123 100.059 189.183 100.132 189.183H103.468C103.541 189.183 103.6 189.123 103.6 189.049C103.6 188.975 103.541 188.915 103.468 188.915H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 180.076V183.452C101.668 183.525 101.727 183.585 101.8 183.585C101.873 183.585 101.932 183.525 101.932 183.452V180.076C101.932 180.003 101.873 179.943 101.8 179.943C101.727 179.943 101.668 180.003 101.668 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 181.63C100.059 181.63 100 181.69 100 181.764C100 181.838 100.059 181.898 100.132 181.898H103.468C103.541 181.898 103.6 181.838 103.6 181.764C103.6 181.69 103.541 181.63 103.468 181.63H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 172.791V176.166C101.668 176.24 101.727 176.3 101.8 176.3C101.873 176.3 101.932 176.24 101.932 176.166V172.791C101.932 172.717 101.873 172.658 101.8 172.658C101.727 172.658 101.668 172.717 101.668 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 174.345C100.059 174.345 100 174.405 100 174.479C100 174.553 100.059 174.612 100.132 174.612H103.468C103.541 174.612 103.6 174.553 103.6 174.479C103.6 174.405 103.541 174.345 103.468 174.345H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 165.506V168.881C101.668 168.955 101.727 169.015 101.8 169.015C101.873 169.015 101.932 168.955 101.932 168.881V165.506C101.932 165.432 101.873 165.372 101.8 165.372C101.727 165.372 101.668 165.432 101.668 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 167.06C100.059 167.06 100 167.12 100 167.194C100 167.267 100.059 167.327 100.132 167.327H103.468C103.541 167.327 103.6 167.267 103.6 167.194C103.6 167.12 103.541 167.06 103.468 167.06H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 158.221V161.596C101.668 161.67 101.727 161.73 101.8 161.73C101.873 161.73 101.932 161.67 101.932 161.596V158.221C101.932 158.147 101.873 158.087 101.8 158.087C101.727 158.087 101.668 158.147 101.668 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 159.775C100.059 159.775 100 159.835 100 159.908C100 159.982 100.059 160.042 100.132 160.042H103.468C103.541 160.042 103.6 159.982 103.6 159.908C103.6 159.835 103.541 159.775 103.468 159.775H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 150.936V154.311C101.668 154.385 101.727 154.445 101.8 154.445C101.873 154.445 101.932 154.385 101.932 154.311V150.936C101.932 150.862 101.873 150.802 101.8 150.802C101.727 150.802 101.668 150.862 101.668 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 152.49C100.059 152.49 100 152.549 100 152.623C100 152.697 100.059 152.757 100.132 152.757H103.468C103.541 152.757 103.6 152.697 103.6 152.623C103.6 152.549 103.541 152.49 103.468 152.49H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 143.65V147.026C101.668 147.099 101.727 147.159 101.8 147.159C101.873 147.159 101.932 147.099 101.932 147.026V143.65C101.932 143.577 101.873 143.517 101.8 143.517C101.727 143.517 101.668 143.577 101.668 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 145.204C100.059 145.204 100 145.264 100 145.338C100 145.412 100.059 145.472 100.132 145.472H103.468C103.541 145.472 103.6 145.412 103.6 145.338C103.6 145.264 103.541 145.204 103.468 145.204H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 136.365V139.74C101.668 139.814 101.727 139.874 101.8 139.874C101.873 139.874 101.932 139.814 101.932 139.74V136.365C101.932 136.291 101.873 136.232 101.8 136.232C101.727 136.232 101.668 136.291 101.668 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 137.919C100.059 137.919 100 137.979 100 138.053C100 138.127 100.059 138.187 100.132 138.187H103.468C103.541 138.187 103.6 138.127 103.6 138.053C103.6 137.979 103.541 137.919 103.468 137.919H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 129.08V132.455C101.668 132.529 101.727 132.589 101.8 132.589C101.873 132.589 101.932 132.529 101.932 132.455V129.08C101.932 129.006 101.873 128.946 101.8 128.946C101.727 128.946 101.668 129.006 101.668 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 130.634C100.059 130.634 100 130.694 100 130.768C100 130.842 100.059 130.902 100.132 130.902H103.468C103.541 130.902 103.6 130.842 103.6 130.768C103.6 130.694 103.541 130.634 103.468 130.634H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 121.795V125.17C101.668 125.244 101.727 125.304 101.8 125.304C101.873 125.304 101.932 125.244 101.932 125.17V121.795C101.932 121.721 101.873 121.661 101.8 121.661C101.727 121.661 101.668 121.721 101.668 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 123.349C100.059 123.349 100 123.409 100 123.483C100 123.556 100.059 123.616 100.132 123.616H103.468C103.541 123.616 103.6 123.556 103.6 123.483C103.6 123.409 103.541 123.349 103.468 123.349H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 114.51V117.885C101.668 117.959 101.727 118.019 101.8 118.019C101.873 118.019 101.932 117.959 101.932 117.885V114.51C101.932 114.436 101.873 114.376 101.8 114.376C101.727 114.376 101.668 114.436 101.668 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 116.064C100.059 116.064 100 116.124 100 116.197C100 116.271 100.059 116.331 100.132 116.331H103.468C103.541 116.331 103.6 116.271 103.6 116.197C103.6 116.124 103.541 116.064 103.468 116.064H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M101.668 107.225V110.6C101.668 110.674 101.727 110.734 101.8 110.734C101.873 110.734 101.932 110.674 101.932 110.6V107.225C101.932 107.151 101.873 107.091 101.8 107.091C101.727 107.091 101.668 107.151 101.668 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M100.132 108.779C100.059 108.779 100 108.838 100 108.912C100 108.986 100.059 109.046 100.132 109.046H103.468C103.541 109.046 103.6 108.986 103.6 108.912C103.6 108.838 103.541 108.779 103.468 108.779H100.132Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 238.358V241.733C108.868 241.807 108.927 241.867 109 241.867C109.073 241.867 109.132 241.807 109.132 241.733V238.358C109.132 238.284 109.073 238.224 109 238.224C108.927 238.224 108.868 238.284 108.868 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 239.912C107.259 239.912 107.2 239.972 107.2 240.046C107.2 240.119 107.259 240.179 107.332 240.179H110.668C110.741 240.179 110.8 240.119 110.8 240.046C110.8 239.972 110.741 239.912 110.668 239.912H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 231.073V234.448C108.868 234.522 108.927 234.582 109 234.582C109.073 234.582 109.132 234.522 109.132 234.448V231.073C109.132 230.999 109.073 230.939 109 230.939C108.927 230.939 108.868 230.999 108.868 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 232.626C107.259 232.626 107.2 232.686 107.2 232.76C107.2 232.834 107.259 232.894 107.332 232.894H110.668C110.741 232.894 110.8 232.834 110.8 232.76C110.8 232.686 110.741 232.626 110.668 232.626H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 223.788V227.163C108.868 227.236 108.927 227.296 109 227.296C109.073 227.296 109.132 227.236 109.132 227.163V223.788C109.132 223.714 109.073 223.654 109 223.654C108.927 223.654 108.868 223.714 108.868 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 225.341C107.259 225.341 107.2 225.401 107.2 225.475C107.2 225.549 107.259 225.609 107.332 225.609H110.668C110.741 225.609 110.8 225.549 110.8 225.475C110.8 225.401 110.741 225.341 110.668 225.341H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 216.502V219.877C108.868 219.951 108.927 220.011 109 220.011C109.073 220.011 109.132 219.951 109.132 219.877V216.502C109.132 216.428 109.073 216.369 109 216.369C108.927 216.369 108.868 216.428 108.868 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 218.056C107.259 218.056 107.2 218.116 107.2 218.19C107.2 218.264 107.259 218.324 107.332 218.324H110.668C110.741 218.324 110.8 218.264 110.8 218.19C110.8 218.116 110.741 218.056 110.668 218.056H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 209.217V212.592C108.868 212.666 108.927 212.726 109 212.726C109.073 212.726 109.132 212.666 109.132 212.592V209.217C109.132 209.143 109.073 209.083 109 209.083C108.927 209.083 108.868 209.143 108.868 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 210.771C107.259 210.771 107.2 210.831 107.2 210.905C107.2 210.979 107.259 211.038 107.332 211.038H110.668C110.741 211.038 110.8 210.979 110.8 210.905C110.8 210.831 110.741 210.771 110.668 210.771H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 201.932V205.307C108.868 205.381 108.927 205.441 109 205.441C109.073 205.441 109.132 205.381 109.132 205.307V201.932C109.132 201.858 109.073 201.798 109 201.798C108.927 201.798 108.868 201.858 108.868 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 203.486C107.259 203.486 107.2 203.546 107.2 203.62C107.2 203.693 107.259 203.753 107.332 203.753H110.668C110.741 203.753 110.8 203.693 110.8 203.62C110.8 203.546 110.741 203.486 110.668 203.486H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 194.647V198.022C108.868 198.096 108.927 198.156 109 198.156C109.073 198.156 109.132 198.096 109.132 198.022V194.647C109.132 194.573 109.073 194.513 109 194.513C108.927 194.513 108.868 194.573 108.868 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 196.201C107.259 196.201 107.2 196.26 107.2 196.334C107.2 196.408 107.259 196.468 107.332 196.468H110.668C110.741 196.468 110.8 196.408 110.8 196.334C110.8 196.26 110.741 196.201 110.668 196.201H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 187.362V190.737C108.868 190.811 108.927 190.871 109 190.871C109.073 190.871 109.132 190.811 109.132 190.737V187.362C109.132 187.288 109.073 187.228 109 187.228C108.927 187.228 108.868 187.288 108.868 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 188.915C107.259 188.915 107.2 188.975 107.2 189.049C107.2 189.123 107.259 189.183 107.332 189.183H110.668C110.741 189.183 110.8 189.123 110.8 189.049C110.8 188.975 110.741 188.915 110.668 188.915H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 180.076V183.452C108.868 183.525 108.927 183.585 109 183.585C109.073 183.585 109.132 183.525 109.132 183.452V180.076C109.132 180.003 109.073 179.943 109 179.943C108.927 179.943 108.868 180.003 108.868 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 181.63C107.259 181.63 107.2 181.69 107.2 181.764C107.2 181.838 107.259 181.898 107.332 181.898H110.668C110.741 181.898 110.8 181.838 110.8 181.764C110.8 181.69 110.741 181.63 110.668 181.63H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 172.791V176.166C108.868 176.24 108.927 176.3 109 176.3C109.073 176.3 109.132 176.24 109.132 176.166V172.791C109.132 172.717 109.073 172.658 109 172.658C108.927 172.658 108.868 172.717 108.868 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 174.345C107.259 174.345 107.2 174.405 107.2 174.479C107.2 174.553 107.259 174.612 107.332 174.612H110.668C110.741 174.612 110.8 174.553 110.8 174.479C110.8 174.405 110.741 174.345 110.668 174.345H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 165.506V168.881C108.868 168.955 108.927 169.015 109 169.015C109.073 169.015 109.132 168.955 109.132 168.881V165.506C109.132 165.432 109.073 165.372 109 165.372C108.927 165.372 108.868 165.432 108.868 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 167.06C107.259 167.06 107.2 167.12 107.2 167.194C107.2 167.267 107.259 167.327 107.332 167.327H110.668C110.741 167.327 110.8 167.267 110.8 167.194C110.8 167.12 110.741 167.06 110.668 167.06H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 158.221V161.596C108.868 161.67 108.927 161.73 109 161.73C109.073 161.73 109.132 161.67 109.132 161.596V158.221C109.132 158.147 109.073 158.087 109 158.087C108.927 158.087 108.868 158.147 108.868 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 159.775C107.259 159.775 107.2 159.835 107.2 159.908C107.2 159.982 107.259 160.042 107.332 160.042H110.668C110.741 160.042 110.8 159.982 110.8 159.908C110.8 159.835 110.741 159.775 110.668 159.775H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 150.936V154.311C108.868 154.385 108.927 154.445 109 154.445C109.073 154.445 109.132 154.385 109.132 154.311V150.936C109.132 150.862 109.073 150.802 109 150.802C108.927 150.802 108.868 150.862 108.868 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 152.49C107.259 152.49 107.2 152.549 107.2 152.623C107.2 152.697 107.259 152.757 107.332 152.757H110.668C110.741 152.757 110.8 152.697 110.8 152.623C110.8 152.549 110.741 152.49 110.668 152.49H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 143.65V147.026C108.868 147.099 108.927 147.159 109 147.159C109.073 147.159 109.132 147.099 109.132 147.026V143.65C109.132 143.577 109.073 143.517 109 143.517C108.927 143.517 108.868 143.577 108.868 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 145.204C107.259 145.204 107.2 145.264 107.2 145.338C107.2 145.412 107.259 145.472 107.332 145.472H110.668C110.741 145.472 110.8 145.412 110.8 145.338C110.8 145.264 110.741 145.204 110.668 145.204H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 136.365V139.74C108.868 139.814 108.927 139.874 109 139.874C109.073 139.874 109.132 139.814 109.132 139.74V136.365C109.132 136.291 109.073 136.232 109 136.232C108.927 136.232 108.868 136.291 108.868 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 137.919C107.259 137.919 107.2 137.979 107.2 138.053C107.2 138.127 107.259 138.187 107.332 138.187H110.668C110.741 138.187 110.8 138.127 110.8 138.053C110.8 137.979 110.741 137.919 110.668 137.919H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 129.08V132.455C108.868 132.529 108.927 132.589 109 132.589C109.073 132.589 109.132 132.529 109.132 132.455V129.08C109.132 129.006 109.073 128.946 109 128.946C108.927 128.946 108.868 129.006 108.868 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 130.634C107.259 130.634 107.2 130.694 107.2 130.768C107.2 130.842 107.259 130.902 107.332 130.902H110.668C110.741 130.902 110.8 130.842 110.8 130.768C110.8 130.694 110.741 130.634 110.668 130.634H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 121.795V125.17C108.868 125.244 108.927 125.304 109 125.304C109.073 125.304 109.132 125.244 109.132 125.17V121.795C109.132 121.721 109.073 121.661 109 121.661C108.927 121.661 108.868 121.721 108.868 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 123.349C107.259 123.349 107.2 123.409 107.2 123.483C107.2 123.556 107.259 123.616 107.332 123.616H110.668C110.741 123.616 110.8 123.556 110.8 123.483C110.8 123.409 110.741 123.349 110.668 123.349H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 114.51V117.885C108.868 117.959 108.927 118.019 109 118.019C109.073 118.019 109.132 117.959 109.132 117.885V114.51C109.132 114.436 109.073 114.376 109 114.376C108.927 114.376 108.868 114.436 108.868 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 116.064C107.259 116.064 107.2 116.124 107.2 116.197C107.2 116.271 107.259 116.331 107.332 116.331H110.668C110.741 116.331 110.8 116.271 110.8 116.197C110.8 116.124 110.741 116.064 110.668 116.064H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M108.868 107.225V110.6C108.868 110.674 108.927 110.734 109 110.734C109.073 110.734 109.132 110.674 109.132 110.6V107.225C109.132 107.151 109.073 107.091 109 107.091C108.927 107.091 108.868 107.151 108.868 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M107.332 108.779C107.259 108.779 107.2 108.838 107.2 108.912C107.2 108.986 107.259 109.046 107.332 109.046H110.668C110.741 109.046 110.8 108.986 110.8 108.912C110.8 108.838 110.741 108.779 110.668 108.779H107.332Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 238.358V241.733C116.068 241.807 116.127 241.867 116.2 241.867C116.273 241.867 116.332 241.807 116.332 241.733V238.358C116.332 238.284 116.273 238.224 116.2 238.224C116.127 238.224 116.068 238.284 116.068 238.358Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 239.912C114.459 239.912 114.4 239.972 114.4 240.046C114.4 240.119 114.459 240.179 114.532 240.179H117.868C117.941 240.179 118 240.119 118 240.046C118 239.972 117.941 239.912 117.868 239.912H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 231.073V234.448C116.068 234.522 116.127 234.582 116.2 234.582C116.273 234.582 116.332 234.522 116.332 234.448V231.073C116.332 230.999 116.273 230.939 116.2 230.939C116.127 230.939 116.068 230.999 116.068 231.073Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 232.626C114.459 232.626 114.4 232.686 114.4 232.76C114.4 232.834 114.459 232.894 114.532 232.894H117.868C117.941 232.894 118 232.834 118 232.76C118 232.686 117.941 232.626 117.868 232.626H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 223.788V227.163C116.068 227.236 116.127 227.296 116.2 227.296C116.273 227.296 116.332 227.236 116.332 227.163V223.788C116.332 223.714 116.273 223.654 116.2 223.654C116.127 223.654 116.068 223.714 116.068 223.788Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 225.341C114.459 225.341 114.4 225.401 114.4 225.475C114.4 225.549 114.459 225.609 114.532 225.609H117.868C117.941 225.609 118 225.549 118 225.475C118 225.401 117.941 225.341 117.868 225.341H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 216.502V219.877C116.068 219.951 116.127 220.011 116.2 220.011C116.273 220.011 116.332 219.951 116.332 219.877V216.502C116.332 216.428 116.273 216.369 116.2 216.369C116.127 216.369 116.068 216.428 116.068 216.502Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 218.056C114.459 218.056 114.4 218.116 114.4 218.19C114.4 218.264 114.459 218.324 114.532 218.324H117.868C117.941 218.324 118 218.264 118 218.19C118 218.116 117.941 218.056 117.868 218.056H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 209.217V212.592C116.068 212.666 116.127 212.726 116.2 212.726C116.273 212.726 116.332 212.666 116.332 212.592V209.217C116.332 209.143 116.273 209.083 116.2 209.083C116.127 209.083 116.068 209.143 116.068 209.217Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 210.771C114.459 210.771 114.4 210.831 114.4 210.905C114.4 210.979 114.459 211.038 114.532 211.038H117.868C117.941 211.038 118 210.979 118 210.905C118 210.831 117.941 210.771 117.868 210.771H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 201.932V205.307C116.068 205.381 116.127 205.441 116.2 205.441C116.273 205.441 116.332 205.381 116.332 205.307V201.932C116.332 201.858 116.273 201.798 116.2 201.798C116.127 201.798 116.068 201.858 116.068 201.932Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 203.486C114.459 203.486 114.4 203.546 114.4 203.62C114.4 203.693 114.459 203.753 114.532 203.753H117.868C117.941 203.753 118 203.693 118 203.62C118 203.546 117.941 203.486 117.868 203.486H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 194.647V198.022C116.068 198.096 116.127 198.156 116.2 198.156C116.273 198.156 116.332 198.096 116.332 198.022V194.647C116.332 194.573 116.273 194.513 116.2 194.513C116.127 194.513 116.068 194.573 116.068 194.647Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 196.201C114.459 196.201 114.4 196.26 114.4 196.334C114.4 196.408 114.459 196.468 114.532 196.468H117.868C117.941 196.468 118 196.408 118 196.334C118 196.26 117.941 196.201 117.868 196.201H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 187.362V190.737C116.068 190.811 116.127 190.871 116.2 190.871C116.273 190.871 116.332 190.811 116.332 190.737V187.362C116.332 187.288 116.273 187.228 116.2 187.228C116.127 187.228 116.068 187.288 116.068 187.362Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 188.915C114.459 188.915 114.4 188.975 114.4 189.049C114.4 189.123 114.459 189.183 114.532 189.183H117.868C117.941 189.183 118 189.123 118 189.049C118 188.975 117.941 188.915 117.868 188.915H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 180.076V183.452C116.068 183.525 116.127 183.585 116.2 183.585C116.273 183.585 116.332 183.525 116.332 183.452V180.076C116.332 180.003 116.273 179.943 116.2 179.943C116.127 179.943 116.068 180.003 116.068 180.076Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 181.63C114.459 181.63 114.4 181.69 114.4 181.764C114.4 181.838 114.459 181.898 114.532 181.898H117.868C117.941 181.898 118 181.838 118 181.764C118 181.69 117.941 181.63 117.868 181.63H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 172.791V176.166C116.068 176.24 116.127 176.3 116.2 176.3C116.273 176.3 116.332 176.24 116.332 176.166V172.791C116.332 172.717 116.273 172.658 116.2 172.658C116.127 172.658 116.068 172.717 116.068 172.791Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 174.345C114.459 174.345 114.4 174.405 114.4 174.479C114.4 174.553 114.459 174.612 114.532 174.612H117.868C117.941 174.612 118 174.553 118 174.479C118 174.405 117.941 174.345 117.868 174.345H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 165.506V168.881C116.068 168.955 116.127 169.015 116.2 169.015C116.273 169.015 116.332 168.955 116.332 168.881V165.506C116.332 165.432 116.273 165.372 116.2 165.372C116.127 165.372 116.068 165.432 116.068 165.506Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 167.06C114.459 167.06 114.4 167.12 114.4 167.194C114.4 167.267 114.459 167.327 114.532 167.327H117.868C117.941 167.327 118 167.267 118 167.194C118 167.12 117.941 167.06 117.868 167.06H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 158.221V161.596C116.068 161.67 116.127 161.73 116.2 161.73C116.273 161.73 116.332 161.67 116.332 161.596V158.221C116.332 158.147 116.273 158.087 116.2 158.087C116.127 158.087 116.068 158.147 116.068 158.221Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 159.775C114.459 159.775 114.4 159.835 114.4 159.908C114.4 159.982 114.459 160.042 114.532 160.042H117.868C117.941 160.042 118 159.982 118 159.908C118 159.835 117.941 159.775 117.868 159.775H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 150.936V154.311C116.068 154.385 116.127 154.445 116.2 154.445C116.273 154.445 116.332 154.385 116.332 154.311V150.936C116.332 150.862 116.273 150.802 116.2 150.802C116.127 150.802 116.068 150.862 116.068 150.936Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 152.49C114.459 152.49 114.4 152.549 114.4 152.623C114.4 152.697 114.459 152.757 114.532 152.757H117.868C117.941 152.757 118 152.697 118 152.623C118 152.549 117.941 152.49 117.868 152.49H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 143.65V147.026C116.068 147.099 116.127 147.159 116.2 147.159C116.273 147.159 116.332 147.099 116.332 147.026V143.65C116.332 143.577 116.273 143.517 116.2 143.517C116.127 143.517 116.068 143.577 116.068 143.65Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 145.204C114.459 145.204 114.4 145.264 114.4 145.338C114.4 145.412 114.459 145.472 114.532 145.472H117.868C117.941 145.472 118 145.412 118 145.338C118 145.264 117.941 145.204 117.868 145.204H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 136.365V139.74C116.068 139.814 116.127 139.874 116.2 139.874C116.273 139.874 116.332 139.814 116.332 139.74V136.365C116.332 136.291 116.273 136.232 116.2 136.232C116.127 136.232 116.068 136.291 116.068 136.365Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 137.919C114.459 137.919 114.4 137.979 114.4 138.053C114.4 138.127 114.459 138.187 114.532 138.187H117.868C117.941 138.187 118 138.127 118 138.053C118 137.979 117.941 137.919 117.868 137.919H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 129.08V132.455C116.068 132.529 116.127 132.589 116.2 132.589C116.273 132.589 116.332 132.529 116.332 132.455V129.08C116.332 129.006 116.273 128.946 116.2 128.946C116.127 128.946 116.068 129.006 116.068 129.08Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 130.634C114.459 130.634 114.4 130.694 114.4 130.768C114.4 130.842 114.459 130.902 114.532 130.902H117.868C117.941 130.902 118 130.842 118 130.768C118 130.694 117.941 130.634 117.868 130.634H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 121.795V125.17C116.068 125.244 116.127 125.304 116.2 125.304C116.273 125.304 116.332 125.244 116.332 125.17V121.795C116.332 121.721 116.273 121.661 116.2 121.661C116.127 121.661 116.068 121.721 116.068 121.795Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 123.349C114.459 123.349 114.4 123.409 114.4 123.483C114.4 123.556 114.459 123.616 114.532 123.616H117.868C117.941 123.616 118 123.556 118 123.483C118 123.409 117.941 123.349 117.868 123.349H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 114.51V117.885C116.068 117.959 116.127 118.019 116.2 118.019C116.273 118.019 116.332 117.959 116.332 117.885V114.51C116.332 114.436 116.273 114.376 116.2 114.376C116.127 114.376 116.068 114.436 116.068 114.51Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 116.064C114.459 116.064 114.4 116.124 114.4 116.197C114.4 116.271 114.459 116.331 114.532 116.331H117.868C117.941 116.331 118 116.271 118 116.197C118 116.124 117.941 116.064 117.868 116.064H114.532Z"
        fill={colorConfig.grill}
      />
      <path
        d="M116.068 107.225V110.6C116.068 110.674 116.127 110.734 116.2 110.734C116.273 110.734 116.332 110.674 116.332 110.6V107.225C116.332 107.151 116.273 107.091 116.2 107.091C116.127 107.091 116.068 107.151 116.068 107.225Z"
        fill={colorConfig.grill}
      />
      <path
        d="M114.532 108.779C114.459 108.779 114.4 108.838 114.4 108.912C114.4 108.986 114.459 109.046 114.532 109.046H117.868C117.941 109.046 118 108.986 118 108.912C118 108.838 117.941 108.779 117.868 108.779H114.532Z"
        fill={colorConfig.grill}
      />
    </svg>
  );
};

export { OpenDCDH4 };

import React, { cloneElement } from "react"; // Import cloneElement
import CodeHeader from "@/components/home/code-header";
import Globe from "@/components/home/globe";
import GitHubCalendar from "react-github-calendar";
import { ThemeInput } from "react-activity-calendar";
import { Marquee } from "./marquee";
import { LuMapPin, LuZap } from "react-icons/lu";
import type { VCardIconType } from "@/types/config";
import { BlurFade } from "@/components/magicui/blur-fade";

import "@/styles/about/coding-stats.css";

interface TechStack {
  name: string;
  icon: React.JSX.Element; // Use React.JSX.Element
}

interface TechStacks {
  programmingLanguages: TechStack[];
  frameworks: TechStack[];
}

interface GlobeConfig {
  markerLocation: [number, number];
  locationString: string;
}

interface CodingStatsProps {
  techStacks: TechStacks;
  githubUsername: string;
  globe: GlobeConfig;
  techStackHeaderText?: string;
}

/**
 * Returns a date that is a specified number of months before the current date
 * @param {number} reduceMonth - Number of months to subtract from current date
 * @return {Date} - Date object representing the date that many months ago
 */

const filterLastNMonths = (contributions, months = 11) => {
  const today = new Date();

  // Calculate the cutoff date (N months ago)
  let cutoffMonth = today.getMonth() - months;
  let cutoffYear = today.getFullYear();

  // Adjust the year if we go back past January
  while (cutoffMonth < 0) {
    cutoffMonth += 12;
    cutoffYear -= 1;
  }

  const cutoffDate = new Date(cutoffYear, cutoffMonth, today.getDate());

  // Filter contributions that are after the cutoff date
  return contributions.filter((day) => {
    const date = new Date(day.date);
    return date >= cutoffDate;
  });
};

function CodingStats({
  techStacks,
  githubUsername,
  globe,
  techStackHeaderText = "",
}: CodingStatsProps) {
  const yellowTheme: ThemeInput = {
    light: ["#EBEBEB", "#FFDA6B"],
    dark: ["#383838", "#FFDA6B"],
  };

  return (
    <section id="coding-stats">
      <BlurFade inView delay={0.2} direction="left">
        <CodeHeader text={techStackHeaderText} />

        <ul className="mt-[30px] grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 lg:gap-y-[20px] lg:gap-x-[25px]">
          <li className="relative rounded-2xl shadow-shadow-2 coding-item bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl">
            <div className="shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-2 overflow-hidden rounded-xl p-2">
              <div className="flex items-center gap-2 text-white-2">
                <LuZap size={18} />
                <h2 className="text-sm font-light">Stacks</h2>
              </div>
              <Marquee gap="20px" className="py-2" fade pauseOnHover>
                {techStacks.programmingLanguages.map((stack) =>
                  // stack.icon is now a JSX.Element. We need to clone it to add props.
                  // The key here is for React's list rendering.
                  cloneElement(stack.icon, {
                    key: stack.name,
                    className:
                      "size-10 text-white-2 hover:scale-110 hover:text-orange-yellow-crayola",
                  })
                )}
              </Marquee>
              <Marquee gap="20px" className="py-2" reverse fade pauseOnHover>
                {techStacks.frameworks.map((stack) =>
                  cloneElement(stack.icon, {
                    key: stack.name,
                    className:
                      "size-10 text-white-2 hover:scale-110 hover:text-orange-yellow-crayola",
                  })
                )}
              </Marquee>
            </div>
          </li>

          <li className="relative rounded-2xl shadow-shadow-2 coding-item bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl h-[200px] md:h-auto">
            <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[380px]">
              <div className="flex items-center gap-2 text-white-2 mt-4 ml-4">
                <LuMapPin size={18} />
                <h2 className="text-sm font-light">{globe.locationString}</h2>
              </div>
              <Globe markerLocation={globe.markerLocation} />
            </div>
          </li>
        </ul>

        <section id="github-calendar" className="text-light-gray mt-5">
          <GitHubCalendar
            transformData={filterLastNMonths}
            username={githubUsername}
            blockSize={12}
            blockMargin={4}
            colorScheme="dark"
            blockRadius={2}
            fontSize={14}
            style={{ fontWeight: "bold" }}
            theme={yellowTheme}
          />
        </section>
      </BlurFade>
    </section>
  );
}

export default CodingStats;

import { useMinuteListener } from "@/hooks/use-minute-listener";
import { cn } from "@/lib/utils";
import { range } from "radash";
import { useEffect, useMemo, useRef, useState } from "react";

const selectable = [0, 15, 30, 45];
const workingHours: [number, number] = [9, 18];

export function Timeline() {
  const timeIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

  useMinuteListener((date) => setCurrentMinute(date.getMinutes()));

  const hour = new Date().getHours();

  const calculatePercentage = useMemo(
    () => ((hour * 60 + currentMinute) * 100) / (24 * 60),
    [currentMinute, hour]
  );

  const hourString = hour > 9 ? hour : `0${hour}`;

  useEffect(() => {
    if (!timeIndicatorRef.current) return;
    timeIndicatorRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [timeIndicatorRef]);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Timeline</h1>
      <div className="block relative">
        {Array.from(range(0, 23)).map((hour) => {
          const hourToString = hour > 9 ? hour : `0${hour}`;
          const isWorkingHour =
            workingHours[0] <= hour && hour <= workingHours[1];

          return (
            <div key={hour} className="flex w-full group/parent">
              <div className="w-11 text-sm flex justify-center font-medium">
                {hourToString}:00
              </div>
              <div
                style={
                  !isWorkingHour
                    ? {
                        backgroundSize: "8px 8px",
                        backgroundImage:
                          "linear-gradient(45deg, transparent 46%, #e5e5e5 49%, #e5e5e5 51%, transparent 55%)",
                      }
                    : undefined
                }
                className={cn(
                  "border-x border-b flex-1 group-first/parent:border-t grid dark:border-gray-600/50 border-gray-300",
                  !isWorkingHour && "bg-gray-50 dark:bg-gray-900/50"
                )}
              >
                {selectable.map((minute) => {
                  const minuteString = minute > 9 ? minute : `0${minute}`;
                  return (
                    <div
                      key={minute}
                      className="border-b last:border-b-0 p-1 flex items-center dark:border-gray-600/30 border-gray-100 group/select"
                      onClick={() => {
                        alert(`${hourToString}:${minuteString}`);
                      }}
                    >
                      <div className="bg-blue-500/20 invisible group-hover/select:visible font-medium text-xs flex-1 rounded border border-blue-500 px-2 py-1">
                        {hourToString}:{minuteString}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div
          ref={timeIndicatorRef}
          style={{
            top: `${calculatePercentage}%`,
            left: 0,
          }}
          className={`absolute w-full flex items-center pointer-events-none`}
        >
          <div className="relative pl-11 w-full">
            <hr className="w-full border-b border-red-500" />
            <div className="absolute text-white bg-red-500 text-xs font-medium py-1 top-0 right-0 px-2 rounded-b">
              {hourString}:
              {currentMinute > 9 ? currentMinute : `0${currentMinute}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

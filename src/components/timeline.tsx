import { useMinuteListener } from "@/hooks/use-minute-listener";
import { range } from "radash";
import { useMemo, useState } from "react";

const selectable = [0, 15, 30, 45];

export function Timeline() {
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

  useMinuteListener((date) => setCurrentMinute(date.getMinutes()));

  const calculatePercentage = useMemo(
    () => ((new Date().getHours() * 60 + currentMinute) * 100) / (24 * 60),
    [currentMinute]
  );

  return (
    <div className="block relative">
      {Array.from(range(0, 23)).map((hour) => {
        const hourToString = hour > 9 ? hour : `0${hour}`;

        return (
          <div key={hour} className="flex w-full group/parent">
            <div className="w-11 text-sm flex justify-center font-medium">
              {hourToString}:00
            </div>
            <div className="border-x border-b flex-1 group-first/parent:border-t grid border-gray-300">
              {selectable.map((minute) => (
                <div
                  key={minute}
                  className="border-b last:border-b-0 h-8 p-1 flex items-center border-gray-200  group/select"
                >
                  <div className="bg-blue-500/20 hidden  group-hover/select:block text-sm flex-1 rounded border border-blue-500 px-2">
                    {hourToString}:{minute > 9 ? minute : `0${minute}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div
        style={{
          top: `${calculatePercentage}%`,
          left: 0,
        }}
        className={`absolute w-full flex items-center pointer-events-none`}
      >
        <div className="relative pl-11 w-full">
          <hr className="w-full border-b border-red-500" />
          <div className="absolute text-white bg-red-500 text-sm top-0 right-0 px-2 rounded-b">
            {`11`}:{currentMinute > 9 ? currentMinute : `0${currentMinute}`}
          </div>
        </div>
      </div>
    </div>
  );
}

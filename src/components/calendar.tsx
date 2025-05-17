import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Calendar() {
  const [currentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getCalendar = useMemo(() => {
    const year = currentYear;
    const month = currentMonth;
    const startDay = new Date(year, month, 1).getDay();
    const offset = startDay === 0 ? 6 : startDay - 1;

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    const currentMonthDays = new Date(year, month + 1, 0).getDate();

    const prevTail = Array.from({ length: offset }, (_, i) => ({
      day: prevMonthDays - offset + i + 1,
      month: prevMonth,
      year: prevYear,
      current: false,
    }));

    const currentDays = Array.from({ length: currentMonthDays }, (_, i) => ({
      day: i + 1,
      month,
      year,
      current: true,
    }));

    const total = prevTail.length + currentDays.length;
    const remaining = (7 - (total % 7)) % 7;

    const nextHead = Array.from({ length: remaining }, (_, i) => ({
      day: i + 1,
      month: nextMonth,
      year: nextYear,
      current: false,
    }));

    return [...prevTail, ...currentDays, ...nextHead];
  }, [currentYear, currentMonth]);

  function handlePrev() {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    setCurrentMonth(prevMonth);
    setCurrentYear(prevYear);
  }

  function handleNext() {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
  }

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendar</h1>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">
          {currentYear}, {monthNames[currentMonth]}
        </h3>
        <div className="flex gap-2">
          <Button size="icon" onClick={handlePrev}>
            <ChevronLeftIcon />
          </Button>
          <Button size="icon" onClick={handleNext}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full mb-2">
        {daysOfWeek.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 w-full flex-1">
        {getCalendar.map((item, idx) => {
          const { day, month, current } = item;
          const isCurrentMonth =
            month === new Date().getMonth() && day === currentDate;
          return (
            <div
              key={idx}
              style={
                !current
                  ? {
                      backgroundSize: "8px 8px",
                      backgroundImage:
                        "linear-gradient(45deg, transparent 46%, var(--border) 49%, var(--border) 51%, transparent 55%)",
                    }
                  : undefined
              }
              className={cn(
                "h-full border rounded p-2 hover:border-blue-500 transition-all duration-100",
                !current && "bg-gray-50 dark:bg-gray-900/5"
              )}
            >
              <p
                className={cn(
                  "size-6 flex items-center justify-center rounded-full  text-xs font-medium",
                  isCurrentMonth && "bg-blue-500 text-white"
                )}
              >
                {item.day}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

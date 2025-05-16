import { useEffect } from "react";

export function useMinuteListener(callback: (date: Date) => void) {
  useEffect(() => {
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      callback(new Date());


      const interval = setInterval(() => {
        callback(new Date());
      }, 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, [callback]);
}
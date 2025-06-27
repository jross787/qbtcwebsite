import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CountdownState {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function QuantumCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const targetDate = new Date(2028, 11, 31, 23, 59, 59); // December 31, 2028, 11:59:59 PM

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const remainingAfterYears = difference % (1000 * 60 * 60 * 24 * 365.25);
        const days = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingAfterYears % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingAfterYears % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingAfterYears % (1000 * 60)) / 1000);

        setCountdown({ years, days, hours, minutes, seconds });
      }
    };

    // Calculate immediately
    calculateCountdown();

    const interval = setInterval(calculateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center px-2">
      <Card className="glass-card p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl animate-pulse-orange shadow-xl border-2 border-primary/20 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <h3 className="text-primary mb-2 sm:mb-3 md:mb-4 font-bold text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Q-Day Countdown</h3>
        <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-mono text-center">
          <div className="flex flex-col items-center min-w-0">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{countdown.years}</span>
            <span className="text-muted-foreground text-xs font-medium">Y</span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">:</span>
          <div className="flex flex-col items-center min-w-0">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{countdown.days}</span>
            <span className="text-muted-foreground text-xs font-medium">D</span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">:</span>
          <div className="flex flex-col items-center min-w-0">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{countdown.hours}</span>
            <span className="text-muted-foreground text-xs font-medium">H</span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">:</span>
          <div className="flex flex-col items-center min-w-0">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{countdown.minutes}</span>
            <span className="text-muted-foreground text-xs font-medium">M</span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">:</span>
          <div className="flex flex-col items-center min-w-0">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{countdown.seconds}</span>
            <span className="text-muted-foreground text-xs font-medium">S</span>
          </div>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm mt-2 sm:mt-3 text-center leading-tight px-1">Estimated date that a cryptographically relevant quantum computer may arrive</p>
      </Card>
    </div>
  );
}

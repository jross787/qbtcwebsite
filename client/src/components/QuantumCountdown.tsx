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
    <div className="flex justify-center w-full px-4 sm:px-6">
      <Card className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl animate-pulse-orange shadow-xl border-2 border-primary/20 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
        <h3 className="text-primary mb-3 sm:mb-4 md:mb-6 font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[42px]">Q-Day Countdown</h3>
        <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 font-mono">
          <div className="text-center">
            <div className="text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.years}</div>
            <div className="text-muted-foreground text-xs md:text-sm font-semibold">Y</div>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.days}</div>
            <div className="text-muted-foreground text-xs md:text-sm font-semibold">D</div>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.hours}</div>
            <div className="text-muted-foreground text-xs md:text-sm font-semibold">H</div>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.minutes}</div>
            <div className="text-muted-foreground text-xs md:text-sm font-semibold">M</div>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.seconds}</div>
            <div className="text-muted-foreground text-xs md:text-sm font-semibold">S</div>
          </div>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-3 sm:mt-4 text-center leading-tight">Estimated date that a cryptographically relevant quantum computer may arrive</p>
      </Card>
    </div>
  );
}

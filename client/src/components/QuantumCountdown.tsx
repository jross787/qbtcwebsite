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
    <Card className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl animate-pulse-orange shadow-xl border-2 border-primary/20 mx-auto">
      <h3 className="text-primary mb-4 sm:mb-6 font-bold text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Q-Day Countdown</h3>
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-center font-mono max-w-2xl mx-auto">
        <div className="min-w-0 overflow-hidden">
          <div className="text-primary font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 leading-tight">{countdown.years.toString().padStart(2, '0')}</div>
          <div className="text-muted-foreground text-xs sm:text-sm lg:text-base font-semibold">Years</div>
        </div>
        <div className="min-w-0 overflow-hidden">
          <div className="text-primary font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 leading-tight">{countdown.days.toString().padStart(3, '0')}</div>
          <div className="text-muted-foreground text-xs sm:text-sm lg:text-base font-semibold">Days</div>
        </div>
        <div className="min-w-0 overflow-hidden">
          <div className="text-primary font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 leading-tight">{countdown.hours.toString().padStart(2, '0')}</div>
          <div className="text-muted-foreground text-xs sm:text-sm lg:text-base font-semibold">Hours</div>
        </div>
        <div className="min-w-0 overflow-hidden">
          <div className="text-primary font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 leading-tight">{countdown.minutes.toString().padStart(2, '0')}</div>
          <div className="text-muted-foreground text-xs sm:text-sm lg:text-base font-semibold">Minutes</div>
        </div>
        <div className="min-w-0 overflow-hidden">
          <div className="text-primary font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 leading-tight">{countdown.seconds.toString().padStart(2, '0')}</div>
          <div className="text-muted-foreground text-xs sm:text-sm lg:text-base font-semibold">Seconds</div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4 text-center max-w-2xl mx-auto px-2">Estimated date that a cryptographically relevant quantum computer may arrive</p>
    </Card>
  );
}

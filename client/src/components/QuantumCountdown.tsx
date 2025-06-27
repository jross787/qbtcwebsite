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
    <div className="w-full overflow-hidden">
      <div className="mx-auto px-4 max-w-full">
        <Card className="glass-card mx-auto animate-pulse-orange shadow-xl border-2 border-primary/20 max-w-full overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6">
            <h3 className="text-primary mb-3 sm:mb-4 font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
              Q-Day Countdown
            </h3>
            
            {/* Mobile Layout - Stack in 2 rows */}
            <div className="block sm:hidden">
              <div className="flex justify-center gap-4 mb-2 font-mono">
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">{countdown.years}</div>
                  <div className="text-muted-foreground text-xs">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">{countdown.days}</div>
                  <div className="text-muted-foreground text-xs">Days</div>
                </div>
              </div>
              <div className="flex justify-center gap-4 font-mono">
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">{countdown.hours}</div>
                  <div className="text-muted-foreground text-xs">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">{countdown.minutes}</div>
                  <div className="text-muted-foreground text-xs">Min</div>
                </div>
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">{countdown.seconds}</div>
                  <div className="text-muted-foreground text-xs">Sec</div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Single row */}
            <div className="hidden sm:flex justify-center gap-2 md:gap-4 lg:gap-6 font-mono">
              <div className="text-center">
                <div className="text-primary font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.years}</div>
                <div className="text-muted-foreground text-sm md:text-base font-semibold">Years</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.days}</div>
                <div className="text-muted-foreground text-sm md:text-base font-semibold">Days</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.hours}</div>
                <div className="text-muted-foreground text-sm md:text-base font-semibold">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.minutes}</div>
                <div className="text-muted-foreground text-sm md:text-base font-semibold">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">{countdown.seconds}</div>
                <div className="text-muted-foreground text-sm md:text-base font-semibold">Seconds</div>
              </div>
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-3 sm:mt-4 text-center leading-tight">
              Estimated date that a cryptographically relevant quantum computer may arrive
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

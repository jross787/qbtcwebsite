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
    <Card className="glass-card p-8 rounded-3xl inline-block animate-pulse-orange shadow-xl border-2 border-primary/20">
      <h3 className="text-primary mb-6 font-bold text-center text-[42px]">Q-Day Countdown</h3>
      <div className="flex justify-center space-x-6 text-3xl font-mono">
        <div className="text-center">
          <div className="text-primary font-bold text-4xl mb-2">{countdown.years}</div>
          <div className="text-muted-foreground text-base font-semibold">Years</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-4xl mb-2">{countdown.days}</div>
          <div className="text-muted-foreground text-base font-semibold">Days</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-4xl mb-2">{countdown.hours}</div>
          <div className="text-muted-foreground text-base font-semibold">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-4xl mb-2">{countdown.minutes}</div>
          <div className="text-muted-foreground text-base font-semibold">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-4xl mb-2">{countdown.seconds}</div>
          <div className="text-muted-foreground text-base font-semibold">Seconds</div>
        </div>
      </div>
      <p className="text-muted-foreground text-base mt-4 text-center max-w-2xl mx-auto">Estimated date that a cryptographically relevant quantum computer may arrive</p>
    </Card>
  );
}

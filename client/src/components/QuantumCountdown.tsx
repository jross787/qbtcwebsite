import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CountdownState {
  years: number;
  days: number;
  hours: number;
  minutes: number;
}

export function QuantumCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const targetDate = new Date(2028, 5, 1, 0, 0, 0); // June 1, 2028, 12:00:00 AM

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const remainingAfterYears = difference % (1000 * 60 * 60 * 24 * 365.25);
        const days = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingAfterYears % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingAfterYears % (1000 * 60 * 60)) / (1000 * 60));

        setCountdown({ years, days, hours, minutes });
      }
    };

    // Calculate immediately
    calculateCountdown();

    const interval = setInterval(calculateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card p-12 rounded-3xl inline-block animate-pulse-orange shadow-2xl border-2 border-primary/20">
      <h3 className="text-primary mb-8 text-[48px] font-bold text-center">Q-Day Countdown</h3>
      <div className="flex justify-center space-x-12 text-5xl font-mono">
        <div className="text-center">
          <div className="text-primary font-bold text-6xl mb-2">{countdown.years}</div>
          <div className="text-muted-foreground text-lg font-semibold">Years</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-6xl mb-2">{countdown.days}</div>
          <div className="text-muted-foreground text-lg font-semibold">Days</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-6xl mb-2">{countdown.hours}</div>
          <div className="text-muted-foreground text-lg font-semibold">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-6xl mb-2">{countdown.minutes}</div>
          <div className="text-muted-foreground text-lg font-semibold">Minutes</div>
        </div>
      </div>
      <p className="text-muted-foreground text-lg mt-6 text-center max-w-2xl mx-auto">
        Estimated time until cryptographically relevant quantum computer
      </p>
    </Card>
  );
}

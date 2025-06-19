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
    years: 7,
    days: 142,
    hours: 18,
    minutes: 33,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date();
      targetDate.setFullYear(targetDate.getFullYear() + 7);
      targetDate.setMonth(5); // June
      targetDate.setDate(19); // 19th

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setCountdown({ years, days, hours, minutes });
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card p-6 rounded-2xl inline-block animate-pulse-orange">
      <h3 className="text-primary font-semibold mb-4">Q-Day Countdown</h3>
      <div className="flex justify-center space-x-6 text-2xl font-mono">
        <div className="text-center">
          <div className="text-primary font-bold">{countdown.years}</div>
          <div className="text-muted-foreground text-sm">Years</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold">{countdown.days}</div>
          <div className="text-muted-foreground text-sm">Days</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold">{countdown.hours}</div>
          <div className="text-muted-foreground text-sm">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold">{countdown.minutes}</div>
          <div className="text-muted-foreground text-sm">Minutes</div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-2">
        Estimated time until cryptographically relevant quantum computer
      </p>
    </Card>
  );
}

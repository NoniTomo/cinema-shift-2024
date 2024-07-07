import { useEffect, useState } from 'react';

export default function useTimer() {
  const [countdown, setСountdown] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [end, setEnd] = useState<boolean>(false);
  console.log(countdown);
  
  useEffect(() => {
    console.log('countdown = ', countdown)
    if (countdown === 0) stopTimer();
  }, [countdown]);

  const startTimer = (time: number) => {
    if (!timer) {
      setСountdown(time);
      setTimer(setInterval(() => setСountdown((prevCountdown) => prevCountdown - 1), 1000));
      setEnd(false);
    }
  }

  const stopTimer = () => {
    console.log('stopTimer | countdown = ', countdown)
    clearInterval(timer);
    setTimer(undefined);
    setEnd(true);
  }

  return {
    countdown,
    startTimer,
    stopTimer,
    end
  }
}

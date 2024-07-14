import { useEffect, useState } from 'react';

export default function useTimer() {
  const [countdown, setСountdown] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isEnding, setIsEnding] = useState<boolean>(false);

  useEffect(() => {
    if (countdown === 0) stop();
  }, [countdown]);

  const start = (time: number) => {
    if (!timer) {
      setСountdown(time);
      setIsEnding(false);
      setTimer(setInterval(() => setСountdown((prevCountdown) => prevCountdown - 1), 1000));
    }
  };

  const stop = () => {
    clearInterval(timer);
    setTimer(undefined);
    setIsEnding(true);
  };

  return {
    countdown,
    start,
    stop,
    isEnding
  };
}

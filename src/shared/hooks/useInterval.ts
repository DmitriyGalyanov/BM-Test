import { useEffect, useRef } from 'react';

const useInterval = ({
  callback: _callback,
  delay,
}: {
  callback: (() => void) | null;
  delay: number | null;
}) => {
  const callback = useRef(_callback);
  useEffect(() => {
    callback.current = _callback;
  }, [_callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    if (callback.current === null) {
      return;
    }

    const id = setInterval(() => callback.current?.(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;

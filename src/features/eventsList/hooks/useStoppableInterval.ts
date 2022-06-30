import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useInterval } from 'shared/hooks';

import { INIT_IS_TIMER_ON } from 'features/eventsList/consts';

const BASE_INTERVAL_TICK_TIME = 1000;

type TUseStoppableIntervalProps = {
  callback: () => void;
  delay: number;
  tickTime?: number;
};

export type TUseStoppableIntervalReturnType = ReturnType<
  typeof useStoppableInterval
>;

const useStoppableInterval = ({
  callback: _callback,
  delay,
  tickTime = BASE_INTERVAL_TICK_TIME,
}: TUseStoppableIntervalProps) => {
  const [timeSinceStartOrLastFire, setTimeSinceStartOrLastFire] = useState(0);
  const [timeTillFire, setTimeTillFire] = useState(delay);

  const [isIntervalOn, setIsIntervalOn] = useState(INIT_IS_TIMER_ON);
  const pauseInterval = useCallback(() => setIsIntervalOn(false), []);
  const resumeInterval = useCallback(() => setIsIntervalOn(true), []);
  // doesn't freeze!
  const toggleIsIntervalOn = useCallback(
    () => setIsIntervalOn((current) => !current),
    [],
  );

  const [isIntervalFrozen, setIsIntervalFrozen] = useState(!INIT_IS_TIMER_ON);
  const freezeInterval = () => setIsIntervalFrozen(true);
  const unfreezeInterval = () => setIsIntervalFrozen(false);

  const _resetTimers = useCallback(() => {
    setTimeTillFire(delay);
    setTimeSinceStartOrLastFire(0);
    unfreezeInterval();
    resumeInterval();
  }, [delay, resumeInterval]);

  /**
   * can be called explicitly (outside of the hook)
   * to fire immediately (calls {@link _resetTimers} as well)
   *
   * should be a ref to prevent rerenders in case callback is not memoized
   */
  const callbackToFire = useRef(() => {
    _callback();
    _resetTimers();
  });
  useEffect(() => {
    callbackToFire.current = () => {
      _callback();
      _resetTimers();
    };
  }, [_callback, _resetTimers]);

  // handle [un]focus
  useFocusEffect(
    useCallback(() => {
      callbackToFire.current();
      return () => {
        pauseInterval();
        freezeInterval();
      };
    }, [pauseInterval]),
  );

  const _handleInterval = useCallback(() => {
    setTimeSinceStartOrLastFire((current) => current + tickTime);

    if (isIntervalOn) {
      setTimeTillFire((currentTimeTillFire) => currentTimeTillFire - tickTime);
    }

    if (timeTillFire <= tickTime) {
      callbackToFire.current();
    }
  }, [tickTime, isIntervalOn, timeTillFire]);

  useInterval({
    callback: _handleInterval,
    delay: !isIntervalFrozen ? tickTime : null,
  });

  return {
    isIntervalOn,
    toggleIsIntervalOn,
    pauseInterval,
    resumeInterval,

    timeTillFire,
    timeSinceStartOrLastFire,
    callbackToFire,
  };
};

export default useStoppableInterval;

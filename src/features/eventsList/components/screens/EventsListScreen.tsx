import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TEventsListScreenProps } from 'application/navigation/types';
import { screenWrap } from 'shared/consts/styles';

import EventsList from 'features/eventsList/components/EventsList';
import { useGetEventsQuery } from 'features/eventsList/state';
import { useStoppableInterval } from 'features/eventsList/hooks';
import {
  DELAY_BEFORE_USER_CAN_REFETCH,
  DELAY_PER_FETCH,
  EVENTS_PER_PAGE,
} from 'features/eventsList/consts';

const EventsListScreen: React.FC<TEventsListScreenProps> = () => {
  const [page, setPage] = useState(1);
  const goToNextPage = useCallback(
    () => setPage((currentPage) => currentPage + 1),
    [],
  );

  const { data, isFetching } = useGetEventsQuery({
    page,
    perPage: EVENTS_PER_PAGE,
  });

  const {
    isIntervalOn,
    toggleIsIntervalOn,
    pauseInterval,
    resumeInterval,
    timeTillFire,
    timeSinceStartOrLastFire,
    callbackToFire: refresh,
  } = useStoppableInterval({
    callback: goToNextPage,
    delay: DELAY_PER_FETCH,
  });

  const renderRefreshButton = () => {
    const refreshButtonDisabled =
      isFetching || timeSinceStartOrLastFire < DELAY_BEFORE_USER_CAN_REFETCH;

    return (
      <TouchableOpacity
        onPress={refresh.current}
        disabled={refreshButtonDisabled}
        style={[
          styles.buttonBaseWrap,
          styles.refreshButtonWrap,
          refreshButtonDisabled && styles.disabledRefreshButtonWrap,
        ]}
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={screenWrap}>
      {renderRefreshButton()}
      <TouchableOpacity
        onPress={toggleIsIntervalOn}
        style={[styles.buttonBaseWrap, styles.toggleTimerButtonWrap]}
      >
        <Text>Toggle timer, time till tick: {timeTillFire}</Text>
      </TouchableOpacity>
      <EventsList
        data={data}
        isIntervalOn={isIntervalOn}
        pauseInterval={pauseInterval}
        resumeInterval={resumeInterval}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBaseWrap: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    alignItems: 'center',
  },
  refreshButtonWrap: {
    backgroundColor: 'violet',
  },
  disabledRefreshButtonWrap: {
    opacity: 0.5,
  },
  refreshButtonText: {
    fontSize: 20,
  },

  toggleTimerButtonWrap: {
    backgroundColor: 'yellow',
  },
});

export default EventsListScreen;

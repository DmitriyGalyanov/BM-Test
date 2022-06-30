import React, { useCallback, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

import EventsListItem, {
  EVENTS_LIST_ITEM_HEIGHT,
} from 'features/eventsList/components/EventsListItem';
import {
  INIT_IS_TIMER_ON,
  ON_SCROLL_END_DRAG_HANDLER_DELAY,
} from 'features/eventsList/consts';
import { TUseStoppableIntervalReturnType } from 'features/eventsList/hooks';
import { TEvent } from 'features/eventsList/types';

interface IEventsListProps
  extends Omit<
      FlatListProps<TEvent>,
      'renderItem' | 'getItemLayout' | 'onScrollBeginDrag' | 'onScrollEndDrag'
    >,
    Pick<
      TUseStoppableIntervalReturnType,
      'isIntervalOn' | 'pauseInterval' | 'resumeInterval'
    > {}

const renderEventsListItem = (event: ListRenderItemInfo<TEvent>) => {
  return (
    <View style={styles.eventsListItemWrap}>
      <EventsListItem event={event.item} />
    </View>
  );
};

const LIST_ITEM_MARGIN_VERTICAL = 12;

const getItemLayout: FlatListProps<TEvent>['getItemLayout'] = (
  data,
  index,
) => ({
  length: EVENTS_LIST_ITEM_HEIGHT + LIST_ITEM_MARGIN_VERTICAL * 2,
  offset: (EVENTS_LIST_ITEM_HEIGHT + LIST_ITEM_MARGIN_VERTICAL * 2) * index,
  index,
});

const EventsList: React.FC<IEventsListProps> = ({
  isIntervalOn,
  pauseInterval,
  resumeInterval,
  ...props
}) => {
  const [timerWasOnWhenScrollStarted, setTimerWasOnWhenScrollStarted] =
    useState(INIT_IS_TIMER_ON);
  const handleScrollBeginDrag = useCallback(() => {
    setTimerWasOnWhenScrollStarted(isIntervalOn);
    pauseInterval();
  }, [isIntervalOn, pauseInterval]);
  const handleScrollEndDrag = useCallback(() => {
    if (timerWasOnWhenScrollStarted) {
      setTimeout(() => {
        resumeInterval();
      }, ON_SCROLL_END_DRAG_HANDLER_DELAY);
    }
  }, [resumeInterval, timerWasOnWhenScrollStarted]);

  return (
    <FlatList
      style={styles.wrap}
      {...props}
      renderItem={renderEventsListItem}
      getItemLayout={getItemLayout}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
    />
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
  },

  eventsListItemWrap: {
    marginVertical: LIST_ITEM_MARGIN_VERTICAL,
  },
});

export default EventsList;

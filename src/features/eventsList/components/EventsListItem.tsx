import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TEvent } from 'features/eventsList/types';
import { useNavigation } from '@react-navigation/native';
import { ScreenRoutes } from 'application/navigation/consts';
import { TEventScreenProps } from 'application/navigation/types';

interface IEventsListItemProps {
  event: TEvent;
}

const EVENTS_LIST_ITEM_VERTICAL_PADDING = 20;
const EVENTS_LIST_ITEM_TEXT_LINE_HEIGHT = 20;
const EVENTS_LIST_ITEM_BORDER_WIDTH = 1;

export const EVENTS_LIST_ITEM_HEIGHT =
  EVENTS_LIST_ITEM_BORDER_WIDTH * 2 +
  EVENTS_LIST_ITEM_VERTICAL_PADDING * 2 +
  EVENTS_LIST_ITEM_TEXT_LINE_HEIGHT;

const EventsListItem: React.FC<IEventsListItemProps> = ({ event }) => {
  const { navigate } = useNavigation<TEventScreenProps['navigation']>();
  const navigateToEventScreen = () => {
    navigate(ScreenRoutes.EventScreen, {
      event,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToEventScreen} style={styles.wrap}>
      <Text numberOfLines={1} style={styles.text}>
        {event.id}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderColor: 'black',
    borderWidth: EVENTS_LIST_ITEM_BORDER_WIDTH,
    borderRadius: 20,
    paddingVertical: EVENTS_LIST_ITEM_VERTICAL_PADDING,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: EVENTS_LIST_ITEM_TEXT_LINE_HEIGHT,
  },
});

export default React.memo(EventsListItem);

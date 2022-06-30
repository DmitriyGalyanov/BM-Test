import React from 'react';
import { View } from 'react-native';

import { TEventScreenProps } from 'application/navigation/types';
import { screenWrap } from 'shared/consts/styles';

import EventCard from 'features/eventsList/components/EventCard';

const EventScreen: React.FC<TEventScreenProps> = ({
  route: {
    params: { event },
  },
}) => {
  return (
    <View style={screenWrap}>
      <EventCard event={event} />
    </View>
  );
};

export default EventScreen;

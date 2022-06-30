import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';

import { commonStyles } from 'shared/consts/styles';

import { TEvent } from 'features/eventsList/types';

interface IEventCardProps {
  event: TEvent;
}

const EventCard: React.FC<IEventCardProps> = ({
  event: {
    id: eventId,
    actor: { avatar_url, id: actorId, login, url },
  },
}) => {
  const handleActorUrlPress = () => {
    Linking.openURL(url);
  };

  return (
    <View>
      <View style={styles.headingWrap}>
        <Text style={styles.headingText}>Event id: {eventId}</Text>
      </View>
      <View style={styles.headingWrap}>
        <Text style={styles.headingText}>Actor data</Text>
      </View>
      <Image
        source={{ uri: avatar_url }}
        style={styles.actorImage}
      />
      <View style={styles.additionalActorDataWrap}>
        <View style={commonStyles.row}>
          <Text style={styles.additionalActorDataText}>
            id: {actorId} login: {login}
          </Text>
        </View>
        <Text style={styles.actorLinkText}>
          url:{' '}
          <Text onPress={handleActorUrlPress} style={styles.actorLinkUriText}>
            {url}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingWrap: {
    marginVertical: 8,
  },
  headingText: {
    fontSize: 30,
  },

  additionalActorDataWrap: {
    marginTop: 16,
  },
  actorImage: {
    width: 200,
    height: 200,
  },
  additionalActorDataText: {
    fontSize: 24,
  },
  actorLinkText: {
    fontSize: 22,
  },
  actorLinkUriText: {
    color: 'blue',
  },
});

export default EventCard;

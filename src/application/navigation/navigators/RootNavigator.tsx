import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventsListScreen, EventScreen } from 'features/eventsList';
import { TRootStackParamList } from 'application/navigation/types';
import { ScreenRoutes } from 'application/navigation/consts';

const RootStack = createStackNavigator<TRootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={ScreenRoutes.EventsListScreen}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Group>
        <RootStack.Screen
          name={ScreenRoutes.EventsListScreen}
          component={EventsListScreen}
        />
        <RootStack.Screen
          name={ScreenRoutes.EventScreen}
          component={EventScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;

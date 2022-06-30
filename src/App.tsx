import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from 'application/state/redux/store';
import { RootNavigator } from 'application/navigation/navigators';
import { screenWrap } from 'shared/consts/styles';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={screenWrap}>
          <RootNavigator />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

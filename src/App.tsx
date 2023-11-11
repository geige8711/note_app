import { StyleSheet, Text, View } from 'react-native';
import { useDeviceContext } from 'twrnc';
import tw from './common/tailwind';
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/dm-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import {
  InitialState,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import useCachedResources from './hooks/useCachedResources';

export default function App() {
  useDeviceContext(tw);
    const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_400Regular_Italic,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });
    const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();



  const [isReady, setIsReady] = React.useState<boolean>(!__DEV__);
  const [currentRoute, setCurrentRoute] = React.useState<string>('');

  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >(undefined);
  return !fontsLoaded ? <></> :  
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          initialState={initialState}
          onReady={() => {
            routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
          }}
          onStateChange={state => {
            const currentRouteName = navigationRef?.getCurrentRoute()?.name;
            setCurrentRoute(currentRouteName || '');

          }}
        >
          <RootNavigator />

        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>   
  ;
}

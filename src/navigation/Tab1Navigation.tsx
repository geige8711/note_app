import { CompositeScreenProps } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { RootNavigationStackParams } from './RootNavigator';
import HomeScreen from '../screens/HomeScreen';
import tw from '../common/tailwind';
import Tab1HomeScreen from '../screens/Tab1HomeScreen';


export type Tab1NavigationParams = {
  Tab1Home: undefined;
};

export type Tab1StackScreenProps<
  Screen extends keyof Tab1NavigationParams,
> = CompositeScreenProps<
  NativeStackScreenProps<Tab1NavigationParams, Screen>,
  RootNavigationStackParams
>;

export type Tab1NavigationProp =
  NativeStackNavigationProp<Tab1NavigationParams>;

const NavigationStack = createNativeStackNavigator<Tab1NavigationParams>();

export default function Tab1StackNavigator() {
  return (
    <NavigationStack.Navigator
      screenOptions={({ navigation }) => {
        return {
          detachPreviousScreen: !navigation.isFocused(),
          headerTintColor: tw.color('gray-900'),
          headerTitleAlign: 'center',
          headerTitle: '',
          headerShadowVisible: false,
        };
      }}
    >
      <NavigationStack.Screen
        name="Tab1Home"
        component={Tab1HomeScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </NavigationStack.Navigator>
  );
}

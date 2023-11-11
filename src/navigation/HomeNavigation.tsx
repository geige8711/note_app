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


export type HomeNavigationParams = {
  Home: undefined;
};

export type HomeStackScreenProps<
  Screen extends keyof HomeNavigationParams,
> = CompositeScreenProps<
  NativeStackScreenProps<HomeNavigationParams, Screen>,
  RootNavigationStackParams
>;

export type HomeNavigationProp =
  NativeStackNavigationProp<HomeNavigationParams>;

const NavigationStack = createNativeStackNavigator<HomeNavigationParams>();

export default function HomeStackNavigator() {
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
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </NavigationStack.Navigator>
  );
}

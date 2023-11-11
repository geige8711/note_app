import { CompositeScreenProps } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { RootNavigationStackParams } from './RootNavigator';
import tw from '../common/tailwind';
import Tab2HomeScreen from '../screens/Tab2HomeScreen';


export type Tab2NavigationParams = {
  Tab2Home: undefined;
};

export type Tab2StackScreenProps<
  Screen extends keyof Tab2NavigationParams,
> = CompositeScreenProps<
  NativeStackScreenProps<Tab2NavigationParams, Screen>,
  RootNavigationStackParams
>;

export type Tab2NavigationProp =
  NativeStackNavigationProp<Tab2NavigationParams>;

const NavigationStack = createNativeStackNavigator<Tab2NavigationParams>();

export default function Tab2StackNavigator() {
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
        name="Tab2Home"
        component={Tab2HomeScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </NavigationStack.Navigator>
  );
}

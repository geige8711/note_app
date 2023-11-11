import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../common/tailwind';
import TabBarIcon from './TabBarIcon';

function TabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom === 0 ? 'p-0' : `pb-${insets.bottom}px`;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((focusedOptions?.tabBarStyle as any)?.display === 'none') {
    return null;
  }

  return (
    <View style={tw`flex-row ${paddingBottom} bg-white shadow-lg`}>
      {state.routes.map((route, index) => {
        return (
          <TabBarIcon
            key={route.name}
            navigation={navigation}
            route={route}
            focused={state.index === index}
          />
        );
      })}
    </View>
  );
}

export default TabBar;

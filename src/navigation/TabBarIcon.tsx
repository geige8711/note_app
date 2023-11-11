import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Image, ImageRequireSource, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../common/tailwind';

interface TabBarIconProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  route: { name: string; key: string };
  focused: boolean;
}

function TabBarIcon(props: TabBarIconProps) {
  const { navigation, route, focused } = props;

  const safeArea = useSafeAreaInsets();

  const paddingStyle = { paddingBottom: safeArea.bottom > 0 ? 0 : 13 };

  let iconSource: ImageRequireSource;

  switch (route.name) {
    case 'Home':
      iconSource = focused
        ? require('../../assets/icons/tabbar/home/home.png')
        : require('../../assets/icons/tabbar/home/home_inactive.png');
      break;
    case 'Tab1':
      iconSource = focused
        ? require('../../assets/icons/tabbar/tab1/tab1.png')
        : require('../../assets/icons/tabbar/tab1/tab1_inactive.png');
      break;
    case 'Tab2':
      iconSource = focused
        ? require('../../assets/icons/tabbar/tab2/tab2.png')
        : require('../../assets/icons/tabbar/tab2/tab2_inactive.png');
      break;
    default:
      iconSource = require('../../assets/icons/tabbar/tab2/tab2.png');
      break;
  }

  const pascalCaseTransform = (text: string) => {
    if (text === 'Shop') {
      // Im just parsing it here because if we change it in the stack/tab itself, we should rename EVERYWHERE.
      // So we should be sure that we want this change :P
      return 'Brands';
    }

    return text.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1');
  };

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      style={tw.style(
        'flex-1 flex-col items-center justify-center pt-10.5px',
        paddingStyle,
      )}
      onPress={onPress}
    >
      <Image
        style={[
          tw`h-7 w-7`,
          { tintColor: focused ? undefined : tw.color('gray-200') },
        ]}
        source={iconSource}
        accessibilityIgnoresInvertColors
      />
      <Text
        minimumFontScale={1}
        maxFontSizeMultiplier={1.5}
        style={tw.style(
          'mt-2px font-sans-semibold text-11px leading-13px tracking-tight',
          { 'text-[#969696]': !focused },
        )}
      >
        {pascalCaseTransform(route.name)}
      </Text>
    </Pressable>
  );
}

export default TabBarIcon;

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackScreenProps } from '../navigation/HomeNavigation';
import tw from '../common/tailwind';
import { Tab1StackScreenProps } from '../navigation/Tab1Navigation';
import { Tab2StackScreenProps } from '../navigation/Tab2Navigation';


function Tab2HomeScreen({
  navigation,
}: Tab2StackScreenProps<'Tab2Home'>) {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw.style('w-full h-full')}>
      <Text>Hello world</Text>
    </View>
  );
}

export default Tab2HomeScreen;

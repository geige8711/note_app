import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from '../common/tailwind';
import TabBar from './TabBar';
import HomeStackNavigator from './HomeNavigation';
import Tab1StackNavigator from './Tab1Navigation';
import Tab2StackNavigator from './Tab2Navigation';

// export type RootNavigationStackParams<Screen extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, Screen>;
export type RootStackParamList = {
  Home: undefined;
  Tab2: undefined;
  Tab3: undefined;
};
export type RootNavigationStackParams =
  NativeStackScreenProps<RootStackParamList>;

const RootNavigationTabBar = createBottomTabNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <RootNavigationTabBar.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: tw.color('white'),
        },
      })}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <RootNavigationTabBar.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />

      <RootNavigationTabBar.Screen
        name="Tab2"
        component={Tab1StackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <RootNavigationTabBar.Screen
        name="Tab3"
        component={Tab2StackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
    </RootNavigationTabBar.Navigator>
  );
}
export default RootNavigator;

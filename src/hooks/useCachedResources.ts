import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          'PlusJakartaSans-ExtraBold': require('../../../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
          'PlusJakartaSans-ExtraBoldItalic': require('../../../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
          'PlusJakartaSans-Bold': require('../../../assets/fonts/PlusJakartaSans-Bold.ttf'),
          'PlusJakartaSans-BoldItalic': require('../../../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
          'PlusJakartaSans-Regular': require('../../../assets/fonts/PlusJakartaSans-Regular.ttf'),
          'PlusJakartaSans-RegularItalic': require('../../../assets/fonts/PlusJakartaSans-Italic.ttf'),
          'PlusJakartaSans-Medium': require('../../../assets/fonts/PlusJakartaSans-Medium.ttf'),
          'PlusJakartaSans-MediumItalic': require('../../../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
          'PlusJakartaSans-Semibold': require('../../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
          'PlusJakartaSans-SemiboldItalic': require('../../../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
          'PlusJakartaSans-Light': require('../../../assets/fonts/PlusJakartaSans-Light.ttf'),
          'PlusJakartaSans-LightItalic': require('../../../assets/fonts/PlusJakartaSans-LightItalic.ttf'),
          'PlusJakartaSans-ExtraLight': require('../../../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
          'PlusJakartaSans-ExtraLightItalic': require('../../../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

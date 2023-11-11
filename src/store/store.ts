import NetInfo from '@react-native-community/netinfo';
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import logger from 'redux-logger';
import noteSlice from './noteSlice';

const appReducer = combineReducers({
  note: noteSlice.reducer,
});

// Root reducer to listen to all actions
const rootReducer = (state: RootState | undefined, action: AnyAction) => {

  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      const middleware = getDefaultMiddleware();

      if (__DEV__) {
        middleware.concat(logger);
      }

      return middleware;
    },
  });
};

export const store = makeStore();

// Setup listeners for RTK Query
let initialized = false;
setupListeners(
  store.dispatch,
  (dispatch, { onFocus, onFocusLost, onOnline, onOffline }) => {
    // Future person:
    let appStateListener: NativeEventSubscription | undefined;
    let netInfoListener: (() => void) | undefined;

    if (!initialized) {
      // Listne for app state changes
      appStateListener = AppState.addEventListener(
        'change',
        (state: AppStateStatus) => {
          if (state === 'active') {
            dispatch(onFocus());
          } else if (state === 'inactive') {
            dispatch(onFocusLost());
          }
        },
      );

      // Listen for network changes
      netInfoListener = NetInfo.addEventListener(state => {
        if (state.isConnected) {
          dispatch(onOnline());
        } else {
          dispatch(onOffline());
        }
      });

      initialized = true;
    }
    const unsubscribe = () => {
      appStateListener?.remove();
      appStateListener = undefined;
      initialized = false;

      netInfoListener?.();
      netInfoListener = undefined;
    };
    return unsubscribe;
  },
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

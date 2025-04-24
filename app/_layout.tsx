import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store, persistor } from "@/app/store"
import { PersistGate } from 'redux-persist/integration/react';


export default function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </>
  );
}

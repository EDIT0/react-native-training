/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./navigation/RootNavigator";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      {/* 화면 이동 상태를 관리하는 최상위 컨테이너 (안드로이드: NavHostFragment) */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

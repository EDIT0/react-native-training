import type { JSX } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../features/home/view/screen/HomeScreen'
import { SettingScreen } from '../../features/setting/SettingScreen'
import { PracticeScreen } from '../../features/practice/PracticeScreen'

/**
 * 화면 목록과 각 화면이 받는 파라미터 타입.
 * - undefined = 파라미터 없음
 * - 나중에 파라미터가 필요하면 예: Detail: { id: number }
 *
 * 안드로이드: nav_graph.xml의 destination 목록 + Safe Args
 */
export type RootStackParamList = {
  Home: undefined
  Setting: undefined
  Practice: undefined
}

// 화면 스택 (안드로이드: Fragment 백스택)
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Home" // 첫 화면 (안드로이드: startDestination)
      // 기본 상단 헤더를 숨기고, 여백은 BaseScreen이 처리
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Practice" component={PracticeScreen} />
    </Stack.Navigator>
  )
}

/**
 * 앱 전체에서 useNavigation()을 쓸 때 화면 이름을 자동으로 검사하도록 등록.
 * 예: navigation.navigate('Settting') 처럼 오타를 내면 에디터에서 바로 에러.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

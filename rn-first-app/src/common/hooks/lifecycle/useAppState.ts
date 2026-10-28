import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

/**
 * 앱의 현재 상태를 돌려준다. 상태가 바뀌면 컴포넌트가 다시 그려진다.
 *
 * - 'active'     : 앱이 화면에 보임 (onResume 이후)
 * - 'background' : 홈 버튼 등으로 앱이 뒤로 감 (onStop 이후)
 * - 'inactive'   : iOS 전용. 앱 전환 중, 알림센터를 내렸을 때 등
 *
 * 안드로이드: ProcessLifecycleOwner.get().lifecycle.currentState
 *
 * @example
 * const appState = useAppState()
 * <Text>{appState}</Text>
 */
export function useAppState(): AppStateStatus {
  // 처음 값을 계산하는 함수. 첫 렌더링 때 한 번만 실행된다
  const result = useState<AppStateStatus>(() => {
    const current = AppState.currentState
    // currentState는 타입상 null/undefined일 수 있어서 그때는 'active'로 시작
    if (current === null || current === undefined) {
      return 'active'
    }
    return current as AppStateStatus
  })
  const appState = result[0]       // 현재 값
  const setAppState = result[1]    // 값을 바꾸는 함수

  useEffect(() => {
    // 상태 변경 리스너 등록
    const subscription = AppState.addEventListener('change', (nextState) => {
      setAppState(nextState)
    })
    // 컴포넌트가 사라질 때 리스너 해제 (안 하면 메모리 누수)
    return () => {
      subscription.remove()
    }
    // setAppState는 바뀌지 않는 값이라 처음 한 번만 실행됨 (= [])
  }, [setAppState])

  return appState
}

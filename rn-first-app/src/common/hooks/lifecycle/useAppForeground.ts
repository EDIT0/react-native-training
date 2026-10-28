import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { useLatest } from './useLatest'

/**
 * 앱이 백그라운드에 있다가 다시 화면으로 돌아올 때 실행된다.
 * (앱을 처음 켤 때는 실행되지 않음. 처음 실행은 useMount를 사용)
 *
 * 안드로이드: Activity onResume (다른 앱에서 돌아왔을 때)
 *
 * @example
 * useAppForeground(() => {
 *   console.log('앱 복귀 → 데이터 새로고침')
 * })
 */
export function useAppForeground(callback: () => void): void {
  const callbackRef = useLatest(callback)
  // 직전 상태를 기억해서 "뒤에 있다가 → 앞으로" 바뀐 순간만 잡아낸다
  const prevState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      const wasInBackground =
        prevState.current === 'background' || prevState.current === 'inactive'

      if (wasInBackground && nextState === 'active') {
        callbackRef.current()
      }
      prevState.current = nextState
    })

    return () => {
      subscription.remove()
    }
  }, [callbackRef])
}

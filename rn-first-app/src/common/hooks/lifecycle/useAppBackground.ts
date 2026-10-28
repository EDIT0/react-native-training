import { useEffect } from 'react'
import { AppState } from 'react-native'
import { useLatest } from './useLatest'

/**
 * 앱이 백그라운드로 갈 때 실행된다. (홈 버튼, 다른 앱으로 전환, 화면 꺼짐 등)
 * 영상 일시정지, 작성 중인 내용 임시 저장 등에 사용한다.
 *
 * 안드로이드: Activity onStop
 *
 * @example
 * useAppBackground(() => {
 *   console.log('앱이 뒤로 감 → 영상 일시정지')
 * })
 */
export function useAppBackground(callback: () => void): void {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'background') {
        callbackRef.current()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [callbackRef])
}

import { useEffect } from 'react'
import { useLatest } from './useLatest'

/**
 * 컴포넌트가 화면에서 사라질 때 한 번 실행된다.
 * 타이머 해제, 구독 취소 같은 정리 작업에 사용한다.
 *
 * 안드로이드: Activity/Fragment onDestroy, Compose DisposableEffect의 onDispose
 *
 * @example
 * useUnmount(() => {
 *   console.log('화면 종료')
 * })
 */
export function useUnmount(callback: () => void): void {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    // useEffect가 돌려주는 함수(cleanup)는 컴포넌트가 사라질 때 호출된다
    // 사라지는 시점의 "최신" 콜백을 부르는 게 목적이라 lint 경고를 끈다
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      callbackRef.current()
    }
  }, [callbackRef])
}

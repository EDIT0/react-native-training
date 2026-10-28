import { useEffect } from 'react'
import { useLatest } from './useLatest'

/**
 * 컴포넌트가 화면에 처음 나타날 때 한 번 실행된다.
 *
 * 안드로이드: Activity/Fragment onCreate, Compose LaunchedEffect(Unit)
 *
 * @example
 * useMount(() => {
 *   console.log('화면 생성')
 * })
 */
export function useMount(callback: () => void): void {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    callbackRef.current()
    // callbackRef는 바뀌지 않는 값이라 처음 한 번만 실행됨 (= [])
  }, [callbackRef])
}

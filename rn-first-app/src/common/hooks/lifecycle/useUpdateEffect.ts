import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

/**
 * deps 값이 "바뀔 때만" 실행된다. (useEffect와 달리 처음 나타날 때는 실행하지 않음)
 *
 * 안드로이드: Flow.drop(1).collect { }, 또는 LiveData 옵저버에서 첫 값을 무시하는 것과 비슷
 *
 * @example
 * useUpdateEffect(() => {
 *   console.log('userId 변경됨:', userId)
 * }, [userId])
 */
export function useUpdateEffect(effect: EffectCallback, deps: DependencyList): void {
  // 첫 렌더링인지 기억하는 값
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    return effect()
    // deps는 호출하는 쪽에서 넘겨주므로 lint의 자동 검사 대상에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

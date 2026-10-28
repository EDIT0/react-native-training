import { RefObject, useLayoutEffect, useRef } from 'react'

/**
 * 항상 최신 값을 담고 있는 ref를 돌려준다. (다른 생명주기 훅에서 내부적으로 사용)
 *
 * 왜 필요한가?
 * - 리스너를 한 번만 등록해 두고(재등록 X), 호출할 때는 항상 최신 콜백을 쓰고 싶을 때 사용한다.
 * - 안드로이드로 치면 Compose의 rememberUpdatedState()와 같은 역할.
 */
export function useLatest<T>(value: T): RefObject<T> {
  // 컴포넌트가 사라질 때까지 유지되는 상자 (리렌더링돼도 초기화되지 않음)
  const ref = useRef(value)

  // 렌더링이 끝날 때마다 최신 값으로 교체
  useLayoutEffect(() => {
    ref.current = value
  })

  return ref
}

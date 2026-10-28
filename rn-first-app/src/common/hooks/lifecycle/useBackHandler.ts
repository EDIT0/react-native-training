import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { useLatest } from './useLatest'

/**
 * 안드로이드 하드웨어/제스처 뒤로가기를 가로챈다. (iOS에는 없음)
 *
 * handler가 돌려주는 값
 * - true  : 내가 처리했음 → 기본 동작(화면 닫기, 앱 종료) 막음
 * - false : 처리 안 함    → 기본 동작 그대로 진행
 *
 * 안드로이드: onBackPressed(), OnBackPressedDispatcher + OnBackPressedCallback
 *
 * @example
 * useBackHandler(() => {
 *   if (isModalOpen) {
 *     closeModal()
 *     return true   // 모달만 닫고 화면은 유지
 *   }
 *   return false    // 평소처럼 뒤로가기
 * })
 */
export function useBackHandler(handler: () => boolean): void {
  const handlerRef = useLatest(handler)

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      return handlerRef.current()
    })

    return () => {
      subscription.remove()
    }
  }, [handlerRef])
}

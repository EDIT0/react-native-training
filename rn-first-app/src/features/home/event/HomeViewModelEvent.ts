/**
 * 화면 → ViewModel 요청
 *
 * Kotlin:
 * sealed interface HomeViewModelEvent {
 *     class GetUsers : HomeViewModelEvent
 *     class ClickAddUser : HomeViewModelEvent
 *     class ClickPractice : HomeViewModelEvent
 * }
 */
export type HomeViewModelEvent =
    { type: "GetUsers" }            // 유저 목록 불러오기 (다시 불러오기도 이것 사용)
    | { type: "ClickAddUser" }      // 계정 추가하기 버튼
    | { type: "ClickPractice" }     // 연습 화면 버튼

export const HomeViewModelEvent = {
    GetUsers: function (): HomeViewModelEvent {
        return { type: "GetUsers" }
    },
    ClickAddUser: function (): HomeViewModelEvent {
        return { type: "ClickAddUser" }
    },
    ClickPractice: function (): HomeViewModelEvent {
        return { type: "ClickPractice" }
    },
}

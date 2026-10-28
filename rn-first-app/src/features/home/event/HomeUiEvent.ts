import { User } from "../../../domain/model/User"

/**
 * UiState를 바꾸는 이벤트
 *
 * Kotlin:
 * sealed interface HomeUiEvent {
 *     object Idle : HomeUiEvent
 *     class UpdateUsers(val users: List<User>) : HomeUiEvent
 *     class UpdateLoading(val isLoading: Boolean) : HomeUiEvent
 *     class UpdateEmpty(val isEmpty: Boolean) : HomeUiEvent
 *     class UpdateError(val isError: Boolean) : HomeUiEvent
 * }
 */
export type HomeUiEvent =
    { type: "Idle" }
    | { type: "UpdateUsers"; users: Array<User> }
    | { type: "UpdateLoading"; isLoading: boolean }
    | { type: "UpdateEmpty"; isEmpty: boolean }
    | { type: "UpdateError"; isError: boolean }

// HomeUiEvent.UpdateUsers(users) 형태로 만들기 위한 생성 함수 모음
export const HomeUiEvent = {
    Idle: function (): HomeUiEvent {
        return { type: "Idle" }
    },
    UpdateUsers: function (users: Array<User>): HomeUiEvent {
        return { type: "UpdateUsers", users: users }
    },
    UpdateLoading: function (isLoading: boolean): HomeUiEvent {
        return { type: "UpdateLoading", isLoading: isLoading }
    },
    UpdateEmpty: function (isEmpty: boolean): HomeUiEvent {
        return { type: "UpdateEmpty", isEmpty: isEmpty }
    },
    UpdateError: function (isError: boolean): HomeUiEvent {
        return { type: "UpdateError", isError: isError }
    },
}

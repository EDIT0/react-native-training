import { useReducer } from "react"
import { getUsersUseCase } from "../../../../app/di/AppModule"
import { delay } from "../../../../common/util/DelayUtil"
import { consoleLog } from "../../../../common/util/LogUtil"
import { HomeUiEvent } from "../../event/HomeUiEvent"
import { HomeViewModelEvent } from "../../event/HomeViewModelEvent"
import { HomeUiState } from "../../state/HomeUiState"

/**
 * UiEvent → UiState 변환
 * Kotlin: _homeUiState.runningFold(HomeUiState()) { state, event -> when (event) { ... } }
 */
function reduceHomeUiState(state: HomeUiState, event: HomeUiEvent): HomeUiState {
    switch (event.type) {
        case "Idle":
            return state
        case "UpdateUsers":
            // { ...state, users: 값 } = state.copy(users = 값)
            return { ...state, users: event.users }
        case "UpdateLoading":
            return { ...state, isLoading: event.isLoading }
        case "UpdateEmpty":
            return { ...state, isEmpty: event.isEmpty }
        case "UpdateError":
            return { ...state, isError: event.isError }
    }
}

type HomeViewModel = {
    homeUiState: HomeUiState
    handleViewModelEvent: (event: HomeViewModelEvent) => void
}

/**
 * @param onSideEffectEvent 화면에서 SideEffectEvent를 받는 함수
 *                          (Kotlin: viewModel.sideEffectEvent.collect { })
 */
export function useHomeViewModel(onSideEffectEvent: (event: SideEffectEvent) => void): HomeViewModel {
    const result = useReducer(reduceHomeUiState, HomeUiState())
    const homeUiState = result[0]       // homeUiState.value
    const emitHomeUiEvent = result[1]   // _homeUiState.emit(event)

    function handleViewModelEvent(event: HomeViewModelEvent): void {
        switch (event.type) {
            case "GetUsers":
                getUsers()
                break
            case "ClickAddUser":
                onSideEffectEvent(SideEffectEvent.NavigateToAddUser())
                break
            case "ClickPractice":
                onSideEffectEvent(SideEffectEvent.NavigateToPractice())
                break
        }
    }

    async function getUsers(): Promise<void> {
        // .onStart (다시 불러오기일 수 있으니 이전 오류/빈 상태를 지움)
        emitHomeUiEvent(HomeUiEvent.UpdateError(false))
        emitHomeUiEvent(HomeUiEvent.UpdateEmpty(false))
        emitHomeUiEvent(HomeUiEvent.UpdateLoading(true))

        // TODO: 로딩 확인용 임시 딜레이. 확인 후 삭제
        await delay(5000)

        const requestResult = await getUsersUseCase.invoke()

        // .onCompletion
        emitHomeUiEvent(HomeUiEvent.UpdateLoading(false))

        // .filter
        if (requestResult.type === "AuthError") {
            consoleLog("Auth error " + requestResult.code + " " + requestResult.message)
            emitHomeUiEvent(HomeUiEvent.UpdateError(true))
            return
        } else if (requestResult.type === "Error") {
            consoleLog(requestResult.code + " " + requestResult.message)
            emitHomeUiEvent(HomeUiEvent.UpdateError(true))
            return
        } else if (requestResult.type === "ConnectionError") {
            consoleLog(requestResult.code + " " + requestResult.message)
            emitHomeUiEvent(HomeUiEvent.UpdateError(true))
            return
        } else if (requestResult.type === "DataEmpty") {
            consoleLog("DataEmpty()")
            emitHomeUiEvent(HomeUiEvent.UpdateEmpty(true))
            return
        }

        // .collect (여기까지 오면 Success)
        consoleLog("유저 목록 조회 : " + JSON.stringify(requestResult.resultData))
        emitHomeUiEvent(HomeUiEvent.UpdateUsers(requestResult.resultData))
    }

    return {
        homeUiState: homeUiState,
        handleViewModelEvent: handleViewModelEvent,
    }
}

/**
 * 일회성 이벤트 (다이얼로그, 화면 이동, 토스트 등)
 * 계속 유지되는 값(로딩, 빈 화면 등)은 여기 말고 HomeUiState에 둔다
 *
 * Kotlin:
 * sealed interface SideEffectEvent : CommonSideEffectEvent {
 *     class ErrorDialog(val message: String) : SideEffectEvent
 *     class NavigateToAddUser : SideEffectEvent
 *     class NavigateToPractice : SideEffectEvent
 * }
 */
export type SideEffectEvent =
    { type: "ErrorDialog"; message: string }
    | { type: "NavigateToAddUser" }
    | { type: "NavigateToPractice" }

export const SideEffectEvent = {
    ErrorDialog: function (message: string): SideEffectEvent {
        return { type: "ErrorDialog", message: message }
    },
    NavigateToAddUser: function (): SideEffectEvent {
        return { type: "NavigateToAddUser" }
    },
    NavigateToPractice: function (): SideEffectEvent {
        return { type: "NavigateToPractice" }
    },
}

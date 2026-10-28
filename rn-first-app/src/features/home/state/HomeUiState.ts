import { User } from "../../../domain/model/User"

/**
 * Kotlin:
 * data class HomeUiState(
 *     val users: List<User>? = null,
 *     val isLoading: Boolean = false,
 *     val isEmpty: Boolean = false,
 *     val isError: Boolean = false,
 * )
 */
export type HomeUiState = {
    users: Array<User> | null
    isLoading: boolean      // 로딩 표시 여부
    isEmpty: boolean        // 빈 목록 화면 표시 여부
    isError: boolean        // 오류 화면 표시 여부
}

// Kotlin의 HomeUiState() (기본값으로 생성)
export function HomeUiState(): HomeUiState {
    return {
        users: null,
        isLoading: false,
        isEmpty: false,
        isError: false,
    }
}

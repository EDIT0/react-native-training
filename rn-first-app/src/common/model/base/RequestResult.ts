/**
 * 네트워크 결과를 감싸는 타입
 *
 * Kotlin:
 * sealed class RequestResult<T> {
 *     class Success<T>(data: T)
 *     class Error<T>(code: Int, message: String?)
 *     class AuthError<T>(code: Int, message: String?)
 *     class ConnectionError<T>(code: Int, message: String?)
 *     class DataEmpty<T>()
 * }
 */
export type RequestResult<T> =
    { type: "Success"; resultData: T }
    | { type: "Error"; code: number; message: string | null }
    | { type: "AuthError"; code: number; message: string | null }
    | { type: "ConnectionError"; code: number; message: string | null }
    | { type: "DataEmpty" }

// Kotlin처럼 RequestResult.Success(data) 형태로 만들기 위한 생성 함수 모음
// (타입과 이름이 같아도 됨: 타입은 타입 자리에서, 이 객체는 값 자리에서 쓰임)
export const RequestResult = {
    Success: function <T>(data: T): RequestResult<T> {
        return { type: "Success", resultData: data }
    },
    Error: function <T>(code: number, message: string | null): RequestResult<T> {
        return { type: "Error", code: code, message: message }
    },
    AuthError: function <T>(code: number, message: string | null): RequestResult<T> {
        return { type: "AuthError", code: code, message: message }
    },
    ConnectionError: function <T>(code: number, message: string | null): RequestResult<T> {
        return { type: "ConnectionError", code: code, message: message }
    },
    DataEmpty: function <T>(): RequestResult<T> {
        return { type: "DataEmpty" }
    },
}

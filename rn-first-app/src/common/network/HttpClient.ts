// 개발 "http://192.168.10.68:8080"
const BASE_URL = "http://192.168.10.68:8080"

export const AUTH_ERROR = 401

/**
 * HTTP 응답 (Retrofit: Response<T>)
 * - isSuccessful : response.isSuccessful (200~299)
 * - code         : response.code()
 * - body         : response.body()
 * - errorBody    : response.errorBody()?.string()
 */
export type HttpResponse<T> = {
    isSuccessful: boolean
    code: number
    body: T | null
    errorBody: string | null
}

// 서버가 4xx/5xx를 돌려줘도 예외를 던지지 않고 그대로 반환 (Retrofit과 같음)
// 인터넷 연결 실패 같은 경우에만 예외 발생
export async function httpGet<T>(path: string): Promise<HttpResponse<T>> {
    const response = await fetch(BASE_URL + path)

    if (response.ok) {
        const body = (await response.json()) as T
        return {
            isSuccessful: true,
            code: response.status,
            body: body,
            errorBody: null,
        }
    }

    const errorBody = await response.text()
    return {
        isSuccessful: false,
        code: response.status,
        body: null,
        errorBody: errorBody,
    }
}

import { RequestResult } from "../common/model/base/RequestResult"
import { AUTH_ERROR } from "../common/network/HttpClient"
import { consoleLog } from "../common/util/LogUtil"
import { User } from "../domain/model/User"
import { UserRepository } from "../domain/repository/UserRepository"
import { toUser } from "./mapper/UserMapper"
import { UserRemoteDataSource } from "./remote/UserRemoteDataSource"

export class UserRepositoryImpl implements UserRepository {
    private readonly userRemoteDataSource: UserRemoteDataSource

    constructor(userRemoteDataSource: UserRemoteDataSource) {
        this.userRemoteDataSource = userRemoteDataSource
    }

    async getUsers(): Promise<RequestResult<Array<User>>> {
        try {
            const response = await this.userRemoteDataSource.getUsers()
            const body = response.body

            if (response.isSuccessful) {
                if (body === null || body.length === 0) {
                    return RequestResult.DataEmpty()
                }
                const users = body.map((res) => {
                    return toUser(res)
                })
                return RequestResult.Success(users)
            }

            if (response.code === AUTH_ERROR) {
                return RequestResult.AuthError(response.code, response.errorBody)
            }
            return RequestResult.Error(response.code, response.errorBody)
        } catch (error) {
            // 서버에 연결 자체를 못 한 경우 (Wi-Fi 끊김, 서버 꺼짐 등)
            consoleLog("[Repository] " + String(error))
            return RequestResult.ConnectionError(-1, String(error))
        }
    }
}

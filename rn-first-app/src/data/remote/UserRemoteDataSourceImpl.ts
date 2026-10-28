import { ResGetUsers } from "../../common/model/res/ResGetUsers"
import { HttpResponse } from "../../common/network/HttpClient"
import { UserApiService } from "../api/UserApiService"
import { UserRemoteDataSource } from "./UserRemoteDataSource"

export class UserRemoteDataSourceImpl implements UserRemoteDataSource {
    private readonly userApiService: UserApiService

    constructor(userApiService: UserApiService) {
        this.userApiService = userApiService
    }

    getUsers(): Promise<HttpResponse<Array<ResGetUsers>>> {
        return this.userApiService.getUsers()
    }
}

import { ResGetUsers } from "../../common/model/res/ResGetUsers"
import { httpGet, HttpResponse } from "../../common/network/HttpClient"
import { UserApiService } from "./UserApiService"

export class UserApiServiceImpl implements UserApiService {
    getUsers(): Promise<HttpResponse<Array<ResGetUsers>>> {
        return httpGet<Array<ResGetUsers>>("/api/users/list") // Retrofit: @GET("/api/users/list")
    }
}

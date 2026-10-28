import { ResGetUsers } from "../../common/model/res/ResGetUsers"
import { HttpResponse } from "../../common/network/HttpClient"

export interface UserRemoteDataSource {
    getUsers(): Promise<HttpResponse<Array<ResGetUsers>>>
}

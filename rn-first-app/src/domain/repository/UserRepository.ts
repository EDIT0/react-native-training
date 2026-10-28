import { RequestResult } from "../../common/model/base/RequestResult"
import { User } from "../model/User"

export interface UserRepository {
    getUsers(): Promise<RequestResult<Array<User>>>
}

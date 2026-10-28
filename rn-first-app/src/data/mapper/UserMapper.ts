import { ResGetUsers } from "../../common/model/res/ResGetUsers"
import { User } from "../../domain/model/User"

export function toUser(resGetUsers: ResGetUsers): User {
    return {
        id: resGetUsers.id,
        nickname: resGetUsers.nickname,
    }
}
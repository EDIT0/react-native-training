import { RequestResult } from "../../../common/model/base/RequestResult"
import { User } from "../../model/User"
import { UserRepository } from "../../repository/UserRepository"

/**
 * 유저 목록 조회
 *
 * Kotlin:
 * class GetUsersUseCase @Inject constructor(
 *     private val userRepository: UserRepository
 * ) {
 *     suspend fun invoke(): Flow<RequestResult<List<User>>> {
 *         return userRepository.getUsers()
 *     }
 * }
 */
export class GetUsersUseCase {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    invoke(): Promise<RequestResult<Array<User>>> {
        return this.userRepository.getUsers()
    }
}

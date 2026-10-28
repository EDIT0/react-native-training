import { UserApiService } from "../../data/api/UserApiService";
import { UserApiServiceImpl } from "../../data/api/UserApiServiceImpl";
import { UserRemoteDataSource } from "../../data/remote/UserRemoteDataSource";
import { UserRemoteDataSourceImpl } from "../../data/remote/UserRemoteDataSourceImpl";
import { UserRepositoryImpl } from "../../data/UserRepositoryImpl";
import { UserRepository } from "../../domain/repository/UserRepository";
import { GetUsersUseCase } from "../../domain/usecase/remote/GetUsersUseCase";

// NetworkModule
const userApiService: UserApiService = new UserApiServiceImpl()

// DataSourceModule
const userRemoteDataSource: UserRemoteDataSource = new UserRemoteDataSourceImpl(userApiService)

// RepositoryModule (파일 밖으로 내보내지 않음 → ViewModel은 UseCase로만 접근)
const userRepository: UserRepository = new UserRepositoryImpl(userRemoteDataSource)

// UseCaseModule
export const getUsersUseCase = new GetUsersUseCase(userRepository)

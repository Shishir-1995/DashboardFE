import { IAProfileDto, LoginReqDto, LoginResDto, ProfileSuccessDto, StudentProfileDto } from "modules/auth/dto/login.dto";
import { setCookie } from "utils/cookies/cookies";
import httpClient from "utils/http-client/http-client";

class AuthImp {
    public async login(payload: LoginReqDto) {
        const { data } = await httpClient.post<LoginResDto>("v1/auth/user?session=login", payload);
        setCookie("accessToken", data.accessToken)
        setCookie("role", data.role)
        setCookie("userName", data.name)
    }
    public async getStudentProfile(): Promise<ProfileSuccessDto<StudentProfileDto>>{
        const { data } = await httpClient.post<ProfileSuccessDto<StudentProfileDto>>("auth/profile")
        return data
    }
    public async getIaProfile(): Promise<ProfileSuccessDto<IAProfileDto>>{
        const { data } = await httpClient.post<ProfileSuccessDto<IAProfileDto>>("auth/profile")
        return data
    }
}

export const AuthRepo = new AuthImp();

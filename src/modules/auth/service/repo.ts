import { LoginReqDto, LoginResDto } from "modules/auth/dto/login.dto";
import { setCookie } from "utils/cookies/cookies";
import httpClient from "utils/http-client/http-client";

class AuthImp {
    public async login(payload: LoginReqDto) {
        const { data } = await httpClient.post<LoginResDto>("auth/user", payload);
        setCookie("accessToken", data.accessToken)
        setCookie("role", data.role)
        setCookie("userName", data.name)
    }
}

export const AuthRepo = new AuthImp();

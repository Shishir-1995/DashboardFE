import {
  PaginatedQueryDto,
  PaginatedResDto,
} from "modules/common/dto/paginated.dto";
import { ApiResDto } from "modules/common/dto/success.dto";
import { StudentDto } from "modules/student/dto/student.dto";
import httpClient from "utils/http-client/http-client";
import { GetRolesDto } from "../dto/admin.dto";
import { CreateUserDto } from "../dto/user.dto";
import { AdminLeaveTabs } from "../enum/leave-tab.enum";
import { AdminStatistics } from "../dto/statistics.dto";

class AdminRepoImp {
  public async getStudentList(
    paginateOptions: PaginatedQueryDto = { page: 1 }
  ): Promise<PaginatedResDto<StudentDto>> {
    const { data } = await httpClient.post<PaginatedResDto<StudentDto>>(
      "/v1/data?scope=student",
      null,
      {
        params: paginateOptions,
      }
    );

    return data;
  }

  public async toggleStatus(status: boolean, email: string) {
    await httpClient.post<PaginatedResDto<StudentDto>>(
      "/v1/data/add?type=userOperations",
      { isActive: status, userEmail: email }
    );
  }

  public async getRoles() {
    const { data } = await httpClient.post<ApiResDto<GetRolesDto[]>>(
      "/v1/data?scope=getRoles"
    );
    return data;
  }

  public async getPermissions() {
    const { data } = await httpClient.post<ApiResDto<string[]>>(
      "/v1/data?scope=getPermissions"
    );
    return data;
  }

  public async createUser(data: CreateUserDto) {
    await httpClient.post("/v1/data/roles?type=createUser", data);
  }

  public async getLeaves(type: AdminLeaveTabs, page: number = 1) {
    const { data } = await httpClient.post<PaginatedResDto<Object[]>>(
      `/v1/leave/view?type=${type}&?page=${page}`
    );

    return data;
  }

  public async getStatistics() {
    const { data } = await httpClient.post<ApiResDto<AdminStatistics>>(
      "/v1/meeting/data?type=statistics"
    );

    return data;
  }
}

export const AdminRepo = new AdminRepoImp();

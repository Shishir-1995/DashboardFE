import {
  PaginatedQueryDto,
  PaginatedResDto,
} from "modules/common/dto/paginated.dto";
import { StudentDto } from "modules/student/dto/student.dto";
import httpClient from "utils/http-client/http-client";

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

  public async toggleStatus(status: boolean, email:string) {
    await httpClient.post<PaginatedResDto<StudentDto>>(
      "/v1/data/add?type=userOperations",
      { isActive: status , userEmail:email}
    );
  }
}

export const AdminRepo = new AdminRepoImp();

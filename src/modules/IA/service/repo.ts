import { PaginatedQueryDto, PaginatedResDto } from "modules/common/dto/paginated.dto";
import { StudentDto } from "modules/student/dto/student.dto";
import httpClient from "@http-client";

class IARepoImp {

  public async getStudentList(paginateOptions?: PaginatedQueryDto): Promise<PaginatedResDto<StudentDto>> {

    const { data } = await httpClient.post<PaginatedResDto<StudentDto>>("/pp/getStudentInfo", {
      params: paginateOptions
    })

    return data

  }
}

export const IARepo = new IARepoImp()

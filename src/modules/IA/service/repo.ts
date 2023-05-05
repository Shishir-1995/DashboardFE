import { PaginatedQueryDto, PaginatedResDto } from "modules/common/dto/paginated.dto";
import { StudentDto } from "modules/student/dto/student.dto";
import httpClient from "@http-client";
import { IAPPInfo } from "../dto/ia.pp-data.dto";
import { ApiSlotResDto, SlotsForIa } from "../dto/ia.pp-slots.dto";
import { IaAdhocBooking } from "../dto/ia.adhoc-list";
import { ApiResDto } from "modules/common/dto/success.dto";

class IARepoImp {

  public async getStudentList(paginateOptions?: PaginatedQueryDto): Promise<PaginatedResDto<StudentDto>> {

    const { data } = await httpClient.post<PaginatedResDto<StudentDto>>("/pp/getStudentInfo", {
      params: paginateOptions
    })

    return data

  }

  public async getSlots() : Promise<ApiSlotResDto<SlotsForIa[]>> {

    const { data } = await httpClient.post<ApiSlotResDto<SlotsForIa[]>>("/pp/slotsForIa")
    console.log(data)
     return data
  }

  public async cancelPP(ppId: number): Promise<void> {
    await httpClient.post(`pp/cancelSlot/${ppId}`)
}

  public async getPPDataInfo( value : string, page: number ) : Promise<PaginatedResDto<IAPPInfo>> {
    const { data } = await httpClient.post<PaginatedResDto<IAPPInfo>>("/pp/iaPPData",{}, {params: {
      page: page,
      type: value
    }})
        return data;
  }

  public async getAdhocSessions(page: number): Promise<PaginatedResDto<IaAdhocBooking>> {

    const { data } = await httpClient.post<PaginatedResDto<IaAdhocBooking>>(`/pp/getIaAdhocInfo`,{}, {
        params: {
            page: page,
        }
    })
    return data;

}

  public async updateAdhocSession(adhocId : number, isApproved : boolean, isCompleted : boolean) : Promise<ApiResDto<string>> {
    if(!isCompleted)
    {
      const { data } = await httpClient.post<ApiResDto<string>>("/pp/adhoc", {
        adhocId : adhocId,
        isApproved : isApproved,
        isCompleted : isCompleted
      })
  
      return data
      
    }
    else{
      const { data } = await httpClient.post<ApiResDto<string>>("/pp/adhoc", {
        adhocId : adhocId,
        isApproved : isApproved,
        isCompleted : isCompleted
      })
  
      return data
    
    }
  }

  public async addFeedbackToAdhocSession( adhocId : number, feedback : string ):Promise<ApiResDto<string>>{
    const { data } = await httpClient.post<ApiResDto<string>>(`/pp/adhoc/${adhocId}/feedback`, {
      feedback : feedback
    })
    return data
  }

}

export const IARepo = new IARepoImp()

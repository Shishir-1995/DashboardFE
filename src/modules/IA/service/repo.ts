import { PaginatedQueryDto, PaginatedResDto } from "modules/common/dto/paginated.dto";
import { StudentDto } from "modules/student/dto/student.dto";
import httpClient from "@http-client";
import { IAPPInfo } from "../dto/ia.pp-data.dto";
import { ApiSlotResDto, SlotsForIa } from "../dto/ia.pp-slots.dto";
import { IaAdhocBooking } from "../dto/ia.adhoc-list";
import { ApiResDto } from "modules/common/dto/success.dto";
import { LeaveFormData } from "../components/leave/leave.page";
import { LeaveData } from "modules/common/dto/leave.dto";

class IARepoImp {
  public async getStudentList(
    paginateOptions?: PaginatedQueryDto
  ): Promise<PaginatedResDto<StudentDto>> {
    const { data } = await httpClient.post<PaginatedResDto<StudentDto>>(
      "/v1/meeting/data?type=studentDetails",
      null,
      {
        params: paginateOptions,
      }
    );

    return data;
  }

  public async getSlots() {
    const { data } = await httpClient.post<ApiResDto<SlotsForIa[]>>(
      "/v1/meeting/data?type=pp-slots"
    );
    return data;
  }

  public async cancelPP(ppId: number, cancelReason: string): Promise<void> {
    await httpClient.post(`v1/meeting/slot?purpose=cancel`, {
      meetingId: ppId,
      cancelReason,
    });
  }

  public async getPPDataInfo(value: string, page: number): Promise<PaginatedResDto<IAPPInfo>> {
    const { data } = await httpClient.post<PaginatedResDto<IAPPInfo>>(
      "/v1/meeting/data?type=pp-timeline",
      {},
      {
        params: {
          page: page,
          timeline: value,
        },
      }
    );
    return data;
  }

  public async getAdhocSessions(page: number): Promise<PaginatedResDto<IaAdhocBooking>> {
    const { data } = await httpClient.post<PaginatedResDto<IaAdhocBooking>>(
      `/pp/getIaAdhocInfo`,
      {},
      {
        params: {
          page: page,
        },
      }
    );
    return data;
  }

  public async updateAdhocSession(
    adhocId: number,
    isApproved: boolean,
    isCompleted: boolean
  ): Promise<ApiResDto<string>> {
    if (!isCompleted) {
      const { data } = await httpClient.post<ApiResDto<string>>("/pp/adhoc", {
        adhocId: adhocId,
        isApproved: isApproved,
        isCompleted: isCompleted,
      });

      return data;
    } else {
      const { data } = await httpClient.post<ApiResDto<string>>("/pp/adhoc", {
        adhocId: adhocId,
        isApproved: isApproved,
        isCompleted: isCompleted,
      });

      return data;
    }
  }

  // public async addFeedbackToAdhocSession(
  //   adhocId: number,
  //   feedback: string
  // ): Promise<ApiResDto<string>> {
  //   const { data } = await httpClient.post<ApiResDto<string>>(
  //     `/v1/meeting/slot?purpose=feedback`,
  //     {
  //       feedback: feedback,
  //       meetingId: adhocId,
  //     }
  //   );
  //   return data;
  // }

  public async deletePpSlot(slotId: number): Promise<void> {
    await httpClient.post(`/v1/meeting/slot?purpose=delete`, { slotId });
  }

  public async createSlot(startTime: string): Promise<void> {
    await httpClient.post(`/v1/meeting/slot?purpose=create`, { startTime });
  }

  public async leave(leaveData: LeaveFormData): Promise<void> {
    await httpClient.post(`/v1/leave?type=apply`, { data: leaveData });
  }

  public async getLeaves(page: number = 1) {
    const { data } = await httpClient.post<PaginatedResDto<LeaveData>>(
      `/v1/leave/view?type=all&?page=${page}`
    );

    return data;
  }
  public async cancelLeave(id: number) {
    const { data } = await httpClient.post(`/v1/leave?type=cancel`, { data: { id } });

    return data;
  }
}

export const IARepo = new IARepoImp();

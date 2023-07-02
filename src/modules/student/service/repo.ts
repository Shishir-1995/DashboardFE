import httpClient from "@http-client";
import {
  StudentAdhocBooking,
  StudentBooking,
} from "modules/student/dto/student.bookings.dto";
import { Slot } from "../dto/pp-slotes.dto";
import { ApiResDto } from "modules/common/dto/success.dto";
import { PaginatedResDto } from "modules/common/dto/paginated.dto";
import { PPBookingType } from "modules/common/enum/pp-booking-type.enum";
import { CourseType } from "modules/common/enum/course-type.enum";
import { BookSlotDto } from "../dto/book-slot.dto";
import { ReqAdhocDto } from "../dto/adhoc-slot.dto";

class StudentRepomImp {
  public async getAllBookings(
    type: PPBookingType,
    page: number = 1
  ): Promise<PaginatedResDto<StudentBooking>> {
    const { data } = await httpClient.post<PaginatedResDto<StudentBooking>>(
      "/v1/meeting/data?type=pp-timeline",
      {},
      {
        params: {
          page: page,
          timeline: type,
        },
      }
    );

    return data;
  }

  public async cancelPP(ppId: number): Promise<void> {
    await httpClient.post(`pp/cancelSlot/${ppId}`);
  }

  public async submitFeedback(ppId: number, data: string): Promise<void> {
    await httpClient.post(`/v1/meeting/slot?purpose=feedback`, {
      feedback: data,
      meetingId: ppId,
    });
  }

  public async getSlots(courseType: CourseType): Promise<Slot[]> {
    const { data } = await httpClient.post<ApiResDto<Slot[]>>(
      `/v1/meeting/data?type=pp-slots`,
      {},
      {
        params: { courseType },
      }
    );
    return data.data;
  }

  public async bookPP(data: BookSlotDto): Promise<void> {
    await httpClient.post(`/v1/meeting/slot?purpose=book`, data);
  }

  public async requestAdhoc(data: ReqAdhocDto): Promise<void> {
    await httpClient.post(`/pp/adhoc`, data);
  }

  public async getAdhocSessions(
    page: number
  ): Promise<PaginatedResDto<StudentAdhocBooking>> {
    const { data } = await httpClient.post<
      PaginatedResDto<StudentAdhocBooking>
    >(
      `/pp/getStAdhocInfo`,
      {},
      {
        params: {
          page: page,
        },
      }
    );
    return data;
  }

  public async addFeedbackToAdhocSession(
    adhocId: number,
    feedback: string
  ): Promise<ApiResDto<string>> {
    const { data } = await httpClient.post<ApiResDto<string>>(
      `/pp/adhoc/${adhocId}/feedback`,
      {
        feedback: feedback,
      }
    );
    return data;
  }
}

export const studentRepo = new StudentRepomImp();

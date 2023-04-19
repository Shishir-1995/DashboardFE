import httpClient from "@http-client"
import { StudentBooking, StudentBookingResDto } from "modules/students/dto/student.bookings.dto"
import { Slot, SlotResDto } from "../dto/pp-slotes.dto"

class StudentRepomImp {

    public async getAllBookings(): Promise<StudentBooking[]> {
        const { data } = await httpClient.post<StudentBookingResDto>("pp/studentPPData")

        return data.data
    }

    public async cancelPP(ppId: number): Promise<void> {
        await httpClient.post(`pp/studentPPData/${ppId}`)
    }

    public async submitFeedback(ppId: number, data: string): Promise<void> {
        await httpClient.patch(`pp/studentFeedback/${ppId}`, {
            text: data
        })
    }

    public async getSlots(iaId?: number): Promise<Slot[]> {
        const { data } = await httpClient.post<SlotResDto>(`/pp/dsaSlots`, {
            iaId: 1
        })
        return data.data
    }
}

export const studentRepo = new StudentRepomImp()
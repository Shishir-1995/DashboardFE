export class Slot {
    id: number;
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    iaId: number;
    course: string
}

export class SlotResDto {
    data: Slot[]
}
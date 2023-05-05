export class SlotsForIa {
    id: number
    startTime: string
    endTime: string
    isBooked: boolean
    iaId: number
    course: string
}

export class ApiSlotResDto<T> {
    iaId : number
    name : string
    slots : T
}
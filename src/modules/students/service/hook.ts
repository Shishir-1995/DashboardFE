import { createSimpleFetch } from '../../common/hooks/create-simple-fetch';
import { studentRepo } from './repo';


export const useGetAllStudentBookings = createSimpleFetch({
    get: studentRepo.getAllBookings
});

export const useGetSlots = createSimpleFetch({
    get: studentRepo.getSlots
});

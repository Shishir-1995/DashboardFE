
import { createSimpleFetch } from "modules/common/hooks/create-simple-fetch";
import { AdminRepo,  } from "./repo";


export const useGetStudents = createSimpleFetch({
    get: AdminRepo.getStudentList,
});


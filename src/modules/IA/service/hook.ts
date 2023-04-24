
import { createSimpleFetch } from "modules/common/hooks/create-simple-fetch";
import { IARepo } from "./repo";


export const useGetIAStudents = createSimpleFetch({
    get: IARepo.getStudentList,
});


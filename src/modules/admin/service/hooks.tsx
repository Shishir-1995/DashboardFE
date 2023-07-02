import { createSimpleFetch } from "modules/common/hooks/create-simple-fetch";
import { AdminRepo } from "./repo";

export const useGetStudents = createSimpleFetch({
  get: AdminRepo.getStudentList,
});
export const useGetRoles = createSimpleFetch({
  get: AdminRepo.getRoles,
});
export const useGetPermissions = createSimpleFetch({
  get: AdminRepo.getPermissions,
});
export const useGetStatistics = createSimpleFetch({
  get: AdminRepo.getStatistics,
});

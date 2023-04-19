import NewPP from "./components/new-pp/new-pp";
import PPList from "./components/pp-list";
import { useGetAllStudentBookings } from "./service/hook";

const StudentPage = () => {
  const { data, refetch, loading } = useGetAllStudentBookings();

  return (
    <>
      <NewPP refetch={refetch} />
      <PPList loading={loading} data={data || []} refetch={refetch} />
    </>
  );
};

export default StudentPage;

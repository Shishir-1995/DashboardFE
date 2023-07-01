import { Card, Switch } from "@mui/material";
import DataGridPaginated from "modules/common/components/paginated-data-grid";
import { useGetStudents } from "../service/hooks";
import { useLocale } from "@locale";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { AdminRepo } from "../service/repo";

function useColumns(): GridColDef[] {
  const { formatMessage } = useLocale();
  return [
    {
      headerName: formatMessage("email"),
      field: "email",
      flex: 1,
    },
    {
      headerName: formatMessage("name"),
      field: "name",
      flex: 1,
    },
    {
      headerName: formatMessage("coding_course"),
      field: "codingCourse",
      flex: 1,
    },
    { headerName: formatMessage("dsa_course"), field: "dsaCourse", flex: 1 },
    {
      headerName: formatMessage("status"),
      field: "isActive",
      flex: 1,
      renderCell: ({ value }) => <>{value}</>,
    },
    { headerName: formatMessage("coding_ia"), field: "codingIa", flex: 1 },
    { headerName: formatMessage("dsa_ia"), field: "dsaIa", flex: 1 },
    {
      headerName: formatMessage("booked_meetings"),
      field: "bookedMeetings",
      flex: 1,
    },
    {
      headerName: formatMessage("cancelled_meets"),
      field: "cancelledMeets",
      flex: 1,
    },
  ];
}

const PairProgramming = () => {
  const { data, loading, refetch } = useGetStudents();
  const studentList = useMemo(() => {
    return {
      ...data,
      items:
        data?.items?.map((item, getRowId) => ({
          ...item,
          id: getRowId,
          isActive: (
            <Switch
              defaultChecked={item.isActive}
              onChange={(e)=>handleStatusChange(e, item.email)}
            />
          ),
        })) || [],
    };
  }, [data]);

  async function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>,email:string) {
    AdminRepo.toggleStatus(e.target.checked, email);
  }

  return (
    <>
      <Card className="my-8">
        <DataGridPaginated
          loading={loading}
          data={studentList}
          refetch={refetch}
          columns={useColumns()}
        />
      </Card>
    </>
  );
};

export default PairProgramming;

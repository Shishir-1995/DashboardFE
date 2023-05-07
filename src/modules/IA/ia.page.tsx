import { useLocale } from "@locale";
import { Box, Button, Card } from "@mui/material";
import DataGridPaginated from "modules/common/components/paginated-data-grid";
import { useGetIAStudents } from "./service/hook";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function useColumns(): GridColDef[] {
  const { formatMessage } = useLocale();
  return [
    {
      headerName: formatMessage("student_code"),
      field: "studentCode",
      flex: 1,
    },
    {
      headerName: formatMessage("student_name"),
      field: "studentName",
      flex: 1,
    },
    { headerName: formatMessage("coding_course"), field: "codingCourse", flex: 1 },
    { headerName: formatMessage("dsa_course"), field: "dsaCourse", flex: 1 },
  ];
}

const IAPage = () => {
  const { formatMessage } = useLocale();
  const { loading, refetch, data } = useGetIAStudents();
  const navigate = useNavigate();

  const studentList = useMemo(() => {
    return {
      ...data,
      items:
        data?.items?.map((item, getRowId) => ({
          ...item,
          id: getRowId,
        })) || [],
    };
  }, [data]);

  return (
    <div>
      <Card className="my-8">
        <DataGridPaginated
          loading={loading}
          data={studentList}
          refetch={refetch}
          columns={useColumns()}
        />
      </Card>
    </div>
  );
};

export default IAPage;

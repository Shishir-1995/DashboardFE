import { useLocale } from "@locale";
import { Box, Button, Card } from "@mui/material";
import DataGridPaginated from "modules/common/components/paginated-data-grid";
import { useGetIAStudents } from "./service/hook";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

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
    { headerName: formatMessage("coding_course"), field: "codingCourse", flex: 1, align: "center" },
    { headerName: formatMessage("dsa_course"), field: "dsaCourse", flex: 1, align: "center" },
  ];
}

const IAPage = () => {
  const { formatMessage } = useLocale();
  const { loading, refetch, data } = useGetIAStudents();

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
      <Box className="flex justify-between">
        <Button color="primary" variant="contained" size="large">
          {formatMessage("pair_programming")}
        </Button>
        <Button color="error" variant="contained" size="large">
          {formatMessage("leave")}
        </Button>
      </Box>

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

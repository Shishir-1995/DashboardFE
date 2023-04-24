import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PaginatedResDto, PaginatedQueryDto } from "../dto/paginated.dto";
import { Box } from "@mui/material";

type GridRowDef = Record<string, unknown> | Object;

interface DataGridPaginatedProps<T extends GridRowDef> {
  refetch: (queryDto: PaginatedQueryDto) => void;
  data?: Partial<PaginatedResDto<T>>;
  columns: GridColDef[];
  loading?: boolean;
}

function DataGridPaginated<T extends GridRowDef>(props: DataGridPaginatedProps<T>): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <DataGrid
        {...props}
        autoHeight
        paginationMode="server"
        columns={props.columns}
        hideFooter={false}
        hideFooterPagination={false}
        rows={props.data?.items || []}
        rowCount={props.data?.totalPages}
        pageSize={10}
        onPageChange={(page) => props.refetch({ page })}
        pagination
      />
    </Box>
  );
}

export default DataGridPaginated;

import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../state/api";
import Header from "./global/Header";
import { DataGrid } from "@mui/x-data-grid";

export function Customers() {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.8,
    },
    {
      field: "fname",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "sname",
      headerName: "Surname",
      flex: 0.5,
    },
  
    {
      field: "studentID",
      headerName: "StudentID",
      flex: 0.4,
    },
  
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

    return(
        <Box m="1.5rem 2.5rem">
        <Header title="Customers" subtitle="Manage registered customers"/>
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[500]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
          />
        </Box>
      </Box>
    );
};
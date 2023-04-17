import Header from "./global/Header";
import { Box, useTheme } from "@mui/system";
import { useGetAdminsQuery } from "../state/api";
import { DataGrid } from "@mui/x-data-grid";
//import CustomColumnMenu from "../components/DataGridCustomColumnMenu";

export function Admin(){
    const theme = useTheme();
    const {data,isLoading}= useGetAdminsQuery();
    console.log("🚀 ~ file: Admin.jsx:9 ~ Admin ~ data:", data);
    
   
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
        headerName: "AdminID",
        flex: 0.4,
      },
    
      {
        field: "role",
        headerName: "Role",
        flex: 0.5,
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
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
            color: theme.palette.secondary.light,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.grey[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
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
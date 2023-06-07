import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "react-loading-components";

function Customers() {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const [showLoading, setShowLoding] = useState(true);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
      sortable: false,
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
      editable: true,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      editable: true,
    },
  ];

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      setShowLoding(false);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle={"List of Customers"} />
      {!showLoading ? (
        <Box
          mt='40px'
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeader" : {
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
            "& .MuiDataGrid-toolbarContainer .MuiBotton-text": {
              color: `${theme.palette.secondary[200]} !important`
            }
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          mt={"30vh"}
        >
          <Loading
            type="puff"
            width={100}
            height={100}
            fill={theme.palette.secondary[500]}
          />
        </Box>
      )}
    </Box>
  );
}

export default Customers;

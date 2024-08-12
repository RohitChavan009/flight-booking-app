"use client";

import { useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Chip, CircularProgress } from "@mui/material";

// Components
import NoRows from "@/components/noRows";

// Utils
import { formatDate, formatTime } from "@/utils";

// Custom toolbar for DataGrid
const CustomToolbar = () => (
  <GridToolbarContainer>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </Box>
      <Box>
        <GridToolbarQuickFilter />
      </Box>
    </Box>
  </GridToolbarContainer>
);

// Status chip for flight status
const StatusChip = ({ status }) => {
  return (
    <Box width="100%" display="flex" alignItems="center">
      <Chip
        label={status.toUpperCase()}
        sx={(theme) => ({
          p: 1,
          borderRadius: 2,
          fontWeight: "500",
          letterSpacing: 0.3,
          backgroundColor:
            theme.palette.primary[
              `flight-${status.toLowerCase().replace(/\s+/g, "-")}`
            ],
          color: theme.palette.background,
          opacity: 0.75,
        })}
      />
    </Box>
  );
};

const FlightGrid = ({ data, isLoading = false, refetch }) => {
  const { classes } = useStyles();

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Flight ID",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "airline",
        headerName: "Airline",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "flightNumber",
        headerName: "Flight Number",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "departureAirportCode",
        headerName: "Departure Airport",
        flex: 1,
        minWidth: 120,
        valueGetter: (params) => params || "N/A",
      },
      {
        field: "arrivalAirportCode",
        headerName: "Arrival Airport",
        flex: 1,
        minWidth: 120,
        valueGetter: (params) => params || "N/A",
      },
      {
        field: "departureDateTime",
        headerName: "Departure Date & Time",
        flex: 1,
        minWidth: 180,
        valueFormatter: (params) =>
          `${formatDate(params)} ${formatTime(params)}`,
      },
      {
        field: "arrivalDateTime",
        headerName: "Arrival Date & Time",
        flex: 1,
        minWidth: 180,
        valueFormatter: (params) =>
          `${formatDate(params)} ${formatTime(params)}`,
      },
      {
        field: "duration",
        headerName: "Duration",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) => `${params} hrs.` || "N/A",
      },
      {
        field: "totalFare",
        headerName: "Price",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) => `Rs. ${params || "N/A"}`,
      },
      {
        field: "numberOfSeats",
        headerName: "Booked Seats",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) =>
          `${params || 0} seat${params !== 1 ? "s" : ""} booked`,
      },
      {
        field: "flightStatus",
        headerName: "Flight Status",
        flex: 1,
        minWidth: 180,
        renderCell: ({ row }) => <StatusChip status={row.flightStatus} />,
      },
    ],
    []
  );

  return (
    <>
      <Box m="20px 0 0 0" width="100%" height="75vh" className={classes.grid}>
        <DataGrid
          rows={
            data
              ? data.map((d) => ({
                  ...d.flight,
                  id: d.id,
                  numberOfSeats: d.numberOfSeats,
                }))
              : []
          }
          columns={columns}
          loading={isLoading}
          density="comfortable"
          getRowId={(row) => row.id}
          onCellClick={(params, event) => {
            if (params.field === "actions") event.stopPropagation();
          }}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: NoRows,
            loadingOverlay: CircularProgress,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                duration: false,
                departureAirportCode: false,
                arrivalAirportCode: false,
              },
            },
            pagination: { paginationModel: { pageSize: 30 } },
          }}
        />
      </Box>
    </>
  );
};

// 🎨 Styles
const useStyles = makeStyles({ name: { FlightGrid } })((theme) => ({
  grid: {
    "& .MuiDataGrid-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",

      display: "flex",
      alignItems: "center",
    },
    "& .name-column--cell": {
      color: theme.palette.primary.main,
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "none",
      backgroundColor: theme.palette.primary.transparent,
    },
    "& .MuiDataGrid-virtualScroller": {
      overflowX: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme.palette.primary.transparent,
    },
    "& .MuiCheckbox-root": {
      color: `${theme.palette.secondary.dark} !important`,
    },
  },
}));

export default FlightGrid;

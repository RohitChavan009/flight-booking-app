"use client";

import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// Components
import Modal from "@/components/modal";
import NoRows from "@/components/noRows";
import UpdateFlightForm from "@/components/forms/flight/update";
import CreateFlightBookingForm from "@/components/forms/booking/create";

// Utils
import { formatDate, formatTime } from "@/utils";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

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

  const [flight, setFlight] = useState(null);

  const [modal, setModal] = useState({
    update: false,
    confirm: false,
  });

  const { role } = useSelector((state) => state.user.data ?? {});

  const isAdmin = role === "ADMIN";

  // Function to open a modal
  const openModal = (state) => setModal((prev) => ({ ...prev, [state]: true }));

  // Function to close a modal
  const closeModal = (state) =>
    setModal((prev) => ({ ...prev, [state]: false }));

  const handleUpdateFlight = (row) => {
    const format = {
      id: row.id,

      flightNumber: row.flightNumber,

      airline: row.airline,

      duration: row.duration,

      departureAirport: {
        code: row.departureAirportCode,
        name: row.departureAirportName,
      },

      arrivalAirport: {
        code: row.arrivalAirportCode,
        name: row.arrivalAirportName,
      },

      pricing: {
        baseFare: row.baseFare,
        totalFare: row.totalFare,
      },

      availability: {
        economy: row.economySeats,
        business: row.businessSeats,
      },

      flightStatus: row.flightStatus,

      departureDateTime: row.departureDateTime,

      arrivalDateTime: row.arrivalDateTime,
    };

    setFlight(format);

    openModal("update");
  };

  const handleBookFlight = (row) => {
    const format = {
      id: row.id,

      flightNumber: row.flightNumber,

      airline: row.airline,

      duration: row.duration,

      departureAirport: {
        code: row.departureAirportCode,
        name: row.departureAirportName,
      },

      arrivalAirport: {
        code: row.arrivalAirportCode,
        name: row.arrivalAirportName,
      },

      pricing: {
        baseFare: row.baseFare,
        totalFare: row.totalFare,
      },

      availability: {
        economy: row.economySeats,
        business: row.businessSeats,
      },

      flightStatus: row.flightStatus,

      departureDateTime: row.departureDateTime,

      arrivalDateTime: row.arrivalDateTime,
    };

    setFlight(format);

    openModal("confirm");
  };

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
        field: "economySeats",
        headerName: "Economy Seats",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) =>
          `${params || 0} seat${params !== 1 ? "s" : ""} left`,
      },
      {
        field: "businessSeats",
        headerName: "Business Seats",
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) =>
          `${params || 0} seat${params !== 1 ? "s" : ""} left`,
      },
      {
        field: "flightStatus",
        headerName: "Flight Status",
        flex: 1,
        minWidth: 180,
        renderCell: ({ row }) => <StatusChip status={row.flightStatus} />,
      },
      {
        field: "actions",
        headerName: "",
        flex: 1,
        minWidth: 120,
        renderCell: ({ row }) => (
          <Box width={"100%"} display="flex" gap={2}>
            {isAdmin && (
              <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => handleUpdateFlight(row)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Book" placement="top">
              <IconButton onClick={() => handleBookFlight(row)}>
                <AirplaneTicketIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Box m="20px 0 0 0" width="100%" height="75vh" className={classes.grid}>
        <DataGrid
          rows={data || []}
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

      {/* Update Flight */}
      <Modal
        open={modal.update}
        header={"Update Flight"}
        modalStyles={classes.modal}
        handleClose={() => closeModal("update")}
      >
        <UpdateFlightForm
          fields={flight}
          refetch={refetch}
          handleModalClose={() => closeModal("update")}
        />
      </Modal>

      {/* Create Flight Booking Modal */}
      <Modal
        open={modal.confirm}
        header={"Create Flight Booking"}
        modalStyles={classes.modal}
        handleClose={() => closeModal("confirm")}
      >
        <CreateFlightBookingForm
          fields={flight}
          refetch={refetch}
          handleModalClose={() => closeModal("confirm")}
        />
      </Modal>
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

"use client";

import { useState } from "react";

import { makeStyles } from "tss-react/mui";

import Button from "@mui/material/Button";

// Redux
import { useSelector } from "react-redux";
import { useGetFlightsQuery } from "@/redux/api";

// Components
import Header from "@/components/header";
import Modal from "@/components/modal";
import FlightGrid from "@/components/grids/flight";
import CreateFlightForm from "@/components/forms/flight/create";

// Icons
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [modal, setModal] = useState({
    create: false,
  });

  const { classes } = useStyles();

  const { role } = useSelector((state) => state.user.data ?? {});

  const isAdmin = role === "ADMIN";

  const { data, refetch, isLoading } = useGetFlightsQuery();

  // function to open a modal
  const openModal = (state) => setModal((prev) => ({ ...prev, [state]: true }));

  // function to close a modal
  const closeModal = (state) =>
    setModal((prev) => ({ ...prev, [state]: false }));

  return (
    <>
      <Header
        onClick={refetch}
        button={"REFRESH"}
        left={
          isAdmin ? (
            <Button
              size="large"
              variant="contained"
              endIcon={<AddIcon />}
              className={classes.button}
              onClick={() => openModal("create")}
            >
              Make New Entry
            </Button>
          ) : (
            <div />
          )
        }
        iconStyles={(theme) => ({ color: theme.palette.primary.white })}
      />

      <FlightGrid data={data} isLoading={isLoading} refetch={refetch} />

      <Modal
        open={modal.create}
        header={"Create Flight"}
        modalStyles={classes.modal}
        handleClose={() => closeModal("create")}
      >
        <CreateFlightForm
          refetch={refetch}
          handleModalClose={() => closeModal("create")}
        />
      </Modal>
    </>
  );
};

// 🎨 Styles
const useStyles = makeStyles({
  name: { Dashboard },
})((theme) => ({
  button: {
    color: theme.palette.primary.white,
  },
  modal: {
    padding: "1rem",
  },
}));

export default Dashboard;

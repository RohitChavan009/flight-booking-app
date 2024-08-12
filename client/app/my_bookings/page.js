"use client";

import { makeStyles } from "tss-react/mui";

// Redux
import { useGetUserBookingsQuery } from "@/redux/api";

// Components
import Header from "@/components/header";
import BookingGrid from "@/components/grids/booking";

const MyBookings = () => {
  const { data, refetch, isLoading } = useGetUserBookingsQuery();

  return (
    <>
      <Header
        onClick={refetch}
        button={"REFRESH"}
        left={<div />}
        iconStyles={(theme) => ({ color: theme.palette.primary.white })}
      />

      <BookingGrid data={data} isLoading={isLoading} refetch={refetch} />
    </>
  );
};

// 🎨 Styles
const useStyles = makeStyles({
  name: { MyBookings },
})((theme) => ({}));

export default MyBookings;

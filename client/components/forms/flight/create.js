"use client";

import { useState } from "react";

import { z } from "zod";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";

// Redux
import { useCreateFlightMutation } from "@/redux/api";

// Components
import Loader from "@/components/loader";
import DateTimePicker from "@/components/dateTimePicker";
import FormHeader from "@/components/forms/formHeader";
import FormFooter from "@/components/forms/formFooter";

// Inputs
import TextInput from "@/components/inputs/textInput";
import SelectInput from "@/components/inputs/selectInput";

// Constants
import { FLIGHT_STATUSES } from "@/constants/index";

// Utils
import { isApiResponse } from "@/utils";

const schema = z.object({
  flightNumber: z.string().min(1, "Flight number is required"),

  airline: z.string().min(1, "Airline is required"),

  duration: z
    .number()
    .nonnegative("Please enter a valid duration")
    .refine((value) => value !== 0, "Duration can not be zero")
    .refine((value) => !isNaN(value), "Duration must be a valid number"),

  status: z
    .string()
    .nullable()
    .refine((val) => val !== "", "Flight Status is required"),

  pricing: z.object({
    baseFare: z
      .number()
      .nonnegative("Please enter a valid base fare")
      .refine((value) => value !== 0, "Base fare can not be zero")
      .refine((value) => !isNaN(value), "Base fare must be a valid number"),

    totalFare: z
      .number()
      .nonnegative("Please enter a valid total fare")
      .refine((value) => value !== 0, "Total fare can not be zero")
      .refine((value) => !isNaN(value), "Total fare must be a valid number"),
  }),

  availability: z.object({
    economy: z
      .number()
      .nonnegative("Please enter a valid economy flights")
      .refine((value) => value !== 0, "Economy flights can not be zero")
      .refine(
        (value) => !isNaN(value),
        "Economy flights must be a valid number"
      ),

    business: z
      .number()
      .nonnegative("Please enter a valid business flights")
      .refine((value) => value !== 0, "Business flights can not be zero")
      .refine(
        (value) => !isNaN(value),
        "Business flights must be a valid number"
      ),
  }),

  departureAirport: z.object({
    code: z.string().min(1, "Airport code is required"),

    name: z.string().min(1, "Airport name is required"),
  }),

  arrivalAirport: z.object({
    code: z.string().min(1, "Airport code is required"),

    name: z.string().min(1, "Airport name is required"),
  }),
});

const defaultValues = {
  flightNumber: "",
  airline: "",
  duration: 0,
  status: "On Time",
  availability: {
    economy: 0,
    business: 0,
  },
  departureAirport: {
    code: "",
    name: "",
  },
  arrivalAirport: {
    code: "",
    name: "",
  },
  pricing: { baseFare: 0, totalFare: 0 },
};

const Create = ({ refetch, handleModalClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [dates, setDates] = useState({
    departureDateTime: dayjs(),
    arrivalDateTime: dayjs(),
  });

  const { cx, classes } = useStyles();

  const [createFlight, { isLoading, isError }] = useCreateFlightMutation();

  const onSubmit = async (data) => {
    try {
      const { status, ...rest } = data;

      const { departureDateTime, arrivalDateTime } = dates;

      const payload = {
        ...rest,
        flightStatus: status,
        departureDateTime,
        arrivalDateTime,
      };

      createFlight(payload)
        .unwrap()
        .then(() => {
          if (!isError) {
            // Success toast 🎉
            toast.success("Flight created successfully 🎉");

            refetch();

            handleModalClose();
          }
        })
        .catch((error) => {
          if (isApiResponse(error)) {
            // Error toast 🚨
            toast.error(error.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container disableGutters className={cx(classes.container)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader sx={{ mt: 4 }}>Basic Details</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="flightNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Flight Number*"
                variant="outlined"
                error={!!errors.flightNumber}
                helperText={errors.flightNumber?.message}
              />
            )}
          />

          <Controller
            name="airline"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Airline*"
                variant="outlined"
                error={!!errors.airline}
                helperText={errors.airline?.message}
              />
            )}
          />
        </Box>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="duration"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextInput
                {...rest}
                fullWidth
                type="number"
                label="Flight Duration (in hrs.)*"
                variant="outlined"
                inputProps={{
                  step: 0.1,
                }}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                fullWidth
                label="Flight Status*"
                variant="outlined"
                error={!!errors.status}
                message={errors.status?.message}
              >
                {FLIGHT_STATUSES.map((l) => (
                  <MenuItem value={l.value}>{l.label}</MenuItem>
                ))}
              </SelectInput>
            )}
          />
        </Box>

        <FormHeader sx={{ mt: 4 }}>Pricing Details</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="pricing.baseFare"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextInput
                {...rest}
                fullWidth
                type="number"
                label="Base Fare*"
                variant="outlined"
                inputProps={{
                  step: 0.1,
                }}
                error={!!errors.baseFare}
                helperText={errors.baseFare?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />

          <Controller
            name="pricing.totalFare"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextInput
                {...rest}
                fullWidth
                type="number"
                label="Total Fare*"
                variant="outlined"
                inputProps={{
                  step: 0.1,
                }}
                error={!!errors.totalFare}
                helperText={errors.totalFare?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />
        </Box>

        <FormHeader sx={{ mt: 4 }}>Availability Details</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="availability.economy"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextInput
                {...rest}
                fullWidth
                type="number"
                label="Number Of Economy Seats*"
                variant="outlined"
                inputProps={{
                  step: 0.1,
                }}
                error={!!errors.availability?.economy}
                helperText={errors.availability?.economy?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />

          <Controller
            name="availability.business"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextInput
                {...rest}
                fullWidth
                type="number"
                label="Number Of Business Seats*"
                variant="outlined"
                inputProps={{
                  step: 0.1,
                }}
                error={!!errors.availability?.business}
                helperText={errors.availability?.business?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />
        </Box>

        <FormHeader sx={{ mt: 4 }}>Departure & Arrival Points</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="departureAirport.code"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Departure Airport Code*"
                variant="outlined"
                error={!!errors.departureAirport?.code}
                helperText={errors.departureAirport?.code?.message}
              />
            )}
          />

          <Controller
            name="departureAirport.name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Departure Airport name*"
                variant="outlined"
                error={!!errors.departureAirport?.name}
                helperText={errors.departureAirport?.name?.message}
              />
            )}
          />
        </Box>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="arrivalAirport.code"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Arrival Airport Code*"
                variant="outlined"
                error={!!errors.arrivalAirport?.code}
                helperText={errors.arrivalAirport?.code?.message}
              />
            )}
          />

          <Controller
            name="arrivalAirport.name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                fullWidth
                label="Arrival Airport name*"
                variant="outlined"
                error={!!errors.arrivalAirport?.name}
                helperText={errors.arrivalAirport?.name?.message}
              />
            )}
          />
        </Box>

        <FormHeader sx={{ mt: 4 }}>Departure & Arrival Timestamps</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <DateTimePicker
            pickerProps={{
              format: "DD-MM-YYYY HH:mm",
              label: "Departure Date Time*",
              sx: { width: "100%" },
              value: dates.departureDateTime,
              onChange: (date) =>
                setDates((previous) => ({
                  ...previous,
                  departureDateTime: dayjs(date),
                })),
              renderInput: (params) => <TextInput {...params} />,
            }}
          />

          <DateTimePicker
            pickerProps={{
              format: "DD-MM-YYYY HH:mm",
              label: "Arrival Date Time*",
              sx: { width: "100%" },
              value: dates.arrivalDateTime,
              onChange: (date) =>
                setDates((previous) => ({
                  ...previous,
                  arrivalDateTime: dayjs(date),
                })),
              renderInput: (params) => <TextInput {...params} />,
            }}
          />
        </Box>

        <FormFooter>
          <Button
            size="large"
            type="submit"
            variant="contained"
            sx={(theme) => ({ color: theme.palette.primary.white })}
          >
            Submit
          </Button>
        </FormFooter>
      </form>

      <Loader open={isLoading} />
    </Container>
  );
};

// Styles 💅
const useStyles = makeStyles({
  name: { Create },
})((theme) => ({
  container: {},

  inputWrapper: {
    gap: 12,
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      gap: 0,
      flexWrap: "wrap",
    },
  },
}));

export default Create;

"use client";

import { z } from "zod";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

// Redux
import { useCreateFlightBookingMutation } from "@/redux/api";

// Components
import Loader from "@/components/loader";
import FormHeader from "@/components/forms/formHeader";
import FormFooter from "@/components/forms/formFooter";

// Inputs
import TextInput from "@/components/inputs/textInput";

// Utils
import { isApiResponse } from "@/utils";

const schema = z.object({
  economy: z
    .number()
    .nonnegative("Please enter a valid economy flights")
    .refine((value) => !isNaN(value), "Economy flights must be a valid number"),

  business: z
    .number()
    .nonnegative("Please enter a valid business flights")
    .refine(
      (value) => !isNaN(value),
      "Business flights must be a valid number"
    ),
});

const defaultValues = {
  economy: 0,
  business: 0,
};

const Create = ({ fields, refetch, handleModalClose }) => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { cx, classes } = useStyles();

  const [createFlightBooking, { isLoading, isError }] =
    useCreateFlightBookingMutation();

  const onSubmit = async (data) => {
    try {
      if (data.economy == 0 && data.business == 0) {
        toast.info(
          "At least one of economy or business flights must be greater than 0"
        );

        return;
      }

      const payload = {
        flightId: fields?.id,
        ...data,
      };

      createFlightBooking(payload)
        .unwrap()
        .then(() => {
          if (!isError) {
            // Success toast 🎉
            toast.success("Flight booking created successfully 🎉");

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
        <FormHeader sx={{ mt: 4 }}>Seats</FormHeader>

        <Box className={cx(classes.inputWrapper)}>
          <Controller
            name="economy"
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
                error={!!errors.economy}
                helperText={errors.economy?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
          />

          <Controller
            name="business"
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
                error={!!errors.business}
                helperText={errors.business?.message}
                onChange={(e) => onChange(parseFloat(e.target.value))}
              />
            )}
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

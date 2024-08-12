"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/user";

// Components
import Loader from "@/components/loader";
import TextInput from "@/components/inputs/textInput";

// Utils
import { isApiResponse } from "@/utils";

// Redux
import { useLoginMutation } from "@/redux/api";

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Schema = z.object({
  mobile: z
    .string()
    .nonempty("Please enter a mobile number")
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid mobile number format"
    )
    .regex(
      /^\d{10}$/,
      "Invalid mobile number format. It must be exactly 10 digits."
    ),

  password: z
    .string()
    .nonempty("Please enter a password")
    .min(6, "Password must be 6 characters long"),
});

const DefaultValues = {
  mobile: "",
  password: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { classes, cx } = useStyles();

  const router = useRouter();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: DefaultValues,
    resolver: zodResolver(Schema),
  });

  const formSubmitHandler = async (data) => {
    try {
      const response = await login({
        mobile: data.mobile,
        password: data.password,
      });

      if ("data" in response) {
        const { user, token } = response.data;

        dispatch(setUser({ ...user, token }));

        router.push(`/`);

        toast.success("Welcome to Flight Booking App! 🎉");
      }

      if ("error" in response) {
        const { error } = response;

        if (isApiResponse(error)) {
          toast.error(error.data.message);
        }

        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTogglePassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Container
      maxWidth={"md"}
      component={"div"}
      className={cx(classes.container)}
    >
      {/* Form */}
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Box className={`${cx(classes.box)} shadow-md`}>
          {/* Logo */}
          <div className="my-4 w-full h-full relative flex items-center justify-center">
            <Typography
              variant="h1"
              fontSize={30}
              component="div"
              fontWeight={"500"}
            >
              Fly Your Way ✈️
            </Typography>
          </div>

          <Controller
            control={control}
            name="mobile"
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                fullWidth
                label="Mobile Number"
                variant="outlined"
                helperText={error ? error.message : ""}
                error={error !== undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                helperText={error ? error.message : ""}
                error={error !== undefined}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Button */}
          <Box
            my={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              size="large"
              type="submit"
              variant="contained"
              sx={(theme) => ({ color: theme.palette.primary.white })}
            >
              Submit
            </Button>
          </Box>

          <Box className={cx(classes.textWrapper)}>
            <Typography
              noWrap
              variant="p"
              component="span"
              className={cx(classes.text)}
            >
              Don't have an account ?{" "}
            </Typography>

            <Typography
              variant="p"
              component="span"
              className={cx(classes.hightlight)}
              onClick={() => router.push(`/signup`)}
            >
              Signup
            </Typography>
          </Box>
        </Box>
      </form>

      {/* Loader */}
      <Loader open={isLoading} />
    </Container>
  );
};

// Styles 💅
const useStyles = makeStyles({
  name: { LoginPage },
})((theme) => ({
  container: {
    padding: "5rem 0",

    [theme.breakpoints.down("sm")]: {
      padding: "5rem 1rem",
    },
  },

  box: {
    padding: "2rem",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,

    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },

  textWrapper: {
    padding: "0 0.5rem",
  },

  text: {
    fontSize: 14,
    color: theme.palette.grey[600],
  },

  hightlight: {
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));

export default LoginPage;

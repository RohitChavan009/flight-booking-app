"use client";

// Icons
import FlightIcon from "@mui/icons-material/Flight";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const TOP_MENU = [
  {
    name: "Flights",
    icon: <FlightIcon />,
  },
  {
    name: "My Bookings",
    icon: <AccountCircleIcon />,
  },
];

export const MIDDLE_MENU = [];

export const BOTTOM_MENU = [];

export const LOWER_MENU = [
  {
    name: "Logout",
    icon: <LogoutIcon />,
  },
];

export const SIDEBAR_MENU = {
  TOP_MENU,
  MIDDLE_MENU,
  BOTTOM_MENU,
};

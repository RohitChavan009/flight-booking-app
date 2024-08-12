import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utils
import { getUserToken } from "@/utils";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: "api",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ mobile, ...rest }) => ({
        url: "api/auth/login",
        method: "POST",
        body: {
          ...rest,
          mobileNumber: mobile,
        },
      }),
    }),

    signup: builder.mutation({
      query: ({ mobile, ...rest }) => ({
        url: "api/auth/signup",
        method: "POST",
        body: {
          ...rest,
          mobileNumber: mobile,
        },
      }),
    }),

    getFlights: builder.query({
      query: () => ({
        url: `api/flight/get`,
        headers: { Authorization: `Bearer ${getUserToken()}` },
      }),
      transformResponse: (response) => response.flights,
    }),

    getUserBookings: builder.query({
      query: () => ({
        url: `api/booking/user/get`,
        headers: { Authorization: `Bearer ${getUserToken()}` },
      }),
      transformResponse: (response) => response.bookings,
    }),

    createFlight: builder.mutation({
      query: (payload) => ({
        url: "api/flight/create",
        method: "POST",
        body: {
          ...payload,
        },
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),

    updateFlight: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `api/flight/update/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),

    createFlightBooking: builder.mutation({
      query: (payload) => ({
        url: "api/booking/create",
        method: "POST",
        body: {
          ...payload,
        },
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),

    updateFlightBooking: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `api/booking/update/${id}`,
        method: "POST",
        body: {
          ...rest,
        },
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useSignupMutation,

  // Flight
  useGetFlightsQuery,
  useGetUserBookingsQuery,
  useCreateFlightMutation,
  useUpdateFlightMutation,

  // Booking
  useCreateFlightBookingMutation,
  useUpdateFlightBookingMutation,
} = api;

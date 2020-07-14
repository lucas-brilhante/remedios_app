import { createReducer } from "@reduxjs/toolkit";

// Actions
const SET_USER = "SET_USER";

// Reducer
const initialState = {};

export default createReducer(initialState, {
  [SET_USER]: (state, action) => action.payload,
});

// Actions Creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

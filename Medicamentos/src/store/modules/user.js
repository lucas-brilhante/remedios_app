import { createReducer } from "@reduxjs/toolkit";

// Actions
const SET_USER = "SET_USER";

// Reducer
const initialState = {
  id: 4,
  login: "admin02@admin.com",
  name: "Lucas",
  lastName: "Brilhante",
  birthDate: "2019-12-17T00:00:00",
  cpf: "059.417.293-40",
  isActive: true,
  registrationNumber: null,
  token: null,
  crmNumber: null,
  accountType: "patient",
};

export default createReducer(initialState, {
  [SET_USER]: (state, action) => action.payload,
});

// Actions Creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

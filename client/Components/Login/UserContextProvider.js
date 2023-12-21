import { View, Text } from "react-native";
import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  RESET_ERROR,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from "./UserContextTypes";
import axios from "react-native-axios";
import NetInfo from "@react-native-community/netinfo";
import { API_URL } from "@env";

export const authContext = createContext();
const url = `${API_URL}`;
const INITIAL_STATE = {
  userAuth: null,
  error: null,
  loading: false,
};

const setStorage = async (key, data) => {
  try {
    const stored = await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      setStorage("userAuth", payload);
      return {
        ...state,
        loading: false,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userAuth: payload,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: payload,
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: "",
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        userAuth: null,
        loading: false,
      };
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const internetConnectionStatus = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
    });
    unsubscribe();
  };
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await axios.post(`${url}/login`, formData, config);
      if (res?.data?.status === "Success") {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        return true; // Moved inside the if block
      }
      return false; // Return false if the condition is not met
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
      return false;
    }
  };
  const registerUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await axios.post(`${url}/register`, formData, config);

      if (res?.data?.status === "Success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        return true;
      }
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: error?.response?.data?.message,
      });
      return false;
    }
  };
  const updateUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await axios.put(`${url}/`, formData, config);
      if (res?.data?.status === "Success") {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
        });
        return true;
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
      return false;
    }
  };
  const deleteUserAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await axios.delete(`${url}/`, config);
      if (res?.data?.status === "Success") {
        dispatch({
          type: DELETE_PROFILE_SUCCESS,
        });
        return true;
      }
    } catch (error) {
      dispatch({
        type: DELETE_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
      return false;
    }
  };
  const initializeState = async () => {
    try {
      const storedUserAuth = await AsyncStorage.getItem("userAuth");
      if (storedUserAuth !== null) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: JSON.parse(storedUserAuth),
        });
      }
    } catch (error) {
      console.error("Invalid Token", error);
    }
  };
  const clearError = () => {
    dispatch({
      type: RESET_ERROR,
    });
  };
  useEffect(() => {
    initializeState();
    internetConnectionStatus();
  }, []);

  return (
    <authContext.Provider
      value={{
        loginUserAction,
        registerUserAction,
        userAuth: state?.userAuth,
        error: state?.error,
        loading: state?.loading,
        clearError,
        deleteUserAction,
        updateUserAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;

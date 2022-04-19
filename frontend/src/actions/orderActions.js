import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST, });

    const { 
    userLogin: { userInfo }, 
    } = getState()
   
      // Declare content type so request can be parsed as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
      };
   
      // Extract cart contents and make request
      const { data } = await axios.post(`/api/orders`, order, config);
   
      // If successful return the payload and pass it down to the state
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
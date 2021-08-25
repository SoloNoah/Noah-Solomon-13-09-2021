import { SOME_CONST } from './actionTypes';

export const funcAsync = (value) => (dispatch) => {
  try {
    //some code here
    console.log('setting');

    dispatch({
      type: SOME_CONST,
      payload: value,
    });
  } catch (error) {
    console.log(error);
  }
};

export const func = () => (dispatch) => {
  try {
    //some code
  } catch (error) {
    //     console.log(error);
  }
};

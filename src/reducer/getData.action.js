import { DELETE_USER_CRM, GET_UPDATE_USER_CRM, GET_USER_BYID_CRM, GET_USER_CRM, SEARCH_USER_CRM } from "./valiable.reducer";

export const getUpdateDataUser_Action = (datas) => {
  return {
    type: GET_UPDATE_USER_CRM,
    datas,
  };
};


export const getDataUser_Action = (datas) => {
  return {
    type: GET_USER_CRM,
    datas,
  };
};

export const getDataUserByID_Action = (data) => {
  return {
    type: GET_USER_BYID_CRM,
    data,
  };
};

export const deleteDataUser_Action = (id) => {
  return {
    type: DELETE_USER_CRM,
    id,
  };
};

export const searchDataUser_Action = (datas) => {
  return {
    type: SEARCH_USER_CRM,
    datas,
  };
};
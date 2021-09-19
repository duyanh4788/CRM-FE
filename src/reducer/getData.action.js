import { DELETE_USER_CRM, GET_UPDATE_USER_CRM, GET_USER_BYID_CRM, GET_USER_CRM, SEARCH_USER_CRM, STATUS_CREATE_USER, STATUS_UPDATE_USER, STATUS_UPLOAD_USER, UPDATE_CONTACT, UPDATE_CONTACT_AVATA } from "./valiable.reducer";

export const getUpdateDataUser_Action = (datas) => {
  return {
    type: GET_UPDATE_USER_CRM,
    datas,
  };
};

export const getUpdateStatus_Action = (data) => {
  return {
    type: STATUS_UPDATE_USER,
    data,
  };
};

export const getCreatetatus_Action = (data) => {
  return {
    type: STATUS_CREATE_USER,
    data,
  };
};

export const getUploadStatus_Action = (data) => {
  return {
    type: STATUS_UPLOAD_USER,
    data,
  };
};


export const getUpdateContact_Action = (data) => {
  return {
    type: UPDATE_CONTACT,
    data,
  };
};

export const getUpdateContactAvatar_Action = (data) => {
  return {
    type: UPDATE_CONTACT_AVATA,
    data,
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
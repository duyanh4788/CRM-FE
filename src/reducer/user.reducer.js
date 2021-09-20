import { DELETE_USER_CRM, GET_UPDATE_USER_CRM, GET_USER_BYID_CRM, GET_USER_CRM, SEARCH_USER_CRM, STATUS_CREATE_USER, STATUS_UPDATE_USER, STATUS_UPLOAD_USER, UPDATE_CONTACT, UPDATE_CONTACT_AVATA } from "./valiable.reducer";

const initialState = {
    dataUserUpdate: {},
    dataUsers: [],
    dataUserById: undefined,
    statusCode: 0,
    statusCodeCreate: 0,
    statusCodeUpload: 0,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_UPDATE_USER_CRM: {
            state.dataUserUpdate = action.datas;
            return { ...state }
        }
        case STATUS_UPDATE_USER: {
            state.statusCode = action.data;
            return { ...state }
        }
        case STATUS_CREATE_USER: {
            state.statusCodeCreate = action.data;
            return { ...state }
        }
        case STATUS_UPLOAD_USER: {
            state.statusCodeUpload = action.data;
            return { ...state }
        }
        case UPDATE_CONTACT: {
            state.dataUserById = action.data
            return { ...state }
        }
        case UPDATE_CONTACT_AVATA: {
            state.dataUserById = action.data
            return { ...state }
        }
        case GET_USER_BYID_CRM: {
            state.dataUserById = action.data;
            return { ...state }
        }
        case GET_USER_CRM: {
            state.dataUsers = action.datas;
            return { ...state }
        }
        case DELETE_USER_CRM: {
            let update = [...state.dataUsers];
            let index = update.findIndex(items => items._id === action.id);
            if (index !== -1) {
                update.splice(index, 1);
                state.dataUserById = undefined
                state.dataUsers = update
            }
            return { ...state }
        }
        case SEARCH_USER_CRM: {
            let clonetArray = [...state.dataUsers]
            clonetArray = clonetArray.filter(items => items.name.toLowerCase().match(action.datas.toLowerCase()))
            state.dataUsers = clonetArray
            return { ...state }
        }
        default:
            return state
    }
}

import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {FormAction, stopSubmit} from "redux-form";
import { RootStateType } from "./redux-store";
import {ThunkAction} from "redux-thunk";



export type AuthType = {
    userId: number | null ,
    email: string | null,
    login: string | null,
    isAuth: boolean
}


const initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
};

type InitialStateType = typeof initialState;
// type ThunkType = BaseThunkType<ActionsTypes>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType=> {
    switch (action.type) {
        case 'social-network/auth/SET-USER-DATA':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }

}


type ActionsTypes =  setAuthUserDataPropsType
export type setAuthUserDataPropsType = ReturnType<typeof setAuthUserData>
//action creators
export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean) => ({type: 'social-network/auth/SET-USER-DATA',
    payload: {userId, email, login, isAuth}} as const)



type GetStateType = () => RootStateType
type DispatchType = Dispatch<ActionsTypes>
// thunk creator

// export const getAuthUserData = (): ThunkAction<void, RootStateType,
//     unknown, ActionsTypes> => (dispatch: DispatchType)=> {
//     return authAPI.me()
//         .then(response => {
//             if(response.data.resultCode === 0) {
//                 let {userId,email,login} = response.data.data
//                 dispatch (setAuthUserData(userId, email, login, true))
//             }
//         });
// };

export const getAuthUserData = () => async (dispatch: DispatchType) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<void, RootStateType,
     unknown, ActionsTypes | FormAction> => async (dispatch) => {
    let response= await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}


export const logout = (): ThunkAction<void, RootStateType,
    unknown, ActionsTypes> => async (dispatch: DispatchType) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;
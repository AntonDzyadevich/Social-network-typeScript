import {ActionsTypes, UsersPageType} from "../types/entities";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

const initialState = {
    users: []
}


const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes):UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return  {
                ...state,
                // users: [...state, users],
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                }),

            }
        case UNFOLLOW:
            return {
                ...state,
                // users: [...state, users],
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return{
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }

}


export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const;

export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId})  as const;
export const setUsersAC = (users: any) => ({type: SET_USERS, users})  as const;



export default usersReducer;



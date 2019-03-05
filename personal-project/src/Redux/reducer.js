let initialState = {
    user:[],
    usersConnected:[]
}

const UserData = "UserData"
const usersConnected = "usersConnected"

export function reducer(state = initialState, action){
    switch(action.type){
        case UserData:
            return {...state, user:action.payload}
        case usersConnected:
            return {...state, usersConnected:action.payload}
        default:
            return state
    }
}

export function updateUser(userInformation){
    return{
        type:UserData,
        payload:userInformation
    }
}
export function updateUsersConnected(user){
    return{
        type:usersConnected,
        payload:user
    }
}


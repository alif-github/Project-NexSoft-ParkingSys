let defaultLoginState = {
    isLogin: false,
    username:"",
    user: {},
    isPasswordDefault: false
}

const auth = (state = defaultLoginState, action) => {
    console.log("isi reducer: ", state);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLogin: true,
                username: action.payload.username
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                isLogin: false,
                username:"",
                user: {}
            }
        case "PASSWORD_DEFAULT":
            return {
                ...state,
                isPasswordDefault: true
            }
        case "PASSWORD_STATUS":
            return {
                ...state,
                isPasswordDefault: false
            }
        case "ADD_USER":
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state
    }
}

export default auth
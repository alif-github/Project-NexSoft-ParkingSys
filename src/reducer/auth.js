let defaultLoginState = {
    isLogin: false,
    isPasswordDefault: false,
    username:"",
    user: {},
    
}

const auth = (state = defaultLoginState, action) => {
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
        case "ADD_USERNAME":
            return {
                ...state,
                username: action.payload.username
            }
        default:
            return state
    }
}

export default auth
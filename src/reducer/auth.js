let defaultLoginState = {
    isLogin: false,
    username:"",
    user: {}
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
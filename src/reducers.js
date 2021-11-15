import {
    LOGIN,
    REGISTER,
    USERINIT,
    POSTINIT,
    ADDPOST,
    UPDATEINFO,
    LOGOUT,
    UPDATESTATUS,
    UPDATEQUERY,
    FOLLOW, UNFOLLOW
} from "./action";

const initialState = {
    user: undefined,
    userList: [],
    posts: [],
    displayPosts: [],
    isUserLogin: false,
    loginFailed: false,
    regInvMsg: "",
};

export function RiceBookApp(state = initialState, action) {
    // console.log(state);
    switch (action.type) {
        case LOGIN:
            let successFlag, user;
            for (let i = 0; i < state.userList.length; i++) {
                if (action.loginUser === state.userList[i].username && action.loginPasswd === state.userList[i].passwd) {
                    user = state.userList[i]
                    successFlag = true
                    break
                }
            }
            if (!successFlag) {
                return {
                    ...state,
                    isUserLogin: false,
                    loginFailed: true,
                }
            } else {
                // Store to local storage
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("isUserLogin", "true")
                return {
                    ...state,
                    user: {...user},
                    isUserLogin: true,
                    loginFailed: false,
                    displayPosts: state.posts
                        .filter((p) => p.userId === user.id || user.following.includes(String(p.userId))),
                }
            }
        case REGISTER:
            let ids = ["username", "email", "phone", "zipcode", "passwd", "birthday"]
            let invPhr = {
                "username": "User name", "email": "Email", "phone": "Phone number",
                "zipcode": "Zip code"}
            let regexes = ["[A-Za-z].*", ".+@.+\..+", "[0-9]{3}-[0-9]{3}-[0-9]{4}", "[0-9]{5}"]
            let invMsg = ""
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === "passwd") {
                    if (action.user.passwd !== action.user.passwdConf) {
                        invMsg = "Password and Password confirmation doesn't match!"
                        break;
                    }
                } else if (ids[i] === "birthday") {
                    let ele = action.user[ids[i]]
                    if (ele === "") {
                        invMsg = "No birthday info provided"
                        break
                    }
                    let ageDifMs = Date.now() - new Date(ele)
                    let ageDate = new Date(ageDifMs); // miliseconds from epoch
                    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
                    if (age < 18) {
                        invMsg = "Not yet 18 years old"
                        break
                    }
                } else {
                    let ele = action.user[ids[i]]
                    if (ele === "" || RegExp(regexes[i]).test(ele) === false) {
                        invMsg = invPhr[ids[i]] + " is not valid!"
                        break;
                    }
                    else if (ids[i] === "username" && state.userList.some((u) => u.username === action.user.username)) {
                        invMsg = "User name is taken."
                        break
                    }
                }
            }

            if (invMsg === "") {
                let newId = state.userList.length + 1
                let newUser = {
                    ...action.user,
                    id: newId,
                    status: "Rice book",
                    following: [...Array(3).keys()].map(i => String((i + 1 + newId) % newId))
                }
                let newPosts = [...state.posts.slice(0, 10).map((p, index) => {
                    return {
                        ...p,
                        id: state.posts.length + index,
                        userId: newUser.id,
                        userName: newUser.name,
                        timeStamp: getCurrentTime()
                    }
                }), ...state.posts];
                localStorage.setItem("user", JSON.stringify(newUser))
                localStorage.setItem("isUserLogin", "true")
                localStorage.setItem("users", JSON.stringify([...state.userList, newUser]))
                localStorage.setItem("posts", JSON.stringify(newPosts))
                return {
                    ...state,
                    user: newUser,
                    userList: [...state.userList, newUser],
                    isUserLogin: true,
                    posts: newPosts,
                    displayPosts: newPosts
                        .filter((p) => p.userId === newUser.id || newUser.following.includes(String(p.userId))),
                }
            }
            else {
                return {
                    ...state,
                    regInvMsg: invMsg
                }
            }
        case USERINIT:
            return {
                ...state,
                // Debug
                // user: action.users[1],
                userList: [...action.users]
            }
        case POSTINIT:
            return {
                ...state,
                posts: [...action.posts]
            }
        case ADDPOST:
            localStorage.setItem("posts", JSON.stringify([action.post, ...state.posts]))
            return {
                ...state,
                posts: [action.post, ...state.posts],
                displayPosts: [action.post, ...state.posts]
                    .filter((p) => p.userId === state.user.id || state.user.following.includes(String(p.userId)))
                    ,
            }
        case UPDATEINFO:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            let newUserList = [...state.userList]
            newUserList[state.user.id - 1] = state.user
            localStorage.setItem("user", "")
            localStorage.setItem("isUserLogin", "false")
            return {
                ...state,
                userList: newUserList,
                user: undefined,
                isUserLogin: false
            }
        case UPDATESTATUS:
            return {
                ...state,
                user: {...state.user, status: action.status}
            }
        case UPDATEQUERY:
            let qfunc = (p) => {
                return p.userName.includes(action.query) || p.body.includes(action.query)
            }
            return {
                ...state,
                displayPosts: state.posts
                    .filter((p) => p.userId === state.user.id || state.user.following.includes(String(p.userId)))
                    .filter(qfunc),
            }
        case FOLLOW: {
            let newFollowing = [...state.user.following]
            if (state.user.following.indexOf(action.info) === -1) {
                newFollowing.push(action.info)
            }
            return {
                ...state,
                user: {...state.user, following: newFollowing},
                displayPosts: state.posts
                    .filter((p) => p.userId === state.user.id || newFollowing.includes(String(p.userId)))
                    ,
            }
        }
        case UNFOLLOW: {
            let newFollowing = [...state.user.following].filter((f) => f !== String(action.userId) && f !== state.userList[action.userId].name)
            return {
                ...state,
                user: {
                    ...state.user,
                    following: newFollowing
                },
                displayPosts: state.posts
                    .filter((p) => p.userId === state.user.id || newFollowing.includes(String(p.userId)))
                    ,
            }
        }
        default:
            return state
    }
}

function getCurrentTime() {
    let currentdate = new Date();
    return (currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds())
}
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const USERINIT = "USERINIT";
export const POSTINIT = "POSTINIT";
export const ADDPOST = "ADDPOST";
export const UPDATEINFO = "UPDATEINFO";
export const LOGOUT = "LOGOUT";
export const UPDATESTATUS = "UPDATESTATUS"
export const UPDATEQUERY = "UPDATEQUERY"
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"

/*
 * action creator
 */

export function login(loginUser, loginPasswd) {
    return {type: LOGIN, loginUser, loginPasswd}
}

export function logout() {
    return {type: LOGOUT}
}

export function register(user) {
    return {type: REGISTER, user}
}

export function userInit(users) {
    return {type: USERINIT, users}
}

export function postInit(posts) {
    return {type: POSTINIT, posts}
}

export function addPost(post) {
    return {type: ADDPOST, post}
}

export function updateInfo(user) {
    return {type: UPDATEINFO, user}
}

export function updateStatus(status) {
    return {type: UPDATESTATUS, status}
}

export function updateQuery(query) {
    return {type: UPDATEQUERY, query}
}

export function follow(info) {
    return {type: FOLLOW, info}
}

export function unfollow(userId) {
    return {type: UNFOLLOW, userId}
}


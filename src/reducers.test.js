import {RiceBookApp} from "./reducers";
import {
    addPost,
    unfollow,
    follow,
    login,
    logout,
    register,
    updateStatus,
    updateQuery,
    updateInfo,
    userInit, postInit
} from "./action";
import {act} from "react-dom/test-utils";
import {render} from "react-dom"
import Profile from "./views/Profile";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {MemoryRouter, Router} from "react-router-dom";
import {App} from "./App";
import Enzyme from "enzyme";
import {mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

Enzyme.configure({adapter: new Adapter()});

let container = null;

const initState = {
    user: undefined,
    userList: [],
    posts: [],
    isUserLogin: false,
    loginFailed: false,
    query: (p) => true
};

let state;

beforeEach(() => {
    container = document.createElement("div");
    state = {...initState};
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(res => {
                // Initialize redux users
                let newUsers = res.map((u) => {
                    return {
                        ...u,
                        passwd: u.address.street,
                        status: "Rice book",
                        following: [...Array(3).keys()].map(i => String((i + 1 + u.id) % res.length))
                    }
                })
                state.userList = newUsers
            }
        ).then(() => fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(res => {
                    // Initialize redux posts
                    let idToName = new Map()
                    state.userList.forEach((u) => idToName.set(u.id, u.name))
                    let newPosts = res.map((p) => {
                        return {
                            ...p,
                            userName: idToName.get(p.userId),
                            timeStamp: getCurrentTime()
                        }
                    })
                    state.posts = newPosts
                }
            ))
});

function getCurrentTime() {
    let currentdate = new Date();
    return (currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds())
}

let storeFactory = (initialState) => {
    return createStore(RiceBookApp, initialState);
}

test("login/posts/add posts/follow/unfollow/logout/register/invalid register/update status/update info", () => {
    let newState = RiceBookApp(state, login("Bret", "Kulas Light"));
    expect(newState.user.username).toEqual("Bret");
    expect(newState.user.passwd).toEqual("Kulas Light");
    expect(newState.isUserLogin).toEqual(true);
    // Check filter
    expect(newState.displayPosts.length > 0 && newState.displayPosts.length !== newState.posts.length).toBeTruthy()
    // Check add post
    let oldLen = newState.displayPosts.length
    let newPost = {
        userId: 1,
        body: "test",
        userName: "Bret",
        timeStamp: getCurrentTime()
    }
    newState = RiceBookApp(newState, addPost(newPost))
    expect(newState.displayPosts.length).toEqual(oldLen + 1)
    // Update query
    newState = RiceBookApp(newState, updateQuery("test"))
    expect(newState.displayPosts.length).toEqual(1)
    // Check follow
    oldLen = newState.displayPosts.length
    let oldFollowLen = newState.user.following.length
    newState = RiceBookApp(newState, follow("6"))
    expect(newState.user.following.length > oldFollowLen).toBeTruthy()
    expect(newState.displayPosts.length > oldLen).toBeTruthy()
    // Check unfollow
    oldLen = newState.displayPosts.length
    oldFollowLen = newState.user.following.length
    newState = RiceBookApp(newState, unfollow("6"))
    expect(newState.user.following.length < oldFollowLen).toBeTruthy()
    expect(newState.displayPosts.length < oldLen).toBeTruthy()

    // Profile
    let store = storeFactory(newState)
    let wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/profile']}>
                <Profile/>
            </MemoryRouter>
        </Provider>)
    expect(wrapper.find("#profileUsername").text()).toBe("Name: Leanne Graham")

    // Check logout
    newState = RiceBookApp(newState, logout());
    expect(newState.user).toEqual(undefined);
    expect(newState.isUserLogin).toEqual(false);

    // Register a new user
    let newUser = {
        username: "xxx",
        name: "yyy",
        email: "xxx@xxx.com",
        passwd: "xxx",
        birthday: "1997-01-01",
        phone: "000-000-0000",
        zipcode: "00000",
        passwdConf: "xxx",
    }
    newState = RiceBookApp(newState, register(newUser))
    expect(newState.user.id).toEqual(11)
    expect(newState.displayPosts.length).toEqual(41)
    oldLen = newState.userList.length

    // Register an invalid user
    newUser = {
        username: "xxx",
        name: "yyy",
        email: "xxx@xxx.com",
        passwd: "xxx",
        birthday: "1997-01-01",
        phone: "000-000-0000",
        zipcode: "00000",
        passwdConf: "xxx",
    }
    newState = RiceBookApp(newState, register(newUser))
    expect(newState.userList.length).toEqual(oldLen)

    // Update status
    newState = RiceBookApp(newState, updateStatus("yyy"))
    expect(newState.user.status).toEqual("yyy")

    // Update info
    newUser.name = "kkk"
    newState = RiceBookApp(newState, updateInfo(newUser))
    expect(newState.user.name).toEqual("kkk")

});

test("invalid login", () => {
    let newState = RiceBookApp(state, login("xxx", "yyy"));
    expect(newState.loginFailed).toBeTruthy()
    expect(newState.isUserLogin).toEqual(false)
});

test("userInit", () => {
    // console.log(state.userList)
    let newState = RiceBookApp(undefined, userInit(state.userList))
    expect(newState.userList.length > 0).toBeTruthy()
})

test("postInit", () => {
    let newState = RiceBookApp(undefined, postInit(state.posts))
    expect(newState.posts.length > 0).toBeTruthy()
})
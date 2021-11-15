import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import Main from "./views/Main";
import Profile from "./views/Profile";
import Landing from "./views/Landing";
import React, {Component} from "react";
import {connect} from "react-redux";
import {login, postInit, userInit} from "./action";


export class App extends Component {

    componentDidMount() {
        const initPromise = new Promise(((resolve, reject) => {
            if (localStorage.getItem("users") !== null && localStorage.getItem("posts") !== null) {
                resolve()
            } else {
                fetch("https://jsonplaceholder.typicode.com/users")
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
                            this.props.userInit(newUsers)
                            localStorage.setItem("users", JSON.stringify(newUsers))
                        }
                    ).then(() => fetch("https://jsonplaceholder.typicode.com/posts")
                    .then(res => res.json())
                    .then(res => {
                            // Initialize redux posts
                            let idToName = new Map()
                            this.props.userList.forEach((u) => idToName.set(u.id, u.name))
                            let newPosts = res.map((p) => {
                                return {
                                    ...p,
                                    userName: idToName.get(p.userId),
                                    timeStamp: this.getCurrentTime()
                                }
                            })
                            this.props.postInit(newPosts)
                            localStorage.setItem("posts", JSON.stringify(newPosts))
                        }
                    )).then(() => resolve())
            }
        }))
        initPromise.then(() => {
            this.props.userInit(JSON.parse(localStorage.getItem("users")))
            this.props.postInit(JSON.parse(localStorage.getItem("posts")))
        }).then(() => {
            if (localStorage.getItem("isUserLogin") === "true") {
                let user = JSON.parse(localStorage.getItem("user"))
                this.props.login(user.username, user.passwd)
            }
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/main">
                        {this.props.isUserLogin ? <Main/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path="/profile">
                        {this.props.isUserLogin ? <Profile/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path="/landing">
                        {this.props.isUserLogin ? <Redirect to={"/main"}/> : <Landing/>}
                    </Route>
                    <Route path="/">
                        {this.props.isUserLogin ? <Main/> : <Landing/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }

    getCurrentTime() {
        let currentdate = new Date();
        return (currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds())
    }
}

const mapStateToProps = (state) => ({
    isUserLogin: state.isUserLogin,
    userList: state.userList,
    posts: state.posts
})

const mapDispatchToProps = (dispatch) => {
    return {
        userInit: (userList) => dispatch(userInit(userList)),
        postInit: (posts) => dispatch(postInit(posts)),
        login: (username, passwd) => dispatch(login(username, passwd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

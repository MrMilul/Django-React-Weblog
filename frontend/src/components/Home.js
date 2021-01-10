import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Welcome to My Weblog</h1>
                    <p className="lead">You can use this weblog template to setup your professional weblog</p>
                    <hr className="my-4"/>
                    <p>Click the below button to go to the blog</p>
                    <Link className="btn btn-primary btn-lg" to="/blog" role="button">Blog</Link>
                </div>
            </div>
        )
    }
}

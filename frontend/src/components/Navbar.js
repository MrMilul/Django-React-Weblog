import React, { Component } from 'react'
import {Link, NewLink} from 'react-router-dom'


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" exact to="/">Weblog</Link>
                    <button className="navbar-toggler" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" exact to="/">Home
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

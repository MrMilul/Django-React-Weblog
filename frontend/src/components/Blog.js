import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Blog extends Component {
    constructor(props){
        super(props)
        this.state ={
            fetchPosts:[], 
            feacheredPost:[]
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/blog/`)
        .then(response=>{
           this.setState({
            fetchPosts: response.data
           })
        })

        axios.get('http://localhost:8000/api/blog/featured')
        .then(response=>{
           this.setState({
            feacheredPost: response.data[0]
           })
        })
    }
   
    render() {
        const capitilizaCategoty = (word)=>{
            if(word){
                return word.charAt(0).toUpperCase() + word.slice(1)
            }
        }
        const posts = this.state.fetchPosts.map(post=>{
            return(
                
                <div key={post.id} className="col-md-5 m-1">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitilizaCategoty(post.category)}</strong>
                        <div className="mb-1 text-muted">{post.month.toUpperCase()} {capitilizaCategoty(post.day)}</div>
                        <p className="card-text mb-auto">{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="text-dark stretched-link">Continue reading...</Link>
                        </div>
                        
                        <div className="col-auto d-none d-lg-block">
                            <img width="200" height="250" src={post.thumbnail} alt="thumbnail"/>
                        </div>
                    </div>
                </div>
           
                )                
        })
        return (
            <div className="container">
                                    {/* Category */}
                 <div className="nav-scroller py-1 mb-2 mt-2">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p-2 link-secondary text-dark" to="/category/world">World</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/U.S">U.S.</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Technology">Technology</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Design">Design</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Culture">Culture</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Politics">Politics</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Opinion">Opinion</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Science">Science</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Health">Health</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Style">Style</Link>
                        <Link className="p-2 link-secondary text-dark" to="/category/Travel">Travel</Link>
                    </nav>
                </div>

                                {/* Feachered Post */}
                <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{this.state.feacheredPost.title}</h1>
                    <p className="lead my-3">{this.state.feacheredPost.excerpt}</p>
                    <div className="lead mb-0">
                        <p className="lead mb-0">
                            <Link to={`/blog/${this.state.feacheredPost.slug}`} className="text-white fw-bold">Continue reading...</Link>
                        </p>
                    </div>
                    </div>
                </div>
                <hr />
                                    {/* Posts */}
                <div className="row mb-2 d-flex justify-content-center">
                {posts}
                </div>                    
                
            </div>
        )
    }
}

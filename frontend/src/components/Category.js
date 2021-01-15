import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Category extends Component {
    constructor(){
        super()
        this.state ={
            catedBlog:[],
            cat: {}
        }
    }
    componentDidMount(){
        const category = this.props.match.params.id;
        this.setState({
            cat: category
        })
        const config = {
            headers:{
                'content-type': 'application/json'
            }
        }
        axios.post(`http://localhost:8000/api/blog/category`, { category }, config)
        .then(res=>{
            this.setState({
                catedBlog: res.data
            })

        })
    }
    render() {
        console.log(this.state.catedBlog)

        const capitilizaCategoty = (word)=>{
            if(word){
                return word.charAt(0).toUpperCase() + word.slice(1)
            }
        }
        const posts = this.state.catedBlog.map(post=>{
            return(
                <div key={post.id} className="container mt-3">
                <div className="col-lg-10 m-1">
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
                </div>
           
                )                
        })
        return (
            <div>
               {posts}
            </div>
        )
    }
}

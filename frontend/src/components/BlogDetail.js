import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



export default class BlogDetail extends Component {
    constructor(props){
        super(props)
        this.state ={
            blogDetail : []
        }
    }
    componentDidMount() {
        const Slug = this.props.match.params.id
        axios.get(`http://localhost:8000/api/blog/${Slug}`)
        .then(res => {
            this.setState({
                blogDetail: res.data
            })
        })
    }
    render() {
        const capitilize = (word)=>{
            if(word){
                return word.charAt(0).toUpperCase() + word.slice(1)
            }
        }
        const createBlog =()=>{
            return  {__html: this.state.blogDetail.context}
        }
        return (
            <div className="container mt-3"> 
            <article className="blog-post">
            <h2 className="blog-post-title">{this.state.blogDetail.title}</h2>
            <p className="blog-post-meta"> {capitilize(this.state.blogDetail.month)} {capitilize(this.state.blogDetail.day)}</p>
            <div className="mb-3">Category: <Link to={`/category/${this.state.blogDetail.category}`}>{capitilize(this.state.blogDetail.category)}</Link></div>
            <div dangerouslySetInnerHTML={createBlog()}/>
           <hr/>
           <Link to="/blog">Back to Blog</Link>
          </article>
          </div>
        )
    }
}

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './hocs/Layout'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import Category from './components/Category'


class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/blog" component={Blog}/>
            <Route path="/blog/:id" component={BlogDetail}/>
            <Route path="/category/:id" component={Category}/>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App

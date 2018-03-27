import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../app.css';
import CategoryPanel from './categoryPanel';
import PostPanel from './postPanel';
import PostDetails from "./postDetails";
import CreatePostForm from "./createPostForm";

class App extends Component {

    render() {
        return (
            <div className="app">
                <div className="header">
                    <Link to="/" className="no-link-style">
                    <h1 title="Go to home">App Leitura</h1>
                    </Link>
                </div>
                <Route exact path="/" render={ () => (
                    <div className="grid-master">
                            <CategoryPanel />
                            <PostPanel />
                            <div className="grid-add">
                                <Link title="New Post" to="/createpost/new/0" className="material-icons md-light add-icon">add</Link>
                            </div>
                    </div>
                )}/>
                <Route exact path="/:category" component={PostPanel}/>
                <Route exact path="/:category/:id" component={PostDetails}/>
                <Route path="/createpost/:category/:id" component={CreatePostForm}/>
            </div>
        )
    }
}

export default App;

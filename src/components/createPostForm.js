import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import ActionButtons from './actionButtons'
import { connect } from "react-redux";
import getCategoriesApi, {editPostApi, getPostDetailsApi, makePostApi} from "../utils/api";
import {getCategories, updatePosts} from "../actions";
import {uuidGenerator} from "../utils/helper";
import PageNotFound from "./pageNotFound";

class CreatePostForm extends Component {
    state = {
            id: '',
            title: '',
            author: '',
            category: '',
            body: ''
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value});
    }

    submit = (state) => {
        if(!state.id) {
            makePostApi({
                id: uuidGenerator(),
                timestamp: Date.now(),
                title: state.title,
                body: state.body,
                author: state.author,
                category: state.category,
            }).then((post) => this.props.dispatch(updatePosts(post)))
                .then(this.props.history.push("/"))
        } else {
            editPostApi({
                id: state.id,
                timestamp: Date.now(),
                title: state.title,
                body: state.body,
                author: state.author,
                category: state.category,
            }).then((post) => this.props.dispatch(updatePosts(post)))
                .then(this.props.history.push(`/${state.category}/${state.id}`))
        }
    };

    clearForm() {
        this.setState({
            id: '',
            title: '',
            author: '',
            category: '',
            body: ''
        })
    }


    componentDidMount() {
        getCategoriesApi()
            .then(
            categories => this.props.dispatch(getCategories(categories)))
            .then(() => {
                this.loadPostToEdit()
        });
    }

    loadPostToEdit() {
        if (!this.state.id) {
            const id = this.props.match.params.id;
            if (id !== '0') {
                getPostDetailsApi(id)
                    .then(post => {
                        if (post.id)
                            this.props.dispatch(updatePosts(post));
                    })
                    .then(() => {
                        const category = this.props.match.params.category ? this.props.match.params.category : "new";
                        if (category !== "new") {
                            const id = this.props.match.params.id;
                            if (id) {
                                if (this.props.posts[category] && this.props.posts[category].hasOwnProperty(id)) {
                                    const post = this.props.posts[category][id];
                                    this.setState({
                                        id: post.id,
                                        title: post.title,
                                        author: post.author,
                                        category: post.category,
                                        body: post.body
                                    });
                                }
                            }
                        }
                    });
            }
        }
    }

    render() {
        const { categories = {} } = this.props;

        const newPost = this.props.match.params.category === 'new';

        const validParams = (newPost && !this.state.id) || (!newPost && !!this.state.id);

        const formNotEmpty = (
            this.state.title ||
            this.state.author ||
            this.state.category ||
            this.state.body
        )
        ;

        return (
            <div className="box">
                {validParams ?
                    <div>
                        <div className="category-header">
                            <h2>{!this.state.id ? "Add" : "Edit"} Post</h2>
                        </div>
                        < div className="form-group">
                            < label htmlFor="title">Title</label>
                    <input className="bottom-only" id="title" type="text" value={this.state.title}
                           onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="form-group-2-elements">
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input className="bottom-only" id="author" type="text" value={this.state.author}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="bottom-only" id="category" value={this.state.category}
                                onChange={(event) => this.handleChange(event)}>
                            <option value="" disabled>Select a category</option>
                            {
                                Object.keys(categories).map((index) =>
                                    <option key={categories[index].path}
                                            value={categories[index].name}>{categories[index].name}</option>
                                )
                            }
                        </select>
                    </div>
                        </div>
                        <div className="form-group">
                    <label htmlFor="details">Body</label>
                    <TextareaAutosize id="body" rows={5} value={this.state.body}
                                      onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <ActionButtons
                    cancelFunction={formNotEmpty && !this.state.id ? () => this.clearForm() : null}
                    isValid={
                        this.state.title &&
                        this.state.author &&
                        this.state.category &&
                        this.state.body
                    }
                    successFunction={() => this.submit(this.state)}
                    successBtnLabel={!this.state.id ? 'Post' : 'Edit'}
                    cancelBtnLabel={(formNotEmpty && !this.state.id) ? "Clean" : "Back"}/>
                    </div>
                : <PageNotFound/>}
            </div>
        )
    }
}

function mapStateToProps({ categories, posts }){
    return {categories, posts}
}

export default connect(mapStateToProps, null)(CreatePostForm);
import React, { Component } from 'react';
import VoteOptions from './voteOptions';
import {connect} from "react-redux";
import {deleteParentComments, deletePost, getComments, updatePosts} from "../actions";
import {getPostDetailsApi, getCommentsApi, deletePostApi} from "../utils/api";
import TypeComment from "./typeComment";
import ShowComment from "./showComment";
import { Link } from "react-router-dom";

class PostDetails extends Component {
    state = {
        editingCommentId: ''
    };
    //FUNÇÃO PARA VERFICAR OBJETOS VAZIOS
    // isEmpty(obj){
    //     for(let prop in obj) {
    //         if(obj.hasOwnProperty(prop))
    //             return false;
    //     }
    //     return true;
    // }

    delete = (postId) => {
        deletePostApi(postId)
            .then((post) => this.props.dispatch(deletePost(post)))
            .then(() => this.props.dispatch(deleteParentComments(postId)))
            .then(this.props.history.push('/'))
    };

    componentDidMount() {
        if(this.props.match) {
            const id = this.props.match.params.id;
            if(id) {
                getPostDetailsApi(id).then(
                    post => this.props.dispatch(updatePosts(post))
                );
                getCommentsApi(id)
                    .then(comments => this.props.dispatch(getComments(comments, id))
                    )
            }
        }
    };

    render() {
        const { posts, comments}  = this.props;
        const id = this.props.match.params.id;
        const category = this.props.match.params.category;
        const { editingCommentId } = this.state;


        const post = posts.hasOwnProperty(category) ?
                        posts[category].hasOwnProperty(id) ?
                            posts[category][id] :
                            {} :
                        {};

        const dateCreated = new Date(post.timestamp).toDateString();

        //essa lista serve para ordenar o comentários pelo voteScore
        let listIds = [];

        if(comments.hasOwnProperty(id) && !!Object.keys(comments[id]).length) {
            listIds = Object.keys(comments[id]);
            listIds = listIds.sort((a, b) => {
                return comments[id][b].voteScore - comments[id][a].voteScore
            });
        }

        return (
            <div className="box">
                <div className="category-header action-grid">
                    <h2>{post.title} - {dateCreated}</h2>
                    <div className="action-sub-grid">
                        <Link to={`/createpost/${post.category}/${post.id}`} className="no-link-style">
                            <button className="action-button">Edit</button>
                        </Link>
                        <button className="action-button" onClick={() => this.delete(post.id)}>Delete</button>
                    </div>
                </div>
                    <div className="post-list with-thumbs border-bottom no-subtitle">
                        <div className="inline-itens">
                            <div className="list-content">
                                <label>{post.body}</label>
                            </div>
                        </div>
                        <VoteOptions id = {post.id} voteScore={post.voteScore} type="posts"/>
                    </div>
                {listIds.map((commentId)=>(
                    <ShowComment comment={comments[id][commentId]}
                                 editingCommentId={editingCommentId}
                                 editFunction={(commentId) => this.setState({editingCommentId: commentId})}
                                 key={commentId}/>
                ))}
                    <TypeComment
                        editFunction={(commentId) => this.setState({editingCommentId: commentId})}
                        editingCommentId={editingCommentId}
                        parentId={post.id}/>
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }){
    return {
        posts,
        comments
    }
}

export default connect(mapStateToProps, null)(PostDetails);
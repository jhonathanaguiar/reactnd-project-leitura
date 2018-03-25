import React, { Component } from 'react';
import VoteOptions from './voteOptions';
import { deleteCommentApi } from "../utils/api";
import { deleteComment } from "../actions";
import { connect } from 'react-redux';

class ShowComment extends Component {
    delete = (commentId) => {
        deleteCommentApi(commentId)
            .then((comment) => this.props.dispatch(deleteComment(comment)))
};
    render() {
        const { comment, editFunction, editingCommentId } = this.props;
        const dateCreated = new Date(comment.timestamp).toDateString();
        return (
            <div className="grid-comment box-comment background-comment with-thumbs">
                <div className="show-comment">
                    <label className="author-comment">{comment.author} - {dateCreated}</label>
                    <label className="comment-content">{comment.body}</label>
                </div>
                <div className="action-grid">
                    <div className="action-sub-grid">
                        <button className="action-button"
                                onClick={() => editFunction(comment.id)}>
                            {editingCommentId !== comment.id ? 'Edit' : 'Editing'}
                        </button>
                        <button className="action-button"
                                onClick={() => this.delete(comment.id)}>
                            Delete
                        </button>
                    </div>
                    <VoteOptions id={comment.id} voteScore={comment.voteScore} type="comments"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, { comment, editFunction, editingCommentId }) {
    return {comment, editFunction, editingCommentId}
}

export default connect(mapStateToProps, null)(ShowComment);
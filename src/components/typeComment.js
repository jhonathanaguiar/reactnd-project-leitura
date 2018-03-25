import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import ActionButtons from './actionButtons';
import {editCommentApi, makeCommentApi} from "../utils/api";
import { updateComments } from "../actions";
import { uuidGenerator } from "../utils/helper";
import { connect } from 'react-redux';

class TypeComment extends Component {
    state = {
        id: '',
        author: '',
        body: ''
    };

    submit = (parentId) => {
        if(!this.state.id) {
            makeCommentApi({
                id: uuidGenerator(),
                timestamp: Date.now(),
                body: this.state.body,
                author: this.state.author,
                parentId: parentId
            }).then((comment) => this.props.dispatch(updateComments(comment)))
                .then(() => this.clearForm())
        } else {
            const comment = this.props.editingComment;
            editCommentApi({
                id: comment.id,
                timestamp: Date.now(),
                body: this.state.body,
                author: this.state.author,
                parentId: parentId
            }).then((comment) => this.props.dispatch(updateComments(comment)))
                .then(() => this.props.editFunction())
        }
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value});
    }

    clearForm() {
        this.setState({
            id: '',
            author: '',
            body: ''
        })
    }

    componentDidUpdate() {
        const { editingComment } = this.props;
        if(editingComment && !this.state.id){
            this.setState({
                id: editingComment.id,
                author: editingComment.author,
                body: editingComment.body
            })
        } else if(!editingComment && this.state.id){
            this.clearForm()
        }
    }

    render () {
        const { parentId, editingComment, editFunction } = this.props;
        const  formNotEmpty = (this.state.author || this.state.body);

        return (
            <div className="box-comment background-comment">
                <div className="form-group">
                    <div className="type-comment-header">
                        {!editingComment &&<label>Add new comment</label>}
                        {editingComment && <label>Editing comment</label>}
                    </div>
                    <input id="author" className="bottom-only author-comment" type="text" placeholder="Author" value={this.state.author}
                           onChange={(event) => this.handleChange(event)}/>
                    <TextareaAutosize className="comment-text-box"
                        placeholder="Type here your comment"
                        id="body"
                        onChange={(event) => this.handleChange(event)}
                        value={this.state.body}/>
                </div>
                <ActionButtons cancelFunction={editingComment ? () => editFunction() : formNotEmpty ? () => this.clearForm() : null}
                               successFunction={() => (this.submit(parentId))}
                               successBtnLabel={!editingComment ? 'Comment' : 'Edit'}
                               cancelBtnLabel={(formNotEmpty) ? "Clean" : "Back"}
                               isValid={this.state.author && this.state.body}/>
            </div>
        )
    }
}

function mapStateToProps(state, { parentId, editingCommentId }) {
    return {parentId,
        editingComment: editingCommentId ? state.comments.comments[parentId][editingCommentId] : null
    }
}

export default connect(mapStateToProps, null)(TypeComment);

import React, { Component } from 'react';
import { voteApi } from "../utils/api";
import { updateComments, updatePosts} from "../actions";
import {connect} from "react-redux";

class VoteOptions extends Component {
    vote = (id, vote, type) => {
        voteApi({id, vote, type})
            .then((resp) => {
                if(type === 'posts'){
                    this.props.dispatch(updatePosts(resp))
                } else {
                    this.props.dispatch(updateComments(resp))
                }

            })
    };
    render() {
        const { id, voteScore, type } = this.props;

        return (
            <div className="vote-grid">
                <i className="material-icons md-dark md-inactive vote-button" onClick={() => this.vote(id, "upVote", type)}>thumb_up</i>
                <label>{voteScore}</label>
                <i className="material-icons md-dark md-inactive vote-button" onClick={() => this.vote(id, "downVote", type)}>thumb_down</i>
            </div>
        )
    }
}

function mapStateToProps(state, {id, voteScore, type}){
    return {id, voteScore, type}
}

export default connect(mapStateToProps)(VoteOptions);
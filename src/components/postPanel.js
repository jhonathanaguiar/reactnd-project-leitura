import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import VoteOptions from './voteOptions';
import {deletePostApi, getPostsApi} from "../utils/api";
import {deleteParentComments, deletePost, getCategories, getPosts} from "../actions";
import {connect} from "react-redux";
import {capitalize} from "../utils/helper";
import PageNotFound from "./pageNotFound";
import getCategoriesApi from "../utils/api";

const DATE_CREATED = 'dateCreated';
const MOST_VOTED = 'mostVoted';
const LESS_VOTED = 'lessVoted';

class PostPanel extends Component {
    state = {
        orderBy: MOST_VOTED
    };

    isEmpty(obj){
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    handleChange (event) {
        this.setState({orderBy: event.target.value})
    }

    delete = (postId) => {
        deletePostApi(postId)
            .then((post) => {
                this.props.dispatch(deletePost(post));
            })
            .then(() => this.props.dispatch(deleteParentComments(postId)));
    };

    componentDidMount() {
        getCategoriesApi().then(
            categories => this.props.dispatch(getCategories(categories)));
        getPostsApi().then(
            posts => this.props.dispatch(getPosts(posts))
        );
    }

    render() {
        const NO_CATEGORY = "Posts";
        const { posts = {}, categories } = this.props;
        const { orderBy } = this.state;
        const { category = NO_CATEGORY } = this.props.match ? this.props.match.params : {};
        let postsToShow = {};

        if (category !== NO_CATEGORY) {
            postsToShow = {...posts[category]}
        } else {
            postsToShow = Object.keys(posts).reduce((fullList, category) => {
                fullList = {
                    ...fullList,
                    ...posts[category]
                };
                return fullList
            }, {});
        }

        const validCategory =
            ((!this.isEmpty(categories) && category !== NO_CATEGORY) ?
                categories[category] : true);

        let listIds = Object.keys(postsToShow);

        if(orderBy) {
            switch (orderBy) {
                case DATE_CREATED:
                    listIds = listIds.sort((a, b) => {
                        return postsToShow[a].timestamp - postsToShow[b].timestamp
                    });
                    break;
                case MOST_VOTED:
                    listIds = listIds.sort((a, b) => {
                        return postsToShow[b].voteScore - postsToShow[a].voteScore
                    });
                    break;
                case LESS_VOTED:
                    listIds = listIds.sort((a, b) => {
                        return postsToShow[a].voteScore - postsToShow[b].voteScore
                    });
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="box">
                {validCategory ?
                    <div>
                        <div className="category-header">
                            <h2>{capitalize(category)}</h2>
                            <select onChange={(event) => this.handleChange(event)} value={orderBy}>
                                <option value='' disabled>Order by</option>
                                <option value={DATE_CREATED}>Date created</option>
                                <option value={MOST_VOTED}>Most voted</option>
                                <option value={LESS_VOTED}>Less voted</option>
                            </select>
                        </div>
                        <div>
                            {!!listIds.length && listIds.map((post) => (
                                <div key={postsToShow[post].id} className="post-list with-thumbs border-bottom">
                                    <div className="inline-itens">
                                        <Link to={`/${postsToShow[post].category}/${post.id}`}
                                              className="material-icons md-24 no-link-style">
                                            chevron_right
                                        </Link>
                                        <div className="list-content">
                                            <Link to={`/${postsToShow[post].category}/${postsToShow[post].id}`}
                                                  className="post-title">
                                                {postsToShow[post].title}
                                            </Link>
                                            <Link to={`/${postsToShow[post].category}/${postsToShow[post].id}`}
                                                  className="post-subtitle">
                                                {postsToShow[post].author} - {postsToShow[post].category} / {postsToShow[post].commentCount} comments
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="action-grid">
                                        <div className="action-sub-grid">
                                            <Link
                                                to={`/createpost/${postsToShow[post].category}/${postsToShow[post].id}`}
                                                className="no-link-style">
                                                <button className="action-button">Edit</button>
                                            </Link>
                                            <button className="action-button"
                                                    onClick={() => this.delete(postsToShow[post].id)}>Delete
                                            </button>
                                        </div>
                                        <VoteOptions id={postsToShow[post].id} voteScore={postsToShow[post].voteScore}
                                                     type="posts"/>
                                    </div>
                                </div>
                            ))}
                            {!listIds.length && <h3>No posts to show :'(</h3>}
                        </div>
                    </div>
                    : <PageNotFound />}
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }){
    return { posts, categories }
}

export default connect(mapStateToProps, null)(PostPanel);
import { combineReducers } from 'redux'
import {
    DELETE_POST,
    GET_CATEGORIES,
    GET_POSTS,
    GET_COMMENTS,
    UPDATE_COMMENTS,
    DELETE_COMMENT,
    UPDATE_POSTS,
    DELETE_PARENT_COMMENTS
} from "../actions";

function categories(state = {}, action) {
    const { categories } = action;
    switch (action.type) {
        case GET_CATEGORIES:
            return categories.reduce((fullList, category) => {
                fullList = {
                    ...fullList,
                    [category.name]: category};
                return fullList
            }, {});


        default:
            return state
    }
}

function comments(state = {}, action) {
    const { comment } = action;
    switch (action.type) {
        case GET_COMMENTS:
            const allComments = action.comments;
            const { parentId } = action;
            const organizedComments = allComments.length ?
                allComments.reduce((fullList, comment)=> {
                    fullList = {
                        ...fullList,
                        [parentId]: {
                            ...fullList[parentId],
                            [comment.id]: comment}};
                    return fullList
                }, {})
                : {
                    ...state,
                    [parentId]: {}
                };
            return {
                ...state,
                ...organizedComments
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                [comment.parentId]: {
                    ...state[comment.parentId],
                    [comment.id]: comment
                }
            };
        case DELETE_COMMENT:
            let comments = {...state};
            delete comments[comment.parentId][comment.id];
            return {...comments};
        case DELETE_PARENT_COMMENTS:
            let listComments = {...state};
            delete listComments[action.parentId];
            return {...listComments};
        default:
            return state
    }

}

function posts(state = {}, action) {
    const { post } = action;
    switch (action.type) {
        case GET_POSTS:
            const allPosts = action.posts;
            const organizedPosts = allPosts.reduce((fullList, post)=> {
                    fullList = {
                        ...fullList,
                        [post.category]: {
                            ...fullList[post.category],
                            [post.id]: post
                        }
                    };
                    return fullList
                }, {});
            return {
                ...state,
                ...organizedPosts
            };
        case UPDATE_POSTS:
            return {
                    ...state,
                    [post.category]: {
                        ...state[post.category],
                        [post.id]: post
                    }
            };
        case DELETE_POST:
            let posts = {...state};
            delete posts[post.category][post.id];
            return posts;
        default:
            return state
    }

}

export default combineReducers({
    categories,
    comments,
    posts
})
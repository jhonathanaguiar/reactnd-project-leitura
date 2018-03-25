export const DELETE_POST = 'DELETE_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENTS = 'EDIT_COMMENT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const DELETE_PARENT_COMMENTS = 'DELETE_PARENT_COMMENTS';

export function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function getPosts(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export function updatePosts(post) {
    return {
        type: UPDATE_POSTS,
        post,
    }
}

export function getComments(comments, parentId) {
    return {
        type: GET_COMMENTS,
        comments,
        parentId
    }
}

export function updateComments(comment) {
    return {
        type: UPDATE_COMMENTS,
        comment,
    }
}

export function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment,
    }
}

export function deleteParentComments(parentId) {
    return {
        type: DELETE_PARENT_COMMENTS,
        parentId,
    }
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    }

}
const URL= 'http://localhost:3001';
const AUTHORIZATION = 'whatever-you-want';

export default function getCategoriesApi () {
    return fetch(
        `${URL}/categories`,{
        headers: { 'Authorization': AUTHORIZATION }
    })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON.categories;
        })
}

export function getPostsApi (category = '') {
    return fetch(
        `${URL}/${category ? category + '/' : ''}posts`,{
            method: "GET",
            headers: { 'Authorization': AUTHORIZATION }
        })
        .then((resp) => {return resp.json()})
        .then((respJSON) => {
            return respJSON;
        })
}

export function getPostDetailsApi (id) {
    return fetch(
        `${URL}/posts/${id}`,{
            method: "GET",
            headers: { 'Authorization': AUTHORIZATION }
        })
        .then((resp) => {return resp.json()})
        .then((respJSON) => {
            return respJSON;
        })
}

export function makePostApi (post) {
    return fetch(
        `${URL}/posts`,{
            method: "POST",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}

export function voteApi (params) {
    return fetch(
        `${URL}/${params.type}/${params.id}`,{
            method: "POST",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
            body: JSON.stringify({option: params.vote})
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        });
}

export function getCommentsApi (id) {
    return fetch(
        `${URL}/posts/${id}/comments`,{
            method: "GET",
            headers: { 'Authorization': AUTHORIZATION }
        })
        .then((resp) => {return resp.json()})
        .then((respJSON) => {
            return respJSON;
        })
}

export function makeCommentApi (comment) {
    return fetch(
        `${URL}/comments`,{
            method: "POST",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}

export function editCommentApi (comment) {
    return fetch(
        `${URL}/comments/${comment.id}`,{
            method: "PUT",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}

export function editPostApi (post) {
    return fetch(
        `${URL}/posts/${post.id}`,{
            method: "PUT",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}

export function deleteCommentApi (id) {
    return fetch(
        `${URL}/comments/${id}`,{
            method: "DELETE",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}

export function deletePostApi (id) {
    return fetch(
        `${URL}/posts/${id}`,{
            method: "DELETE",
            headers: { 'Authorization': AUTHORIZATION, 'Content-Type': 'application/json' },
        })
        .then((resp) => resp.json())
        .then((respJSON) => {
            return respJSON;
        })
}
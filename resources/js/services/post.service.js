import router from "../router/router";

export default {
    createPost,
    getUserPosts,
    getAllPosts,
    loadMore,
}

function createPost(data){
    return new Promise((resolve, reject) => {
        axios.post(`/api/${data.id}/posts`, data).then(response => {
            if (response.status === 201) {
                resolve(response.data.data)
            }
        }).catch(err => {
            reject(err);
        });
    })
}

function getUserPosts(page){
    return new Promise((resolve, reject) => {
        let id = router.currentRoute.params.id.replace(/\D/g, "");
        axios.get(`/api/${id}/posts?page=` + page).then(response => {
            if (response.status === 200) {
                resolve(response.data)
            }
        }).catch(err => {
            reject(err);
        });
    })
}

function getAllPosts(page) {
    return new Promise((resolve, reject) => {
        axios.get('/api/posts/pagination?page=' + page).then(response => {
            if (response.status === 200) {
                resolve(response.data)
            }
        })
    })
}

function loadMore(page) {
    return new Promise((resolve, reject) => {
        axios.get('/api/posts/pagination?page=' + page).then(response => {
            if (response.status === 200) {
                resolve(response.data)
            }
        })
    })
}

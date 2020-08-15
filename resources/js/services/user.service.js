import router from "../router/router";

export default {
    register,
    login,
    getSpecificUser,
    updateImage
}

function register(data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/register', data).then(response => {
            if (response.status === 201) {
                resolve(response.data.data)
            }
        }).catch(err => {
            reject(err);
        });
    })
}

function login(data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', data).then(response => {
            if (response.status === 200) {
                resolve(response.data.data)
            }
        }).catch(err => {
            reject(err);
        });
    })
}

function getSpecificUser(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/${id}`).then(response => {
            if (response.status === 200) {
                if(response.data === '') {
                    router.push('/auth/login');
                } else{
                    resolve(response.data.data)
                }
            }
        })
    })
}

function updateImage(data) {
    return new Promise((resolve, reject) => {
        let id;
        for (var pair of data.entries()) {
            if(!isNaN(+pair[1])){
                id = +pair[1];
            }
        }
        axios.post(`/api/${id}/settings`, data).then(response => {
                if (response.status === 200) {
                    resolve(response.data)
                }
            })
        }
    )
}

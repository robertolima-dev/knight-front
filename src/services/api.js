const axios = require('axios')

export const get = async (url) => {
    return await axios.get(process.env.VUE_APP_URL_API + url)
    .then(response => response.data)
    .catch(err => err)
}

export const post = async (url, data) => {
    return await axios.post(process.env.VUE_APP_URL_API + url, data)
    .then(response => response.data)
    .catch(err => err)
}

export const put = async (url, data) => {
    return await axios.put(process.env.VUE_APP_URL_API + url, data)
    .then(response => response.data)
    .catch(err => err)
}

export const del = async (url) => {
    return await axios.delete(process.env.VUE_APP_URL_API + url)
    .then(response => response.data)
    .catch(err => err)
}

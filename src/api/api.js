import axios from "axios";
const KEY = '28107066-dfa7b901e8cf2cf77eb187d7a'
const instance = axios.create({
    baseURL:"https://pixabay.com/api/"
})

export const searcImages = (q, page = 1) => {
    return instance.get(`?key=${KEY}&q=${q}&per_page=12&page=${page}`)
}
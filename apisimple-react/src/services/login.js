import axios from "axios"

const baseUrl = 'http://127.0.0.1:5000/login'

const login = async(user, password) => {
    const result = await axios.post(baseUrl, {user, password})
    return result.data
}

export default {login}


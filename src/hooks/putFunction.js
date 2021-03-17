import axios from "axios";

async function putFunction(url, data) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;

    try {

        const result = await axios.put(
            urlPost,
            data,
            {headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }}
        )
        return result.data;
    } catch (e) {
        console.error(e.message);
    }
}
export default putFunction;

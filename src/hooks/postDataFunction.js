import axios from "axios";

async function postDataFunction(url, data ) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;

    try {
        console.log("data-post-> ", data);
        const result = await axios.post(urlPost,
            data, {headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }}
        )
        console.log("axios result-post-data-> ", result.data);
        if (result.status === 200){
            return result.data;
        }
    } catch (e) {
        console.error(e.message);
    }
}
export default postDataFunction;

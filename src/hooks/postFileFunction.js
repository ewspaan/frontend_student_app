import axios from "axios";

async function postFileFunction(url, data) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;

    try {

        const result = await axios.post(
                    urlPost,
                    data,
            {headers: {
                    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                    Authorization: `Bearer ${token}`,
                }}
            )
        console.log("axios result-file-> ", result.data);
        return result.data;
    } catch (e) {
        console.error(e.message);
        return e;
    }
}
export default postFileFunction;

import axios from "axios";

async function postDataFunction(url, data ) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;

    try {
        //console.log("data-post-> ", data);
        const result = await axios.post(urlPost,
            data, {headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }}
        )
        //console.log("axios result-post-data-result-> ", result);
        if (result.status === 200){
            return result;
        }
    } catch (e) {
        console.log(e);
        return {data:{message: e.request.response},
                status: e.request.status};
    }
}
export default postDataFunction;

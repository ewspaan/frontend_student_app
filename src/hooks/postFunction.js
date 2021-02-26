import axios from "axios";

async function postFunction(url, data) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;
    const config = {headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }};
    //console.log("axios result--> ", urlGet);
    try {
        const result = await axios.post(urlPost,
            data,
            config)
        console.log("axios result--> ", result.data);
        if (result.status === 200){

        }
    } catch (e) {
        console.error(e.message);
    }
}

export default postFunction;

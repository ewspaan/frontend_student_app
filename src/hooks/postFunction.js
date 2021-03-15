import axios from "axios";

async function postFunction(url, data , file) {

    const token = localStorage.getItem('token');
    const urlPost = `http://localhost:8080/api/${url}`;

    try {

        const configData = {headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }};
        const configFile = {headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                Authorization: `Bearer ${token}`,
            }};
        const config = file === false ? configData : configFile;
        console.log("config-post-> ", config);
        console.log("data-post-> ", data);
        const result = await axios.post(urlPost,
            data, config
            )
        console.log("axios result-file-> ", result.data);
        if (result.status === 200){
        return result.data;
        }
    } catch (e) {
        console.error(e.message);
    }
}
//"Content-Type": "application/json","multipart/form-data; boundary=<calculated when request is sent>"
export default postFunction;

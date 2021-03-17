import axios from "axios";

async function deleteFunction(url) {

    const token = localStorage.getItem('token');
    const urlDelete = `http://localhost:8080/api/${url}`;
    //console.log("axios result delete function--> ", urlDelete);
    const config = {headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const result = await axios.delete(
            urlDelete,
            config
        );
        //console.log("axios result delete function--> ", result);
        return result.data;
    } catch (e) {
        console.error(e.message);
        return e.message;
    }
}

export default deleteFunction;

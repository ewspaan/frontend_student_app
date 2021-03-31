import axios from "axios";

async function deleteFunction(url) {

    const token = localStorage.getItem('token');
    const urlDelete = `http://localhost:8080/api/${url}`;
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
        return result.data;
    } catch (e) {
        console.error(e.message);
        return e;
    }
}

export default deleteFunction;

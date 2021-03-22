import axios from "axios";

async function getFunction(url) {

        const token = localStorage.getItem('token');
        const urlGet = `http://localhost:8080/api/${url}`;
        const config = {headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                    }
                            }
        try {
            const result = await axios.get(
                urlGet,
                config
                );
            console.log("axios result get function--> ", result);
            return result;
        } catch (e) {
            console.error(e.message);
            return e;
        }
}

export default getFunction;

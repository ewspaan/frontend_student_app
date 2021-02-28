import axios from "axios";

async function getFunction(url) {

        const token = localStorage.getItem('token');
        const urlGet = `http://localhost:8080/api/${url}`;
        const config = {headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                    }
                            }

        //console.log("config--> ", config);
        try {
            const result = await axios.get(
                urlGet,
                config
                );
            console.log("axios result get function--> ", result);
            return result.data;
        } catch (e) {
            console.error(e.message);
            return e.message;
        }
}

export default getFunction;

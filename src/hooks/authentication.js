import axios from "axios";

function authentication(dataLogin){

    const result = null;
    sendLogin(dataLogin);

    async function sendLogin(dataLogin) {

        try {
            const result = await axios.post(`http://localhost:8080/api/auth/signin`, dataLogin);
            console.log("axios result--> ", result.data);
            //console.log("Token--> ", result.data.accessToken);
        } catch (e) {
            console.error(e);
        }
    }
    return result.data;
}

export default authentication;


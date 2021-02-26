
function setCurrentDateToString () {

    const day = "day" + new Date().getDate().toString();
    const month = "month" + new Date().getMonth().toString()+1;
    const year = "year" + new Date().getFullYear().toString();
    return (day+month+year);
    }
export default setCurrentDateToString;



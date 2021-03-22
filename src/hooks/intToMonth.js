
function intToMonth (monthInt){

    const month = ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
    return month[monthInt-1];
}

export default intToMonth;
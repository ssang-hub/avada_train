
const formatDate = (date)=>{
   return `${date.getDate()}-${
        date.getMonth() + 1
    }-${date.getFullYear()}`;
}

const getDateNow = ()=>{
    const date = new Date();
    return formatDate(date)
}

module.exports = {formatDate, getDateNow}
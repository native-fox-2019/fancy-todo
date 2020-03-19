function convert(unix_timestamp){
    var date = new Date(unix_timestamp * 1000)
    var dayNum = date.getDay()
    switch (dayNum){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    
    return day
}


// console.log('ok')
//console.log(convert(1583431200))
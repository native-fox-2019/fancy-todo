function weather(){
    $.ajax({
        url: "http://localhost:3000/api/current_weather_data",
        type: "GET",
        success: function(data) {
            let temp = (data.main.temp-273).toFixed(2)
            console.log(temp)
            $(`#weather`).append(`
            Current weather in Jakarta today:
            ${temp}deg.C -- humidity:${data.main.humidity}% -- ${data.weather[0].description}
            `)
        },
        error: function(err){
            console.log(`Error : ${err}`)
        }
    })
}
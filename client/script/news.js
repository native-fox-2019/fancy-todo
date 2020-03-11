function news(){
    $.ajax({
        url: "https://intense-brook-20799.herokuapp.com/api/news",
        type: "GET",
        success: function(data) {
            console.log(data)
            let berita= data.articles
            



            for (let i=0; i<berita.length; i++){
                $(`#news`).append(` 
                <br>* ${berita[i].title} :
                ${berita[i].description}<br>
            `)
            }   
        },
        error: function(err){
            console.log(`Error : ${err}`)
        }
    })
}
"use strict"

$('.pageContainer').on('click', '#generate-card-button', function () {
    console.log('MASUK RANDOM')
    $('#main-page').hide()
    getRandomCard(0)
})

$('#generate-card-retry').on('click', function () {
    getRandomCard(0)
})

function getRandomCard(recursiveCount) {
    console.log(recursiveCount)
    // Get a random English word //
    $.ajax({
        type: 'GET',
        url: `https://random-word-api.herokuapp.com/word?number=1`
    })
    .done(function (result) {
        console.log(result)
        // Translates the word //
        let randomWord = result[0]
        $.ajax({
            type: 'GET',
            url: `https://api.mymemory.translated.net/get?q=${randomWord}&langpair=en|ind`,
        })
        .done(function(text) {
            console.log(text)
            // Recursive if the word cannot be translated (max 3 times) //
            let translation = text.responseData.translatedText.toLowerCase()
            // console.log(`The word ${result} can be translated into ${translation}`) 
            if (randomWord === translation && recursiveCount < 3) {
                recursiveCount++
                getRandomCard(recursiveCount)
            } else {
                // Tries to find a definition. Accepts both success and fail condition //
                let definition
                $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": `https://wordsapiv1.p.rapidapi.com/words/${randomWord}/definitions`,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                        "x-rapidapi-key": "b60baa146bmsh00b59306449f743p1865bdjsn57607345b3e6"
                    }
                })
                .done(function(output) {
                    console.log(output)
                    // Write word definition //
                    if (output.definitions.length >= 1) {
                        definition = output.definitions[0].definition
                    } else if (typeof definition === "string") {
                        definition = ''
                    } else {
                        definition = ''
                    }
                })
                .fail(function() {
                    // No definition obtained //
                console.log('FAIL 3')
                })
                .always(function() {
                    // Writes the result //
                    $('#frontRand').val(`${randomWord}`)
                    $('#subFrontRand').val(`${definition}`)
                    $('#backRand').val(`${translation}`)
                    $('#randomCardPage').show()

                })
            }
        })
        .fail(function() {
            // Translation failed //
        console.log('FAIL 2')
        })
        .always(function() {            
        })
    })
    .fail(function () {
        // Failed getting a random word //
        console.log('FAIL 1')
    })
    .always(function () {
    })
}

$('#randomCardForm').on('submit', function(event) {
    event.preventDefault();
    addRandomCard()
    refresh()
})

function addRandomCard() {
    $.ajax({
        method: 'POST',
        url: baseURL + '/cards',
        headers: { token: localStorage.getItem('token') },
        data: {
            front: $('#frontRand').val(),
            subFront: $('#subFrontRand').val(),
            synFront: [$('#synFrontRand').val()], //ARRAY
            back: $('#backRand').val(),
            subBack: $('#subBackRand').val(),
            synBack: [$('#synBackRand').val()], //ARRAY
        },
        success: () => {
            console.log('successfully added new card')
            $('#randomCardForm')[0].reset();
            showMainPage()
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}
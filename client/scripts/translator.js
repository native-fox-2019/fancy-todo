"use strict"

$('#open-translate-button').on('click', function() {
    $('#main-page').hide()
    $('#translatePage').show()
})

$('#translate-button').on('click', function() {
    translate()
})

function translate() {
    event.preventDefault()
    let input = $('#translate-input-form').val()

    $.ajax({
        type: 'GET',
        url: `https://api.mymemory.translated.net/get?q=${input}&langpair=en|ind`,
    })
    .done(function(result) {
        $('#translate-result-form').val(result.responseData.translatedText)
    })
    .fail(function() {
        $('#translate-result-form').val('Failed to translate...')
    })
    .always(function() {

    })
}
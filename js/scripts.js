$(document).ready(function() {

    $('#searchBar').submit(function () {
        
        $('#infoField').empty();

        event.preventDefault();

        var querySearch = $('searchInput').val();

        axios.get('/personas.json', { text: querySearch }).then(function (res) {
            $('#searchBar').value='';

            $('#name').append('<p></p>').attr('id', 'personaName');

            $('#personaName').append(res.name);
        })
    })
})
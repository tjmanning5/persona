$(document).ready(function () {
    $('#searchBar').submit(function (event) {

        $('#infoField').empty();

        event.preventDefault();

        var personaSearch = $('#searchInput').val();

        axios.get('')

    });
});
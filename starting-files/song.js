const genres = JSON.parse(genreList);
const artists = JSON.parse(artistList);

document.addEventListener("DOMContentLoaded", function() {

    for (let a of artists) {
        let option = document.createElement("option");
        option.text = a["name"];
        option.value = a["id"];
        let aSelect = document.getElementById('artist');
        console.log(option);
        aSelect.appendChild(option);
        }

        for (let g of genres) {
            let option = document.createElement("option");
            option.text = g["name"];
            option.value = g["id"];
            let aSelect = document.getElementById('genre');
            console.log(option);
            aSelect.appendChild(option);
            }


});

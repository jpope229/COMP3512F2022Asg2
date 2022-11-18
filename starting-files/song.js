const genres = JSON.parse(genreList);
const artists = JSON.parse(artistList);
const songs = JSON.parse(songList);
document.addEventListener("DOMContentLoaded", function() {

    for (let a of artists) {
        let option = document.createElement("option");
        option.text = a["name"];
        option.value = a["id"];
        let aSelect = document.getElementById('artist');
        aSelect.appendChild(option);
        }

    for (let g of genres) {
        let option = document.createElement("option");
        option.text = g["name"];
        option.value = g["id"];
        let aSelect = document.getElementById('genre');
        aSelect.appendChild(option);
        }
    
    //Retrieve and display song data
    const thead = document.getElementById('headerRow');
    
    for (let s of songs){
        const songRow = document.createElement("tr");
        songRow.setAttribute("songID", s["song_id"]);
        
        //create td for title 
        const songDataTitle = document.createElement("td");
        songDataTitle.textContent="aTestString";
        console.log(songDataTitle);
        console.log(s["title"]);
        
        //FOR JUVE this line is outputting the popularity as the first TD instead of the song title, i can't figure out why its doing that
        songRow.appendChild(songDataTitle);

        //create td for artist name 
        const songDataArtist = document.createElement("td");
        songDataTitle.textContent = s["artist.name"];
        songRow.appendChild(songDataArtist);

        //create td for year 
        const songDataYear = document.createElement("td");
        songDataTitle.textContent = s["year"];
        songRow.appendChild(songDataYear);

        //create td for genre
        const songDataGenre = document.createElement("td");
        songDataTitle.textContent = s["genre.name"];
        songRow.appendChild(songDataGenre);

        //create td for popularity
        const songDataPopularity = document.createElement("td");
        songDataTitle.textContent = s["details"]["popularity"];
        console.log(s["details"]["popularity"]);
        songRow.appendChild(songDataPopularity);

        console.log(songRow);
        thead.insertAdjacentElement('afterend', songRow);

        }
    }

);

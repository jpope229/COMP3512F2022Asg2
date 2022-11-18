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
        songDataTitle.textContent= s["title"];
        console.log(songDataTitle);
        
        //FOR JUVE this line is outputting the popularity as the first TD instead of the song title, i can't figure out why its doing that
        songRow.insertAdjacentElement('beforeend',songDataTitle);
        thead.insertAdjacentElement('afterend', songRow);

        //create td for artist name 
        const songDataArtist = document.createElement("td");
        songDataArtist.textContent = s["artist"]["name"];
        songRow.appendChild(songDataArtist);

        //create td for year 
        const songDataYear = document.createElement("td");
        songDataYear.textContent = s["year"];
        songRow.appendChild(songDataYear);

        //create td for genre
        const songDataGenre = document.createElement("td");
        songDataGenre.textContent = s["genre"]["name"];
        songRow.appendChild(songDataGenre);

        //create td for popularity
        const songDataPopularity = document.createElement("td");
        songDataPopularity.textContent = s["details"]["popularity"];
        songRow.appendChild(songDataPopularity);

        //create td for addToPlaylist
        const playlistButton = document.createElement("button");
        playlistButton.textContent = 'Add';
        
        songRow.appendChild(playlistButton);
        thead.insertAdjacentElement('afterend',songRow);
        console.log(songRow);

        }
    }

);

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
    const tableBody = document.getElementById('tBody');
    
    for (let s of songs){
        const songRow = document.createElement("tr");
        songRow.setAttribute("songID", s["song_id"]);
        
        //create td for title 
        const songDataTitle = document.createElement("td");
        //add data inside of td
        songDataTitle.textContent= s["title"];    
        //Insert song title into the TD
        songRow.insertAdjacentElement('beforeend',songDataTitle);
        //add td1 (Song title)
        tableBody.insertAdjacentElement('afterend', songRow);

        //create td for artist name 
        const songDataArtist = document.createElement("td");
        //add data inside of td
        songDataArtist.textContent = s["artist"]["name"];
        //add td2 (Artist name)
        songRow.appendChild(songDataArtist);

        //create td for year 
        const songDataYear = document.createElement("td");
        //add data inside of td
        songDataYear.textContent = s["year"];
        //add the year td to the row
        songRow.appendChild(songDataYear);

        //create td for genre
        const songDataGenre = document.createElement("td");
        //add data inside of td
        songDataGenre.textContent = s["genre"]["name"];
        //add the genre td to the row
        songRow.appendChild(songDataGenre);

        //create td for popularity
        const songDataPopularity = document.createElement("td");
        //add data inside of td
        songDataPopularity.textContent = s["details"]["popularity"];
        //add the popularity td to the row
        songRow.appendChild(songDataPopularity);

        //create td for addToPlaylist
        const playlistButton = document.createElement("button");
        //add data inside of td
        playlistButton.textContent = 'Add';
        //add button to the end of the row
        songRow.appendChild(playlistButton);
        
        //add the completed song row to the table body
        tableBody.appendChild(songRow);

        //just for testing purpose/debugging
        console.log(songRow);

        }

        //TESTING sorting for columns, console.log which header was clicked
        const colHeaders = document.querySelector("thead");
        colHeaders.addEventListener("click", function(e){

            if(e.target.id == 'title'){
                console.log("Sort by song title")
            }
            if(e.target.id == 'artist'){
                console.log("Sort by artist name")
            }
            if(e.target.id == 'year'){
                console.log("Sort by year released")
            }
            if(e.target.id == 'genre'){
                console.log("Sort by genre")
            }
            if(e.target.id == 'popularity'){
                console.log("Sort by popularity")
            }
            console.log(e.target.id +' table header was clicked!');



        })
        
    }




);

// require assign2.js
import { getapi, api } from "./assign2.js";

// check if genres, artists, songsData are in localStorage
// if not, get them from api
// if yes, get them from localStorage
if (
  localStorage.getItem("genres") === null ||
  localStorage.getItem("artists") === null ||
  localStorage.getItem("songsData") === null
) {
  const genreList1 = [];
  const artistList1 = [];
  const songData1 = [];
  // store response
  const response = await fetch(api);
  const data = await response.json();
  const songtp = JSON.stringify(data);
  const allSongs = JSON.parse(songtp);
  // console.log(genres);
  for (let i = 0; i < allSongs.length; i++) {
    // console.log(genres[i]["title"]);
    const tempgenre = allSongs[i]["genre"];
    genreList1.push(tempgenre);
  }
  // console.log(genreList1);
  // loop through allSongs and store in artists
  for (let i = 0; i < allSongs.length; i++) {
    const tempartist = allSongs[i]["artist"];
    artistList1.push(tempartist);
  }
  // console.log(artistList1);
  // loop through allSongs and store in songsData
  for (let i = 0; i < allSongs.length; i++) {
    const tempsong = allSongs[i];
    songData1.push(tempsong);
  }
  // console.log(songData1);
  /* const temp_genre = JSON.stringify(genreList1);
      const genres = JSON.parse(temp_genre); */
  const genres = genreList1;
  const temp_artist = JSON.stringify(artistList1);
  const artists = JSON.parse(temp_artist);
  const temp_song = JSON.stringify(songData1);
  const songsData = JSON.parse(temp_song);

  // store genres, artists, songsData in localStorage
  localStorage.setItem("genres", JSON.stringify(genres));
  localStorage.setItem("artists", JSON.stringify(artists));
  localStorage.setItem("songsData", JSON.stringify(songsData));
} else {
}
const genres = JSON.parse(localStorage.getItem("genres"));
const artists = JSON.parse(localStorage.getItem("artists"));
const songsData = JSON.parse(localStorage.getItem("songsData"));
/* console.log(genres);
console.log(artists);
console.log(songsData);*/

// document.addEventListener("DOMContentLoaded", function () {
//this array will store all the songs in the database
const songsArray = [];
// check if playlist is in localStorage and if not, create it
if (localStorage.getItem("playlist") === null) {
  const playlist = [];
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

// unique artists function
const getUniqueArtists = function (artists) {
  const uniqueArtists = [...new Set(artists.map((item) => item.name))];
  // get artist ids and store in array
  const artistIDs = [];
  uniqueArtists.map((artist) => {
    const artistID = artists.find((item) => item.name === artist).id;
    artistIDs.push(artistID);
  });
  // console.log(artistIDs);
  // merge artist names and ids into one array
  const artistNamesAndIDs = [];
  for (let i = 0; i < uniqueArtists.length; i++) {
    artistNamesAndIDs.push({
      name: uniqueArtists[i],
      id: artistIDs[i],
    });
  }
  // console.log(artistNamesAndIDs);
  return artistNamesAndIDs;
};
// call getUniqueArtists function
const uniqueArtists = getUniqueArtists(artists);
for (let a of uniqueArtists) {
  let option = document.createElement("option");
  option.text = a["name"];
  option.value = a["id"];
  let aSelect = document.getElementById("artist");
  aSelect.appendChild(option);
}

console.log(genres);
// function to get unique genres
const getUniqueGenres = function (genres) {
  const uniqueGenres = [...new Set(genres.map((item) => item.name))];
  // get genre ids and store in array
  const genreIDs = [];
  uniqueGenres.map((genre) => {
    const genreID = genres.find((item) => item.name === genre).id;
    genreIDs.push(genreID);
  });
  // console.log(genreIDs);
  // merge genre names and ids into one array
  const genreNamesAndIDs = [];
  for (let i = 0; i < uniqueGenres.length; i++) {
    genreNamesAndIDs.push({
      name: uniqueGenres[i],
      id: genreIDs[i],
    });
  }
  // console.log(genreNamesAndIDs);
  return genreNamesAndIDs;
};
// call getUniqueGenres function
const uniqueGenres = getUniqueGenres(genres);
for (let g of uniqueGenres) {
  let option = document.createElement("option");
  option.text = g["name"];
  option.value = g["id"];
  let aSelect = document.getElementById("genre");
  aSelect.appendChild(option);
}

//Retrieve and display song data
const tableBody = document.getElementById("tBody");

for (let s of songsData) {
  const songRow = document.createElement("tr");
  songRow.setAttribute("songID", s["song_id"]);
  // songRow.

  //create td for title
  const songDataTitle = document.createElement("td");
  //add data inside of td
  songDataTitle.textContent = s["title"];
  songDataTitle.style.cursor = "pointer";
  // add event listener to td
  // songDataTitle.addEventListener("click", showSongDetails);

  //Insert song title into the TD
  songRow.insertAdjacentElement("beforeend", songDataTitle);
  //add td1 (Song title)
  tableBody.insertAdjacentElement("afterend", songRow);

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
  playlistButton.textContent = "Add";
  playlistButton.setAttribute("class", "add-to-playlist");
  // add song id to button
  playlistButton.setAttribute("songID", s["song_id"]);
  //add button to the end of the row
  songRow.appendChild(playlistButton);

  //add the completed song row to the table body
  tableBody.appendChild(songRow);

  const mySong = new Song(s);

  //add song to all songs array
  songsArray.push(mySong);

  // console.log(mySong);
}

//TEST outputting the array to console
// console.log(songsArray);

//TESTING sorting for columns, console.log which header was clicked
const tableContent = document.getElementById("tBody");
const tableButtons = document.querySelectorAll("th ");

const createRow = (obj, adtn) => {
  const row = document.createElement("tr");
  const objKeys = Object.keys(obj);
  objKeys.map((key) => {
    const cell = document.createElement("td");
    cell.setAttribute("data-attr", key);
    cell.innerHTML = obj[key];
    /* cell.addEventListener("click", (e) => {
      console.log(e.target);
    }); */

    cell.style.cursor = "pointer";
    row.appendChild(cell);
  });
  // get the song id
  const songID = songsArray.find((song) => {
    return song.title === obj.title;
  });
  // console.log(songID.songID);
  // add button to the end of the row
  const playlistButton = document.createElement("button");
  //add data inside of td
  playlistButton.textContent = "Add";
  // add add-to-playlist class to button
  playlistButton.classList.add("add-to-playlist");
  //add button to the end of the row
  row.appendChild(playlistButton);
  // add song id to button
  playlistButton.setAttribute("songID", songID.songID);
  //add sond id to the end of the row
  row.setAttribute("songid", songID.songID);

  // onclick of first td in row (song title), showSongDetails
  /* const songTitle = row.querySelector("td");
  songTitle.addEventListener("click", showSongDetails);
  songTitle.style.cursor = "pointer"; */

  return row;
};

const getTableContent = (data) => {
  console.log("The song data is ......", data);
  const pData = [];
  // loop through the data and create a new array of data with title, artist, year, genre, popularity
  data.map((item) => {
    const obj = {
      title: item.title,
      artist: item.artist.name,
      year: item.year,
      genre: item.genre,
      popularity: item.popularity,
    };
    pData.push(obj);
  });
  // return pData;
  pData.map((obj, adtn) => {
    const row = createRow(obj);
    tableContent.appendChild(row);
    // console.log(obj);
  });
  addPop();
  color();
  alternateRowColors();
  displaySongDetails();
  addSongToPlaylist();
};
// getTableContentFiltered
const getTableContentFiltered = (data) => {
  const pData = [];
  // loop through the data and create a new array of data with title, artist, year, genre, popularity
  data.map((item) => {
    const obj = {
      title: item.title,
      artist: item.artist.name,
      year: item.year,
      genre: item.genre,
      popularity: item.popularity,
    };
    pData.push(obj);
  });
  // return pData;
  pData.map((obj) => {
    const row = createRow(obj);
    tableContent.appendChild(row);
    // console.log(obj);
  });
  addPop();
  color();
  alternateRowColors();
  displaySongDetails();
  addSongToPlaylist();
};

// sort by title ascending or descending
const sortByTitle = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by title");
  const sorted = [...data].sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }

  console.log(sorted);
  //   return sorted;
  getTableContent(sorted);
};
/* const sortByTitle = (data) => {
  data.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
  tableContent.innerHTML = "";
  getTableContent(data);
}; */
// sort by artist ascending or descending
const sortByArtist = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by artist");
  const sorted = data.sort((a, b) => {
    if (a.artist.name < b.artist.name) {
      return -1;
    }
    if (a.artist.name > b.artist.name) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by year ascending or descending
const sortByYear = (data, direction) => {
  tableContent.innerHTML = "";
  console.log("sorting by year");
  const sorted = data.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by genre ascending or descending
const sortByGenre = (data, direction) => {
  tableContent.innerHTML = "";
  console.log("sorting by genre");
  const sorted = data.sort((a, b) => {
    if (a.genre.name < b.genre.name) {
      return -1;
    }
    if (a.genre.name > b.genre.name) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by popularity ascending or descending
const sortByPopularity = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by popularity");
  const sorted = [...data].sort((a, b) => {
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.popularity > b.popularity) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }

  console.log(sorted);
  //   return sorted;
  getTableContent(sorted);
};

const sortData = (data, param, direction = "asc") => {
  tableContent.innerHTML = "";
  const sortedData =
    direction == "asc"
      ? [...data].sort(function (a, b) {
          if (a[param] < b[param]) {
            return -1;
          }
          if (a[param] > b[param]) {
            return 1;
          }
          return 0;
        })
      : [...data].sort(function (a, b) {
          if (b[param] < a[param]) {
            return -1;
          }
          if (b[param] > a[param]) {
            return 1;
          }
          return 0;
        });

  getTableContent(sortedData);
};

const resetButtons = (event) => {
  [...tableButtons].map((button) => {
    if (button !== event.target) {
      button.removeAttribute("data-dir");
    }
  });
};

/* window.addEventListener("load", () => {
  [...tableButtons].map((button) => {
    button.addEventListener("click", (e) => {
      resetButtons(e);
      if (e.target.getAttribute("data-dir") == "desc") {
        sortData(songList, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        sortData(songList, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });
}); */

function Song(s) {
  this.title = s["title"];
  this.artist = s["artist"];
  this.year = s["year"];
  this.genre = s["genre"]["name"];
  this.popularity = s["details"]["popularity"];
  this.songID = s["song_id"];
}
// });

// sort by title on click of title header
// on first click of title header, sort by title ascending
// on second click of title header, sort by title descending
tableButtons[0].addEventListener("click", () => {
  // get id of title and add data-dir attribute to it
  const title = document.getElementById("title");
  title.setAttribute("data-dir", "asc");
  const direction = tableButtons[0].getAttribute("data-dir");
  if (direction === "asc") {
    sortByTitle(songsArray, "desc");
    tableButtons[0].setAttribute("data-dir", "desc");
    // add down arrow to title header
    tableButtons[0].innerHTML = "Title &#9660;";
  } else {
    sortByTitle(songsArray, "asc");
    tableButtons[0].setAttribute("data-dir", "asc");
    // add up arrow to title header
    tableButtons[0].innerHTML = "Title &#9650;";
  }
});

// sort by artist on click of artist header
// on first click of artist header, sort by artist ascending
// on second click of artist header, sort by artist descending
tableButtons[1].addEventListener("click", () => {
  // get id of artist and add data-dir attribute to it
  const artist = document.getElementById("artist");
  artist.setAttribute("data-dir", "asc");
  const direction = tableButtons[1].getAttribute("data-dir");
  if (direction === "asc") {
    sortByArtist(songsArray, "desc");
    tableButtons[1].setAttribute("data-dir", "desc");
    // add down arrow to artist header
    tableButtons[1].innerHTML = "Artist &#9660;";
  } else {
    sortByArtist(songsArray, "asc");
    tableButtons[1].setAttribute("data-dir", "asc");
    // add up arrow to artist header
    tableButtons[1].innerHTML = "Artist &#9650;";
  }
});

// sort by year on click of year header
// on first click of year header, sort by year ascending
// on second click of year header, sort by year descending
tableButtons[2].addEventListener("click", () => {
  const direction = tableButtons[2].getAttribute("data-dir");
  if (direction === "asc") {
    sortByYear(songsArray, "desc");
    tableButtons[2].setAttribute("data-dir", "desc");
    // add down arrow to year header
    tableButtons[2].innerHTML = "Year &#9660;";
  } else {
    sortByYear(songsArray, "asc");
    tableButtons[2].setAttribute("data-dir", "asc");
    // add up arrow to year header
    tableButtons[2].innerHTML = "Year &#9650;";
  }
});

// sort by genre on click of genre header
// on first click of genre header, sort by genre ascending
// on second click of genre header, sort by genre descending
tableButtons[3].addEventListener("click", () => {
  const genre = document.getElementById("genre");
  genre.setAttribute("data-dir", "asc");

  const direction = tableButtons[3].getAttribute("data-dir");
  if (direction === "asc") {
    sortByGenre(songsArray, "asc");
    tableButtons[3].setAttribute("data-dir", "desc");
    // add down arrow to genre header
    tableButtons[3].innerHTML = "Genre &#9660;";
  } else {
    sortByGenre(songsArray, "desc");
    tableButtons[3].setAttribute("data-dir", "asc");
    // add up arrow to genre header
    tableButtons[3].innerHTML = "Genre &#9650;";
  }
});

// sort by popularity on click of popularity header
// on first click of popularity header, sort by popularity ascending
// on second click of popularity header, sort by popularity descending
tableButtons[4].addEventListener("click", () => {
  // get id of popularity and add data-dir attribute to it
  const popularity = document.getElementById("popularity");
  popularity.setAttribute("data-dir", "asc");
  const direction = tableButtons[4].getAttribute("data-dir");
  if (direction === "asc") {
    sortByPopularity(songsArray, "popularity", "desc");
    tableButtons[4].setAttribute("data-dir", "desc");
    // add down arrow to popularity header
    tableButtons[4].innerHTML = "Popularity &#9660;";
  } else {
    sortByPopularity(songsArray, "popularity", "asc");
    tableButtons[4].setAttribute("data-dir", "asc");
    // add up arrow to popularity header
    tableButtons[4].innerHTML = "Popularity &#9650;";
  }
});
// on hover of table header, change cursor to pointer
tableButtons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.cursor = "pointer";
  });
});

// alternate table row colors
const alternateRowColors = function () {
  const tableRows = document.querySelectorAll("tr");
  tableRows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = "#00382b";
    }
  });
};
// get the 4th td element of each row and add a class of "popularity"
const addPop = function () {
  const popularity = document.querySelectorAll("td:nth-child(5)");
  popularity.forEach((pop) => {
    pop.classList.add("popularity");
  });
};
// document.addEventListener("DOMContentLoaded", function () {
const color = function () {
  // add a colored bar to the popularity column based on the popularity score
  const popularity = document.querySelectorAll(".popularity");
  popularity.forEach((pop) => {
    const popScore = pop.innerHTML;
    if (popScore >= 80) {
      pop.style.backgroundColor = "#00ff00";
    } else if (popScore >= 60) {
      pop.style.backgroundColor = "#ffff00";
    } else if (popScore >= 40) {
      pop.style.backgroundColor = "#ff9900";
    } else if (popScore >= 20) {
      pop.style.backgroundColor = "#ff0000";
    } else {
      pop.style.backgroundColor = "#990000";
    }
  });
};
addPop();
color();
// });

// on submit of form, filter table by selected
const filterForm = function () {
  // change .th-header text
  const filterHeader = document.getElementsByClassName("th-header");
  filterHeader[0].innerHTML = "Search/Browse Songs";
  const form = document.getElementById("filterBox");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const filterT = document.getElementById("filterT");
    const filterA = document.getElementById("filterA");
    const filterG = document.getElementById("filterG");

    // filter by title
    if (filterT.checked) {
      const filterTerm = document.getElementById("title").value;
      tableContent.innerHTML = "";
      const sorted = songsArray.filter((song) => {
        return song.title.toLowerCase().includes(filterTerm.toLowerCase());
      });
      console.log("Sorted: ", sorted);
      //if sorted is not empty, display the filtered table
      if (sorted) {
        // displayTable(sorted);
        getTableContentFiltered(sorted);
        // on click of title item, display song info

        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
    // filter by artist
    if (filterA.checked) {
      const filterTermA = document.getElementById("artist").value;
      console.log("Filter term: ", filterTermA);
      tableContent.innerHTML = "";
      const sortedA = songsArray.filter((song) => {
        // sort by artist['id']
        return song.artist["id"] == filterTermA;
      });
      console.log("Sorted by artist: ", sortedA);
      //if sorted is not empty, display the filtered table
      if (sortedA) {
        // displayTable(sorted);
        getTableContent(sortedA);
        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
    // filter by genre
    if (filterG.checked) {
      const filterTermG = document.getElementById("genre").value;
      // console.log("the genre value is: ", filterTermG);
      // console.log("the songsArray is: ", songsArray);
      // get genre name from genres by id
      const genreName = genres.find((genre) => genre.id == filterTermG);
      // console.log("the genre name is: ", genreName["name"]);
      tableContent.innerHTML = "";
      const sortedG = songsArray.filter((song) => {
        return song.genre == genreName["name"];
      });
      // console.log("Sorted by Genre: ", sortedG);
      //if sorted is not empty, display the filtered table
      if (sortedG) {
        // displayTable(sorted);
        getTableContent(sortedG);
        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
  });
};
filterForm();

// showSongDetails function
const showSongDetails = function (song) {
  // hide table header
  const tableHeader = document.getElementById("headerRow");
  // show close view
  const closeView = document.getElementById("closeView");
  closeView.style.display = "block";
  tableHeader.style.display = "none";
  console.log("Song passed: ", songsData);
  const raw_sondid = song.songID;
  const newSong = songsData.find((song) => song.song_id === raw_sondid);
  // console.log("New song: ", newSong);
  // console.log("Raw songid: ", raw_sondid);
  tableContent.innerHTML = "";
  // convert duration to minutes and seconds
  const duration = newSong.details.duration;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationString = `${minutes}:${seconds}`;
  // anychart data table
  var data = [
    { x: "Danceability", value: newSong.analytics.danceability },
    { x: "energy", value: newSong.analytics.energy },
    { x: "Speechiness", value: newSong.analytics.speechiness },
    { x: "Acousticness", value: newSong.analytics.acousticness },
    { x: "Liveness", value: newSong.analytics.liveness },
    { x: "Valence", value: newSong.analytics.valence },
  ];

  // create radar chart
  var chart = anychart.radar();
  // set chart yScale settings
  chart.yScale().minimum(-15).maximum(100).ticks({ interval: 5 });

  // create first series
  chart.line(data);

  // set chart title
  chart.title("Radar Chart");

  tableContent.innerHTML = `
  <div class="songDetails">
            <div class="song-info">
                <h3>Song information</h3>
                <h4 id="songTitle">Song Title: ${song.title}</h4>
                <h5 id="songArtist">Artist: ${song.artist.name}</h5>
                <h5 id="songGenre">Genre: ${song.genre.name}</h5>
                <h5 id="songYear">Year: ${song.year}</h5>
                <h5 id="songDuration">Duration: ${durationString} Minutes</h5>
                
                <h4>Analysis data</h4>
                <h5 id="bpm">pm: </h5>
                <h5 id="songEnergy">Energy: </h5>
                <h5 id="songLoudness">Loudness: </h5>
                <h5 id="songDanceability">Danceability: </h5>
                <h5 id="songLiveness">Liveness: </h5>
                <h5 id="songValence">Valence: </h5>
                <h5 id="songAcousticness">Acousticness: </h5>
                <h5 id="songSpeechiness">Speechiness: </h5>
                <h5 id="songPopularity">Popularity</h5>
            </div>
            
            <div class="song-radar">
                <h2>Radar chart</h2>
                <div class="chart" id="chart">
                   
                </div>
            </div>
        </div>
  `;
  // set container id for the chart
  chart.container("chart");
  // initiate chart drawing
  chart.draw();
};

// onclick of first td of each row, display song details
const displaySongDetails = function () {
  const tableRow = document.querySelectorAll("tr");
  tableRow.forEach((row, index) => {
    // skip the first row
    if (index > 0) {
      // add to first td of each row
      const firstTd = row.firstElementChild;
      firstTd.addEventListener("click", (event) => {
        // get the song id from tr songId attribute console.log("Song: ", songsArray);
        const songId = row.getAttribute("songId");
        console.log("Song id preview: ", songId);
        // get the song from the songsArray
        const song = songsArray.find((song) => {
          return song.songID == songId;
        });

        console.log("Song is: ", song);
        // call showSongDetails function
        showSongDetails(song);
      });
    }
  });
};

// add to playlist function
const addToPlaylist = function (song) {
  console.log("Song passed: ", song);
  // get local storage playlist
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  // check if song is already in playlist array
  const songInPlaylist = playlist.find((playlistSong) => {
    return playlistSong.song_id == song.song_id;
  });
  // if song is not in playlist array, add it
  if (!songInPlaylist) {
    playlist.push(song);
    // update local storage
    localStorage.setItem("playlist", JSON.stringify(playlist));
    // console.log("Playlist: ", playlist);
    // show success message and hide after 2 seconds
    const successMessage = document.getElementById("successMessage");
    // change message to Song Added to Playlist
    successMessage.innerHTML = "Song Added to Playlist";
    successMessage.style.display = "block";
    setTimeout(() => {
      // hide success message
      successMessage.style.display = "none";
    }, 2000);
    // if song is already in playlist array, display message
  } else {
    alert("Song is already in playlist");
  }
};
// onclick of add to playlist button on each row, add song to playlist
const addSongToPlaylist = function () {
  const addToPlaylistBtn = document.querySelectorAll(".add-to-playlist");
  addToPlaylistBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const songId = btn.getAttribute("songid");
      // console.log("Song id: ", songId);
      // console.log("Songs data: ", songsData);
      const song = songsData.find((song) => {
        return song.song_id == songId;
      });
      // console.log("Song added to playlist: ", song);
      addToPlaylist(song);
    });
  });
};

// display playlist function
const displayPlaylist = function () {
  // show close view
  const closeView = document.getElementById("closeView");
  closeView.style.display = "block";

  tableContent.innerHTML = "";
  // get playlist from local storage
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  // console.log("Playlist: ", playlist);
  // if playlist is empty, display message
  if (playlist.length == 0) {
    tableContent.innerHTML = "Playlist is empty";
  } else {
    // check if clear playlist button is already in the DOM
    const clearPlaylistBtn = document.getElementsByClassName("clear-playlist");
    // if clear playlist button is not in the DOM, add it
    if (clearPlaylistBtn.length == 0) {
      // add clear playlist button
      const clearPlaylistBtn = document.createElement("button");
      clearPlaylistBtn.innerHTML = "Clear Playlist";
      clearPlaylistBtn.classList.add("clear-playlist");
      // add red color to button
      clearPlaylistBtn.style.backgroundColor = "red";
      // add white color to text
      clearPlaylistBtn.style.color = "white";
      clearPlaylistBtn.classList.add("custom-btn");
      clearPlaylistBtn.addEventListener("click", () => {
        // clear local storage
        localStorage.removeItem("playlist");
        // reload page
        location.reload();
      });
      // append to .nav
      const nav = document.querySelector(".nav");
      nav.appendChild(clearPlaylistBtn);
    }
    // playlist summary
    // get number of songs in playlist
    const numberOfSongs = playlist.length;
    console.log("Number of songs: ", numberOfSongs);
    // average popularity
    const averagePopularityRaw = playlist.reduce((total, song) => {
      return total + song.details.popularity;
    }, 0);
    const averagePopularity = Math.round(averagePopularityRaw / numberOfSongs);
    console.log("Average popularity: ", averagePopularity);
    // make .playlistSummary div visible
    const playlistSummary = document.querySelector(".playlistSummary");
    playlistSummary.style.display = "block";
    // append no of songs to #playSongs
    const playSongs = document.getElementById("playSongs");
    playSongs.innerHTML = numberOfSongs;
    // append average popularity to #playPopularity
    const playPopularity = document.getElementById("playPopularity");
    playPopularity.innerHTML = averagePopularity;

    // if playlist is not empty, display table
    getTableContentPlaylist(playlist);
    // removeFromPlaylist();
  }
};

// onclick of playlist button, display playlist
const playlistBtn = document.getElementById("playlist");
playlistBtn.addEventListener("click", () => {
  displayPlaylist();
});

const getTableContentPlaylist = (data) => {
  // change table header add to playlist to remove from playlist
  const tableHeader = document.getElementById("add");
  tableHeader.innerHTML = `Remove from playlist`;
  const pData = [];
  // loop through the data and create a new array of data with title, artist, year, genre, popularity
  data.map((item) => {
    // const song_id = item.song_id;
    const obj = {
      title: item.title,
      artist: item.artist.name,
      year: item.year,
      genre: item.genre.name,
      popularity: item.details.popularity,
      // song_id: item.song_id,
    };
    pData.push(obj);
  });
  // return pData;
  pData.map((obj) => {
    const row = createRowPlaylist(obj);
    tableContent.appendChild(row);
    // console.log(obj);
  });
  addPop();
  color();
  alternateRowColors();
  displaySongDetails();
};
const createRowPlaylist = (obj) => {
  const row = document.createElement("tr");
  const objKeys = Object.keys(obj);
  objKeys.map((key) => {
    const cell = document.createElement("td");
    cell.setAttribute("data-attr", key);
    cell.innerHTML = obj[key];
    cell.addEventListener("click", (e) => {
      console.log(e.target);
    });
    cell.style.cursor = "pointer";
    row.appendChild(cell);
  });
  // get the song id
  const song_id = songsArray.find((song) => {
    return song.title === obj.title;
  });
  // add button to the end of the row
  const playlistButton = document.createElement("button");
  //add data inside of td
  playlistButton.textContent = "Remove";
  // add add-to-playlist class to button
  playlistButton.classList.add("remove-from-playlist");
  // add song id to button
  playlistButton.setAttribute("songid", song_id.songID);
  //add button to the end of the row
  row.appendChild(playlistButton);
  row.setAttribute("songid", song_id.songID);
  // add click event to button
  playlistButton.addEventListener("click", () => {
    removeFromPlaylist(song_id);
  });
  return row;
};

// onclick of remove from playlist button on each row, remove song from playlist
const removeFromPlaylistListenner = function () {
  const removeFromPlaylistBtn = document.querySelectorAll(
    ".remove-from-playlist"
  );
  removeFromPlaylistBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const songId = btn.getAttribute("songid");
      /* console.log("Song id: ", songId);
      console.log("Songs data: ", songsData); */
      const song = songsData.find((song) => {
        return song.song_id == songId;
      });
      console.log("Song removed from playlist: ", song);
      removeFromPlaylist(song);
    });
  });
};

// remove from playlist function
const removeFromPlaylist = function (song) {
  // console.log("Song passed: ", song);
  // get local storage playlist
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  // console.log("Playlist: ", playlist);
  // check if song is already in playlist array
  const songInPlaylist = playlist.find((playlistSong) => {
    return playlistSong.song_id == song.songID;
  });
  // console.log("Song in playlist: ", playlist);
  // if song is not in playlist array, display message
  if (!songInPlaylist) {
    alert("Song is not in playlist");
    // if song is already in playlist array, remove it
  } else {
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].song_id == song.songID) {
        playlist.splice(i, 1);
        // update local storage
        localStorage.setItem("playlist", JSON.stringify(playlist));
      }
    }
    // show success message and hide after 2 seconds
    const successMessage = document.getElementById("successMessage");
    // change message to song removed from playlist
    successMessage.innerHTML = "Song removed from playlist";
    successMessage.style.display = "block";
    setTimeout(() => {
      // hide success message
      successMessage.style.display = "none";
    }, 2000);
  }

  // display playlist
  displayPlaylist();
};

// document ready
document.addEventListener("DOMContentLoaded", () => {
  // add pop to the table
  addPop();
  // color the table
  color();
  // add alternating colors to the table
  alternateRowColors();
  // add onclick to each row
  displaySongDetails();
  // add onclick to add to playlist button
  addSongToPlaylist();
  // add onclick to remove from playlist button
  removeFromPlaylistListenner();

  // on hover of .crdtshw show .cont for 5sec
  const creditShow = document.querySelector(".crdtshw");
  const creditContent = document.querySelector(".cont");
  creditShow.addEventListener("mouseover", () => {
    creditContent.style.display = "block";
    setTimeout(() => {
      creditContent.style.display = "none";
    }, 5000);
  });
  // closeView on click
  const closeView = document.getElementById("closeView");
  closeView.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

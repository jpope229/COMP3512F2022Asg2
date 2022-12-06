/* url of song api --- https versions hopefully a little later this semester */
const api =
  "http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
// define async function
async function getapi(api) {
  const genreList1 = [];
  const artistList1 = [];
  const songData1 = [];
  // store response
  const response = await fetch(api);
  // store data in json format
  const data = await response.json();
  // console.log(data);
  const songtp = JSON.stringify(data);
  // console.log(songtp);
  // loop through genres from songtp and store in genres
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
  return [ genreList1, artistList1, songData1 ];
}


// export default getapi;
export { getapi, api };
    

//You can edit ALL of the code here

function setup() {
  controlTools()
  let allShows = getAllShows();
  sortOn(allShows, "name");
  addShows(allShows);

  fetchEpisodes(allShows[0].id)
}

function fetchEpisodes(showId){
  searchText.placeholder = "search...";
  selectEpisode.innerHTML = `<option>All Episodes</option>`;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
  .then(response => response.json())
  .then(allEpisodes =>{
    makePageForEpisodes(allEpisodes);
    searchEpisode(allEpisodes);
    addSelectForEpisodes(allEpisodes);
  })
  .catch(error => console.log(error));  
}

const rootElem = document.getElementById("root");

let searchDiv = document.createElement("div");
let episodeDiv = document.createElement("div");

searchDiv.className = "searchDiv row";
episodeDiv.className = "episodeDiv row";

let selectEpisode = document.createElement("select");
let selectShow = document.createElement("select");
let searchText = document.createElement("input");
let searchState = document.createElement("label");

selectShow.innerHTML = `<option>All shows</option>`;
selectEpisode.innerHTML = `<option>All Episodes</option>`;
searchText.placeholder = "search...";

searchText.type = "text";

selectShow.className = "select xl-col-2 lg-col-2 md-col-3 sm-col-4 col-10"
selectEpisode.className = "select xl-col-2 lg-col-2 md-col-3 sm-col-4 col-10";
searchText.className = "searchInText xl-col-2 lg-col-2 md-col-3 sm-col-3 col-10";
searchState.className = "searchState xl-col-4 lg-col-5 md-col-6 sm-col-7 col-12";

function controlTools(){//Append the control tools to show on the root div.
rootElem.appendChild(searchDiv);
rootElem.appendChild(episodeDiv);

searchDiv.appendChild(selectShow);
searchDiv.appendChild(selectEpisode);
searchDiv.appendChild(searchText);
searchDiv.appendChild(searchState);
}

function sortOn (shows, name) {//Alphabeticaly and case insensitive sort the shows by name. 
  shows.sort (function (a, b){ 
    return a[name].localeCompare(b[name]);
  });
  return shows;
}

function addShows(showList){//Add the names and ids of the shows from show list to select show.

  showList.forEach(show => {
    selectShow.innerHTML += `<option value="${show.id}">${show.name}</option>`
  })
  
  selectShow.addEventListener('change', changeEvent => fetchEpisodes(changeEvent.target.value));
}

function headerData(episodeObj){//this function colects the data for header of episodes.
  let seasonNum = episodeObj.season;
  let episodeNum = episodeObj.number;
  (seasonNum < 10) ? seasonNum = "0" + seasonNum : {};
  (episodeNum < 10) ? episodeNum = "0" + episodeNum : {};
  return `${episodeObj.name} - S${seasonNum}E${episodeNum}`
}

function makePageForEpisodes(episodeList) {
  episodeDiv.innerHTML = "";
  
   episodeList.forEach(episode => {//Iterate through the array of episode.
    let summaryText = episode.summary.replace(/<p>/g, " ");//remove the '<p>' from the summary.
    let pEl = summaryText.replace(/<\/p>/g, " ");//remove the '</p>' from the summary.

    //Create the elements by innerHTML and add to episodeDiv div.
    episodeDiv.innerHTML += `
    <div class="exDiv  sm-col-12 md-col-6 lg-col-4 xl-col-3">
      <div class="divElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">
      <h2 class="h2ElStyle col-12 sm-col-12 md-col-12 lg-col-12 xl-col-12">${headerData(episode)}</h2>
      <img src=${episode.image.medium} class=col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11 img>
      <p class="pElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">${pEl}</p>
      </div>
    </div>`;
  })
}

function searchEpisode(episodeList){// This function will create search part.
  searchState.innerHTML = `Displaying ${episodeList.length}episodes`;
  searchText.addEventListener('input',()=>{// This function will comare search text with episodes summary and name
    const filteredEpisodeList = episodeList.filter(episode => {
      let lowerSummary = episode.summary.toLowerCase();
      let lowerHeader = headerData(episode).toLowerCase();
      let lowerSearch = searchText.value.toLowerCase();
      if(lowerSummary.indexOf(lowerSearch)>-1 || lowerHeader.indexOf(lowerSearch) > -1){
        return true;
      } else{
        return false;
      }
    })
    searchState.innerHTML = `Displaying ${filteredEpisodeList.length}/${episodeList.length} episodes`;
    makePageForEpisodes(filteredEpisodeList);
    selectEpisode.value = "All Episodes";
  });
}

let allHeaders = [];
let selectEpisodeToShow =[];

function addSelectForEpisodes(episodeList){
  addSelectElement(episodeList);
  selectEpisode.addEventListener('change', ()=>{//show the selected episode .
    searchText.value= "";
    searchText.placeholder = "search...";
    selectEpisodeToShow = episodeList.filter(ep =>(selectEpisode.value.indexOf(ep.name) > -1) ? true : false);
    makePageForEpisodes(selectEpisodeToShow);
    searchState.innerHTML = `Displaying ${selectEpisodeToShow.length}/${episodeList.length} episodes`;
    if (selectEpisode.value == "All Episodes"){
      makePageForEpisodes(episodeList);
      searchState.innerHTML = `Displaying ${episodeList.length}/${episodeList.length} episodes`;
     } 
     
  });
}

function addSelectElement(episodeList){
  // selectEpisode.innerHTML = "";
  selectEpisode.innerHTML = `<option>All Episodes</option>`;
  episodeList.forEach(episode => {//this loop will show the episodes title on select input.
    selectEpisode.innerHTML += `<option>${headerData(episode)}</option>`;
    allHeaders.push(headerData(episode));
  });
}

window.onload = setup;
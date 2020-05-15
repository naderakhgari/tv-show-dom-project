const rootElem = document.getElementById("root");
const searchDiv = document.createElement("div");
const episodeDiv = document.createElement("div");

searchDiv.className = "searchDiv row";
episodeDiv.className = "episodeDiv row";

const selectEpisode = document.createElement("select");
const selectShow = document.createElement("select");
const searchText = document.createElement("input");
const searchState = document.createElement("label");

selectShow.innerHTML = `<option>All shows</option>`;
selectEpisode.innerHTML = `<option>All Episodes</option>`;
searchText.placeholder = "search...";

searchText.type = "text";

selectShow.className = "select xl-col-2 lg-col-2 md-col-3 sm-col-4 col-10";
selectEpisode.className = "select xl-col-2 lg-col-2 md-col-3 sm-col-4 col-10";
searchText.className =
  "searchInText xl-col-2 lg-col-2 md-col-3 sm-col-3 col-10";
searchState.className =
  "searchState xl-col-4 lg-col-5 md-col-6 sm-col-7 col-12";

rootElem.appendChild(searchDiv);
rootElem.appendChild(episodeDiv);

searchDiv.appendChild(selectShow);
searchDiv.appendChild(selectEpisode);
searchDiv.appendChild(searchText);
searchDiv.appendChild(searchState);
selectEpisode.style.display = "none";
searchState.style.display = "none";

function setup() {
  let allShows = getAllShows();
  console.log(allShows);
  sortOn(allShows, "name");
  makePageForShows(allShows);
  addShow(allShows);
  searchShows(allShows);
}

function sortOn(shows, name) {
  //Alphabeticaly and case insensitive sort the shows by name.
  shows.sort(function (a, b) {
    return a[name].localeCompare(b[name]);
  });
  return shows;
}

function makePageForShows(showList) {
  episodeDiv.innerHTML = "";
  showList.forEach((show) => {
    //Iterate through the array of episode.
    let summaryText = show.summary.replace(/<p>/g, " "); //remove the '<p>' from the summary.
    let pEl = summaryText.replace(/<\/p>/g, " "); //remove the '</p>' from the summary.

    //Create the elements by innerHTML and add to episodeDiv div.
    episodeDiv.innerHTML += `
    <div class="exDiv col-12 sm-col-12 md-col-12 lg-col-12 xl-col-12">
      <div class="divElStyle2 col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">
        <h2 class="h2ElStyle col-12" onclick="fetchEpisodes(${show.id})" id=${show.id}>${show.name}</h2>
        <div class="detailsShow col-12 sm-col-12 md-col-12 lg-col-12 xl-col-12">
          <div>
            <p class="zoomText">Genres: ${show.genres}</p>
            <p>Status: ${show.status}</p>
            <p>Rating: ${show.rating.average}</p>
            <p>Runtime: ${show.runtime}</p>
            <p>Language: ${show.language}</p>
          </div>
          <img src=${show.image.medium}  img>
        </div>
        <p class="pElStyle col-11">${pEl}</p>
      </div>
    </div>`;
  });
}

function searchShows(allShow) {
  searchText.addEventListener("input", () => {
    let addSearchedShows = allShow.filter((show) =>
      show.name.indexOf(searchText.value) > -1 ||
      show.summary.indexOf(searchText.value) > -1 ? true : false);
    addShow(addSearchedShows);
    makePageForShows(addSearchedShows);
  });
}

function addShow(showList) {
  //Add the names and ids of the shows from show list to select show.
  selectShow.innerHTML = `<option>All shows</option>`;
  showList.forEach((show) => {
    selectShow.innerHTML += `<option value="${show.id}">${show.name}</option>`;
  });
  selectShow.addEventListener("change", (changeEvent) =>
    fetchEpisodes(changeEvent.target.value)
  );
}

function fetchEpisodes(showId) {
  selectEpisode.style.display = "block";
  searchState.style.display = "block";
  searchText.placeholder = "search...";
  selectEpisode.innerHTML = `<option>All Episodes</option>`;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => response.json())
    .then((allEpisodes) => {
      makePageForEpisodes(allEpisodes);
      searchEpisode(allEpisodes);
      addSelectForEpisodes(allEpisodes);
    })
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  episodeDiv.innerHTML = "";

  episodeList.forEach((episode) => {
    //Iterate through the array of episode.
    let summaryText = episode.summary.replace(/<p>/g, " "); //remove the '<p>' from the summary.
    let pEl = summaryText.replace(/<\/p>/g, " "); //remove the '</p>' from the summary.

    //Create the elements by innerHTML and add to episodeDiv div.
    episodeDiv.innerHTML += `
    <div class="exDiv col-12 sm-col-12 md-col-6 lg-col-4 xl-col-3">
      <div class="divElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">
      <h2 class="h2ElStyle col-12 sm-col-12 md-col-12 lg-col-12 xl-col-12">${headerData(
        episode
      )}</h2>
      <img src=${
        episode.image.medium
      } class=col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11 img>
      <p class="pElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">${pEl}</p>
      </div>
    </div>`;
  });
}

function headerData(episodeObj) {//this function colects the data for header of episodes.
  let seasonNum = episodeObj.season;
  let episodeNum = episodeObj.number;
  seasonNum < 10 ? (seasonNum = "0" + seasonNum) : {};
  episodeNum < 10 ? (episodeNum = "0" + episodeNum) : {};
  return `${episodeObj.name} - S${seasonNum}E${episodeNum}`;
}

function searchEpisode(episodeList) {// This function will create search part.
  searchState.innerHTML = `Displaying ${episodeList.length}episodes`;
  searchText.addEventListener("input", () => {// This function will comare search text with episodes summary and name
    const filteredEpisodeList = episodeList.filter((episode) => {
      let lowerSummary = episode.summary.toLowerCase();
      let lowerHeader = headerData(episode).toLowerCase();
      let lowerSearch = searchText.value.toLowerCase();
      if (
        lowerSummary.indexOf(lowerSearch) > -1 ||
        lowerHeader.indexOf(lowerSearch) > -1
      ) {
        return true;
      } else {
        return false;
      }
    });
    searchState.innerHTML = `Displaying ${filteredEpisodeList.length}/${episodeList.length} episodes`;
    makePageForEpisodes(filteredEpisodeList);
    selectEpisode.value = "All Episodes";
  });
}

function addSelectForEpisodes(episodeList) {
  let selectEpisodeToShow = [];
  addEpisodesToSelect(episodeList);
  selectEpisode.addEventListener("change", () => {//show the selected episode .
    searchText.value = "";
    selectEpisodeToShow = episodeList.filter((episode) =>
      selectEpisode.value.indexOf(episode.name) > -1 ? true : false
    );
    makePageForEpisodes(selectEpisodeToShow);
    searchState.innerHTML = `Displaying ${selectEpisodeToShow.length}/${episodeList.length} episodes`;
    if (selectEpisode.value == "All Episodes") {
      makePageForEpisodes(episodeList);
      searchState.innerHTML = `Displaying ${episodeList.length}/${episodeList.length} episodes`;
    }
  });
}

function addEpisodesToSelect(episodeList) {
  selectEpisode.innerHTML = `<option>All Episodes</option>`;
  episodeList.forEach((episode) => {//this loop will show the episodes title on select input.
    selectEpisode.innerHTML += `<option>${headerData(episode)}</option>`;
  });
}

window.onload = setup;

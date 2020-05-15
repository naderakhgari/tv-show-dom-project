//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

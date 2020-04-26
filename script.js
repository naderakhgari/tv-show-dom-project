//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisode(allEpisodes);
  addSelectForEpisodes(allEpisodes);


}

const rootElem = document.getElementById("root");

let searchDiv = document.createElement("div");
let episodeDiv = document.createElement("div");

searchDiv.className = "searchDiv row";
episodeDiv.className = "episodeDiv row";

let selectEl = document.createElement("select");
let searchText = document.createElement("input");
let searchState = document.createElement("label");

selectEl.innerHTML = `<option>All Episodes</option>`;
searchText.placeholder = "search..";
searchState.innerHTML = 'Displaying episodes';

searchText.type = "text";

selectEl.className = "selectEl xl-col-2 lg-col-2 md-col-3 sm-col-6 ";
searchText.className = "searchInText xl-col-2 lg-col-2 md-col-3 sm-col-6";
searchState.className = "searchState xl-col-4 lg-col-4 md-col-4 sm-col-12";
// document.body.className = "container col-12"

rootElem.appendChild(searchDiv);
rootElem.appendChild(episodeDiv);

searchDiv.appendChild(selectEl);
searchDiv.appendChild(searchText);
searchDiv.appendChild(searchState);

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
    <div class= " exDiv  sm-col-12 md-col-6 lg-col-4 xl-col-3">
      <div class = "divElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">
      <h2 class = "h2ElStyle col-12 sm-col-12 md-col-12 lg-col-12 xl-col-12">${headerData(episode)}</h2>
      <img src = ${episode.image.medium} >
      <p class = "pElStyle col-11 sm-col-11 md-col-11 lg-col-11 xl-col-11">${pEl}</p>
      </div>
    </div>`;
  })
}

function searchEpisode(episodeList){// This function will create search part.
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
  });
}

let allHeaders = [];
let selectEpisodeToShow =[];

function addSelectForEpisodes(episodeList){
  episodeList.forEach(episode => {//this loop will show the episodes title on select input.
    selectEl.innerHTML += `<option>${headerData(episode)}</option>`;
    allHeaders.push(headerData(episode));
  });

  selectEl.addEventListener('change', ()=>{//show the selected episode .
    selectEpisodeToShow = episodeList.filter(ep => (selectEl.value.indexOf(ep.name) > -1) ? true : false);
    makePageForEpisodes(selectEpisodeToShow);
    searchState.innerHTML = `Displaying ${selectEpisodeToShow.length}/${episodeList.length} episodes`;
  });
}

window.onload = setup;




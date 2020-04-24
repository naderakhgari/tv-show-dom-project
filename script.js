//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisode(allEpisodes);
}

function headerData(episodeObj){//this function colects the data for header of episodes.
  let seasonNum = episodeObj.season;
  let episodeNum = episodeObj.number;
  (seasonNum < 10) ? seasonNum = "0" + seasonNum : {};
  (episodeNum < 10) ? episodeNum = "0" + episodeNum : {};
  return `${episodeObj.name} - S${seasonNum}E${episodeNum}`
}

const rootElem = document.getElementById("root");
let searchRoot = document.createElement("div");
let episodeRoot = document.createElement("div");

rootElem.className = "mainDiv";
searchRoot.className = "searchRoot";
episodeRoot.className = "episodeRoot";

rootElem.appendChild(searchRoot);
rootElem.appendChild(episodeRoot);

function makePageForEpisodes(episodeList) {
  episodeRoot.innerHTML = "";
  
   episodeList.forEach(episode => {//Iterate through the array of episode.
    let summaryText = episode.summary.replace(/<p>/g, " ");//remove the '<p>' from the summary.
    let pEl = summaryText.replace(/<\/p>/g, " ");//remove the '</p>' from the summary.

    //Create the elements by innerHTML and add to episodeRoot div.
    episodeRoot.innerHTML += `
    <div class= "divElStyle">
      <h2 class = "h2ElStyle ">${headerData(episode)}</h2>
      <img src = ${episode.image.medium}>
      <p class = "pElStyle">${pEl}</p>
    </div>`;
  })
}

function searchEpisode(episodeList){// This function will create search part.
  let searchDiv = document.createElement("div");
  let searchText = document.createElement("input");
  let searchState = document.createElement("label");
  searchState.innerHTML = `Display ${episodeList.length}/${episodeList.length} episodes`;

  searchText.type = "text";
  searchText.className = "searchInText";
  searchState.className = "searchState";
  searchDiv.className = "searchDiv";

  searchRoot.appendChild(searchDiv);
  searchDiv.appendChild(searchText);
  searchDiv.appendChild(searchState);

  function myFunction(){// This function will comare search text with episodes summary and name
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
    searchState.innerHTML = `Display ${filteredEpisodeList.length}/${episodeList.length} episodes`;
    makePageForEpisodes(filteredEpisodeList);
  };
  searchText.addEventListener('input',myFunction);
}

window.onload = setup;




//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function headerData(episodeObj){//this function colects the data for header of episodes.
  let seasonNum = episodeObj.season;
  let episodeNum = episodeObj.number;
  (seasonNum < 10) ? seasonNum = "0" + seasonNum : {};
  (episodeNum < 10) ? episodeNum = "0" + episodeNum : {};
  return `${episodeObj.name} - S${seasonNum}E${episodeNum}`
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach(episode => {//Iterate through the array of episode.

    let summaryText = episode.summary.replace(/<p>/g, " ");//remove the '<p>' from the summary.
    let pEl = summaryText.replace(/<\/p>/g, " ");//remove the '</p>' from the summary.

    //Create the elements by innerHTML and add to root div.
    rootElem.innerHTML += `
    <div class= "divElStyle">
      <h2 class = "h2ElStyle ">${headerData(episode)}</h2>
      <img src = ${episode.image.medium}>
      <p class = "pElStyle">${pEl}</p>
    </div>`;
  })
}


window.onload = setup;


//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  
  
  episodeList.forEach(episode => {
    let divEl = document.createElement("div");

    rootElem.appendChild(divEl);
let h2El = document.createElement("h2");
divEl.appendChild(h2El);
let seasonNum = episode.season;
let episodeNum = episode.number;
(seasonNum < 10) ? seasonNum = "0" + seasonNum : {};
(episodeNum < 10) ? episodeNum = "0" + episodeNum : {};

    h2El.innerHTML = `S${seasonNum}${episodeNum}`;
    h2El.style.border = "solid 0.2px";
    h2El.style.borderRadius = "5%";
    let imgEl = document.createElement("img");
    divEl.appendChild(imgEl);
    imgEl.src = episode.image.medium;
    let pEl = document.createElement("p");
    pEl.className = "pElStyle";
    divEl.appendChild(pEl);

    pEl.innerHTML = episode.summary;
    divEl.className = "divElStyle"
    
  })
  
}

window.onload = setup;


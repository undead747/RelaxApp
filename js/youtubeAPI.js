const CLIENT_ID =
  "268329419192-p70grknrkdg4qpu7pt6ntkgg39dplq5m.apps.googleusercontent.com";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
];
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";
const defaultChannel = "UCvTBgMxqJrNRXvC7XylzfHg";
const channelButton = document.querySelector(".youtube-content .title button");
const channelContent = document.querySelector(".youtube-content .content");

// Load auth2 library
handleClientLoad = () => {
  gapi.load("client:auth2", initClient);
};

initClient = () => {
  gapi.client
    .init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    })
    .then(() => {
      getPlaylist(defaultChannel);
    });
};

// get youtube playlist
getPlaylist = channel => {
  gapi.client.youtube.playlists
    .list({
      part: "snippet",
      channelId: channel,
      maxResults: 20
    })
    .then(response => {
      playlists = response.result.items;
      channelButton.innerText = playlists[0].snippet.channelTitle;
      channelButton.addEventListener("click", () => {
        window.open(
          `https://www.youtube.com/channel/${playlists[0].snippet.channelId}`,
          "_blank"
        );
        win.focus();
      });
      printPlaylist(playlists);
    });
};

printPlaylist = playlists => {
  console.log(playlists);
  let content = "";
  playlists.forEach(element => {
    playlist = element.snippet.localized;
    content += `
       <div class="grid-item"
       style = "background-image: url(${element.snippet.thumbnails.medium.url});" >
       ${playlist.title}
       </div>
       `;
  });

  channelContent.innerHTML = content;
};

const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),

    playPauseBtn = wrapper.querySelector(".play-pause"),
    playPauseIcon = playPauseBtn.querySelector('i'),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    reaptBtn = wrapper.querySelector("#repeat-plist"),
    moreMusicBtn = wrapper.querySelector("#more-music"),

    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    totalDuration = wrapper.querySelector('.max-duration'),
    currDuration = wrapper.querySelector('.current-time'),

    musicList = wrapper.querySelector(".music-list"),
    closeIcon = musicList.querySelector("#close"),
    mainAudio = document.createElement('audio');

// Global Variables
let trackIdx = 0,
    isPlaying = false;

// Functions
function loadTrack(trackIdx) {
    let currTrack = allMusic[trackIdx];

    mainAudio.src = `songs/${currTrack.src}.mp3`;
    mainAudio.load();

    musicImg.src = `images/${currTrack.img}.jpg`;
    musicName.textContent = currTrack.name;
    musicArtist.textContent = currTrack.artist;

    randomBg();
};
function trackDuration() {
    totalDuration.textContent = timeFormat(mainAudio.duration);
}

// TODO: Update progress bar width according to Update current
function updateTime() {
    currDuration.textContent = timeFormat(mainAudio.currentTime);
    let seekTo = (mainAudio.currentTime / mainAudio.duration) * 100;
    progressBar.style.width = `${seekTo}%`;
}

// TODO: Update current time according to progress bar width
function seekTo(e) {
    let seekTo = (e.offsetX / progressArea.clientWidth) * mainAudio.duration;
    mainAudio.currentTime = seekTo;
    currDuration.textContent = timeFormat(seekTo);

    progressBar.style.width = `${(e.offsetX / progressArea.clientWidth) * 100}%`;
    playTrack();
}
function timeFormat(sec) {
    let minutes = Math.floor(sec / 60),
        seconds = Math.floor(sec % 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
}

// TODO: play/pause functionality
function pausePlayTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    isPlaying = true;
    mainAudio.play();
    playPauseIcon.textContent = "pause";
}
function pauseTrack() {
    isPlaying = false;
    mainAudio.pause();
    playPauseIcon.textContent = "play_arrow";
}

// TODO: what song should be played next/prev
function nextTrackHandler(e) {
    let targetIcon = e.target.innerText;
    let reapeatType = reaptBtn.innerText;

    // Handele different use cases
    switch (true) {
        case reapeatType == "shuffle":
            // play random track
            let randomIdx = Math.floor(Math.random() * allMusic.length);
            trackIdx = randomIdx;
            break;

        case reapeatType == "repeat" && targetIcon == "skip_next":
        case targetIcon == "skip_next":
            // play next track
            if (trackIdx >= allMusic.length - 1) {
                trackIdx = 0;
            } else {
                trackIdx++;
            }
            break;

        case targetIcon == "skip_previous":
            // play previous track
            if (trackIdx <= 0) {
                trackIdx = allMusic.length - 1;
            } else {
                trackIdx--;
            }
            break;

        case reapeatType == "repeat_one":
            // play current track again
            break;

        default:
            if (trackIdx >= allMusic.length - 1) {
                trackIdx = 0;
            } else {
                trackIdx++;
            }
            break;
    }
    loadTrack(trackIdx);
    playTrack();
}

// TODO: Let's work on repeat, suffling according to the icon
function reaptHandler() {
    const icon = reaptBtn.innerText;
    switch (icon) {
        // song looped - reapeat song
        case "repeat":
            reaptBtn.innerText = "repeat_one";
            reaptBtn.setAttribute("title", "Song looped");
            break;
        // playback shuffle - random track
        case "repeat_one":
            reaptBtn.innerText = "shuffle";
            reaptBtn.setAttribute("title", "Playback shuffle");
            break;
        // playlist looped 
        case "shuffle":
            reaptBtn.innerText = "repeat";
            reaptBtn.setAttribute("title", "Playlist looped");
            break;
    }
}

// TODO: Let's work on playlistS
function loadPlayList() {
    let list = musicList.querySelector('ul');
    allMusic.forEach((itm, idx) => list.innerHTML += `
    <li onclick="playSelected(this, ${idx})" class="${idx == trackIdx ? 'playing' : ''}">
        <div class="row">
            <span>${itm.name}</span>
            <p>${itm.artist}</p>
        </div>
        <audio src="songs/${itm.src}.mp3"></audio>
    </li>`);
}
loadPlayList();

function playSelected(selected, idx) {
    // remove "playing" class from all traks and then add it to the selected track
    const alltracks = musicList.querySelectorAll('li');
    alltracks.forEach(track => track.classList.remove('playing'));
    selected.classList.add('playing');

    trackIdx = idx;
    loadTrack(idx);
    playTrack();
}
// Get the duration for every song in playlist
function getDuration() {
    const audioTags = musicList.querySelectorAll('audio');

    audioTags.forEach((audio, idx) => audio.addEventListener('loadedmetadata', () => {
        const durationSpan = document.createElement('span');
        const parentNode = audio.parentElement;

        durationSpan.textContent = `${idx == trackIdx ? 'playing' : timeFormat(audio.duration)}`;
        parentNode.appendChild(durationSpan);
    }));
}
getDuration();

// Todo: Generate random gradient background
function randomColor() {
    const factor = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
    ];
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const randomIdx = Math.floor(Math.random() * factor.length);
        color += factor[randomIdx];
    }
    return color;
}
function randomBg() {
    const color1 = randomColor(),
        color2 = randomColor();

    document.body.style.background = `linear-gradient(to right, ${color1},${color2})`;
}

// Events
document.addEventListener('load', loadTrack(trackIdx));
mainAudio.addEventListener('loadedmetadata', trackDuration);
mainAudio.addEventListener('timeupdate', updateTime);
progressArea.addEventListener('click', (e) => seekTo(e));
mainAudio.addEventListener('ended', (e) => nextTrackHandler(e));

playPauseBtn.addEventListener('click', pausePlayTrack);
prevBtn.addEventListener('click', (e) => nextTrackHandler(e));
nextBtn.addEventListener('click', (e) => nextTrackHandler(e));
reaptBtn.addEventListener('click', reaptHandler);

moreMusicBtn.addEventListener('click', () => musicList.classList.add('show'));
closeIcon.addEventListener('click', () => musicList.classList.remove('show'));

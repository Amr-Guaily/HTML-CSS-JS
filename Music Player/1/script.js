// Music List
const music_list = [
  {
    img: 'images/stay.png',
    name: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    music: 'music/stay.mp3',
  },
  {
    img: 'images/fallingdown.jpg',
    name: 'Falling Down',
    artist: 'Wid Cards',
    music: 'music/fallingdown.mp3',
  },
  {
    img: 'images/faded.png',
    name: 'Faded',
    artist: 'Alan Walker',
    music: 'music/Faded.mp3',
  },
  {
    img: 'images/ratherbe.jpg',
    name: 'Rather Be',
    artist: 'Clean Bandit',
    music: 'music/Rather Be.mp3',
  },
];

// Selectors
const nowPlaying = document.querySelector('.now-playing'),
  trackName = document.querySelector('.track-name'),
  trackArt = document.querySelector('.track-art'),
  trackArtist = document.querySelector('.track-artist'),
  wave = document.getElementById('wave');

const currTime = document.querySelector('.current-time'),
  totalDuration = document.querySelector('.total-duration'),
  seekSlider = document.querySelector('.seek_slider'),
  volumeSlider = document.querySelector('.volume_slider'),
  audio = document.createElement('audio');

const playPauseBtn = document.querySelector('.playpause-track'),
  nextTrackBtn = document.querySelector('.next-track'),
  prevTrackBtn = document.querySelector('.prev-track');

// Global Variables
let trackIdx = 0,
  isPlaying = false,
  timer;

// Functions
function loadTrack(idx) {
  reset();
  let currTrack = music_list[idx];

  audio.src = currTrack.music;
  audio.load();

  nowPlaying.textContent = `Playing Music ${trackIdx + 1} of ${music_list.length
    }`;
  trackArt.src = currTrack.img;
  trackName.textContent = currTrack.name;
  trackArtist.textContent = currTrack.artist;

  //! I need to wait at least 100ms to get time duration
  setTimeout(
    () => (totalDuration.textContent = timeFormat(audio.duration)),
    100
  );
  randomBg();
}
function reset() {
  currTime.textContent = '00:00';
  totalDuration.textContent = '00:00';
  seekSlider.value = 0;
}

function playPauseTrack() {
  clearInterval(timer);
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  timer = setInterval(updateTime, 1000);
  audio.play();
  isPlaying = true;
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
}
function pauseTrack() {
  audio.pause();
  isPlaying = false;
  trackArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
}
function updateTime() {
  currTime.textContent = timeFormat(audio.currentTime);
  let position = (audio.currentTime / audio.duration) * 100;
  seekSlider.value = position;
}

function nextTrack() {
  if (trackIdx < music_list.length - 1) {
    trackIdx++;
  } else {
    trackIdx = 0;
  }
  loadTrack(trackIdx);
  playTrack();
}
function prevTrack() {
  if (trackIdx <= 0) {
    trackIdx = music_list.length - 1;
  } else {
    trackIdx--;
  }
  loadTrack(trackIdx);
  playTrack();
}

function seekTo() {
  let seekTo = audio.duration * (seekSlider.value / 100);
  audio.currentTime = seekTo;
  currTime.textContent = timeFormat(audio.currentTime);
}
function setVolume() {
  audio.volume = volumeSlider.value / 100;
}
function timeFormat(sec) {
  let minutes = Math.floor(sec / 60),
    seconds = Math.floor(sec % 60);

  if (seconds < 10) seconds = `0${seconds}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${minutes}:${seconds}`;
}
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
document.addEventListener('DOMContentLoaded', loadTrack(trackIdx));
playPauseBtn.addEventListener('click', playPauseTrack);
nextTrackBtn.addEventListener('click', nextTrack);
prevTrackBtn.addEventListener('click', prevTrack);
seekSlider.addEventListener('change', seekTo);
volumeSlider.addEventListener('change', setVolume);
audio.addEventListener('ended', nextTrack);

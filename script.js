const playlist = [
    ["Aerie.mp3", "Aerie", "Lena Raine"],
    ["ComfortChain.mp3", "Comfort Chain", "Instupendo"],
    ["ComfortingMemories.mp3", "Comforting Memories", "Lena Raine"],
    ["CuriousLight.mp3", "Curious Light", "LSPLASH"],
    ["FarLands.mp3", "Far Lands (Minecraft Fan Music)", "Steelman"],
    ["ItsRainingSomewhereElse.mp3", "Its Raining Somewhere Else", "Toby Fox"]
    ["MiceOnVenus.mp3", "Mice on Venus", "C418"],
    ["Minecraft.mp3", "Minecraft", "C418"],
    ["SchoolRooftopFull.mp3", "School Rooftop", "Hisohkah, WMD"],
    ["SubwooferLullaby.mp3", "Subwoofer Lullaby", "C418"],
    ["Sweden.mp3", "Sweden", "C418"],
    ["WetHands.mp3", "Wet Hands", "C418"]
];
const nameEl = document.getElementById("musicName");
const artistEl = document.getElementById("musicArtist");
const playerEl = document.getElementById("player");
const volumeEl = document.getElementById("volumeSlider");
const pausePlayEl = document.getElementById("pausePlay");
const progressEl = document.getElementById("progressBar");

const timeEl = document.getElementById("timeIn");
const timeLeftEl = document.getElementById("timeLeft");
const durationEl = document.getElementById("duration");
let currentSong = Math.round(Math.random()*playlist.length);
let isChangingProg = false;

function secondsToMinutes(totalSeconds) {
    let secs = totalSeconds % 60;
    let mins = Math.floor(totalSeconds/60);
    if (secs.toString().length < 2) {
        return `${mins}:0${secs}`;
    } else {
        return `${mins}:${secs}`;
    }
}

function nextSong() {
    currentSong = (currentSong + 1 + playlist.length) % playlist.length; 
    changeSong(currentSong);
}
function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length; 
    changeSong(currentSong);
}
async function changeSong(i) {
    //1st playlist.length there to stop
    //negatives messing up the code
    //bc of prevSong()
    nameEl.textContent = playlist[i][1];
    artistEl.textContent = playlist[i][2];
    playerEl.src = `songs/${playlist[i][0]}`;
    try {
        //basically the audio wont load unless the page is clicked
        //so this means if it doesnt play on start
        //it wont be | | but ▶ to show it hasnt started
        await playerEl.play();
        pausePlayEl.textContent = "| |";
    } catch {
        pausePlayEl.textContent = "▶";
    }
}



playerEl.addEventListener("ended", nextSong);
volumeEl.addEventListener("input", function(e) {
    //e is event object
    playerEl.volume = e.currentTarget.value/100;
    //currentTarget is the slider
})
pausePlayEl.addEventListener("click", async function(e) {
    if (playerEl.paused) {
        pausePlayEl.textContent = "| |";
        await playerEl.play(); //cuz 
    } else {
        pausePlayEl.textContent = "▶";
        playerEl.pause();
    }
})
changeSong(currentSong);

progressEl.addEventListener("mousedown", function() {
    isChangingProg = true;
})
progressEl.addEventListener("change", function() {
    isChangingProg = false; 
    //since it only triggers once change stops happening
    let prog = progressEl.value / progressEl.max;
    playerEl.currentTime = playerEl.duration * prog;    
})
progressEl.addEventListener("mouseup", function() {
    isChangingProg = false;
})

playerEl.addEventListener("timeupdate", function() {
    if (playerEl.currentTime != "NaN") {
        timeEl.innerText = secondsToMinutes(Math.round(playerEl.currentTime));
        timeLeftEl.innerText = secondsToMinutes(Math.round(playerEl.duration - playerEl.currentTime));
        durationEl.innerText = secondsToMinutes(Math.round(playerEl.duration));
    }
    if (!isChangingProg) {
        let prog = playerEl.currentTime / playerEl.duration;
        progressEl.value = progressEl.max * prog;
    }
})

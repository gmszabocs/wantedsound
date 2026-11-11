'use strict';
(() => {
  const tracks = window.WANTED_PLAYLIST;
  if (!Array.isArray(tracks) || !tracks.length) return;
  const $ = id => document.getElementById(id);
  const audio = $('audio');
  const icons = {play:'<path d="m9 5 11 7-11 7z"/>',pause:'<path d="M7 5h4v14H7zm7 0h4v14h-4z"/>'};
  let index = 0;
  let request = 0;
  let lastVolume = .8;
  audio.volume = .8;
  const time = n => { const v = Math.floor(Number.isFinite(n) ? n : 0); return `${String(Math.floor(v / 60)).padStart(2,'0')}:${String(v % 60).padStart(2,'0')}`; };
  const message = text => { $('player-message').textContent = text; };
  const rows = tracks.map((track, i) => {
    const li = document.createElement('li'); li.className = 'track-row';
    const btn = document.createElement('button'); btn.className = 'track-button';
    const number = document.createElement('span'); number.className = 'track-number'; number.setAttribute('aria-hidden','true');
    const label = document.createElement('span');
    const title = document.createElement('span'); title.className = 'track-name'; title.textContent = track.title;
    const kind = document.createElement('span'); kind.className = 'track-kind'; kind.textContent = track.category;
    const duration = document.createElement('span'); duration.className = 'track-time'; duration.textContent = time(track.duration);
    label.append(title,kind); btn.append(number,label,duration); btn.addEventListener('click',()=>select(i,true));
    const link = document.createElement('a'); link.className='track-out'; link.href=track.url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent='↗'; link.setAttribute('aria-label',`${track.title} on Bandcamp (opens a new tab)`);
    li.append(btn,link); $('track-list').append(li); return {li,btn,number};
  });
  function paintState() {
    const playing = !audio.paused && !audio.ended;
    document.body.classList.toggle('playing',playing);
    $('play-icon').innerHTML = playing ? icons.pause : icons.play;
    $('play').setAttribute('aria-label',`${playing ? 'Pause' : 'Play'} ${tracks[index].title}`);
    $('deck-status').innerHTML=`<i class="signal-dot"></i> ${playing ? 'OUT THERE. ALL EARS.' : 'READY WHEN YOU ARE'}`;
    rows.forEach((row,i)=>{
      row.li.classList.toggle('active',i===index);
      row.btn.setAttribute('aria-label',`${i===index && playing ? 'Pause' : 'Play'} ${tracks[i].title}`);
      if(i===index) row.btn.setAttribute('aria-current','true'); else row.btn.removeAttribute('aria-current');
      row.number.innerHTML=i===index ? `<svg viewBox="0 0 24 24">${playing ? icons.pause : icons.play}</svg>` : String(i+1).padStart(2,'0');
    });
  }
  function paintProgress(){
    const duration=Number.isFinite(audio.duration) ? audio.duration : tracks[index].duration;
    const percent=duration ? Math.min(100,audio.currentTime/duration*100) : 0;
    $('seek').value=percent; $('seek').setAttribute('aria-valuetext',`${time(audio.currentTime)} of ${time(duration)}`);
    $('wave-progress-rect').setAttribute('width',String(percent*7));
    $('current-time').textContent=time(audio.currentTime); $('duration').textContent=time(duration);
  }
  function drawWaveform(){
    const values=tracks[index].waveform;
    const markup=values.map((v,i)=>{const h=Math.max(3,v*82);return `<rect x="${i*5+1}" y="${(90-h)/2}" width="2.2" height="${h}" rx=".7"/>`;}).join('');
    $('wave-bars').innerHTML=markup; $('wave-played').innerHTML=markup;
    window.WantedVisualizer?.setTrack(values, tracks[index].visualGain);
  }
  async function start(){
    const currentRequest=++request;
    message('');
    try { const graph = window.WantedVisualizer?.connect(); await Promise.all([audio.play(), graph]); if(currentRequest===request) paintState(); }
    catch(error){if(currentRequest!==request || error.name==='AbortError') return; message(error.name==='NotAllowedError' ? 'One more tap on play and we’re off.' : 'That recording couldn’t load. Try again, or follow “Full recording” to Bandcamp.');paintState();}
  }
  function toggle(){ if(audio.paused || audio.ended) start(); else {++request;audio.pause();} }
  function select(next,autoplay){
    if(next===index && autoplay){toggle();return;}
    ++request; audio.pause(); index=(next+tracks.length)%tracks.length;
    const track=tracks[index]; audio.src=track.src;
    $('cover').src=track.cover; $('cover').alt=`${track.title} cover artwork`;
    $('track-title').textContent=track.title; $('category').textContent=track.category;
    $('track-description').textContent=track.description; $('full-recording').href=track.url;
    $('track-counter').textContent=`${String(index+1).padStart(2,'0')} / ${String(tracks.length).padStart(2,'0')}`;
    message('');drawWaveform();paintProgress();paintState();if(autoplay) start();
  }
  $('play').addEventListener('click',toggle);
  $('previous').addEventListener('click',()=>select(index-1,true));
  $('next').addEventListener('click',()=>select(index+1,true));
  $('seek').addEventListener('input',()=>{if(Number.isFinite(audio.duration) && audio.duration>0) {audio.currentTime=Number($('seek').value)/100*audio.duration;paintProgress();}});
  function updateVolume(){
    const muted=audio.muted || audio.volume===0;
    $('mute').setAttribute('aria-pressed',String(muted));$('mute').setAttribute('aria-label',muted ? 'Unmute audio' : 'Mute audio');
    $('mute').style.color=muted ? 'var(--orange)' : ''; $('volume').value=muted ? 0 : audio.volume;
  }
  $('volume').addEventListener('input',()=>{audio.volume=Number($('volume').value);audio.muted=false;if(audio.volume>0)lastVolume=audio.volume;updateVolume();});
  $('mute').addEventListener('click',()=>{if(audio.muted || audio.volume===0){audio.muted=false;if(!audio.volume)audio.volume=lastVolume;}else audio.muted=true;updateVolume();});
  audio.addEventListener('play',paintState);audio.addEventListener('pause',paintState);
  audio.addEventListener('timeupdate',paintProgress);audio.addEventListener('loadedmetadata',paintProgress);
  audio.addEventListener('ended',()=>{if(index<tracks.length-1)select(index+1,true);else {paintState();message('That’s the shortlist. There’s plenty more waiting on Bandcamp.');}});
  audio.addEventListener('error',()=>{paintState();message('That recording couldn’t load. Try again, or follow “Full recording” to Bandcamp.');});
  document.addEventListener('keydown',event=>{const tag=event.target.tagName;if(event.code==='Space' && !['INPUT','BUTTON','TEXTAREA','A','SELECT'].includes(tag) && !event.target.isContentEditable){event.preventDefault();toggle();}});
  $('year').textContent=new Date().getFullYear(); drawWaveform();paintState();paintProgress();
  const fullscreen = $('fullscreen');
  if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
    fullscreen.hidden = false;
    fullscreen.addEventListener('click', async () => {
      try { if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
      catch { message('Full screen is unavailable in this browser. The listening room still works here.'); }
    });
    document.addEventListener('fullscreenchange', () => {
      const active=!!document.fullscreenElement;
      fullscreen.setAttribute('aria-label',active ? 'Exit full screen' : 'Enter full screen');
      fullscreen.querySelector('span').textContent=active ? 'EXIT FULL SCREEN' : 'FULL SCREEN';
    });
  }
})();

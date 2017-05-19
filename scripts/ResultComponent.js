import pubSub from './pubSub';
import { generateHaiku } from './HaikuGenerator';
import Button from './ButtonComponent';

export default function HaikuForm() {
  // cache DOM
  const haikuSpace = document.getElementById("haiku"),
    haikuTitleElm = document.getElementById("haiku-title"),
    refreshBtn = document.getElementById("refresh"),
    backBtn = document.getElementById("back");
  
  // bind events
  Button(backBtn, e => pubSub.emit('clickedBack'));
  Button(refreshBtn, () => {
    refreshBtn.classList.add("active");
    generateHaiku();
  });

  refreshBtn.addEventListener("webkitAnimationEnd", () => {
    pubSub.emit('refreshAnimationEnded');
  });
  
  pubSub.subscribe('refreshAnimationEnded', () => {
    refreshBtn.classList.remove("active");
  });
  
  pubSub.subscribe('createdHaiku', (data) => {
    const {haikuTitle, haiku} = data;
    haikuTitleElm.innerHTML = haikuTitle;
    haikuSpace.innerHTML = haiku;
  });
}
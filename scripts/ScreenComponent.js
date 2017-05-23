import pubSub from './pubSub';

export default function ScreenComponent() {
  const landingDiv = document.getElementById("landing"),
    		outputDiv = document.getElementById("output");
  
  // subscribed events
  pubSub.subscribe('clickedBack', () => {
    landingDiv.classList.add("screen--active");
    outputDiv.classList.remove("screen--active");
  });
  
  pubSub.subscribe('generatedHaiku', () => {
    landingDiv.classList.remove("screen--active");
    landingDiv.classList.remove("screen--initial");
    outputDiv.classList.add("screen--active");
  });
}
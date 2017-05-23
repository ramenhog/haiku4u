import pubSub from './pubSub';

export default function ShareComponent() {
  const twitterBtn = document.getElementById('twitter-share');
  
  function addTwitterLink({haikuTitle, haiku}) {
    const url = "https://881f48f30b344cb1aaf374c93db91906.codepen.website/";
    const regex = /\s<br\s*[\/]?>\s/gi;
		const encodedHaiku = haiku.replace(regex, "%0A");
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${haikuTitle}%0A${encodedHaiku}%0A-`;

    twitterBtn.setAttribute('href', shareUrl);
  }
  
  pubSub.subscribe('generatedHaiku', addTwitterLink);
}
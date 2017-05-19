import pubSub from './pubSub';
import {fetchWordData} from './haikuUtils';

let haikuArray = [];
  
const input = document.getElementById('input');

function getWords(allRelatedWords, syllableCount) {
  const strArray = [];
  let prevPOS = ["adj", "noun", "verb"].random();
  let prevWord = "";
  
  const adjectives = _.filter(allRelatedWords, word => {
    if (!word.tags) return false;
    return word.tags.indexOf("adj") > -1;
  });

  const verbs = _.filter(allRelatedWords, word => {
    if (!word.tags) return false;
    return word.tags.indexOf("v") > -1;
  });

  const nouns = _.filter(allRelatedWords, word => {
    if (!word.tags) return false;
    return (
      word.tags.indexOf("n") > -1 &&
      word.word !== "my" &&
      word.word !== "at" &&
      word.word !== "the" &&
      word.word !== "a"
    );
  });

  while (syllableCount > 0) {
    let newWords;

    switch (prevPOS) {
      case "verb":
        newWords = adjectives;
        prevPOS = "adj";
        break;
      case "noun":
        newWords = verbs;
        prevPOS = "verb";
        break;
      case "adj":
        newWords = nouns;
        prevPOS = "noun";
        break;
    }

    const filteredNewWords = _.filter(newWords, newWordObj => {
      if (syllableCount === 1) {
        return newWordObj.numSyllables === syllableCount;
      }
      return (
        newWordObj.numSyllables <= syllableCount &&
        strArray.indexOf(newWordObj.word) === -1 &&
        haikuArray.indexOf(newWordObj.word) === -1
      );
    });

    const newWord = filteredNewWords.random();

    if (!newWord) return;
    strArray.push(newWord.word);
    syllableCount -= newWord.numSyllables;
    prevWord = newWord;
  }

  return strArray;
}

export function generateHaiku() {
  const word = input.value;

  const totalWords = word.match(/\b\w+\b/g);
  if (!word.length || totalWords.length > 1) {
    pubSub.emit('validationError');
    return;
  }
	
  fetchWordData(word).then(({adj, triggers, relatedWords, kindOfWords, precedingWords, followingWords}) => {

    const allRelatedWords = [
      ...adj,
      ...triggers,
      ...relatedWords,
      ...kindOfWords,
      ...precedingWords,
      ...followingWords
    ];

    const haikuPattern = [5, 7, 5];
    haikuArray = [];

    for (let syllables of haikuPattern) {
      haikuArray = haikuArray.concat(
        getWords(allRelatedWords, syllables)
      );
      haikuArray.push("<br/>");
    }

    let haiku = "", 
        haikuTitle = "";

    if (haikuArray.indexOf(undefined) !== -1) {
      haikuTitle = "Error.";
      haiku =
        "Well, this is so awk <br />Something did not go as planned<br/>Try another word.";
    } else {
      haikuTitle = `${word}.`;
      haiku = haikuArray.join(" ");
    }
    
    pubSub.emit('createdHaiku', { haikuTitle, haiku});
  });
}
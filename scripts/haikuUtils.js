function fetchJSON(url) {
  return fetch(url).then(y => y.json());
}

function fetchAdj(word) {
  const adjUrl = `https://api.datamuse.com/words?rel_jjb=${word}&md=s,p`;
  return fetchJSON(adjUrl);
}

function fetchTriggers(word) {
	const triggerWordsUrl = `https://api.datamuse.com/words?rel_trg=${word}&md=s,p`;
  return fetchJSON(triggerWordsUrl);
}

function fetchRelatedWords(word) {
  const relatedWordsUrl = `https://api.datamuse.com/words?rel_syn=${word}&md=s,p`;
  return fetchJSON(relatedWordsUrl);
}

function fetchKindOfWords(word) {
  const kindOfWordsUrl = `https://api.datamuse.com/words?rel_spc=${word}&md=s,p`;
  return fetchJSON(kindOfWordsUrl);
}

function fetchPrecedingWords(word) {
  const precedingWordUrl = `https://api.datamuse.com/words?rel_bgb=${word}&md=s,p`;
  return fetchJSON(precedingWordUrl);
}

function fetchFollowingWords(word) {
  const followingWordUrl = `https://api.datamuse.com/words?rel_bga=${word}&md=s,p`;
  return fetchJSON(followingWordUrl);
}

export function fetchWordData(word) {
  const promises = [
    fetchAdj(word),
    fetchTriggers(word),
    fetchRelatedWords(word),
    fetchKindOfWords(word),
    fetchPrecedingWords(word),
    fetchFollowingWords(word)
  ];
  
  return Promise.all(promises).then(([adj, triggers, relatedWords, kindOfWords, precedingWords, followingWords]) => {
    return {
      adj,
      triggers,
      relatedWords,
      kindOfWords,
      precedingWords,
      followingWords
    };
  });
}
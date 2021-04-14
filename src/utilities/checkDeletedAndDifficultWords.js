function checkDifficultWords(words, resultWords) {
  if (words.length === 0) return true;

  for (let i = 0; i < words.length; i += 1) {
    if (words[i].word === resultWords.word) {
      return false;
    }
  }

  return true;
}

export default checkDifficultWords;

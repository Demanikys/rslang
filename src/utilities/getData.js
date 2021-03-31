import data from '../pages/AudioGame/words.json';

const getWords = () => {
  const audioData = [];

  for (let i = 20; i < 40; i += 1) {
    audioData.push(data[i]);
  }

  return audioData;
};

export default getWords;

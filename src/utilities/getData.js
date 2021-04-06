import data from '../pages/AudioGame/words.json';

const getFakeWords = () => {
  const audioData = [];

  for (let i = 20; i < 40; i += 1) {
    audioData.push(data[i]);
  }

  return audioData;
};

export const getWords = (level) => {
  const page = Math.floor(Math.random() * 30);
  return fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${page}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default getFakeWords;

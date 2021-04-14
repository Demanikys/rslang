export const getFakeWords = (level, page, count) => {
  const numbers = [];
  let wordsLevel;
  if (level !== 6) {
    wordsLevel = level + 1;
  } else {
    wordsLevel = level - 1;
  }
  console.log(wordsLevel, 'uroven');
  for (let i = 0; i < count; i += 1) {
    const number = Math.floor(Math.random() * 30);
    if (number === page || numbers.includes(number)) {
      i -= 1;
    } else {
      numbers.push(number);
    }
  }

  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${wordsLevel - 1}&page=${numbers[i]}`)
        .then((response) => response.json()),
    );
  }

  return Promise.all([...promises]);
};

export const getWords = (level, page, count) => {
  console.log(level, 'level get');
  console.log(page, 'page get');
  console.log(count, 'count get');
  const promises = [];
  const numbers = [];

  if (count !== 1) {
    for (let i = 0; i < count; i += 1) {
      const number = Math.floor(Math.random() * 30);
      if (numbers.includes(number)) {
        i -= 1;
      } else {
        numbers.push(number);
      }
    }

    for (let i = 0; i < count; i += 1) {
      promises.push(
        fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${numbers[i]}`)
          .then((response) => response.json()),
      );
    }
  } else {
    return Promise.all([
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${page}`)
        .then((response) => response.json()),
    ]);
  }

  return Promise.all([...promises]);
};

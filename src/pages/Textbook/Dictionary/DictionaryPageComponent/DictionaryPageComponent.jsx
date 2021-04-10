import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';

const DictionaryPageComponent = (props) => {
  const data = props;
  const idArr = data.words.slice(0);
  const [wordsArr, setWordsArr] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const resultArr = [];

    const fetchData = async (url) => {
      const response = await axios.get(`https://newrslangapi.herokuapp.com/words/${url}`);
      resultArr.push(response.data);
      setWordsArr(resultArr);
    };

    idArr.forEach(async (item, index) => {
      await fetchData(item);
      if (index === idArr.length - 1) {
        setIsFetching(false);
        setWordsArr(resultArr);
      }
    });

    // return (
    //   () => console.log('removed')
    // );
  }, []);

  return (
    <div className={style.page_component}>
      { !isFetching && (wordsArr.length === idArr.length)
        ? (wordsArr.map((item) => (
          <TextbookWordComponent word={item} type={data.type} key={item.id} />
        )))
        : null}

    </div>
  );
};

export default DictionaryPageComponent;

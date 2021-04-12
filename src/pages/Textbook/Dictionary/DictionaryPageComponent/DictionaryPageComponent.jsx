import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';

const DictionaryPageComponent = (props) => {
  const data = props;
  const [wordsArr, setWordsArr] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const idArr = useSelector((state) => {
    if (data.type === 'hardWord') {
      return state.user.hardWords;
    } if (data.type === 'deletedWord') {
      return state.user.deletedWords;
    }
  });

  useEffect(() => {
    const resultArr = [];

    const fetchData = async (url) => {
      const responce = await axios.get(`https://newrslangapi.herokuapp.com/words/${url}`);
      resultArr.push(responce.data);
      setWordsArr(resultArr);
    };

    if (idArr) {
      idArr.forEach(async (item, index) => {
        await fetchData(item)
          .then(() => {
            if (index === idArr.length - 1) {
              setIsFetching(false);
              setWordsArr(resultArr);
            }
          });
      });
    }
  }, [idArr]);

  return (
    <div className={style.page_component}>
      { !isFetching && (wordsArr.lenght === idArr.lenght)
        ? (wordsArr.map((item) => (
          <TextbookWordComponent
            word={item}
            type={data.type}
            key={item.id}
            setIsFetching={setIsFetching}
          />
        )))
        : ('Слова не найдены')}
    </div>
  );
};

export default DictionaryPageComponent;

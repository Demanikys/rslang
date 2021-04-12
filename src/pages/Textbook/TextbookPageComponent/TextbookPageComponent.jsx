import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './TextbookPageComponent.module.scss';
import TextbookWordComponent from '../TextbookWordComponent';

const TextbookPageComponent = (props) => {
  const dataProps = props;
  const deletedWordsList = useSelector((state) => state.user.deletedWords) || [];
  const [wordsData, setWordData] = useState();

  useEffect(() => {
    try {
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${dataProps.groupNumber}&page=${dataProps.pageNumber}`)
        .then((response) => response.json())
        .then((response) => setWordData(response));
    } catch (e) {
      console.log(e);
    }
  }, [dataProps.pageNumber,
    useSelector((state) => state.user.deletedWords),
    useSelector((state) => state.user.hardWords)]);

  return (
    wordsData
      ? (
        <div className={style.textbook_page_component}>
          {
                    wordsData.map((item) => {
                      if (deletedWordsList.includes(item.id)) {
                        return null;
                      }
                      return <TextbookWordComponent word={item} type="normal" key={item.id} />;
                    })
                }
        </div>
      )
      : ('...загрузка...')
  );
};

export default TextbookPageComponent;

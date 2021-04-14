import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './TextbookPageComponent.module.scss';
import TextbookWordComponent from '../TextbookWordComponent';
import checkDifficultWords from '../../../utilities/checkDeletedAndDifficultWords';
import { getDeletedWords, getDifficultWords } from '../../../selectors/selectors';
import Pagination from '../../../components/Pagination/Pagination';
import Games from '../Games/Games';
import {
  setGameFromDictionaryStatus,
  setGameGroup,
  setGamePage,
  setWordsFromTextbook,
} from '../../../actions/mniGameAction';

const TextbookPageComponent = (props) => {
  const dataProps = props;
  const [wordsData, setWordData] = useState();
  const deletedWords = useSelector(getDeletedWords);
  const difficultWords = useSelector(getDifficultWords);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGamePage(pageNumber - 1));
    dispatch(setGameGroup(dataProps.groupNumber));
    dispatch(setGameFromDictionaryStatus(false));
    try {
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${dataProps.groupNumber}&page=${pageNumber - 1}`)
        .then((response) => response.json())
        .then((response) => setWordData(response));
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (wordsData) {
      const setWords = wordsData.filter((el) => checkDifficultWords(deletedWords, el));
      console.log(setWords);
      dispatch(setWordsFromTextbook(setWords));
    }
  }, [deletedWords, pageNumber, dataProps.groupNumber, wordsData]);

  return (
    <>
      {
        wordsData
          ? (
            <div className={style.textbook_page_component}>
              {
                wordsData.map((item, index) => {
                  if (checkDifficultWords(deletedWords, item)) {
                    return (
                      <div key={item.word}>
                        <TextbookWordComponent
                          word={item}
                          type="normal"
                          difficult={checkDifficultWords(difficultWords, item)}
                        />
                        {
                          index !== wordsData.length - 1
                            ? <br />
                            : null
                        }
                      </div>
                    );
                  }
                  return <div style={{ display: 'none' }} />;
                })
              }
              <Games />
            </div>
          )
          : ('...загрузка...')
      }
      <Pagination setPageNumber={setPageNumber} length={600} />
    </>
  );
};

export default TextbookPageComponent;

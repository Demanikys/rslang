import { Howl } from 'howler';
import correct from '../../assets/sounds/correct-answer.mp3';
import wrong from '../../assets/sounds/wrong-answer.mp3';

const playAnswerSound = (status) => {
  if (status) {
    return new Howl({
      src: correct,
    });
  }

  return new Howl({
    src: wrong,
  });
};

export default playAnswerSound;

export const TOGGLE_SHOW = 'TOGGLE_SHOW';

const toggleShowStatus = (status) => ({
  type: TOGGLE_SHOW,
  status,
});

export default toggleShowStatus;

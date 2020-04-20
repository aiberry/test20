export const setItemOppositeState = (id) => (dispatch) => {
  dispatch({ type: 'SET_OPPOSITE_STATE_TO_ITEM', payload: id });
};

export const setItemsFilter = (filter) => (dispatch) => {
  dispatch({ type: 'SET_ITEMS_FILTER', payload: filter.toLowerCase() });
};

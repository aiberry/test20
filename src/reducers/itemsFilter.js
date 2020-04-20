const itemsFilter = (state = '', action) => {
  if (action.type === 'SET_ITEMS_FILTER') {
    return action.payload;
  }
  return state;
};

export default itemsFilter;

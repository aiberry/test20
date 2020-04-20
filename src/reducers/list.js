const list = (state = [], action) => {
  if (action.type === 'SET_ITEMS_TO_LIST') {
    return action.payload;
  }
  if (action.type === 'SET_OPPOSITE_STATE_TO_ITEM') {
    return state.map((item) =>
      item.id === action.payload
        ? { ...item, isClosed: !item.isClosed, closeDate: new Date() }
        : item
    );
  }
  return state;
};

export default list;

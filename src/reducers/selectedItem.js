const selectedItem = (state = {}, action) => {
  if (action.type === 'SET_SELECTED_ITEM') {
    return action.payload;
  }
  return state;
};

export default selectedItem;

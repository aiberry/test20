const selectedItem = (
  state = JSON.parse(localStorage.getItem('current')) || {},
  action
) => {
  if (action.type === 'SET_SELECTED_ITEM') {
    localStorage.setItem('current', JSON.stringify(action.payload));
    return action.payload;
  }
  return state;
};

export default selectedItem;

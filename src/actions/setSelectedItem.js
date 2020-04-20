export const setSelectedItem = (query, name) => (dispatch) => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://mrsoft.by/tz20${query}`)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      dispatch({ type: 'SET_SELECTED_ITEM', payload: { ...item, name } });
      return item;
    })
    .catch(console.log); // eslint-disable-line
};

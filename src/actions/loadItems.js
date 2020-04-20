export const loadItems = () => (dispatch) => {
  return fetch(
    'https://cors-anywhere.herokuapp.com/https://mrsoft.by/tz20/list.json'
  )
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      dispatch({ type: 'SET_ITEMS_TO_LIST', payload: myJson.data });
      return myJson;
    })
    .catch(console.log); // eslint-disable-line
};

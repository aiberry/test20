import { combineReducers } from 'redux';

import list from './list';
import itemsFilter from './itemsFilter';
import selectedItem from './selectedItem';

export default combineReducers({
  list,
  selectedItem,
  itemsFilter
});

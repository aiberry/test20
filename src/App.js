import React from 'react';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './App.module.css';
import { loadItems } from './actions/loadItems';
import { setItemsFilter } from './actions/setItemsFilter';
import { setSelectedItem } from './actions/setSelectedItem';
import { setItemOppositeState } from './actions/setItemOppositeState';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.showItemDetails = this.showItemDetails.bind(this);
    this.setItemState = this.setItemState.bind(this);
    this.props.getItems();
  }

  inputChange = (e) => {
    this.props.setFilter(e.target.value);
  };

  showItemDetails = (isClosed, moreLink, name) => {
    if (!isClosed) {
      this.props.setSelected(moreLink, name);
    }
  };

  setItemState = (e, itemId) => {
    e.stopPropagation();
    this.props.setOppositeState(itemId);
  };

  render() {
    const { inputChange, showItemDetails, setItemState } = this;
    const { items, itemDetails } = this.props;
    return (
      <Sidebar
        open={true}
        docked={true}
        shadow={false}
        transitions={false}
        sidebarClassName={styles.sidebar}
        contentClassName={styles.content}
        sidebar={
          <div>
            <input type="text" onChange={inputChange} />
            {items.map((item) => (
              <div
                key={item.id}
                className={`${styles.sidebarItem} ${
                  item.isClosed ? styles.itemClosed : styles.itemOpened
                }`}
                onClick={(e) =>
                  showItemDetails(item.isClosed, item.more, item.name, e)
                }>
                <button
                  className={styles.closeBtn}
                  onClick={(e) => setItemState(e, item.id)}>
                  {item.isClosed ? 'R' : 'X'}
                </button>
                <p>{item.name}</p>
                <p>{item.shortInfo}</p>
                {item.closeDate ? (
                  <p>
                    {` Closed at 
                    ${item.closeDate.getMonth()}-
                    ${item.closeDate.getDate()}-
                    ${item.closeDate.getFullYear()}@
                    ${item.closeDate.getHours()}:
                    ${item.closeDate.getMinutes()}`}
                  </p>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        }>
        <h2>{itemDetails.name || 'Choose one ...'}</h2>
        <img
          src={
            itemDetails.pic
              ? `https://mrsoft.by/tz20${itemDetails.pic}`
              : 'https://clipartart.com/images/cat-and-fishbowl-clipart.png'
          }
          alt="pic"
        />
        <p>{itemDetails.bio}</p>
      </Sidebar>
    );
  }
}

export default connect(
  (state) => ({
    items: state.list
      .filter((item) => item.name.toLowerCase().includes(state.itemsFilter))
      .sort((item) => (item.isClosed ? 1 : -1)),
    itemDetails: state.selectedItem
  }),
  (dispatch) => ({
    getItems: (query) => {
      dispatch(loadItems(query));
    },
    setFilter: (filter) => {
      dispatch(setItemsFilter(filter));
    },
    setSelected: (link, name) => {
      dispatch(setSelectedItem(link, name));
    },
    setOppositeState: (id) => {
      dispatch(setItemOppositeState(id));
    }
  })
)(App);

App.propTypes = {
  getItems: PropTypes.func,
  setFilter: PropTypes.func,
  itemDetails: PropTypes.object,
  items: PropTypes.array,
  setSelected: PropTypes.func,
  setOppositeState: PropTypes.func
};

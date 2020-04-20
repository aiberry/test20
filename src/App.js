import React from 'react';
import Sidebar from 'react-sidebar';
import styles from './App.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    return (
      <Sidebar
        sidebarClassName={styles.sidebar}
        contentClassName={styles.content}
        open={true}
        docked={true}
        shadow={false}
        transitions={false}
        sidebar={
          <div>
            <input
              type="text"
              onChange={this.inputChange}
              className={styles.topSearch}></input>
            {this.props.items.map((item) => (
              <div
                key={item.id}
                className={`${styles.sidebarItem} ${
                  item.isClosed ? styles.itemClosed : styles.itemOpened
                }`}
                onClick={(e) =>
                  this.showItemDetails(item.isClosed, item.more, item.name, e)
                }>
                <button
                  className={styles.closeBtn}
                  onClick={(e) => this.setItemState(e, item.id)}>
                  {item.isClosed ? 'R' : 'X'}
                </button>
                <p>{item.name}</p>
                <p>{item.shortInfo}</p>
              </div>
            ))}
          </div>
        }>
        <div key={this.props.itemDetails.id}>
          <h2>{this.props.itemDetails.name || 'Choose one ...'}</h2>
          <img
            src={
              this.props.itemDetails.pic
                ? `https://mrsoft.by/tz20${this.props.itemDetails.pic}`
                : 'https://clipartart.com/images/cat-and-fishbowl-clipart.png'
            }
            alt="pic"
          />
          <p>{this.props.itemDetails.bio}</p>
        </div>
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
  setOppositeState: PropTypes.func,
  options: PropTypes.array,
  tabIndex: PropTypes.string
};

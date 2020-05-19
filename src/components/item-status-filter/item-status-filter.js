import React, { Component } from 'react';
import './item-status-filter.css';

class ItemStatusFilter extends Component {
  state = {
  }

  render() {
    return (
      <div className="btn-group"> 
        <button type="button"
                className="btn btn-info" onClick={this.onShowAllItems}>All</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={this.onShowActiveItems}>Active</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={this.onShowDoneItems}>Done</button>
      </div>
    )
  } 
}


export default ItemStatusFilter;
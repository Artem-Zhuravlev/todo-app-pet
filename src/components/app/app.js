import React, {Component} from 'react';
 
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

class App extends Component{

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Drink tea'),
      this.createTodoItem('Drink juice'),
    ],
    term: '',
    filter: 'done'
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }


  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newTodoData
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData})=> {
      const newData = [...todoData, newItem];
      return {
        todoData: newData
      }
    })
  };

  toggleProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]}
      return [
        ...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)
      ]
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'done')
      }
    });
  };

  search(items, term) {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    })
  };

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item)=> !item.done );
      case 'done':
        return items.filter((item)=> item.done );
      default: 
        return items;
    }
  }


  onSearchFilter = (e) => {
    this.setState({
      term: e.target.value
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  render() {

    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;


    return ( 
      <div className="todo-app">
        <AppHeader  toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchFilter={this.onSearchFilter}/>  
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
        />
        <AddItem onAddItem={this.addItem} />
      </div>
    )
  }
}

export default App; 
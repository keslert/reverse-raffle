import React from 'react';
import Sidebar from '../components/sidebar';
import ListItem from '../components/list-item';
import styled from 'styled-components';

import { 
  flatMap,
  sample,
  fill,
  filter,
  cloneDeep,
  isString,
  isEmpty,
  isNumber,
  find,
  uniqBy,
} from 'lodash';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      list: [],
      running: false,
      finished: false,
    }
  }

  updateList(text) {
    const list = text.split('\n').map(line => {
      const matches = line.match(/([\D]+)([\d]+)?/)
      return {
        name: (matches && matches[1] || '').trim(), 
        entries: Number.parseInt(matches && matches[2] || 1),
      };
    });

    const valid = filter(list, ({name, entries}) => isString(name) && !isEmpty(name) && isNumber(entries));
    const unique = uniqBy(valid, ({name}) => name);
    this.setState({list: unique, backup: unique, running: false, finished: false});
  }

  startRaffle() {
    if(this.state.list.length) {
      this.setState({
        backup: cloneDeep(this.state.list),
        running: true,
        finished: false,
      })
      setTimeout(() => this.raffleLoop(), 1);
    }
  }

  resetRaffle(removeWinner) {
    const { backup, list } = this.state;
    const winner = find(list, ({entries}) => entries);

    this.setState({
      finished: false,
      running: false,
      list: filter(cloneDeep(backup), ({name}) => !removeWinner || name !== winner.name),
    })
  }

  raffleLoop() {
    if(!this.state.running) {
      return;
    }

    const { list } = this.state;

    const indices = flatMap(list, (item, index) => fill(new Array(item.entries), index));
    const index = sample(indices);
    list[index].entries--;
    this.setState({list});
    
    const remaining = filter(list, item => item.entries).length;
    if(remaining > 1) {
      setTimeout(() => this.raffleLoop(), 1200 / Math.floor(Math.sqrt(remaining)));
    } else {
      this.endRaffle();
    }
  }

  endRaffle() {
    this.setState({
      running: false,
      finished: true,
    })
  }

  render() {
    const { list, running, finished } = this.state;

    return (
      <div className="flex vh-100">
        <Sidebar 
          onStart={() => this.startRaffle()}
          onReset={value => this.resetRaffle(value)}
          onChangeList={text => this.updateList(text)} 
          running={running}
          finished={finished}
          />
        <div className="flex pa4 items-center justify-center flex-1">
          <div className="flex flex-wrap justify-center">
            {list.map(item => <ListItem key={item.name} {...item} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

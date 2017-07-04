import React from 'react';
import { Box, Text, Flex, Color } from 'axs';
import Button from './button';
import TrophyIcon from 'react-icons/lib/fa/trophy';
import TextArea from './text-area';

class Sidebar extends React.PureComponent {
  render() {
    const { running, finished, onStart, onReset, onChangeList } = this.props;
    return (
      <div className="bg-dark pv4 ph3 flex items-center flex-column" style={{width: 350}}>
        <div className="flex flex-column tc">
          <div className="f1 primary mb2"><TrophyIcon /></div>
          <div className="f3 white-80 ttu">Reverse <span className="white-40">Raffle</span></div>
        </div>
        <div className="flex flex-column flex-auto justify-center w-100">
          <div className="white-60 f6 mb1 ml1">Example: <span className="i">John Brown 5</span></div>
          <TextArea onChange={value => onChangeList(value)} />
        </div>
        <div className="flex flex-column w-100">
          {!running && !finished && <Button onClick={onStart}>Run the things</Button>}
          {finished && (
            <div>
              <Button className="mb2" onClick={() => onReset(false)}>Reset</Button>
              <Button onClick={() => onReset(true)}>Reset (but remove winner)</Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Sidebar;
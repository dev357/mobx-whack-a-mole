import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

const items = observable([{name: 'üks'}, {name: 'kaks'}]);

const Test = observer(() => {
  const addItem = () => {
    console.log('click');
    items.push({name: Date.now()})
  };

  return (
    <div>
      <button onClick={addItem}>add item</button>
      <ul>
        {items.map((item) => {
          return (
            <Item key={item.name} item={item}>

            </Item>
          )
        })}
      </ul>
    </div>
  )
});

@observer
class Item extends React.Component {
  render() {
    return (
      <li>
        {this.props.item.name}
      </li>
    );
  }
}

export default Test;
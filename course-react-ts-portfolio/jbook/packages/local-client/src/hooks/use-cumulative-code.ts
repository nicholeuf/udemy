import { useTypedSelector } from '../hooks/use-typed-selector';

// The show function allows a user to display html or data in the iframe element
const showFunc = `
import _React from 'react';
import _ReactDOM from 'react-dom';

var show = (value) => {
  if (typeof value === 'object') {
    const root = document.querySelector('#root');
    if (value.$$typeof && value.props) {
      _ReactDOM.render(value, root)
    } else {
      root.innerHTML = JSON.stringify(value);
    }
  } else {
    root.innerHTML = value;
  }
}
`;
const showFuncNoop = `var show = () => {};`;

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const cumulative = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        // For the active cell, provide the show function
        if (c.id === cellId) {
          cumulative.push(showFunc);
          // Previous calls to the show function should not be displayed in the current cell
        } else {
          cumulative.push(showFuncNoop);
        }
        cumulative.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulative;
  }).join('\n');
};

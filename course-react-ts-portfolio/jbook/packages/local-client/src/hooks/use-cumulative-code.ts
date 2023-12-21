import { useTypedSelector } from '../hooks/use-typed-selector';

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
        if (c.id === cellId) {
          cumulative.push(showFunc);
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

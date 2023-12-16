import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';
import './resize-observer-bug-fix';

const App = () => {
  return (
    <div>
      <CodeCell />
      {/* <CodeCell /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

import ReactDOM from 'react-dom';
import TextEditor from './components/text-editor';
// import CodeCell from './components/code-cell';
// import './resize-observer-bug-fix';

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

import './code-cell.css';
import { useEffect } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';

import Resizable from './resizeable';
import { Cell } from '../state';
import { useTypedSelector } from '../hooks/use-typed-selector';

import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => {
    return state.bundles[cell.id];
  });

  useEffect(() => {
    // Immediately bundle at startup
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    // Bundle code after user stops typing 750ms
    const timer = setTimeout(() => createBundle(cell.id, cell.content), 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className='code-cell-wrapper'>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

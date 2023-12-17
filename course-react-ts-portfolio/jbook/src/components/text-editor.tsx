import './text-editor.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // User clicked inside editing div
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;

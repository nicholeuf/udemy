import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

// place code inside script tag of iframe html document
const html = `
    <html>
      <head>
        <style> html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    // reset content of iframe
    iFrame.current.srcdoc = html;

    // Post bundled code as message to iFrame
    iFrame.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iFrame}
        sandbox='allow-scripts'
        srcDoc={html}
        title='preview'
      />
    </div>
  );
};

export default Preview;

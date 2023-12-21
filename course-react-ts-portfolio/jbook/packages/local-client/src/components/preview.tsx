import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  err: string;
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
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    // reset content of iframe
    iFrame.current.srcdoc = html;

    // Give iframe time to initialize message listener
    setTimeout(() => {
      // Post bundled code as message to iFrame
      iFrame.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iFrame}
        sandbox='allow-scripts'
        srcDoc={html}
        title='preview'
      />
      {err && (
        <div className='preview-error'>
          <h4>Bundling Error</h4>
          {err}
        </div>
      )}
    </div>
  );
};

export default Preview;

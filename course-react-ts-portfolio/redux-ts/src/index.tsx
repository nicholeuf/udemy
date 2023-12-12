import ReactDOM from 'react-dom/client';
import App from './components/App';

// Get reference to the div with ID
const el = document.getElementById('root');

// Tell react to take control of that element
const root = ReactDOM.createRoot(el!);

// Render app in dom
root.render(<App />);

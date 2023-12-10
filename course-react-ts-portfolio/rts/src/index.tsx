import ReactDOM from 'react-dom/client';
// import GuestList from './state/GuestList';
// import UserSearch from './state/UserSearch';
// import EventComponent from './events/EventComponent';
import UserSearch from './refs/UserSearch';

// Get reference to the div with ID
const el = document.getElementById('root');

// Tell react to take control of that element
const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <div>
      <UserSearch />
    </div>
  );
};

// Render app in dom
root.render(<App />);

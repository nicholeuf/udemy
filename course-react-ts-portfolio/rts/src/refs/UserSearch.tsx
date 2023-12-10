import { useState, useRef, useEffect } from 'react';

const users = [
  { name: 'Sarah', age: 20 },
  { name: 'Alex', age: 30 },
  { name: 'Michael', age: 40 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  useEffect(() => {
    // Focus the input element on render
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  const onClick = () => {
    // Set user when button clicked
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };

  return (
    <div>
      User Search
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Find User</button>
      <div>
        {user && user.name}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;

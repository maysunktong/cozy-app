// Sidebar.js
import { useState } from 'react';

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0' }}>
      <button onClick={toggleDropdown}>Create New Board</button>
      {showDropdown && (
        <div>
          <button onClick={() => handleBoardSelection('todo')}>Todo Board</button>
          <button onClick={() => handleBoardSelection('kanban')}>Kanban Board</button>
          <button onClick={() => handleBoardSelection('note')}>Note Board</button>
        </div>
      )}
    </div>
  );
};




export default Sidebar;

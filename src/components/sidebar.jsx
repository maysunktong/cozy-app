import { useState } from 'react';

function Sidebar() {
  const [board, setBoard] = useState(null);
  const boards = ['Todolist', 'Kanban', 'Notetaking'];

  const handleBoardSelect = (board) => {
    setBoard(board);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px' }}>
          <ul>
            {boards.map((board, index) => (
              <li key={index} onClick={() => handleBoardSelect(board)}>
                {board}
              </li>
            ))}
          </ul>
      </div>
      <div>
        {board && <h2>{`This is your new ${board}`}</h2>}
      </div>
    </div>
  );
}

export default Sidebar;

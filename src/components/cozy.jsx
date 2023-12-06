import { useState } from 'react';
import { Todolist } from './todolist';
import { Kanban } from './kanban';
import { Notetaking } from './notetaking';

const Cozy = () => {
  const [board, setBoard] = useState(null);
  const boards = 
    {Todolist: <Todolist />, Kanban: <Kanban />, Notetaking: <Notetaking />};

  const handleBoardSelect = (board) => {
    setBoard(board);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px' }}>
          <ul>
            {Object.keys(boards).map((board, index) => (
              <li key={index} onClick={() => handleBoardSelect(board)}>
                {board}
              </li>
            ))}
          </ul>
      </div>
      <div>
        {board && <h2>{`This is your new ${board}`}</h2>}
        {board && boards[board]}
      </div>
    </div>
  );
}

export default Cozy;

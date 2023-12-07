import { useState } from "react";
import { Todolist } from "./todolist";
import { Kanban } from "./kanban";
import { Notetaking } from "./notetaking";
import Lottie from "lottie-react";
import Notebook from "../assets/notebook.json";
import { MenuButton } from "./buttons/menuButton";
import { UserButton } from "@clerk/clerk-react";

const Cozy = () => {
  const [board, setBoard] = useState(null);

  const boards = {
    Todolist: <Todolist />,
    Kanban: <Kanban />,
    Notetaking: <Notetaking />,
  };

  const handleBoardSelect = (board) => {
    setBoard(board);
  };

  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-[90%] h-[90%] flex rounded-2xl shadow-lg border bg-white">
        <div className="w-48 rounded-l-2xl p-6p border-r">
          <div>
            <Lottie animationData={Notebook} loop={true} className="w-auto" />
            <p className="font-extrabold text-transparent lg:text-4xl md:text-3xl text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600 text-center">
              Cozy
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-36'>
            <ul className="p-6">
              {Object.keys(boards).map((board, index) => (
                <li key={index} onClick={() => handleBoardSelect(board)}>
                  <MenuButton>{board}</MenuButton>
                </li>
              ))}
            </ul>
            <UserButton />
          </div>
        </div>
        <div className="p-6">
          {board ? boards[board] : <p>Please choose a board</p>}
        </div>
      </div>
    </div>
  );
};

export default Cozy;

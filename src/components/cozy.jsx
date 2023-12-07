import { useState } from "react";
import { Todolist } from "./todolist";
import { Kanban } from "./kanban";
import { Notetaking } from "./notetaking";
import Lottie from "lottie-react";
import Notebook from "../assets/notebook.json";
import { MenuButton } from "./buttons/menuButton";
import { UserButton, useUser } from "@clerk/clerk-react";

const Cozy = () => {
  const [board, setBoard] = useState(null);
  const { user } = useUser(); // Access user data from Clerk

  const boards = {
    Todolist: <Todolist />,
    Kanban: <Kanban />,
    Notetaking: <Notetaking />,
  };

  const handleBoardSelect = (selectedBoard) => {
    setBoard(selectedBoard);
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
          <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
            
            <ul className="p-6">
              {Object.keys(boards).map((boardName, index) => (
                <li key={index} onClick={() => handleBoardSelect(boardName)}>
                  <MenuButton>{boardName}</MenuButton>
                </li>
              ))}
            </ul>
            <div className='flex flex-col justify-center items-center gap-4'>
              <UserButton />
              {user && (
                <div className="text-center">
                  <p className='text-gray-400'>Hi, {user.firstName} 🖐🏻</p>
                </div>
              )}
            </div>
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

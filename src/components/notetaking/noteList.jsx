import { IconContext } from "react-icons";
import { IoMdCloseCircle } from "react-icons/io";

export const NoteList = ({ notes, DeleteNote }) => {
  return (
    <div className="w-full py-8 h-auto flex flex-wrap justify-start items-center text-black">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="w-full lg:w-[18rem] h-auto border rounded-2xl shadow-lg bg-yellow-300 p-4 m-2">
            <div className='flex justify-end items-center whitespace-normal p-4'>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => DeleteNote(note.id)}
              >
                <IconContext.Provider
                  value={{
                    color: "white",
                    className: "global-class-name",
                    size: "1.5rem",
                  }}
                >
                  <IoMdCloseCircle />
                </IconContext.Provider>
              </button>   
            </div>
            <div className='w-auto break-words'>{note.content}</div>
          </div>
        ))
      ) : (
        <div className="w-full h-auto flex justify-center items-center text-gray-500">
          Note board is empty.
        </div>
      )}
    </div>
  );
};

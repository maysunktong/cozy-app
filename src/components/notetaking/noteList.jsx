import { IconContext } from "react-icons";
import { IoMdCloseCircle } from "react-icons/io";

export const NoteList = ({ notes, deleteNote }) => {
  return (
    <div className="flex flex-wrap gap-2 scroll-m-7">
      <p className="w-full text-2xl font-bold py-8">Notes</p>
      {notes.map((note) => (
        <div key={note.id} className="w-[20rem] h-[15rem] border rounded-2xl shadow-lg bg-yellow-300 overflow-y-auto">
          <div className='flex justify-end items-center whitespace-normal p-4'>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => deleteNote(note.id)}
            >
              <IconContext.Provider
                value={{
                  color: "gray",
                  className: "global-class-name",
                  size: "1.2em",
                }}
              >
                <IoMdCloseCircle />
              </IconContext.Provider>
            </button>
          </div>
          <div className='whitespace-normal'>{note.content}</div>
        </div>
      ))}
    </div>
  );
};

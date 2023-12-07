export const NoteList = ({ notes, deleteNote}) => {
  return (
    <div className="flex flex-wrap">
      <h2 className="w-full mb-4 text-2xl font-bold">Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-end mb-2">
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
            <div>{note.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

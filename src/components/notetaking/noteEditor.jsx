import { useState, useEffect } from "react";

export const NoteEditor = ({ AddNote }) => {
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const SavedNoteContent = localStorage.getItem("noteContent");
    if (SavedNoteContent) {
      setNoteContent(SavedNoteContent);
    }
  }, []);

  const HandleAddNote = () => {
    if (noteContent.trim() !== "") {
      const NewNote = {
        id: new Date().getTime(),
        content: noteContent,
      };
      AddNote(NewNote);
      setNoteContent("");
      localStorage.setItem("noteContent", noteContent); // Save note content in local storage
    }
  };

  const HandleNoteChange = (e) => {
    const Content = e.target.value;
    setNoteContent(Content);
    localStorage.setItem("noteContent", Content); // Save note content in local storage
  };

  return (
    <div
      className="flex flex-col gap-4 p-2 bg-white rounded-2xl shadow-md border"
    >
      <textarea
        value={noteContent}
        onChange={HandleNoteChange}
        placeholder="Start writing here..."
        className="w-80 h-40 rounded-md resize-none focus:outline-none bg-white p-4 dark:text-slate-400"
      />
      <div className="flex justify-end items-center">
        <button
          onClick={HandleAddNote}
          className="border py-2 px-4 rounded-2xl bg-slate-300 hover:bg-pink-500"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

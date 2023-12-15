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
      className="w-full lg:w-1/2 m-auto flex flex-col gap-2 p-4 rounded-2xl shadow-md border text-black"
    >
      <textarea
        value={noteContent}
        onChange={HandleNoteChange}
        placeholder="Start writing here..."
        className="w-full rounded-md resize-none focus:outline-none  p-4 text-md lg:text-2xl md:text-xl"
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

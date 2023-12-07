import { useState, useEffect } from "react";

export const NoteEditor = ({ addNote }) => {
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const savedNoteContent = localStorage.getItem("noteContent");
    if (savedNoteContent) {
      setNoteContent(savedNoteContent);
    }
  }, []);

  const handleAddNote = () => {
    if (noteContent.trim() !== "") {
      const newNote = {
        id: new Date().getTime(),
        content: noteContent,
      };
      addNote(newNote);
      setNoteContent("");
      localStorage.setItem("noteContent", noteContent); // Save note content in local storage
    }
  };

  const handleNoteChange = (e) => {
    const content = e.target.value;
    setNoteContent(content);
    localStorage.setItem("noteContent", content); // Save note content in local storage
  };

  return (
    <div
      className="flex flex-col gap-4 p-2 bg-white rounded-2xl shadow-md"
    >
      <textarea
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="Start writing here..."
        className="w-80 h-40 rounded-md resize-none focus:outline-none bg-white p-4"
      />
      <div className="flex justify-end items-center">
        <button
          onClick={handleAddNote}
          className="border py-2 px-4 rounded-2xl bg-slate-200 hover:bg-pink-500"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

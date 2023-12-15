import { useState, useEffect } from "react";
import { NoteEditor } from "./notetaking/noteEditor";
import { NoteList } from "./notetaking/noteList";

export const Notetaking = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const SavedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(SavedNotes);
  }, []);

  const AddNote = (newNote) => {
    const UpdatedNotes = [...notes, newNote];
    setNotes(UpdatedNotes);
    localStorage.setItem("notes", JSON.stringify(UpdatedNotes));
  };

  const DeleteNote = (id) => {
    const UpdatedNotes = notes.filter((note) => note.id !== id);
    setNotes(UpdatedNotes);
    localStorage.setItem("notes", JSON.stringify(UpdatedNotes));
  };

  return (
    <div className="w-full">
      <p className="w-full text-2xl text-center font-bold pb-4">Note taking Board 📝</p>
      <NoteEditor AddNote={AddNote} />
      <NoteList notes={notes} DeleteNote={DeleteNote} />
    </div>
  );
};

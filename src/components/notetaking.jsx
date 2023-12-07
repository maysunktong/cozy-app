import { useState, useEffect } from "react";
import { NoteEditor } from "./notetaking/noteEditor";
import { NoteList } from "./notetaking/noteList";

export const Notetaking = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const addNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <h1>Markdown Note App</h1>
      <NoteList notes={notes} deleteNote={deleteNote} />
      <NoteEditor addNote={addNote} />
    </div>
  );
}

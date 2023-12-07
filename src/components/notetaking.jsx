import NoteEditor from './NoteEditor';
import NoteList from './NoteList';

export const Notetaking = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1>Markdown Note App</h1>
      <NoteList notes={notes} deleteNote={deleteNote} />
      <NoteEditor addNote={addNote} />
    </div>
  );
}

import ReactMarkdown from 'react-markdown';

export const NoteList = ({ notes, deleteNote, handleRemoveNote }) => {
  return (
    <div>
      <h2>Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <button onClick={() => deleteNote(note.id)}>Delete</button>
          <button onClick={() => handleRemoveNote(note.id)}>Remove</button>
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const NoteEditor = ({ addNote }) => {
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    const savedNoteContent = localStorage.getItem('noteContent');
    if (savedNoteContent) {
      setNoteContent(savedNoteContent);
    }
  }, []);

  const handleAddNote = () => {
    if (noteContent.trim() !== '') {
      const newNote = {
        id: new Date().getTime(),
        content: noteContent,
      };
      addNote(newNote);
      setNoteContent('');
      localStorage.setItem('noteContent', noteContent);  // Save note content in local storage
    }
  };

  const handleNoteChange = (e) => {
    const content = e.target.value;
    setNoteContent(content);
    localStorage.setItem('noteContent', content);  // Save note content in local storage
  };

  return (
    <div>
      <h2>Add a Note</h2>
      <textarea
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="Write your note in Markdown..."
      />
      <button onClick={handleAddNote}>Add Note</button>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown>{noteContent}</ReactMarkdown>
      </div>
    </div>
  );
};


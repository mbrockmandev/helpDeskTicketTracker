import { useSelector } from 'react-redux';

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  const noteStyle = {
    backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
    color: note.isStaff ? '#fff' : '#000',
  };

  return (
    <div
      className='note'
      style={noteStyle}>
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
}

export default NoteItem;

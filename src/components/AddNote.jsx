import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = (props) => {


    const context = useContext(NoteContext)
    const { addNote, getAllNotes } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = async (e) => {
        e.preventDefault()
        await addNote(note.title, note.description, note.tag)
        props.showAlert("Added the note Successfully", "success")
        setNote({ title: "", description: "", tag: "" })
        getAllNotes()
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>

            <div className='container my-3'>
                <h2>Add a note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input minLength={5} required type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input minLength={5} required type="text" className="form-control" id="description" value={note.description} name='description' autoComplete='off' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input minLength={5} required type="text" className="form-control" id="tag" value={note.tag} name='tag' autoComplete='off' onChange={onChange} />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" autoComplete='off' onChange={onChange} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
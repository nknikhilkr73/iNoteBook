
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'



const Notes = (props) => {

    const context = useContext(NoteContext)
    const { notes, getAllNotes, editNote } = context
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate()

    useEffect(() => {

        if (localStorage.getItem('token')) {

            getAllNotes()
        }
        else {
            navigate('/login')
        }

    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const ref = useRef(null)
    const refClose = useRef(null)




    const handleClick = async (e) => {

        refClose.current.click()
        await editNote(note.id, note.etitle, note.edescription, note.etag)

        props.showAlert("Updated Successfully", "success")
        getAllNotes()
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <AddNote showAlert={props.showAlert} />


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" minLength={5} required id="edescription" name='edescription' value={note.edescription} autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' autoComplete='off' value={note.etag} onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" >Add Note</button> */}
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to display '}
                </div>
                {notes.map((note, index) => {
                    return <NoteItem note={note} showAlert={props.showAlert} updateNote={updateNote} key={index} />
                })}
            </div>

        </div>
    )
}

export default Notes
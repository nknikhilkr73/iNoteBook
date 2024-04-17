import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    // const s1 = {
    //     "name": "nikhil",
    //     "class": "10a"
    // }
    // const [state, setState] = useState(s1)

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             'name': 'Kumar',
    //             'class': "tatti"
    //         })
    //         console.log(state);
    //     }, 3000)
    // }
    // value = {{ state, update }}

    const [notes, setNotes] = useState([])

    //Get all notes
    const getAllNotes = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = await response.json()

        setNotes(json)
    }


    //Add a note
    const addNote = async (title, description, tag) => {

        await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // console.log(await response.json());

        // //TODo api call
        // let note = {
        //     "_id": "65edc5fc15b7f2c0807c987a",
        //     "user": "65ecb5aae1ac4188781bd33f",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "1710081532932",
        //     "__v": 0
        // }
        // setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {


        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        // const json = await response.json()

        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)

    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        //Api call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });


        //logic to edit in client
        // let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                notes[index].title = title
                notes[index].description = description
                notes[index].tag = tag
                // break;
            }

        }
        // setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState
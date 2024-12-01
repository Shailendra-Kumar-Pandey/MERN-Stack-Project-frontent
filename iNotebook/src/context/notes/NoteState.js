import NoteContext from "./noteContext";
import React, {useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitioal = [];
  const [notes, setNotes] = useState(notesinitioal);

  
  // get all Notes
  const getNotes = async () => {
    // todo: API Call
     //API call
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers:{
        'Content-Type': 'aplication/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZjk3ZDRhYWFhMmEwNmNiYzAyYWUzIn0sImlhdCI6MTczMjIyMDg4NH0.21KcJYfygp7qxA-6g56tiVoSlYLCv782NDDpL5s_4Fc"
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Notes
  const addNote = async (title, description, tag) => {
     //API call
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZjk3ZDRhYWFhMmEwNmNiYzAyYWUzIn0sImlhdCI6MTczMjIyMDg4NH0.21KcJYfygp7qxA-6g56tiVoSlYLCv782NDDpL5s_4Fc"
        },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
 
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZjk3ZDRhYWFhMmEwNmNiYzAyYWUzIn0sImlhdCI6MTczMjIyMDg4NH0.21KcJYfygp7qxA-6g56tiVoSlYLCv782NDDpL5s_4Fc"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json);
     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  // Delete Notes
  const deleteNote = async(id) => {
    //API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'aplication/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZjk3ZDRhYWFhMmEwNmNiYzAyYWUzIn0sImlhdCI6MTczMjIyMDg4NH0.21KcJYfygp7qxA-6g56tiVoSlYLCv782NDDpL5s_4Fc"
      },    
    })
    const json = await response.json();
    console.log(json);
    // todo: API Call
  console.log("Deleting this note id" + id);
  const newNote=notes.filter((note)=>{
    return note._id!==id;
  })
  setNotes(newNote);  
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

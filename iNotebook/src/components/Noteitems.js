import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitems = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;

  const handleDelete =()=>{
     deleteNote(note._id);
     props.showAlert("Note Deleted !","success");
  }
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete} ></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;

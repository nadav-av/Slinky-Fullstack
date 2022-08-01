import React, { useState } from "react";
import { FormControl,InputLabel,Input,FormHelperText,Button } from '@mui/material';
import "./createTask.css";
import notificationClient from "../Services/notificationClient";

const CreateTask =({modal,toggle}) =>{
  const [content, setContent] = useState("");
  const [officeId, setOfficeId] = useState(1);
  const [category, setCategory] = useState("idea");

  const addNotification = async (e) => {
    e.preventDefault();
       try {
          await notificationClient.addNotification(
            officeId,
            content,
            category,
          )
          alert('Notification success!');
    } catch {
      console.err("err");
      alert("Notification Failed.");
    }
    
  }
    return(
        <>
        <div className="createTaskWrapper">
        <div className="create-task-container"> 
        <h1>Notification</h1>
        <FormControl>
        <InputLabel htmlFor="office-input">Office number</InputLabel>
        <Input id="office-input"  onChange={(e) => setOfficeId(e.target.value)} />
        </FormControl>
        <br></br>
        <br></br>
        <FormControl>
        <InputLabel htmlFor="category-input">Category</InputLabel>
        <Input id="category-input"  onChange={(e) => setCategory(e.target.value)} />
        </FormControl>
        <br></br>
        <br></br>
        <FormControl>
        <InputLabel htmlFor="content-input">Content</InputLabel>
        <Input id= "content-input"  onChange={(e) => setContent(e.target.value)} />
        <br></br>
        <Button onclick={addNotification()} variant="raised">Submit</Button>
      </FormControl>
      </div>
      </div>
      </>
    );
};

export default CreateTask
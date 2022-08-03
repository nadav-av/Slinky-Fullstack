import React, { useState } from "react";
import { FormControl,InputLabel,Input,Button } from '@mui/material';
import "./createTask.css";
import notificationClient from "../Services/notificationClient";
import { Dropdown } from "monday-ui-react-core/";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const CreateTask =({modal,toggle}) =>{
  const [content, setContent] = useState("");
  const [officeId, setOfficeId] = useState(1);
  const [category, setCategory] = useState("idea");
  let offices = [{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"}]
  let categories = [{value:"idea",label:"idea"},{value:"note",label:"note"},{value:"announcment",label:"announcment"}]

  const addNotification = async (e) => {
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
        <InputLabel htmlFor="office-input"></InputLabel>
        <Input id="office-input"  onChange={(e) => setOfficeId(e.target.value)} />
        <Dropdown
                      placeholder="Office number"
                      size={Dropdown.size.SMALL}
                      options={offices}
                      onOptionSelect={(input) => {
                        setOfficeId(input.value);
                    }}
                    onClear={() => {}}
                  />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="category-input"></InputLabel>
        <Input id="category-input"  onChange={(e) => setCategory(e.target.value)} />
        <Dropdown    
         placeholder="Category"
         size={Dropdown.size.SMALL}
         options={categories}
         onOptionSelect={(input) => {
          setCategory(input.value);
        }}
        onClear={() => {}}
        />


        </FormControl>
        <br></br>
        <br></br>
        <br></br>
        <FormControl>
        <TextareaAutosize
            minRows={3}
            maxRows={6}
            aria-label="maximum height"
            placeholder="Content"
            style={{ width: 190 }}
            onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <br></br>
      <br></br>
      <Button onClick={addNotification} variant="raised">Submit</Button>

      </div>
      </div>
      </>
    );
};

export default CreateTask
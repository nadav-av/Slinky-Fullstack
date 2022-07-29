import React from "react";
import { FormControl,InputLabel,Input,FormHelperText,Button } from '@mui/material';
import "./createTask.css";


const CreateTask =({modal,toggle}) =>{
    return(
        <>
        <div className="createTaskWrapper">
        <div className="create-task-container"> 
        <FormControl>
        <InputLabel htmlFor="my-input">Create task</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">.......</FormHelperText>
        <Button variant="raised">Submit</Button>
      </FormControl>
      </div>
      </div>
      </>
    );
};

export default CreateTask
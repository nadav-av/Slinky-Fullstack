import React, { useState } from "react";
import "./createTask.css";
import notificationClient from "../Services/notificationClient";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const CreateTask = ({ onSubmit, reRender }) => {
  const [content, setContent] = useState("");
  const [officeId, setOfficeId] = useState(1);
  const [category, setCategory] = useState("idea");

  const handleOfficeChange = (e) => {
    setOfficeId(e.target.value);
  };

  let categories = [
    { value: "problem", label: "Problem" },
    { value: "idea", label: "Idea" },
    { value: "giveaway", label: "Giveaway" },
    { value: "announcment", label: "Announcment" },
    { value: "emergancy", label: "Emergancy" },
  ];

  const addNotification = async (e) => {
    try {
      onSubmit();
      await notificationClient.addNotification(officeId, content, category);
      await reRender();
    } catch {
      console.err("err");
      alert("Notification Failed.");
    }
  };
  return (
    <div className="center add-notification-center">
      <form className="add-notification-form" onSubmit={addNotification}>
        <h1 className="add-notification-header">Add your notification</h1>

        <FormControl margin="normal" className="add-notification-form-control">
          <InputLabel id="demo-simple-select-label">Office</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={officeId}
            label="Office"
            onChange={handleOfficeChange}
          >
            <MenuItem key={1} value={1}>
              Rubinshtein Twin Towers
            </MenuItem>
            <MenuItem key={2} value={2}>
              Azrieli Square Tower
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal" className="add-notification-form-control">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={1} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <textarea
          className="add-notification-text-area"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <span></span>
        <input className="add-notification-submit" type="submit" />
      </form>
    </div>
  );
};

export default CreateTask;

// <>
//       <div className="createTaskWrapper">
//         <div className="create-task-container">
//           <h1>Your Notification</h1>
//           <FormControl>
//             <Dropdown
//               placeholder="Office number"
//               size={Dropdown.size.SMALL}
//               options={offices}
//               onOptionSelect={(input) => {
//                 setOfficeId(input.value);
//               }}
//               onClear={() => {}}
//             />
//           </FormControl>
//           <FormControl>
//             <Dropdown
//               placeholder="Category"
//               size={Dropdown.size.SMALL}
//               options={categories}
//               onOptionSelect={(input) => {
//                 setCategory(input.value);
//               }}
//               onClear={() => {}}
//             />
//           </FormControl>
//           <br></br>
//           <br></br>
//           <br></br>
//           <FormControl>
//             <TextareaAutosize
//               minRows={2}
//               maxRows={4}
//               aria-label="maximum height"
//               placeholder="Content"
//               style={{ width: 250 }}
//               onChange={(e) => setContent(e.target.value)}
//             />
//           </FormControl>
//           <br></br>
//           <br></br>
//           <Button
//             id="submit-notification"
//             onClick={addNotification}
//             variant="raised"
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     </>

import React, { useState,useEffect } from "react";
import "./notification.css";
import NotificationForm from "../../Components/NotificationForm/NotificationForm";
import CreateTask from "../../Modals/CreateTask";
import GenericModal from "../../Components/GenericModal/genericModal"
let serverMockData =
[{idOffice:1,userName:"SHALEV",content:"toilet full of a shit",category:"review"},
{idOffice:1,userName:"NADAV",content:"if you wand cuddle smile pls",category:"review"},
{idOffice:1,userName:"ROTEM",content:"rak jin tonic ve moabet",category:"review"},
{idOffice:1,userName:"VIKO",content:"passport card",category:"review"},
{idOffice:1,userName:"SHALEV",content:"toilet full of a shit",category:"review"},
{idOffice:1,userName:"NADAV",content:"if you wand cuddle smile pls",category:"review"},
{idOffice:1,userName:"ROTEM",content:"rak jin tonic ve moabet",category:"review"},
{idOffice:1,userName:"VIKO",content:"passport card",category:"review"}
];
const Notification = () => {
const [data, setData] = useState([]);
const [modal, setModal] = useState(false);
useEffect(() => {},[serverMockData]);

const toggle = () => setModal(!modal);
const addTask = () =>{
  setData(...data,true)
}

  return (
    <>
     {modal === true ? 
    <GenericModal open ={modal} onClose ={()=> {setModal(false)}} content={<CreateTask toggle ={toggle} modal ={modal}/>}onSubmit={()=>{}}/>
    :
    <div className="notification-container">
      <button className="btn-primary" onClick={() => setModal(true)}> Create Task </button>
      <div className="notification-container-array">
      {serverMockData.map((element) =>       
         <NotificationForm data={element} key={element.userName}></NotificationForm>
      )}
    </div>
    </div>
      }
    </>
  );
};

export default Notification;

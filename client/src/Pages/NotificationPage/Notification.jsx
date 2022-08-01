import React, { useState,useEffect } from "react";
import "./notification.css";
import NotificationForm from "../../Components/NotificationForm/NotificationForm";
import CreateTask from "../../Modals/CreateTask";
import GenericModal from "../../Components/GenericModal/genericModal"
import notificationClient from "../../Services/notificationClient";
import { INVALID_NOTIFICATIONS } from "../../Services/Consts";

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

useEffect(() => {
  getNotifications();
},[data]);


const getNotifications = async ()=>{
  try {
        console.log(await notificationClient.getNotifications(),"rotem")
        setData(await notificationClient.getNotifications());
      } catch (err) {
      console.error("err");
    }
}


const toggle = () => setModal(!modal);


  return (
    <>
     {modal === true ? 
    <GenericModal open ={modal} onClose ={()=> {setModal(false)}} content={<CreateTask toggle ={toggle} modal ={modal}/>}/>
    :
    <div className="notification-container">
      <button className="btn-primary" onClick={() => setModal(true)}> Create Task </button>

      <div className="notification-container-array">
      {data.map((element) =>       
         <NotificationForm data={element} key={element.userName}></NotificationForm>
      )}
      </div>
    </div>
      }
    </>
  );
};

export default Notification;

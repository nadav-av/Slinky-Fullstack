import React, { useState,useEffect } from "react";
import "./notification.css";
import NotificationForm from "../../Components/NotificationForm/NotificationForm";
import CreateTask from "../../Modals/CreateTask";
import GenericModal from "../../Components/GenericModal/genericModal"
import notificationClient from "../../Services/notificationClient";
import { INVALID_NOTIFICATIONS } from "../../Services/Consts";

const Notification = () => {
const [data, setData] = useState([]);
const [modal, setModal] = useState(false);
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  getNotifications();
  const delayTimeOneMin=6000;
  const interval = setInterval(() => {
    getNotifications();
    setSeconds(seconds => seconds + 1);
  }, delayTimeOneMin); 
  return () => clearInterval(interval);
 
},[]);


const getNotifications = async ()=>{
  try {
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
    <>
    <div className = "header text-center">
    <h1 id="board-title-txt">Notification board</h1>
    <br></br>
    <button className="btn btn-primary mt-2" id="create-btn" onClick={() => setModal(true)}> Create notification</button>
    </div>
    <div className="notification-container">

      <div className="notification-container-array">
      {data.map((element, index) =>       
         <NotificationForm data={element} key={index}></NotificationForm>
      )}
      </div>
    </div>
    </>
      }
    </>
  );
};

export default Notification;

import React, { useState, useEffect } from "react";
import "./notification.css";
import NotificationForm from "../NotificationForm/NotificationForm";
import CreateTask from "../../Modals/CreateTask";
import GenericModal from "../GenericModal/genericModal";
import notificationClient from "../../Services/notificationClient";
import {Tab,Tabs} from '@mui/material';
const Notification = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [officeId,setOfficeId]=useState(1);
  const [numOfOffices,setNumOfOffices]=useState(2);

  useEffect(() => {
    getNotifications();
    const delayTimeOneMin = 6000;
    const interval = setInterval(() => {
      getNotifications();
      setSeconds((seconds) => seconds + 1);
    }, delayTimeOneMin);
    return () => clearInterval(interval);
  }, []);

  const getNotifications = async () => {
    try {
      setData(await notificationClient.getNotifications());
    } catch (err) {
      console.error("err");
    }
  };

  const toggle = () => setModal(!modal);
  const handleChange = () =>{
    setOfficeId(officeId === 1 ? 2:1);
  }
  return (
    <div className="notifications-feature">
   
      {modal === true ? (
        <GenericModal
          open={modal}
          onClose={() => {
            setModal(false);
          }}
          content={
            <CreateTask
              onSubmit={() => setModal(false)}
              toggle={toggle}
              modal={modal}
              reRender={getNotifications}
            />
          }
        />
      ) : (
        <>
          <div className="header-not">
          <Tabs value={officeId-1} variant="fullWidth" onChange={handleChange} centered>
              <Tab label="Rubinshtein Twin Towers"/>
              <Tab label="Azrieli Square Tower" />
          </Tabs>

            <h1 id="board-title-txt">Notification board</h1>
            <br></br>
            <button
              className="btn btn-primary mt-2"
              id="create-btn-not"
              onClick={() => setModal(true)}
            >
              {" "}
              Create notification
            </button>
            
          </div>
          <div className="notification-data">
          
            <div className="notification-container-array">
              {data.filter(notification =>notification.officeId === officeId).map((element, index) => (
                <NotificationForm
                  data={element}
                  key={index}
                  reRender={getNotifications}
                ></NotificationForm>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

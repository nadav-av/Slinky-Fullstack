import React, { useState, useEffect } from "react";
import "./notification.css";
import NotificationForm from "../NotificationForm/NotificationForm";
import CreateTask from "../../Modals/CreateTask";
import GenericModal from "../GenericModal/genericModal";
import notificationClient from "../../Services/notificationClient";
import { Loader } from "monday-ui-react-core";

const Notification = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


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
      notificationClient.getNotifications()
        .then ((res) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 300) //only for better visualization
          setData(res);
        });
    } catch (err) {
      setIsLoading(true);
      console.error("err");
    }
  };

  useEffect(() => {
  }, [data]);

  const toggle = () => setModal(!modal);

  const showData = () => {
    if (isLoading) {
      return (
        <div className="notifi-loader">
        <Loader size={40} />
        </div>
      )
    }
    else {
      return (
        <div className="notification-data">
              <div className="notification-container-array">
                {data.map((element, index) => (
                  <NotificationForm
                    data={element}
                    key={index}
                    reRender={getNotifications}
                  ></NotificationForm>
                ))}
              </div>
            </div>
      )
    }
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
          {showData()}
        </>
      )}
    </div>
  );
};

export default Notification;

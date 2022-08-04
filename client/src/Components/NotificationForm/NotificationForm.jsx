import "./notificationForm.css";
import React, { useEffect, useState } from "react";
import notificationClient from "../../Services/notificationClient";
import userClient from "../../Services/userClient"
const NotificationForm = ({data,index}) => {

  const [displayAtt, setDisplayAtt] = useState(false);

  


  useEffect(() => {
    userClient
      .getUser()
      .then((myUser) => {
        if(myUser.userName === data.madeBy)
        {
          setDisplayAtt(true);
        }
      });
  }, []);


  const colors = [
    {
        primaryColor : "#5D93E1",
        secondaryColor : "#ECF3FC"
    },
    {
        primaryColor : "#F9D288",
        secondaryColor : "#FEFAF1"
    },
    {
        primaryColor : "#5DC250",
        secondaryColor : "#F2FAF1"
    },
    {
        primaryColor : "#F48687",
        secondaryColor : "#FDF1F1"
    },
    {
        primaryColor : "#B964F7",
        secondaryColor : "#F3F0FD"
    }
]

const renderSwitch = (category) =>{
  switch(category) {
    case 'problem':
      return 0;
    case 'idea':
      return 1;
    case 'note':
      return 2;
    case 'announcment':
      return 3;
    case 'emergancy':
      return 4;
    default:
      return 0;
  }
}




const deleteNotification = async (notificationId) => {
  try {
    console.log('Form delete function: '+notificationId)
     await notificationClient.deleteNotification(
      notificationId,
     )
     alert('Notification deleted!');
} catch {
 console.err("err");
 alert("Notification Failed.");
}
}
console.log(displayAtt);
return (
  <div class = "card-wrapper mr-5">
  <div class = "card-top" style={{"background-color": colors[renderSwitch(data.category)].primaryColor}}></div>
  <div class = "task-holder">
      <span class = "card-header" style={{"background-color": colors[renderSwitch(data.category)].secondaryColor, "border-radius": "10px"}}>{data.madeBy}</span>
      <br></br>
      <h5>{data.category}</h5>  
      <br></br>
      <br></br>
      <h5>{data.content}</h5>
      {
        displayAtt ?       <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
        <i className="fas fa-trash-alt"   style = {{"color" : colors[renderSwitch(data.category)].primaryColor, "cursor" : "pointer"}} onClick = {()=>{deleteNotification(data.id)}}></i>
</div> : <></>
      }  

      </div>  
      </div>   
  );
};



// 
export default NotificationForm;

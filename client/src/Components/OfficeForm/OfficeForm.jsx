import React, {useState} from "react";
import "./officeForm.css";
import office_1 from "./offices-images/yitzhak-sadeh-6.jpg"
import office_2 from "./offices-images/azrieli.jpg"
import office_3 from "./offices-images/gav-yam1.jpg"
import MapForm from "../mapForm/MapForm";
import GenericModal from "../GenericModal/genericModal";


const OfficeForm = () => {
    const [officeId, setofficeId] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const getOffice = async (officeId) => {  
        setofficeId(officeId);
        setIsOpenModal(true);
    };


    /*const handleClick = (officeId) => {
        console.log(officeId); //need to move to bookingMap with office param
    }*/

    return (
        <div>
            {isOpenModal === true ? 
            <GenericModal open ={isOpenModal} onClose ={()=> {setIsOpenModal(false)}} content={
            <MapForm officeId={officeId}/>
            }/>
            :
            <div className="wrapper">
                <div className="header">
                    <h1>Choose Office</h1>
                </div>
                <div className="offices">
                    <div className="office_option" onClick={()=>{getOffice(1);}}>
                    <div className="office_img">
                        <img src={office_1} alt="office" />
                    </div>
                    <h3>Rubinshtein Twin Towers</h3>
                    <span>Yitzhak-sadeh 6, Tel Aviv, Floor 35</span>
                    <p>Modern open-space and offices.
                    includes eight open-space seats, three personal offices, two small rooms and one conference room.</p>
                    </div>
                    <div className="office_option" onClick={()=>{getOffice(2)}}>
                    <div className="office_img">
                        <img src={office_2} alt="office" />
                    </div>
                    <h3>Azrieli Square Tower</h3>
                    <span>Menahem Begin 132, Tel Aviv, Floor 26</span>
                    <p>write something about office</p>
                </div>
                    <div className="office_option soon">
                    <div className="office_img">
                        <img src={office_3} alt="office"/>
                    </div>
                    <h3>Gav Yam Center</h3>
                    <span>Maskit 12, Herzliya</span>
                    <p>Coming Soon...</p>
                </div>
                </div>
            </div>	
        }
        </div>	
    );
  };
  
  export default OfficeForm;


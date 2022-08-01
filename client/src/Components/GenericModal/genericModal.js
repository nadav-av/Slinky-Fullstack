import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import './genericModal.css';
import {DialogContentContainer } from "monday-ui-react-core";

const GenericModal = ({ open, onClose, content }) => {

    return (
        <div>
        <DialogContentContainer type={DialogContentContainer.types.MODAL}>
            <div>
                {content}
            </div>
        </DialogContentContainer >
        </div>
    )
}

export default GenericModal
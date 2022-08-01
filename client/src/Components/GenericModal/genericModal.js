import React from 'react'
import Modal from '@mui/material/Modal';
import './genericModal.css';

const GenericModal = ({ open, onClose, content }) => {
    return (
        <div>
        <Modal open={open} onClose={onClose}>
            <div className='content-container'>
                {content}
            </div>
        </Modal>
        </div>
    )
}

export default GenericModal
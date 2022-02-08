import React from 'react';
import { Modal } from 'rsuite';
import Button from '../button/Button'

const AppModal = ({
    children,
    handleClose,
    titleClose,
    title,
    isLoading,
    isDisable,
    handleBack,
    form,
    formSubmit,
    titleButton,
    themeButton,
    noBtnAction,
	myCloseButton,
    ...otherProps
}) => {
    return (
        // eslint-disable-next-line react/button-has-type
        <Modal
            style={{ overflowY: 'auto' }}
            {...otherProps}
            onHide={handleClose}
        >
            <Modal.Header closeButton={myCloseButton && myCloseButton}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 400 }}>{form}</Modal.Body>

            {!noBtnAction ? (
                <Modal.Footer>
                    <Button theme="info" onClick={titleClose ? handleBack : handleClose} style={{ marginRight: 5 }}>
                        {titleClose ? titleClose : "Close"}
                    </Button>
                    <Button
                        disabled={isDisable}
                        isLoading={isLoading}
                        theme={themeButton}
                        onClick={formSubmit}
                    >
                        {titleButton ? titleButton : "Yes"}
                    </Button>
                </Modal.Footer>
            ) : null}


        </Modal>
    );
};

export default AppModal;

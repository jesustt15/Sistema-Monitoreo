/* eslint-disable react/prop-types */
import '../../components/components.scss';

export const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-confirmation">
                <p>{message}</p>
                <div className="buttons">
                    <button className="btn-confirm" onClick={onConfirm}>Si</button>
                    <button className="btn-cancel" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};



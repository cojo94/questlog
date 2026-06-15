function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal
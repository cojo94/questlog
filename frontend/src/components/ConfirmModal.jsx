function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="modal-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="modal-danger" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal
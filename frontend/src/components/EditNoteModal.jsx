import { useState } from "react"

function EditNoteModal({ title, noteContent, onClose, onSave }) {

    const [content, setContent] = useState(noteContent)

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <textarea className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} />
                <div className="modal-actions">
                    <button className="modal-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-confirm" onClick={() => onSave(content)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditNoteModal;
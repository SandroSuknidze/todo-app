import '../scss/AddTaskModal.scss';
import {useState} from "react";

function AddTaskModal({ closeModal, addTask }) {

    const [input, setInput] = useState('');

    function handleInputChange(event) {
        setInput(event.target.value);
    }

    return (
        <div className="overlay" onClick={closeModal}>
            <div className="task-modal" onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className="modal-header">NEW NOTE</div>
                    <div className="modal-body">
                        <input type="text" placeholder="Input your note..." onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="cancel" onClick={() => closeModal()}>Cancel</div>
                    <div className="apply" onClick={() => {closeModal(); addTask(input)}}>Apply</div>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;
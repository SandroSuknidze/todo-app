import '../scss/Task.scss';
import correctIcon from '../assets/correct-icon-default.svg';
import {useState} from "react";
import pencilIcon from "../assets/pencil-icon.svg";
import trashIcon from "../assets/trash-icon.svg";
import pencilPurpleIcon from "../assets/pencil-icon-purple.svg";
import trashRedIcon from "../assets/trash-icon-red.svg";


function Task({id, name, deleteTask, doneTask, isComplete, updateTask}) {
    const [isPencilHovered, setIsPencilHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        updateTask(id, newName);
        setIsEditing(false);
    }


    return (
        <div className="task">
            <div className="left-side">
                <div className={`checkbox ${isComplete && 'checked'}`} onClick={() => {
                    doneTask(id);
                }}>
                    {isComplete && <img src={correctIcon} alt="correct-icon" className="correct-icon"/>}
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
                            }
                        }}/>
                ) : (
                    <div className={`note ${isComplete ? 'done' : ''}`}>{name}</div>
                )}
            </div>
            <div className="icons">
                {isEditing ? (
                    <img onClick={handleSave} src={correctIcon} alt="correct-icon" className="correct-icon"/>
                ) : (
                    <>
                        <img onMouseEnter={() => setIsPencilHovered(true)}
                             onMouseLeave={() => setIsPencilHovered(false)}
                             onClick={handleEdit}
                             src={isPencilHovered ? pencilPurpleIcon : pencilIcon}
                             alt="pencil-icon"/>

                        <img onMouseEnter={() => setIsTrashHovered(true)}
                             onMouseLeave={() => setIsTrashHovered(false)}
                             onClick={() => deleteTask(id)}
                             src={isTrashHovered ? trashRedIcon : trashIcon}
                             alt="trash-icon"/>
                    </>
                )}

            </div>
        </div>
    );
}

export default Task;
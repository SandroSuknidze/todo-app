import {useState, useEffect} from 'react';
import './scss/App.scss';
import searchIcon from './assets/search-icon.svg';
import moonIcon from './assets/moon-icon.svg';
import sunIcon from './assets/sun-icon.svg';
import arrowDown from './assets/arrow-down-icon.svg';
import arrowUp from './assets/arrow-up-icon.svg';
import plusIcon from './assets/plus-icon.svg';
import detectiveBlack from './assets/detective-black.png';
import detectiveWhite from './assets/detective-white.png';
import Task from "./components/Task.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";

function App() {
    const [theme, setTheme] = useState('dark');
    const [dropdown, setDropdown] = useState(false);
    const [selected, setSelected] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [todoListFiltered, setTodoListFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        filterTask(selected);
    }, [todoList, selected, searchQuery]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const toggleDropdown = () => {
        setDropdown(prevDropdown => !prevDropdown);
    }

    const toggleSelected = (value) => {
        setSelected(value);
    }

    const options = [
        {
            "id": 1,
            "name": "All",
            "value": "All",
        },
        {
            "id": 2,
            "name": "Complete",
            "value": "Complete",
        },
        {
            "id": 3,
            "name": "Incomplete",
            "value": "Incomplete",
        }
    ];


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteTask = (id) => {
        setTodoList(todoList.filter((todo) => (todo.id !== id)));
    };

    const addTask = (value) => {
        setTodoList([...todoList, {id: todoList.length + 1, name: value, isComplete: false}]);
    }

    const filterTask = () => {
        let filteredList = todoList;

        if (selected === "Complete") {
            filteredList = filteredList.filter((todo) => todo.isComplete === true);
        } else if (selected === "Incomplete") {
            filteredList = filteredList.filter((todo) => todo.isComplete === false);
        }

        if (searchQuery) {
            filteredList = filteredList.filter((todo) =>
                todo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setTodoListFiltered(filteredList);
    };


    const doneTask = (id) => {
        setTodoList(todoList.map((todo) => (todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo)));
    }

    const updateTask = (id, newName) => {
        setTodoList(todoList.map((todo) => (todo.id === id? {...todo, name: newName} : todo)));
    }

    return (
        <div className="App">
            {isModalOpen && <AddTaskModal closeModal={closeModal} addTask={addTask}/>}
            <header className="App-header">
                <p className="head-text">todo list</p>
                <div className="search-line">
                    <div className="search-bar">
                        <input type="text" className="search" placeholder="Search note..." value={searchQuery}
                               onChange={(event) => setSearchQuery(event.target.value)}/>
                        <img src={searchIcon} alt="search-icon" className="search-icon"/>

                    </div>
                    <div className={`select ${dropdown ? 'active' : ''}`} onClick={toggleDropdown}>
                        <p>{selected}</p>
                        <img src={dropdown ? arrowUp : arrowDown} alt="" className="arrow"/>
                        {dropdown &&
                            <div className="dropdown-box">
                                {options.map(option => (
                                    <option key={option.id}
                                            onClick={() => toggleSelected(option.name)}>{option.name}</option>
                                ))}
                            </div>}
                    </div>
                    <div onClick={toggleTheme} className="switch">
                        <img src={theme === 'light' ? moonIcon : sunIcon} alt="mode"/>
                    </div>
                </div>


            </header>
            <main>
                {todoListFiltered.length !== 0 ? todoListFiltered.map((task) => {
                    return (
                        <Task key={task.id} id={task.id} name={task.name} isComplete={task.isComplete}
                              deleteTask={deleteTask} doneTask={doneTask} updateTask={updateTask}/>
                    )
                }) : (
                    <div className="no-tasks">
                        <img src={theme === "dark" ? detectiveBlack : detectiveWhite} alt="no-tasks-image"/>
                        <p>Empty...</p>
                    </div>
                )}
            </main>
            <footer>
                <div className="add" onClick={openModal}>
                    <img src={plusIcon} alt="add-icon"/>
                </div>
            </footer>
        </div>
    );
}

export default App;

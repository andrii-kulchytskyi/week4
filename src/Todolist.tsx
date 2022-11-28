import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from "./Todolist.module.css"
import {Checkbox} from "./components/Checkbox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    updateIsDone: (taskId: string, newIsDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
        } else {
            setError(true)
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    const [clickedButton, setClickedButton] = useState('all')
    const onAllClickHandler = () => {
        props.changeFilter("all")
        setClickedButton("all")
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setClickedButton("active")
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setClickedButton("completed")
    };
    const updateIsDoneHandler1 = (tID: string, newIsDone: boolean) => {
        props.updateIsDone(tID, newIsDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    // const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.updateIsDone(t.id, event.currentTarget.checked)
                    // }
                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? styles.isDone : ""}>
                        <Checkbox checked={t.isDone} callBack={(newIsDone) => updateIsDoneHandler1(t.id, newIsDone)}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={updateIsDoneHandler}/>*/}
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={clickedButton == 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All
            </button>
            <button className={clickedButton == 'active' ? styles.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={clickedButton == 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>

    </div>
}

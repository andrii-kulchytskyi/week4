import React, {ChangeEvent} from 'react';


type PropsType = {
    checked: boolean
    callBack: (newIsDone: boolean) => void
}

export const Checkbox = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }

    return (
        <div>
            <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
        </div>
    );
};


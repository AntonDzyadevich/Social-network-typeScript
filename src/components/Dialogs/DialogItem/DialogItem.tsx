import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import { DialogsType } from '../../../types/entities';


const DialogItem: React.FC<DialogsType> = ({name,id}) => {
    let path = "/dialogs/" + {id};
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}


export default DialogItem;
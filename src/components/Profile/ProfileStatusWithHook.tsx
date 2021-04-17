import React, {ChangeEvent, useState} from "react";





type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}



const ProfileStatusWithHook: React.FC<ProfileStatusPropsType>= (props) =>  {
    const [editMode, setEditMode] = useState(false);

    const [status, setStatus] = useState(props.status);

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }




    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }


        return (
            <div>
                {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "This I'am"}</span>
                </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>
                }
            </div>
        )}




export default ProfileStatusWithHook;
import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/Anton.jpg";
import ProfileStatusWithHook from "../ProfileStatusWithHook";
import { ProfileType } from '../../../Redux/profile-reducer';
import ProfileDataForm from "./ProfileDataForm";


type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile,
                                                            status,
                                                            updateStatus,
                                                            isOwner,
                                                            savePhoto,
                                                            saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return < Preloader/>
    }
    const photo = profile.photos.large || userPhoto;

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
        const onSubmit = (formData: ProfileType) => {

            saveProfile(formData).then(
                () => {
                    setEditMode(false);
                }
            );
        }


        return <div>
            <div className={s.descriptionBlock}>
                <img src={photo}/>
                {isOwner && <input onChange={mainPhotoSelected} type={"file"}/>}
                {editMode ? <ProfileDataForm initialValues={profile}  profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}
                < ProfileStatusWithHook status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    }
    type ContactsPropsType = {
        contactTitle: string
        contactValue: string | null
    }

    type ContactsType = {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }

    type ProfileDataPropsType = {
        profile: ProfileType
        isOwner: boolean
        goToEditMode: () => void
    }

    const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
        return <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>

            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>:{profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>

        </div>
    }

    const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
        return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>
    }


export default ProfileInfo;
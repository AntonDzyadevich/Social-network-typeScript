import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostsType } from '../../../Redux/profile-reducer';
import  {reduxForm,InjectedFormProps, Field} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/Preloader/FormsControls/FormsControls";




const MyPosts:React.FC<{posts: Array<PostsType>,
                        // newPostText: string,
                        // updateNewPostText: (text:string) => void
                        addPost: (newPostText: string) => void}> = React.memo((props) => {
    console.log("RENDER")
    let postsElements =[...props.posts]
        .reverse()
        .map(p => < Post  id={p.id} key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})




type FormDataType = {
    newPostText: string
}


const maxLength10 = maxLengthCreator(10)

const  AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name="newPostText" component ={Textarea} placeholder={"Post message"}
                           validate={[required, maxLength10]} />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>



    )
}

const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)



export default MyPosts;
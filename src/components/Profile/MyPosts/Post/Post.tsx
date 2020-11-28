import React from 'react';
import s from './Post.module.css';
import {PostsType} from "../../../../types/entities";



const Post:React.FC<PostsType> = ({message,likesCount}) => {
    return (
        <div className={s.item}>
            <img
                src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
                alt=""/>
            {message}
            <div>
                <span>like {likesCount}</span>
            </div>
        </div>
    )
}

export default Post;
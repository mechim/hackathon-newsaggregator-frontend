import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
function Article() {
    const [post, setPost] = useState({});
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try{
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Adjust content type as needed
                'Authorization': 'Bearer ' + token
            };
            await axios.get('http://127.0.0.1:8000/posts/get-post/57', {headers}).then((res) => {
                console.log(res.data['post']);
                setPost(res.data['post']);
            });
        } catch (e){
            console.error('error in fetchin article', e);
        }
        
    }
    return(
        <>
        <Navbar/>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <a href={post.link}>{post.link}</a>
        <p>{post.timestamp}</p>
        </>
    )
}

export default Article;
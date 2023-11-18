import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Poll from '../components/Poll';
import {Card, Spin} from 'antd';
import './Article.css'

function Article() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            await axios.get('http://127.0.0.1:8000/posts/get-post/'+localStorage.getItem('post'), { headers }).then((res) => {
                console.log(res.data['post']);
                setPost(res.data['post']);
                setLoading(false);
            });
        } catch (e) {
            console.error('error in fetchin article', e);
        }

    }
    return (
        <>
        <Navbar/>
        {!loading && post? 
        <>
        <Card className='post-wrapper'>
            <h1 className='post-header'>{post.title}</h1>
            <p className='post-date'>{post.timestamp}</p>
            <p className='post-body'>{post.body}</p>
            <p className='post-link'>Citește mai mult aici: <a href={post.link}>{post.link}</a></p>
        </Card>
        <div>
            {post.polls_attached && post.polls_attached.map(
                poll => <Poll key ={poll.id} pollData={poll}/>
            )}
        </div>
        
        </> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Spin />
              </div>}

        </>
    )
}

export default Article;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Poll from '../components/Poll';
import { Spin } from 'antd';
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
                'Content-Type': 'application/json', // Adjust content type as needed
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
            <Navbar />
            {!loading ? <>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <a href={post.link}>{post.link}</a>
                <p>{post.timestamp}</p>
                {post.polls_attached && post.polls_attached.map(
                    poll => <Poll key={poll.id} pollData={poll} />
                )}

            </> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Spin />
            </div>}

        </>
    )
}

export default Article;
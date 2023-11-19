import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Poll from '../components/Poll';
import CreatePoll from '../components/CreatePoll';
import { Button, Card, Spin } from 'antd';
import './Article.css'

function Article() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [showPollForm, setShowPollForm] = useState(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            setLoading(true);
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            await axios.get('http://127.0.0.1:8000/posts/get-post/' + localStorage.getItem('post'), { headers }).then((res) => {
                console.log(res.data['post']);
                setPost(res.data['post']);
                setLoading(false);
            });
        } catch (e) {
            console.error('error in fetchin article', e);
        }

    }

    const handlePollCreate = () => {
        setShowPollForm(!showPollForm);
    }

    const containerStyle = {
        backgroundColor: showPollForm ? '#e4ebf4' : '##f0f0f0',
    };

    return (
        <>
            <Navbar />
            {!loading && post ?
                <>
                    <Card className='post-wrapper'>
                        <h1 className='post-header'>{post.title}</h1>
                        <p className='post-date'>{post.timestamp}</p>
                        <p className='post-body'>{post.body}</p>
                        <p className='post-link'>Citește mai mult aici: <a href={post.link}>{post.link}</a></p>
                    </Card>

                    <div className='create-poll-block' style={containerStyle}>
                        <Button className='poll-create-button' type='primary' onClick={handlePollCreate}>
                            Creează un sondaj
                        </Button>

                        <div>
                            {showPollForm ? (
                                <CreatePoll postId={localStorage.getItem('post')} />
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>

                    <div>
                        {post.polls_attached && post.polls_attached.map(
                            poll => <Poll key={poll.id} pollData={poll} fetchData={fetchData} />
                        )}
                    </div>

                </> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <Spin />
                </div>}

        </>
    )
}

export default Article;
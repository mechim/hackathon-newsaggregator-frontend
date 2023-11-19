import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Spin } from 'antd';
import { Link } from 'react-router-dom/dist';
function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        fetchNews();
    }, [])

    useEffect(() => {
        sortData();
    }, [posts])

    const onClickArticle = async(id) => {
        localStorage.setItem('post', id);
    }
    const fetchNews = async () => {
        try {
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            axios.get('http://127.0.0.1:8000/posts/get-filtered', { headers }).then((res) => {
                console.log(res.data);
                setPosts(res.data);
                setLoading(false);
            })
        } catch (e) {
            console.error('error', e);
            setLoading(false);
        }

    }

    const sortData = async () => {
        if (posts['posts'])
            setSortedPosts(posts['posts'].slice().sort((a, b) => b.id - a.id));
    }
    console.log(sortedPosts);
    return (
        <>
            <Navbar />
            {loading ? <>
                <Spin />
            </> : <>
                {sortedPosts && sortedPosts.map(
                    post => <Link key={post.id} to='/article' onClick={() => onClickArticle(post.id)}><h3 key={post.id}>{post.title} - {post.timestamp}</h3></Link>
                )}
            </>}
        </>
    )
}

export default News;
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Spin } from 'antd';


function Cabinet() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])
    const fetchData = async () => {
        try {
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Adjust content type as needed
                'Authorization': 'Bearer ' + token
            };
            setLoading(true);
            await axios.get('http://127.0.0.1:8000/users/profile', { headers }).then((res) => {
                setData(res.data);
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data', error);
        }

        try {
            setLoading(true);
            await axios.get('http://127.0.0.1:8000/tags/get').then((res) => {
                console.log(res.data);
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data', error);
        }
    }
    return (
        <>
            <Navbar />

            {!loading && data.user ? <>
                <h1>{data.user['username']}</h1>
                <h1>{data.user['email']}</h1>
            </> :
                <Spin/>
            }

        </>
    )
}

export default Cabinet;
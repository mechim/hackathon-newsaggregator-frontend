import React, { useEffect, useState} from 'react';
import Navbar from '../components/Navbar'
import CreatePoll from '../components/CreatePoll';
function News() {
    useEffect(() => {
        fetchNews();
    }, [])

    const fetchNews = async() => {
        try{
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Adjust content type as needed
                'Authorization': 'Bearer ' + token
            };
            axios.get('http://127.0.0.1:8000/posts/get-filtered', {headers}).then((res) => {
                console.log(res.data);
            })
        } catch (e) {
            console.error('error', e);
        }
        
    }
    return(
        <>
        <Navbar/>
            <h1>Nesw</h1>
            <CreatePoll></CreatePoll>
        </>
    )
}

export default News;
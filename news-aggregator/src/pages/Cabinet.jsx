import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Spin, Checkbox, Button } from 'antd';


function Cabinet() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
    const [checkedTags, setCheckedTags] = useState([]);

    // console.log(checkedTags);
    const getChangeHandler = tagName => () => {
        if (checkedTags.includes(tagName)) {
            setCheckedTags(prev => [...prev.filter(tag => tag !== tagName)]);
        } else {
            setCheckedTags(prev => [...prev, tagName]);
        }
    }

    useEffect(() => {
        // console.log(data);
        if (data != undefined){
            console.log(data.user['subscriptions']);
            data.user['subscriptions'].forEach(element => {
                //const updatedChekedTags = [...checkedTags, element['name']];
                setCheckedTags(prev => [...prev.filter(tag => tag !== element['name']), element['name']]);
                // console.log(checkedTags)
            });
        }
        //     setCheckedTags(data.user['subscriptions']);
    }, [data])
    // console.log(checkedTags);

    useEffect(() => {
        console.log(checkedTags);
    }, [checkedTags])

    // useEffect(() => {
    //     console.log(tags);
    // }, [tags])
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
                // console.log(res.data);
                setTags(res.data.tags);
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data', error);
        }
    }
    const SubscribeUser = async () => {
        const token = await localStorage.getItem('access-token');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Adjust content type as needed
            'Authorization': 'Bearer ' + token
        };
        try {
            await axios.post('http://127.0.0.1:8000/users/update-subs', {"tags": checkedTags}, { headers }).then((res) => {
                // console.log(res.data)
            })
        } catch (e) {
            console.error(e);
        }
        
    }
    return (
        <>
            <Navbar />

            {!loading && data.user ? <>
                <h1>{data.user['username']}</h1>
                <h1>{data.user['email']}</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {
                        tags && tags.map(
                            tag => <Checkbox checked={checkedTags.includes(tag.name)} onChange={getChangeHandler(tag.name)} key={tag.name}>{tag.name}</Checkbox>
                        )
                    }
                </div>
                <Button type='primary' onClick={() => SubscribeUser() }>Aboneaza-te</Button>
            </> :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Spin />
            </div>
            }

        </>
    )
}

export default Cabinet;
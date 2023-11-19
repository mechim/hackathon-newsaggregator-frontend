import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Spin, Checkbox, Button, Row, Col } from 'antd';
import './Cabinet.css';


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
        if (data != undefined) {
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
            await axios.post('http://127.0.0.1:8000/users/update-subs', { "tags": checkedTags }, { headers }).then((res) => {
                // console.log(res.data)
            })
        } catch (e) {
            console.error(e);
        }

    }
    return (
        <div style={{backgroundColor:"#3d5a80", paddingBottom:"24.5%"}}>
            <Navbar />

            <div className='container_cabinet'>
                {!loading && data.user ? (
                    <>
                        <div className='text_cabinet' >

                            <h1>Login: {data.user['username']}</h1>
                            <h1>Email: {data.user['email']}</h1>
                        </div>

                        <div 
                        style={{ display: "flex", flexDirection: "column", marginTop: "-15%", marginLeft: "60%", width: "30%" }}
                        >
                            <h1>Categorii</h1>
                            {tags &&
                                tags.map((tag) => (
                                    <Checkbox
                                        className="tag-checkbox"
                                        checked={checkedTags.includes(tag.name)}
                                        onChange={getChangeHandler(tag.name)}
                                        key={tag.name}
                                    >
                                        {tag.name}
                                    </Checkbox>
                                ))}


                            <Button
                                
                                type="primary"
                                onClick={() => SubscribeUser()}
                            >
                                Aboneaza-te
                            </Button>
                        </div>

                    </>
                ) : (
                    <div className='spin-container'>
                        <Spin />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cabinet;
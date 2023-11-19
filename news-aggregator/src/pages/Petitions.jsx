import React, { useEffect, useState } from "react";
import { Button, Spin, Card, Form , Input, message } from 'antd';
import Navbar from "../components/Navbar";
import axios from 'axios';
import './Petitions.css'

const { Meta } = Card;

function Petitions() {
    const [loading, setLoading] = useState(true);
    const [petitions, setPetitions] = useState([]);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchPetitions();
    }, [])
    const handleCreate = async () => {
        setCreating(!creating);
    }
    const handleSubscription = async (id) => {
        try {
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            await axios.post(`http://127.0.0.1:8000/petitions/subscribe/${id}`, null, { headers }).then((res) => {
                console.log(res.data);
                showNotification('success', 'Mulțumesc! Vocea ta conteză!')
                fetchPetitions();
            })
        } catch (error) {
            console.error('error in subscribing', error);
            showNotification('error', 'Votul tău deja a fost înregistrat')
        }
    }
    const onFinish = async(values) => {
        try{
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            await axios.post('http://127.0.0.1:8000/petitions/create/', values, {headers}).then((res) => {
                console.log(res.data);
                handleCreate();
            })
        } catch (e) {
            console.log(values);
            console.error('error in creating petition');
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showNotification = (type, text) => {
        message[type](text);
    };

    const fetchPetitions = async () => {
        try {
            setLoading(true);
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            axios.get('http://127.0.0.1:8000/petitions/get-all', { headers }).then((res) => {
                console.log(res.data['petitions']);
                setPetitions(res.data['petitions'])
                setLoading(false);
            })
        } catch (error) {
            console.error('error fetching petitions', error);
        }
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <Spin />
                </div>
            ) : (
                <div>
                    <h2 style={{paddingLeft: '2%', marginLeft:"7%"}}>Petiții active</h2>
                    <Button type="primary" style={{ position: 'absolute', top: '7.5%', right: '5%', justifyContent: 'end', marginRight:"5%" }} onClick={() => handleCreate()}>Crează Petiție</Button>
                    {creating ? <div className="petition-form-wrapper">
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            colon={false}
                        >
                            <Form.Item
                                label="Titlul"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Introduceti va rog titlul petitiei',
                                    }
                                ]}>
                                <Input.TextArea cols={60} rows={2} />
                            </Form.Item>
                            <Form.Item

                            label="Text"
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: 'Introduceti va rog descriptia petitiei',
                                }
                            ]}
                            >
                            <Input.TextArea cols={60} rows={6} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >Trimite Petiția</Button>
                        </Form.Item>
                        </Form>
                    </div> : <></>}
                    <div className="petitions-wrapper">
                        {petitions.map(petition => (
                            <Card
                                className="petition-card"
                                key={petition.id}
                            >
                                <h2 className="petition-title">{petition.title}</h2>
                                <h3 className="petition-votes">{petition.subs_num} voturi</h3>
                                <hr></hr>
                                <p className="petition-body">{petition.body}</p>
                                <Button type="primary" onClick={() => handleSubscription(petition.id)}>Votează</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Petitions;

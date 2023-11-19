import React, { useEffect, useState } from "react";
import { Button, Spin, Card, Form , Input} from 'antd';
import Navbar from "../components/Navbar";
import axios from 'axios';

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
                fetchPetitions();
            })
        } catch (error) {
            console.error('error in subscribing', error);
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
                <>
                    <h1>Petitii active</h1>
                    <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => handleCreate()}>Creaza Petitie</Button>
                    {creating ? <div>
                        <Form
                            className='form'
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
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
                                <Input/>
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
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >Creaza Petitia</Button>
                        </Form.Item>
                        </Form>
                    </div> : <></>}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {petitions.map(petition => (
                            <Card
                                key={petition.id}
                                style={{ width: '100%', maxWidth: '900px', margin: '16px auto' }}

                            >
                                <h2>{petition.title}</h2>
                                <h3>Voturi: {petition.subs_num}</h3>
                                {/* <Meta title={petition.title} description={`Subscriptii: ${petition.subs_num}`} /> */}
                                <p>{petition.body}</p>
                                <Button type="primary" onClick={() => handleSubscription(petition.id)}>Voteza</Button>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Petitions;

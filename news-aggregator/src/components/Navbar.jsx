import React, { useState } from 'react';
import { Col, Row, Button, Layout, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import axios from 'axios';
import MenuBar from './Menu';

function Navbar() {
    const [hasResponse, setHasResponse] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const request = await axios.post('http://127.0.0.1:8000/authen/sign-in', values).then((res) => {
            console.log(res.data.tokens['access']);
            localStorage.setItem('access-token', res.data.tokens['access']);
            localStorage.setItem('refresh-token', res.data.tokens['refresh']);
            setHasResponse(true);
            navigate('/news');
        }).catch((e) => {
            console.error(e);
        });
        // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <nav className='navbar'>
            <Row>
                <Col span={6} style={{
                    position: 'absolute',
                    top: 3.5,
                    left: 10,
                    
                    
                }}>
                    {/* <Link to="/news">
                        <h1 style={{color:"white", fontFamily:"Lucinda Console", fontSize:"12px", marginLeft:"5%"}}>onClick</h1>
                    </Link> */}
                    <MenuBar />
                </Col>

                <Col
                    className='col2'
                    span={18}
                >

                    {localStorage.getItem('access-token') ? (

                        <Link to="/cabinet">Cont</Link>
                    ) :
                        <>
                            <Form

                                name="basic"
                                // labelCol={{
                                //     span: 8,
                                // }}
                                // wrapperCol={{
                                //     span: 16,
                                // }}
                                // style={{
                                //     maxWidth: 600,
                                // }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" }}
                            >
                                <Form.Item
                                    style={{ margin: 0 }}
                                    name="username"
                                   
                                >
                                    <Input
                                        placeholder='login' />
                                </Form.Item>

                                <Form.Item
                                    style={{ margin: 0 }}
                                    name="password"
                                   
                                >
                                    <Input.Password
                                        placeholder='parola'
                                    />
                                </Form.Item>


                                <Form.Item
                                    style={{ margin: 0 }}
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Intră
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Link to="/sign-up" style={{ marginLeft: 30 }}>
                                <Button type="primary" >
                                    Autentifică-te
                                </Button>
                            </Link>
                        </>
                    }


                </Col>
            </Row>
        </nav>
    )
}

export default Navbar;
import React, { useState } from 'react';
import { Col, Row, Button, Layout, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <nav style={{ display: "flex", flexDirection: "row", gap: "12px", backgroundColor: "#3d5a80", padding: 10 }}>
            <Row>
                <Col></Col>
                <Col style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" }}>
                    <Link to="/news">Acasa</Link>
                    {localStorage.getItem('access-token')? (

                        <Link to= "/cabinet">Cabinet</Link>
                    ):  <Form
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            placeholder='username' />
                    </Form.Item>

                    <Form.Item
                        style={{ margin: 0 }}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder='password'
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
                            Intra
                        </Button>
                    </Form.Item>
                </Form>}
                   
                    <Link to="/sign-up" style={{ marginLeft: 30 }}>
                        <Button type="primary" >
                            Autentifica-te
                        </Button>
                    </Link>
                </Col>
            </Row>
        </nav>
    )
}

export default Navbar;
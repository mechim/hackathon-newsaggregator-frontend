import React, {useState} from 'react';
import { Col, Row, Button, Layout, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Navbar() {
    const [hasResponse, setHasResponse] = useState(false);
    const navigate = useNavigate();
    const onFinish = async(values) => {
        const request = await axios.post('http://127.0.0.1:8000/authen/sign-in', values).then((res) => {
            console.log(res.data.tokens['access']);
            localStorage.setItem('access-token', res.data.tokens['access']);
            localStorage.setItem('refresh-token', res.data.tokens['refresh']);
            setHasResponse(true);
            navigate('/news');
        }).catch((e) =>{
            console.error(e);
        });
        // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <nav>
            <Row>
                <Col></Col>
                <Col>
                    <Link to="/news">Acasa</Link>
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
                    >
                        <Form.Item
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
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to="/sign-up">Autentifica</Link>
                </Col>
            </Row>
        </nav>
    )
}

export default Navbar;
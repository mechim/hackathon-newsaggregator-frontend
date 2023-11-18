import React, { useState} from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './SignUp.css'
function SignUp() {
    const [hasResponse, setHasResponse] = useState(false);
    const navigate = useNavigate();
    const onFinish = async(values) => {
        const request = await axios.post('http://127.0.0.1:8000/authen/sign-up', values).then((res) => {
            console.log(res.data);
            setHasResponse(true);
            navigate('/cabinet');
        }).catch((e) =>{
            console.error(e);
        });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
      setRequiredMarkType(requiredMarkValue);
    };

    return (
        <div className='background_box'>
            <Form 
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    marginTop: "30%",
                    marginLeft: "25%",
                    maxWidth: "60%",
                    alignItems: "center",
                }}
                initialValues={{
                    remember: true,
                    requiredMarkValue: requiredMark,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                colon = {false}
                requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
            >
                <Form.Item
                    className = 'input_name'
                    label={<span className='input_name'>Username</span>}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    
                    // style = {{
                    //     fontFamily: 'Istok Web',
                    //     fontStyle: normal,
                    //     fontWeight: 400,
                    //     fontSize: "32px",
                    //     lineHeight: "46px",
                    // }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                            type: 'email'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                   
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
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


        </div>
    )
}

export default SignUp;
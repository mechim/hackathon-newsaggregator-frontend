import React, { useState } from 'react';
import { Form, Input, Button, Image } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
function SignUp() {
    const [hasResponse, setHasResponse] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const request = await axios.post('http://127.0.0.1:8000/authen/sign-up', values).then((res) => {
            console.log(res.data);
            setHasResponse(true);
            navigate('/cabinet');
        }).catch((e) => {
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
        <div>
            <div className='box1'>
                <div className='box1_text'>
                    <h1>Fii activ!</h1>
                    <h1>Fii important!</h1>
                    <h1>Decide!</h1>
                </div>
                <div style={{ position: 'fixed', bottom: 0, left: 0, padding: '10px',  marginLeft:"10px" }}>
                    <Image
                        width={75}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Coat_of_arms_of_Moldova.svg/714px-Coat_of_arms_of_Moldova.svg.png?20210602112000"
                    />
                    <h1 style={{display:"inline", fontSize:"20px", marginLeft:"10px", color:"#4C4C4C"}}>Republica Moldova</h1>
                </div>
            </div>

            <div className='background_box'>
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
                        requiredMarkValue: requiredMark,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    colon={false}
                    requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
                >
                    <h1 className='header' style={{ marginLeft: "32%" }}>Înregistrare</h1>

                    <div className='input_wraper'>
                        <Form.Item

                            label={<span className='input_name'>Login</span>}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}



                        >
                            <Input style={{ alignItems: "center" }} />
                        </Form.Item>

                        <Form.Item

                            label={<span className='input_name'>Email</span>}
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

                            label={<span className='input_name'>Parola</span>}
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
                            <Button type="primary" htmlType="submit" className="button_styles">
                                <span style={{}}>Înregistrează-te</span>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>


            </div>
        </div>
    )
}

export default SignUp;
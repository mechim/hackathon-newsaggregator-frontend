import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import "./CreatePoll.css"

const CreatePoll = (props) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState(['', '']);

  const onFinish = async (values) => {
    try {
        const token = await localStorage.getItem('access-token');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        const pollData = {
            title: values.title,
            options: values.options.map((option) => option.option),
        };

        await axios.post(`http://127.0.0.1:8000/polls/create/${props.postId}`, pollData, { headers }).then((res) => {
            console.log(res.data)
        })
    } catch (error) {
        console.error('Error fetching data', error);
    }
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  return (
    <div className='create-poll-wrapper'>
      <h3 className='form-header'>Adaugă sondaj</h3>
      <Form form={form} className="form-wrapper" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item
          className="form-title"        
          name="title"
          label="Titlu"
          rules={[{ required: true, message: 'Adaugă titlu!' }]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name="options"
          initialValue={['', '']}
          rules={[
            {
              validator: async (_, options) => {
                if (!options || options.length < 2) {
                  return Promise.reject(new Error('Adăugați minimum 2 opțiuni'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    label="Opțiune"
                    className="form-item" 
                    name={[name, 'option']}
                    rules={[{ required: true, message: 'Introduce opțiunea!' }]}
                  >
                    <Input/>
                  </Form.Item>
                  {fields.length > 2 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    addOption();
                  }}
                  icon={<PlusOutlined />}
                >
                  Adaugă opțiune
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Postează
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePoll;

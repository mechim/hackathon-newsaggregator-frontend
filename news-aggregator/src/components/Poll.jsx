import React, { useState } from 'react';
import { Button, Radio, Card, message } from 'antd';
import axios from 'axios';
import './Poll.css'

const PollComponent = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const updatePoll = async () => {
        try {
            const token = await localStorage.getItem('access-token');
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            await axios.post(`http://127.0.0.1:8000/polls/vote/${props.pollData.id}/${selectedOption}`,
                null,
                { headers }).then((res) => {
                    showNotification('success', 'Mulțumesc! Vocea ta conteză!');
                    props.fetchData();
                });
        } catch (e) {
            console.error('error in fetchin article', e);
            showNotification('error', 'Votul tău deja a fost înregistrat')
        }
    }

    const showNotification = (type, text) => {
        message[type](text);
    };

    const handleVote = () => {
        if (selectedOption !== null) {
            updatePoll();
        } else {
            showNotification('error', 'Selectează opțiunea înainte de a vota')
        }
    };

    return (
        <Card className='poll-wrapper' title={props.pollData.title}>
            <Radio.Group className='poll-options' onChange={handleOptionChange} value={selectedOption}>
                {props.pollData['options'].map((option, index) => (
                    <Radio className='poll-option' key={index} value={index}>
                        {option} - {props.pollData.votes[index]} votări
                    </Radio>
                ))}
            </Radio.Group>
            <Button className='poll-button' type="primary" onClick={handleVote}>
                Votează
            </Button>
        </Card>
    );
};

export default PollComponent;
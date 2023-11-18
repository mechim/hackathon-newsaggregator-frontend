import React, { useState } from 'react';
import { Button, Radio, Card } from 'antd';
import './Poll.css'

const PollComponent = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleVote = () => {
    if (selectedOption !== null) {
      console.log(`Voted for ${props.pollData['options'][selectedOption]}`);
    } else {
      console.log('Please select an option before voting.');
    }
  };

  return (
    <Card className='poll-wrapper' title={props.pollData.title}>
      <Radio.Group className='poll-options' onChange={handleOptionChange} value={selectedOption}>
        {props.pollData['options'].map((option, index) => (
          <Radio className='poll-option' key={index} value={index}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <Button className='poll-button' type="primary" onClick={handleVote}>
        Vote
      </Button>
    </Card>
  );
};

export default PollComponent;
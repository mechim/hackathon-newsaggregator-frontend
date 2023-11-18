import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';

const { Option } = Select;

const PollComponent = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
     
    }
  };

  return (
    <div>
      <h3>{props.pollData.title}</h3>

      <label>Select an option:</label>
      <Select
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
        placeholder="Select an option"
      >
        {props.pollData.options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </Select>

      <Button type="primary" onClick={handleVote} disabled={selectedOption === null}>
        Vote
      </Button>
    </div>
  );
};

export default PollComponent;
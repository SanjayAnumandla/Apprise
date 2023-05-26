import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Option = styled.option`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #388e3c;
  }
`;

const NotificationCreation = () => {
  return (
    <FormContainer>
      <h2>Create Notification</h2>
      <Form>
        <InputContainer>
          <Label htmlFor="category">Category:</Label>
          <Select id="category" name="category">
            <Option value="task">Task</Option>
            <Option value="deadline">Deadline</Option>
            <Option value="meeting">Meeting</Option>
            <Option value="announcement">Announcement</Option>
          </Select>
        </InputContainer>

        <InputContainer>
          <Label htmlFor="message">Message:</Label>
          <Input id="message" type="text" name="message" placeholder="Enter message" required />
        </InputContainer>

        <InputContainer>
          <Label htmlFor="recipients">Recipients:</Label>
          <Input id="recipients" type="text" name="recipients" placeholder="Enter email addresses" required />
        </InputContainer>
      </Form>

      <ButtonContainer>
        <Button>Create Notification</Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default NotificationCreation;

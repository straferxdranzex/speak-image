import { Avatar, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { useAppDispatch } from '../../../redux/store';

const SearchFooter: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_INPUT_VALUE', payload: query });
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
      handleSubmit(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <div className="footer-container">
        <Row>
          <Col span={24} className="footer-input-container">
            <Input
              size="large"
              className="footer-input"
              placeholder="Enter a prompt here..."
              type="text"
              suffix={<IoSearchOutline className="footer-input-icon" />}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={handleKeyDown}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default SearchFooter;

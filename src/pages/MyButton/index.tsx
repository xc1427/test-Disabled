import React from 'react';
import { Button } from 'antd';

export const MyButton = (props) => {
  return (
    <span style={{ display: 'inline-block' }}>
      <Button {...props} />
    </span>
  );
}
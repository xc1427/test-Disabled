import React from 'react';
import { Modal } from 'antd';
import styles from './index.css';
import { MyButton } from './MyButton';
import { Disabled } from './Disabled';
import { Spaced } from './Spaced';
import { TextBtn } from './TextBtn';

export default function() {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
      </ul>

      <div>
        <Spaced>
          <MyButton key={1}>cancel</MyButton>
          <MyButton key={2} type={'primary'}>
            confirm
          </MyButton>
        </Spaced>
      </div>
      <br />
      <div>
        <Disabled disabled={true}>
          <MyButton>cancel</MyButton>
        </Disabled>
        <MyButton type={'primary'}>confirm</MyButton>
      </div>
      <div>
        <TextBtn>text btn</TextBtn>
      </div>
    </div>
  );
}

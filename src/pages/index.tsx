import React, { useState } from 'react';
import { Switch, Select, AutoComplete, message, Upload, Button, Icon } from 'antd';
import styles from './index.css';
import { MyButton } from './MyButton';
import { Disabled } from './Disabled';
import { Spaced } from './Spaced';
import { TextBtn } from './TextBtn';
import Link from 'umi/link';

const uploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      yunyou.info(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function() {
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          1: <Switch checked={disabled} onChange={checked => setDisabled(checked)} />
          2: <Switch checked={disabled2} onChange={checked => setDisabled2(checked)} />
        </li>
      </ul>
      <br />
      <div>
        {/* <Spaced>
          <Disabled disabled={disabled2}>
            <Disabled disabled={disabled}>
              <MyButton>cancel</MyButton>
            </Disabled>
          </Disabled>
          <Disabled disabled={disabled2}>
            <Disabled disabled={disabled}>
              <TextBtn>
                <Link to={'/'}>text btn</Link>
              </TextBtn>
            </Disabled>
          </Disabled>
        </Spaced> */}
      </div>
      <br />
      <div>
        <Spaced>
            <Disabled disabled={disabled}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Disabled>
            <Disabled disabled={disabled2}>
              <TextBtn>
                <Link to={'/'}>text btn bis</Link>
              </TextBtn>
            </Disabled>
        </Spaced>
      </div>
      <br />
      <div style={{ height: 200, overflow: 'auto', backgroundColor: 'beige' }}>
        <div style={{ height: 800 }}>
          <Switch disabled />
          <Select style={{ width: 50 }} disabled />
          <AutoComplete style={{ width: 50 }} disabled />
          <Button disabled>hi butt</Button>
        </div>
      </div>
      <br />
      <div>
        <MyButton type={'primary'}>confirm</MyButton>
      </div>
      <br />
      <div></div>
    </div>
  );
}

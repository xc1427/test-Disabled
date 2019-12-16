import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { ButtonHTMLType } from 'antd/lib/button/button';

import { InlineSpin } from './InlineSpin';
import styles from './styles.less';

export type TextBtnProps = {
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'white' | 'text-color';
  loading?: boolean;
  htmlType?: ButtonHTMLType;
} & React.HTMLProps<HTMLButtonElement>;

type Props = TextBtnProps;
type State = {};

export class TextBtn extends PureComponent<Props, State> {
  public render() {
    const {
      children,
      color = 'blue',
      loading = false,
      htmlType = 'button',
      className,
      style,
      ...restProps
    } = this.props;

    const mergedClassName = classnames(styles.textAlikeBtn, className, styles[color]);
    return (
      <InlineSpin spinning={loading}>
        <button {...restProps} className={mergedClassName} style={style} type={htmlType}>
          {children}
        </button>
      </InlineSpin>
    );
  }
}

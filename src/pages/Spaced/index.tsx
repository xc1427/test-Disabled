// import { } from '@alipay/bigfish/antd';
import React from 'react';
// import history from '@alipay/bigfish/sdk/history';
// import { Link } from '@alipay/bigfish/sdk/router';
// import { connect } from '@alipay/bigfish/sdk';
import classNames from 'classnames';
import styles from './styles.less';

type OwnProps = {
  gutter?: 4 | 8 | 16;
  outerMargin?: 'left' | 'right' | 'both' | 'none'; // NOTE: 这个会和 styles 文件内容配合，修改这个组件定义的时候请注意
  hasComma?: boolean;
} & React.DetailedHTMLProps<React.HTMLProps<HTMLSpanElement>, HTMLSpanElement>;
type Props = OwnProps;

export const Spaced: React.FC<Props> = props => {
  const { gutter = 4, outerMargin = 'left', className, hasComma = false, ...restProps } = props;
  const classes = classNames(
    className,
    styles.spacedBox,
    styles[`${outerMargin}-${String(gutter)}`],
    hasComma && styles.hasComma,
  );
  return (
    <span className={classes} {...restProps}>
      {props.children}
    </span>
  );
};

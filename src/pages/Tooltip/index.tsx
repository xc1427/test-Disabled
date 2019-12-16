import { Tooltip as AntdTooltip } from 'antd';
import React, { PureComponent } from 'react';
import { TooltipProps } from 'antd/lib/tooltip';

// import styles from './styles.less';

type OwnProps = { enabled?: boolean } & TooltipProps;
type Props = OwnProps;

/**
 * NOTE: 暂时用不上
 */
export class Tooltip extends PureComponent<Props> {
  public render() {
    const { enabled = true, children, ...restProps } = this.props;
    if (!enabled) {
      return children;
    }
    return <AntdTooltip {...restProps}>{children}</AntdTooltip>;
  }
}

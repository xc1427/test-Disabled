import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.less';

const antIcon = <Icon type="loading" style={{ fontSize: 18, color: 'rgba(0, 0, 0, .65)' }} spin />;

export class InlineSpin extends PureComponent {
  static propTypes = {
    spinning: PropTypes.bool,
    indicator: PropTypes.node,
    /* eslint-disable react/no-unused-prop-types */
    /* eslint-enable react/no-unused-prop-types */
  }

  static defaultProps = {
    spinning: undefined,
    indicator: antIcon,
  }

  render() {
    const { spinning, indicator, children } = this.props;
    if (spinning === false) {
      return children;
    }
    return (
      <div className={styles['relative-pos-container']}>
        {children}
        <span className={styles['spin-container']}>
          {indicator}
        </span>
      </div>
    );
  }
}

export default InlineSpin;

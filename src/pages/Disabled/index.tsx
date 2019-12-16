import React, { useEffect, useRef } from 'react';
// import history from '@alipay/bigfish/sdk/history';
// import { Link } from '@alipay/bigfish/sdk/router';
// import { connect } from '@alipay/bigfish/sdk';
// import classNames from '@alipay/bigfish/util/classnames';
// import styles from './styles.less';

type Props = {
  disabled?: boolean; // 默认为 true
  title?: string; // disabled 时显示
};

/**
 * 对 children 所渲染的 dom 树里的 button/antd Button 产生 disable 效果，可以嵌套使用
 */
export const Disabled: React.FC<Props> = props => {
  const { disabled = true, children, title = '不允许操作', ...restProps } = props;
  const wrapperSpanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let btn: HTMLButtonElement | null = null;

    if (disabled && wrapperSpanRef.current) {
      btn = copyInnerButtonElement(wrapperSpanRef.current, title);
      wrapperSpanRef.current.appendChild(btn);
    }

    return () => {
      if (btn) {
        btn.remove();
      }
    };
  }, [disabled, title]);

  if (!disabled && React.isValidElement(children)) {
    return React.cloneElement(children, { ...restProps });
  }
  return (
    <>
    {children}
    <span id={'disabled_stub'} style={{ position: 'fixed', top: 0 }} />
    </>
  );
};

function copyInnerButtonElement(element: HTMLElement, title: string) {
  const traverseChildren = (
    traversedEle: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
  ): HTMLElement | null => {
    for (let i = 0, n = traversedEle.childNodes.length; i < n; i += 1) {
      const child: HTMLElement = traversedEle.childNodes[i] as any;
      if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
        return child;
      }
      const foundElem = traverseChildren(child, tagName);
      if (!foundElem) {
        continue;
      }
      return foundElem;
    }
    return null;
  };

  /*const traverse = (traversedEle: HTMLElement, tagName: keyof HTMLElementTagNameMap):HTMLElement | null => {
    if (traversedEle.nodeType === 1 && traversedEle.tagName.toLowerCase() === tagName) {
      return traversedEle;
    }

    for (let i = 0, n = traversedEle.childNodes.length; i < n; i += 1) {
      const child: HTMLElement = traversedEle.childNodes[i] as any;
      const foundElem = traverse(child, tagName);
      if (!foundElem) {
        continue;
      }
      return foundElem;
    }
    return null;
  };
*/

  const foundButton: HTMLButtonElement | null = traverseChildren(
    element,
    'button',
  ) as HTMLButtonElement | null;

  if (foundButton) {
    const dupBtn: HTMLButtonElement = (foundButton as any).cloneNode(true);
    dupBtn.setAttribute('title', title);
    dupBtn.disabled = true;
    dupBtn.style.position = 'absolute';
    dupBtn.style.left = '0';
    dupBtn.style.top = '0';
    // 如果子节点中还有 anchor, 则需要再把 anchor 上添加禁用效果
    const foundAnchor: HTMLAnchorElement | null = traverseChildren(
      dupBtn,
      'a',
    ) as HTMLAnchorElement | null;
    if (foundAnchor) {
      foundAnchor.style.color = '#ccc';
      foundAnchor.style.cursor = 'not-allowed';
      foundAnchor.removeAttribute('href');
    }
    return dupBtn;
  }
  yunyou.warn('未找到 button 实例，创建新的实例');
  const newBtn: HTMLButtonElement = document.createElement<'button'>('button');
  newBtn.setAttribute('title', title);
  newBtn.innerText = '未找到 button 实例';
  newBtn.style.position = 'absolute';
  newBtn.style.left = '0';
  newBtn.style.top = '0';
  newBtn.style.color = 'white';
  newBtn.style.background = 'red';
  newBtn.style.borderRadius = '4';
  return newBtn;
}

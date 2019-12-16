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
  const stubRef = useRef<HTMLSpanElement | null>(null);
  const foundBtnRef = useRef<HTMLButtonElement | null>(null);
  const copiedDisabledBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (disabled && stubRef.current) {
      const [foundBtn, copiedDisabledBtn] = copyInnerButtonElement(
        stubRef.current.previousElementSibling as HTMLElement | null,
      );
      if (foundBtn && copiedDisabledBtn) {
        // eslint-disable-next-line no-unused-expressions
        foundBtn.parentNode?.replaceChild(copiedDisabledBtn, foundBtn);
        foundBtnRef.current = foundBtn;
        copiedDisabledBtnRef.current = copiedDisabledBtn;
      }
    }

    return () => {
      if (foundBtnRef.current && copiedDisabledBtnRef.current) {
        // eslint-disable-next-line no-unused-expressions
        copiedDisabledBtnRef.current.parentNode?.replaceChild(
          foundBtnRef.current,
          copiedDisabledBtnRef.current,
        );
        copiedDisabledBtnRef.current.remove();
      }
    };
  });

  if (!disabled && React.isValidElement(children)) {
    return React.cloneElement(children, { ...restProps });
  }
  return (
    <>
      {children}
      <span className="_disabled_stub" style={{ position: 'fixed', top: 0 }} ref={stubRef} />
    </>
  );
};

const __traverse = (
  traversedEle: HTMLElement,
  tagName: keyof HTMLElementTagNameMap,
): HTMLElement | null => {
  if (!traversedEle) {
    return null;
  }
  if (traversedEle.nodeType === 1 && traversedEle.tagName.toLowerCase() === tagName) {
    return traversedEle;
  }

  for (let i = 0, n = traversedEle.childNodes.length; i < n; i += 1) {
    const child: HTMLElement = traversedEle.childNodes[i] as any;
    const foundElem = __traverse(child, tagName);
    if (!foundElem) {
      continue;
    }
    return foundElem;
  }
  return null;
};

function copyInnerButtonElement(
  element: HTMLElement | null,
): [HTMLButtonElement, HTMLButtonElement] | [null, null] {
  if (!element) {
    return [null, null];
  }
  const foundButton: HTMLButtonElement | null = __traverse(
    element,
    'button',
  ) as HTMLButtonElement | null;

  if (foundButton) {
    const dupBtn: HTMLButtonElement = (foundButton as any).cloneNode(true);
    dupBtn.disabled = true;
    // 如果子节点中还有 anchor, 则需要再把 anchor 上添加禁用效果
    const foundAnchor: HTMLAnchorElement | null = __traverse(
      dupBtn,
      'a',
    ) as HTMLAnchorElement | null;
    if (foundAnchor) {
      foundAnchor.style.color = '#ccc';
      foundAnchor.style.cursor = 'not-allowed';
      foundAnchor.removeAttribute('href');
    }
    return [foundButton, dupBtn];
  }
  return [null, null];
}

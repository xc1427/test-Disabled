## 目的
Disabled 组件。
所有在其下的 Button 组件（甚至可以扩展到 Input Select Checkbox 这些），都会被 disable

## render 劫持是不可行方案

children 是一个类似 array 的结构，狭义地讲，每个元素是一个 ReactElement

```jsx
   interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type: T;
        props: P;
        key: Key | null;
    }
```
每一个 child 从 js 的角度看，是一个函数调用的规划（注意还没有调用）：调用 type 函数，传递的参数是 props,
其中 props.children 如果存在的话，他还是一个 {type, props} 的函数调用规划。

比如

```
{
  type: T
  props: P
  children: [
    {
      type: T2,
      props: P2,
      children: [{}, {} ...],
    }
  ]
}
```

解读为：渲染一个 T 元素，给他属性 P，给他塞如下 children：渲染一个 T2 元素，给他属性 P2，给他塞如下 children [{}, {} ...]

render 表达是由外向内的 => => => ，children 挂载是由内向外的 <= <= <=


一种思路的 render 劫持是把东西放到 children 里面去，然后利用 Children 的 API 去做劫持

```
React.Children.forEach(children, (child /* ReactElement */) => {

  // ...

```

这是唯一窥探 vdom 的一个时机，但是就算这个时机，此时拿到的 child 还是 "未完全解析" 的，也就是说 type 上还是组件，并不是 原生的诸如 `div span` 这些。



## 当前的思路和问题
当前的思路是采取 replaceChild, 在 render 结束后修改渲染结果。

"随机" 出现这样的报错：

```
Uncaught DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
    at insertBefore (http://localhost:8000/umi.js:62424:18)
    at commitPlacement (http://localhost:8000/umi.js:75568:11)
    at commitMutationEffects (http://localhost:8000/umi.js:78125:11)
    at HTMLUnknownElement.callCallback (http://localhost:8000/umi.js:53184:14)
    at Object.invokeGuardedCallbackDev (http://localhost:8000/umi.js:53233:16)
    at invokeGuardedCallback (http://localhost:8000/umi.js:53288:31)
    at commitRootImpl (http://localhost:8000/umi.js:77898:9)
    at unstable_runWithPriority (http://localhost:8000/umi.js:91842:12)
    at runWithPriority$2 (http://localhost:8000/umi.js:64997:10)
    at commitRoot (http://localhost:8000/umi.js:77770:3)
    at finishSyncRender (http://localhost:8000/umi.js:77177:3)
    at performSyncWorkOnRoot (http://localhost:8000/umi.js:77155:9)
    at http://localhost:8000/umi.js:65047:24
    at unstable_runWithPriority (http://localhost:8000/umi.js:91842:12)
    at runWithPriority$2 (http://localhost:8000/umi.js:64997:10)
    at flushSyncCallbackQueueImpl (http://localhost:8000/umi.js:65042:7)
    at flushSyncCallbackQueue (http://localhost:8000/umi.js:65030:3)
    at discreteUpdates$1 (http://localhost:8000/umi.js:77271:7)
    at discreteUpdates (http://localhost:8000/umi.js:54286:12)
    at dispatchDiscreteEvent (http://localhost:8000/umi.js:58729:3)
```

可能和 clear 逻辑有关，但就算把 clear 逻辑移动到 useLayoutEffect，总之是有 React 17 不兼容的担心。

换句话说，不要通过非 react 的方式修改 react 所管理的的渲染结果。

## 可行的思路
可行的思路还是在 Button 上面覆盖一个 disabled button，这个 disabled button 不在 react 的管辖范围内。我们并没有修改 React 所管理的渲染结果。

但是这个可能是个启发式的算法，要根据原 Button 和其父亲之间的 position 关系，来决定 overlap button 的一些 style。


## 关于 title 改进为 tooltip 的方案
可以参考：http://michaelsoriano.com/better-tooltips-with-plain-javascript-css/

加 anim 可以继续参考：https://codepen.io/dagalti/pen/oVjKLR  （就是上文评论中的一个回复）

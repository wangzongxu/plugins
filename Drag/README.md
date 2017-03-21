### 原生拖拽插件（兼容移动端）

#### demo
[demo](https://wangzongxu.github.io/plugins/Drag/)
 - html
```html
    <div id="box"></div>
```
 - js
```javascript
var d = new Drag({
    ele: document.querySelector('#box')
})
```

#### API
- 构造参数

params | description
---|---
ele | 指定拖拽元素
scopeLimit | 拖动范围限制[parent-Element、Object、'screen']，默认无限制*
horizontal | 是否允许横向拖拽[Boolean]，默认true
vertical | 是否允许竖向拖拽[Boolean]，默认true
dragStart | 拖拽开始的回调函数this指向实例，默认传入事件对象
draging | 拖拽中持续触发的回调函数this指向实例，默认传入事件对象
dragEnd | 拖拽结束的回调函数this指向实例，默认传入事件对象

> scpoeLimit 详解
- 参数可以是一个元素、对象、或者字符串'screen'
 - 为元素时，该元素必须与拖拽元素具有一级或多级父代关系，代表了拖拽元素的活动范围不超出该父代元素。
 - 为对象时，该对象应包含四个属性minX,minY,maxX,maxY。分别代表了拖拽元素活动范围的X轴最小值、Y轴最小值、X轴最大值、Y轴最大值。
 - 为字符串'screen'时，代表拖拽元素活动范围是整个屏幕可视区域。


 - 实例：d

key | description
---|---
d.currentX | 移动中的当前元素X坐标位置(只读)
d.currentY | 移动中的当前元素Y坐标位置(只读)
d.width | 当前元素宽度(只读)
d.height | 当前元素高度(只读)
d.scopeLimit | 限制参数（可写）
d.minX | 当前X轴被限制的最小值(由scopeLimit参数计算得出，只读)
d.maxX | 当前X轴被限制的最大值(由scopeLimit参数计算得出，只读)
d.minY | 当前Y轴被限制的最小值(由scopeLimit参数计算得出，只读)
d.minY | 当前Y轴被限制的最小值(由scopeLimit参数计算得出，只读)

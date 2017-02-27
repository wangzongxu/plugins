### Select下拉框美化插件
> 对于原生select而言；我们有时候想要自定义下拉框样式；使用这个插件会非常方便修改下拉框样式

- 不需依赖jquery
- 浏览器不兼容：IE 6 7 8 

参数 | 释义
---|---
ele | 原生下拉框id
useStyle | 继承简单的原生select样式：宽高;默认false
hideCb | 下拉框收起时候的回调
showCb | 下拉框展开时候的回调
chooseCb | 选择某一项后的回调
ready | 初始化完成分回调
destroyCb | 销毁后的回调

实例上的方法 | 作用
---|---
refresh | 刷新Select
destroy | 销毁Select

> 概要

- 当设置Select的值或者可选状态的时候，原生的下拉框也会跟着同步变化；所以可以正常获取原生下拉框的值或者进行表单提交
- 通过实例上的：disabled、value、html来控制是否可选、选中项和显示的文本
- 所有回调中的this都是实例，hideCb、showCb、chooseCb回调参数中自带MouseEvent （chooseCb回调自带两个参数：当前点击的元素和MouseEvent）
> demo
- html
```
<select class="select"  name="" id="category" style="width: 200px;height: 37px;">
        <option value="1">一</option>
        <option value="2">二</option>
        <option value="3" selected>三</option>
        <option value="4">四</option>
        <option value="5">五</option>
    </select>
```
- js

```
var S = new Select({
        ele: '#category',
        useStyle:true
    });
```
- 设置值
```
S.value = 3;
//选中原生下拉框中值为3的这一项
S.html='内容'
//赋值S.html仅仅是更改了显示的文本,并没有改变当前选中的值
```
- 设置可选状态
```
 S.disabled = false;
 //Select为不可选状态
```
- refresh()：
```
//如果通过其他途径更改值（JQ赋值或者原生js赋值）需要调用实例上的refresh()方法来通知Select来更新试图;还是建议使用实例上的属性进行赋值；
//例如使用jq方法改变值;
$('#category').val(5);
//需要调用刷新方法：
S.refresh()
```
- destroy()
```
S.destroy()
//将实例销毁
```

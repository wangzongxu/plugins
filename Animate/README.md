### Animate JS动画库
> JS实现的帧动画库，包含31中动态效果，兼容IE5+,支持Promise链式调用(其中catch方法更名为_catch,因为低版本IE会报错)

#### demo:  

> 一般使用：  

```js
var box=new Animate(document.getElementById('div'));

box.go({
  target:{
    left:100,
    top:100,
  },
  effect:3,
  finish:function () {
    console.log('finish')
  }
})
```
> 链式调用的连续动画：  

```js
box.go({
  target:{
    left:100,
    top:100
  },
  effect:1
}).then(function(){
  return box.go({
    target:{
      left:30,
      top:100
    },
    effect:16
  })
}).then(function(){
  return box.go({
    target:{
      left:200,
      top:50
    },
    effect:31
  })
})
```
#### API:

> go方法的参数：  

参数 | 描述
---|---
target | 目标位置/状态
duration | 运动时间（毫秒），默认3000
effec | 运动方式（1-31）,默认1：匀速
step | 频率，默认15
finish | 完成的回调

> stop方法:  

```js
//立即停止动画
box.stop()
```

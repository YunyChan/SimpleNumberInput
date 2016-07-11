# SimpleNumberInput [![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/YunyChan/SimpleNumberInput/blob/master/LICENSE) #

一个简易带加减按钮的数字输入组件

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleNumberInput.git

## 使用 ##

首先在页面中引入`SimpleNumberInput.js`JS文件

```html
<script src="SimpleNumberInput.js"></script>
```

然后通过创建SimpleList的实例并传入相应的参数来插入并使用组件

```html
<div id="input"></div>
<script src="SimpleNumberInput.js"></script>
<script>
    var oInput = new SimpleNumberInput({
        target: document.getElementById('input'),
        value: 2,
        min: 0,
        max: 10,
        unit: 2
    });
</script>
```

下面是组件的配置参数说明：

+ `target` - __必须__, 需要插入组件的dom元素
+ `value` - _default: 0_, 数字输入框默认值
+ `min` - _default: 0_, 最小值
+ `max` - _default: 0_, 最大值
+ `step` - _default: 1_, 数值步进幅度
+ `unit` - _default: 1_, 数值单位长度

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)
<h1 align="center">VueFreeDrag</h1>
<p align="center">一款基于vue的极简拖拽组件！让你自由拖动！</p>

#### 介绍

- 轻量级的 vue 拖拽组件，可通过容器限制拖拽范围。
- 包含两个组件：DragDropContainer 容器组件，DragDrop 拖拽组件。
- 可搭配使用，也可分开使用。

### DragDropContainer 组件属性

| 属性名 | 类型   | 说明     |
| ------ | ------ | -------- |
| id     | String | 唯一标识 |
| width  | Number | 容器宽度 |
| height | Number | 容器高度 |

### DragDrop 组件属性

| 属性名      | 类型   | 说明              |
| ----------- | ------ | ----------------- |
| id          | String | 唯一标识          |
| initialTop  | Number | 初始距离容器 top  |
| initialLeft | Number | 初始距离容器 left |

### 使用说明

```html
<DragDropContainer id="conta" :width="500" :height="500">
  <DragDrop id="789">
    <div style="width: 100px;height:100px;background-color:bisque;">
      <div>测试<span>内容</span></div>
    </div>
  </DragDrop>
  <DragDrop id="234" :initialLeft="100">
    <div style="width: 100px;height:100px;background-color: aquamarine;"></div>
  </DragDrop>
</DragDropContainer>
<DragDrop id="122" :initialLeft="600">
  <div style="width: 100px;height:100px;background-color: aquamarine;"></div>
</DragDrop>
```

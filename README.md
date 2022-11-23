<h1 align="center">VueFreeDrag</h1>
<p align="center">一款基于vue3的极简拖拽组件！让你自由拖动！</p>

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

### DragDropContainer 组件方法

| 属性名         | 参数 | 说明                                       |
| -------------- | ---- | ------------------------------------------ |
| obtainChildren |      | 动态添加子组件时调用此方法以更新子组件持有 |

### DragDrop 组件属性

| 属性名      | 类型    | 说明                      |
| ----------- | ------- | ------------------------- |
| id          | String  | 唯一标识                  |
| collision   | Boolean | 是否碰撞，默认为 true。   |
| locking     | Boolean | 是否可以移动，默认为 true |
| lockingX    | Boolean | 锁定 X 轴，默认为 false   |
| lockingY    | Boolean | 锁定 Y 轴，默认为 false   |
| initialTop  | Number  | 初始距离容器 top          |
| initialLeft | Number  | 初始距离容器 left         |

### DragDrop 组件事件

| 属性名    | 参数 | 说明                                                                                    |
| --------- | ---- | --------------------------------------------------------------------------------------- |
| change    | none | {id\|String,left\|Number,top\|Number}。组件拖拽停止事件                                 |
| move      | none | {id\|String,left\|Number,top\|Number}。组件拖拽移动事件                                 |
| collision | none | {targetId\|String,isContainer\|Boolen,left\|Number,top\|Number}。组件碰撞到其他组件事件 |

### 使用说明

```html
<DragDropContainer
  id="conta"
  :width="300"
  :height="300"
  style="border: 1px solid; box-sizing: border-box; margin-left: 100px; margin-top: 100px"
>
  <DragDrop id="789" @change="dragDropChange" lockingX collision>
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>锁定X轴(789)</div>
    </div>
  </DragDrop>
  <DragDrop id="mmm" :initialTop="0" :initialLeft="100" collision>
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>mmm</div>
    </div>
  </DragDrop>
  <DragDrop id="sss" :initialTop="0" :initialLeft="200" collision>
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>sss</div>
    </div>
  </DragDrop>
  <DragDrop id="ddd" :initialTop="100" :initialLeft="0" collision>
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>ddd</div>
    </div>
  </DragDrop>
  <DragDrop id="jjj" :initialTop="200" :initialLeft="0" collision>
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>jjj</div>
    </div>
  </DragDrop>
  <DragDrop
    id="xxx"
    @change="dragDropChange"
    :initialTop="100"
    :initialLeft="100"
    lockingY
    collision
  >
    <div style="width: 100px; height: 100px; background-color: bisque">
      <div>锁定Y轴(xxx)</div>
    </div>
  </DragDrop>
  <DragDrop
    id="234"
    @change="dragDropChange"
    @move="dragDropMove"
    :initialLeft="200"
    :initialTop="200"
    collision
  >
    <div style="width: 100px; height: 100px; background-color: aquamarine">联动主体(234)</div>
  </DragDrop>
</DragDropContainer>
<DragDrop
  id="122"
  @change="dragDropChange"
  :initialLeft="initialLeft"
  :initialTop="initialTop"
  :locking="false"
>
  <div style="width: 100px; height: 100px; background-color: aquamarine">联动客体(122)</div>
</DragDrop>
```

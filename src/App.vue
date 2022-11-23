<template>
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
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    let initialLeft = ref(400)
    let initialTop = ref(300)
    const dragDropChange = () => {}
    const dragDropMove = ({ left, top }) => {
      initialLeft.value = 200 + left
      initialTop.value = 100 + top
    }
    return { dragDropChange, dragDropMove, initialLeft, initialTop }
  }
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>

<template>
  <DragDropContainer id="conta" :width="500" :height="500">
    <DragDrop id="789" @change="dragDropChange" :lockingX="true">
      <div style="width: 100px;height:100px;background-color:bisque;">
        <div>锁定X轴</div>
      </div>
    </DragDrop>
    <DragDrop id="xxx" @change="dragDropChange" :initialTop="100" :lockingY="true">
      <div style="width: 100px;height:100px;background-color:bisque;">
        <div>锁定Y轴</div>
      </div>
    </DragDrop>
    <DragDrop id="234" @change="dragDropChange" @move="dragDropMove" :initialLeft="100">
      <div style="width: 100px;height:100px;background-color: aquamarine;">联动主体</div>
    </DragDrop>
  </DragDropContainer>
  <DragDrop id="122" @change="dragDropChange" :initialLeft="initialLeft" :initialTop="initialTop" :locking="false">
    <div style="width: 100px;height:100px;background-color: aquamarine;">联动客体</div>
  </DragDrop>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    let initialLeft = ref(600)
    let initialTop = ref(0)
    const dragDropChange = ({ id, left, top }) => {
      console.log(id, left, top)
    }
    const dragDropMove = ({ left, top }) => {
      initialLeft.value = 600 + left
      initialTop.value = top
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

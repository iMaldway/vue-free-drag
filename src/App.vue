<template>
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
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
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

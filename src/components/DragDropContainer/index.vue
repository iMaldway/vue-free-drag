<template>
  <div
    :id="id"
    name="_$DragDropParent$_"
    ref="dragDropContainerRef"
    class="drag-drop-container"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, onDeactivated, provide } from 'vue'
import { __IDS__ } from './share.js'
export default defineComponent({
  name: 'DragDropContainer',
  components: {},
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 200
    }
  },
  setup(props) {
    let dragDropContainerRef = ref()
    let childrens = ref([])

    let ids = ref()

    provide(__IDS__, ids)

    onMounted(() => {
      obtainChildren()
    })

    // 是否是子级
    const isChildren = HTMLCollection => {
      let is = false
      if (HTMLCollection) {
        let name = HTMLCollection.attributes?.name
        if (name && name.value === '_$DragDropChildren$_') {
          is = true
        }
      }
      return is
    }
    // 获取子级，并获取其对应的边界值
    const obtainChildren = () => {
      childrens = ref([])
      ids.value = []
      if (dragDropContainerRef && dragDropContainerRef.value) {
        // 持有所有符合的子级，考虑实现子级碰撞检测
        for (let i in dragDropContainerRef.value.children) {
          let item = dragDropContainerRef.value.children[i]
          if (isChildren(item)) {
            childrens.value.push(item)
          }
        }
      }
      // 子集集合中最后一个是自身；
      let nowItem = document.getElementById(props.id)
      childrens.value.push(nowItem)
      for (let i = 0; i < childrens.value.length; i++) {
        let item = childrens.value[i]
        const id = item.attributes?.id || {}
        ids.value.push(id?.value || undefined)
      }
    }
    onDeactivated(() => {
      ids.value = undefined
      childrens = undefined
      ids = undefined
    })
    return {
      dragDropContainerRef,
      obtainChildren,
      childrens
    }
  }
})
</script>

<style>
.drag-drop-container {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
</style>

<template>
    <div :id="id" name="_$DragDropParent$_" ref="dragDropContainerRef" class="drag-drop-container"
        :style="{ 'width': width + 'px', 'height': height + 'px' }">
        <slot></slot>
    </div>
</template>
<script >
import { defineComponent, ref, onMounted, onDeactivated } from 'vue'
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
    setup() {
        let dragDropContainerRef = ref()
        let childrens = ref([])
        onMounted(() => {
            obtainChildren()
        })
        // 是否是子级
        const isChildren = (HTMLCollection) => {
            let is = false
            if (HTMLCollection) {
                let name = HTMLCollection.attributes?.name
                if (name && name.value === '_$DragDropChildren$_') {
                    is = true
                }
            }
            return is
        }
        // 获取子级
        const obtainChildren = () => {
            if (dragDropContainerRef && dragDropContainerRef.value) {
                childrens = ref([])
                // 持有所有符合的子级，考虑实现子级碰撞检测
                for (let i in dragDropContainerRef.value.children) {
                    let item = dragDropContainerRef.value.children[i]
                    if (isChildren(item)) {
                        childrens.value.push(item)
                    }
                }
            }
        }
        onDeactivated(() => {
            childrens = undefined;
        })
        return {
            dragDropContainerRef, obtainChildren, childrens
        }
    }
})
</script>

<style>
.drag-drop-container {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
}
</style>

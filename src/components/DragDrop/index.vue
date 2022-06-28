<template>
    <div name="_$DragDropChildren$_" ref="dragDropChildrenRef" class="drag-drop"
        :style="{ 'top': initialTop + 'px', 'left': initialLeft + 'px' }" :id="id" @mousemove.stop="mousemoveEvent"
        @mousedown.stop="mousedownEvent" @mouseup.stop="mouseupEvent" @mouseout.stop="mouseoutEvent">
        <slot></slot>
    </div>
</template>
<script >
import { defineComponent, onMounted, ref, onDeactivated } from 'vue'
export default defineComponent({
    name: 'DragDrop',
    components: {},
    emits: ['change'],
    props: {
        id: {
            type: String,
            required: true
        },
        initialTop: {
            type: Number,
            default: 0
        },
        initialLeft: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        // 父级
        let parent = null;
        // 移动状态
        let dragging = false;
        // 位置x
        let left = 0;
        // 位置y
        let top = 0;
        // 当前元素对象
        let nowItem = null;
        // 容器对象
        let containerItem = null;
        // 是否包含容器
        let isContainer = ref(false)
        let containerId = ref()
        // 鼠标按下事件
        const mousedownEvent = (e) => {
            if (e.currentTarget.id == props.id) {
                //当前元素对象
                dragging = true
                left = Math.abs(e.clientX - nowItem.offsetLeft);
                top = Math.abs(e.clientY - nowItem.offsetTop);
            }
        }
        // 鼠标放开事件
        const mouseupEvent = () => {
            if (dragging) {
                dragging = false
                let nowLeft = nowItem.style.left.replace('px', '');
                let nowTop = nowItem.style.top.replace('px', '');
                emit('change', {
                    id: props.id,
                    left: Number(nowLeft),
                    top: Number(nowTop)
                })
            }
        }
        // 鼠标移动事件
        const mousemoveEvent = (e) => {
            if (dragging) {
                //当前元素对象
                let moveX = e.clientX - left;
                let moveY = e.clientY - top;
                if (isContainer.value) {
                    let nowWidth = nowItem.offsetWidth;
                    let nowHeight = nowItem.offsetHeight;
                    let leftMax = containerItem.offsetLeft + containerItem.offsetWidth;
                    let leftMini = containerItem.offsetLeft;
                    let topMax = containerItem.offsetTop + containerItem.offsetHeight;
                    let topMini = containerItem.offsetTop;

                    let calculationWidth = moveX + nowWidth;
                    let calculationHeight = moveY + nowHeight;
                    if (moveX <= leftMini) {
                        moveX = leftMini
                    }
                    if (calculationWidth >= leftMax) {
                        moveX = leftMax - nowWidth
                    }
                    if (moveY <= topMini) {
                        moveY = topMini
                    }
                    if (calculationHeight >= topMax) {
                        moveY = topMax - nowHeight
                    }
                }
                nowItem.style.left = moveX + 'px';
                nowItem.style.top = moveY + 'px';
            }
        }
        const mouseoutEvent = () => {
            if (dragging) {
                dragging = false
                let nowLeft = nowItem.style.left.replace('px', '');
                let nowTop = nowItem.style.top.replace('px', '');
                emit('change', {
                    id: props.id,
                    left: Number(nowLeft),
                    top: Number(nowTop)
                })
            }
        }
        // 找到容器
        onMounted(() => {
            nowItem = document.getElementById(props.id)
            parent = getParent(nowItem)
            if (parent) {
                const id = parent.attributes?.id || {}
                isContainer.value = id?.value ? true : false;
                containerId.value = id?.value || ''
                containerItem = document.getElementById(containerId.value)
            }
        })
        // 遍历找到父容器,最多找到body容器
        const getParent = (HTMLCollection) => {
            if (HTMLCollection && HTMLCollection.tagName !== 'BODY') {
                let name = HTMLCollection.attributes?.name
                if (name && name.value === '_$DragDropParent$_') {
                    return HTMLCollection
                } else {
                    return getParent(HTMLCollection.parentNode)
                }
            } else {
                // 默认获取body下第一个拥有
                let body = document.getElementsByTagName('BODY')[0]
                let app = null;
                for (let i in body.children) {
                    let item = body.children[i]
                    if (item.attributes !== undefined && item.attributes.id !== undefined) {
                        app = item
                    }
                }
                return app;
            }
        }
        // 销毁
        onDeactivated(() => {
            // 父级
            parent = undefined;
            // 当前元素对象
            nowItem = undefined;
            // 容器对象
            containerItem = undefined;
            // 移动状态
            dragging = false;
        })
        return {
            mousedownEvent,
            mouseupEvent,
            mousemoveEvent,
            mouseoutEvent,
        }
    }
})
</script>

<style>
.drag-drop {
    display: inline-block;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>

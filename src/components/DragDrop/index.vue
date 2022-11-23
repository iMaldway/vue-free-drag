<template>
  <div
    name="_$DragDropChildren$_"
    ref="dragDropChildrenRef"
    class="drag-drop"
    :style="{ top: initialTop + 'px', left: initialLeft + 'px' }"
    :id="id"
    @mousemove.stop="mousemoveEvent"
    @mousedown.stop="mousedownEvent"
    @mouseup.stop="mouseupEvent"
    @mouseout.stop="mouseoutEvent"
  >
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, onDeactivated, inject } from 'vue'
import { __IDS__ } from '../DragDropContainer/share.js'
export default defineComponent({
  name: 'DragDrop',
  components: {},
  emits: ['change', 'move', 'collision'],
  props: {
    id: {
      type: String,
      required: true
    },
    // 是否碰撞
    collision: {
      type: Boolean,
      default: false
    },
    // 是否可以移动
    locking: {
      type: Boolean,
      default: true
    },
    // 锁定X轴
    lockingX: {
      type: Boolean,
      default: false
    },
    // 锁定Y轴
    lockingY: {
      type: Boolean,
      default: false
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
    let parent = null
    // 移动状态
    let dragging = false
    // 位置x
    let left = 0
    // 位置y
    let top = 0
    // 当前元素对象
    let nowItem = null
    // 容器对象
    let containerItem = null
    // 是否包含容器
    let isContainer = ref(false)
    let containerId = ref()
    // 默认值
    let defLeftMax = ref([])
    let defLeftMini = ref([])
    let defTopMax = ref([])
    let defTopMini = ref([])
    let defIds = ref([])
    // 接收父容器注入的值
    const ids = inject(__IDS__, defIds)
    // 鼠标按下事件
    const mousedownEvent = e => {
      if (e.currentTarget.id == props.id) {
        //当前元素对象
        dragging = true
        left = Math.abs(e.clientX - nowItem.offsetLeft)
        top = Math.abs(e.clientY - nowItem.offsetTop)
      }
    }
    // 鼠标放开事件
    const mouseupEvent = () => {
      if (dragging && props.locking) {
        dragging = false
        let nowLeft = nowItem.style.left.replace('px', '')
        let nowTop = nowItem.style.top.replace('px', '')
        emit('change', {
          id: props.id,
          left: Number(nowLeft),
          top: Number(nowTop)
        })
      }
    }
    // 鼠标移动事件
    const mousemoveEvent = e => {
      if (dragging && props.locking) {
        //当前元素对象
        // 移动X距离
        let moveX = e.clientX - left
        // 移动Y距离
        let moveY = e.clientY - top
        // 是否被容器包含
        if (isContainer.value) {
          // 当前元素的宽度
          let nowWidth = nowItem.offsetWidth
          // 当前元素的高度
          let nowHeight = nowItem.offsetHeight
          // 当前元素left边界最大最小值  nowItem.offsetLeft
          let nowLeftMini = moveX
          let nowLeftMax = nowLeftMini + nowItem.offsetWidth
          // 当前元素top边界最大最小值 nowItem.offsetTop
          let nowTopMini = moveY
          let nowTopMax = nowTopMini + nowItem.offsetHeight

          // 可移动的宽度：当前鼠标移动的距离 + 元素自身宽度
          let calculationWidth = moveX + nowWidth
          // 可移动的高度： 当前鼠标移动的距离 + 元素自身高度
          let calculationHeight = moveY + nowHeight

          // 当前位置索引
          let index = ids.value.indexOf(props.id)

          for (let i = 0; i < ids.value.length; i++) {
            // 跳过自身
            if (i !== index) {
              let id = ids.value[i]
              // 判断当前是否可以移动至此位置
              let item = document.getElementById(id)
              // 宽度最大值为：距离左侧边距 + 自身宽度
              let leftMax = item.offsetLeft + item.offsetWidth
              // 宽度最小值：距离左侧边距
              let leftMini = item.offsetLeft
              // 高度最大值：距离顶部边距 + 自身高度
              let topMax = item.offsetTop + item.offsetHeight
              // 高度最小值：距离顶部边距
              let topMini = item.offsetTop
              // 容器内处理方式
              if (id == containerId.value) {
                // 如果移动距离加left最小值小于等于最小值，则判定移动过界，移动距离为0
                if (moveX + leftMini <= leftMini) {
                  moveX = 0
                  emit('collision', {
                    targetId: id,
                    isContainer: true,
                    left: Number(moveX),
                    top: Number(moveY)
                  })
                }
                // 如果可移动距离（自身宽度+移动距离）大于等于容器最大X距离-最小距离（实际宽度），则判定越界，则等于最大值-最小值-自身宽度
                if (calculationWidth >= leftMax - leftMini) {
                  moveX = leftMax - leftMini - nowWidth
                  emit('collision', {
                    targetId: id,
                    isContainer: true,
                    left: Number(moveX),
                    top: Number(moveY)
                  })
                }

                if (moveY + topMini <= topMini) {
                  moveY = 0
                  emit('collision', {
                    targetId: id,
                    isContainer: true,
                    left: Number(moveX),
                    top: Number(moveY)
                  })
                }
                if (calculationHeight >= topMax - topMini) {
                  moveY = topMax - topMini - nowHeight
                  emit('collision', {
                    targetId: id,
                    isContainer: true,
                    left: Number(moveX),
                    top: Number(moveY)
                  })
                }
              } else if (props.collision) {
                /**
                 * 判定是否左右相遇
                 *
                 * 在物体的左边④
                 * 物体left最大值-移动物体的left最小值 === 物体宽度 + 移动物体宽度
                 *
                 * 在物体右边②
                 * 移动物体left最大值-物体lefi最小值 === 物体宽度 + 移动物体宽度
                 */
                const isMeetLeft = leftMax - nowLeftMini - (leftMax - leftMini + nowWidth)
                const isMeetRight = nowLeftMax - leftMini - (leftMax - leftMini + nowWidth)
                // left的二分之一
                const halfLeft = (leftMax - leftMini) / 2 + leftMini

                /**
                 * 判定是否上下相遇
                 * 以物体为中心top值接近边界为下，远离边界为上
                 * 在物体的下边①
                 *  两者之间距离 = 物体top最大值 - 移动物体的top最小值 - 物体高度 + 移动物体高度
                 *
                 * 在物体上边③
                 *  两者之间距离 =移动物体top最大值 - 物体top 最小值 - 物体高度 + 移动物体高度
                 *
                 * 小于为重叠部分，等于为相交，大于为远离
                 */
                const isMeetTop = topMax - nowTopMini - (topMax - topMini + nowHeight)
                const isMeetBottom = nowTopMax - topMini - (topMax - topMini + nowHeight)
                // top的二分之一
                const halfTop = (topMax - topMini) / 2 + topMini

                // 上下
                if (isMeetTop <= 0 && nowLeftMini <= leftMax) {
                  if (isMeetTop === 0) {
                    // console.log('在物体' + id + '下边相遇')
                  } else if (
                    isMeetTop < 0 &&
                    nowTopMax < halfTop &&
                    isMeetLeft < 0 &&
                    isMeetRight < 0
                  ) {
                    console.log('在物体' + id + '下边越界', isMeetTop, isMeetLeft, isMeetRight)
                    // 在上下面中，如果锁Y轴，则x移动
                    if (isMeetTop >= isMeetLeft && isMeetTop >= isMeetRight && !props.lockingY) {
                      moveY = topMini - nowHeight
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetLeft > isMeetRight &&
                      isMeetLeft >= isMeetTop &&
                      !props.lockingX
                    ) {
                      moveX = leftMini - nowWidth
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetRight > isMeetLeft &&
                      isMeetRight >= isMeetTop &&
                      !props.lockingX
                    ) {
                      moveX = leftMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    }
                  }
                }
                if (isMeetBottom <= 0 && nowLeftMini <= leftMax) {
                  if (isMeetBottom === 0) {
                    // console.log('在物体' + id + '上边相遇')
                  } else if (
                    isMeetBottom < 0 &&
                    nowTopMax > halfTop &&
                    isMeetLeft < 0 &&
                    isMeetRight < 0
                  ) {
                    console.log('在物体' + id + '上边越界', isMeetBottom, isMeetLeft, isMeetRight)
                    // 在上下面中，如果锁Y轴，则x移动
                    if (
                      isMeetBottom >= isMeetLeft &&
                      isMeetBottom >= isMeetRight &&
                      !props.lockingY
                    ) {
                      moveY = topMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetLeft > isMeetRight &&
                      isMeetLeft >= isMeetBottom &&
                      !props.lockingX
                    ) {
                      moveX = leftMini - nowWidth
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetRight > isMeetLeft &&
                      isMeetRight >= isMeetBottom &&
                      !props.lockingX
                    ) {
                      moveX = leftMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    }
                  }
                }

                // 左右
                if (isMeetLeft <= 0 && nowTopMini <= topMax) {
                  if (isMeetLeft === 0) {
                    // console.log('在物体' + id + '左边相遇')
                  } else if (
                    isMeetLeft < 0 &&
                    nowLeftMax < halfLeft &&
                    isMeetTop < 0 &&
                    isMeetBottom < 0
                  ) {
                    console.log('在物体' + id + '左边越界', isMeetLeft, isMeetTop, isMeetBottom)
                    // 在左右面中，如果锁X轴，则Y移动
                    if (isMeetLeft >= isMeetTop && isMeetLeft >= isMeetBottom && !props.lockingX) {
                      moveX = leftMini - nowWidth
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetTop > isMeetLeft &&
                      isMeetTop >= isMeetBottom &&
                      !props.lockingY
                    ) {
                      moveY = topMini - nowHeight
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetBottom > isMeetLeft &&
                      isMeetBottom >= isMeetTop &&
                      !props.lockingY
                    ) {
                      moveY = topMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    }
                  }
                }
                if (isMeetRight <= 0 && nowTopMini <= topMax) {
                  if (isMeetRight === 0) {
                    // console.log('在物体' + id + '右边相遇')
                  } else if (
                    isMeetRight < 0 &&
                    nowLeftMax > halfLeft &&
                    isMeetTop < 0 &&
                    isMeetBottom < 0
                  ) {
                    console.log('在物体' + id + '右边越界', isMeetRight, isMeetTop, isMeetBottom)
                    /**
                     * 比较在右边三边距离最大值
                     */
                    // 在左右面中，如果锁X轴，则Y移动
                    if (
                      isMeetRight >= isMeetTop &&
                      isMeetRight >= isMeetBottom &&
                      !props.lockingX
                    ) {
                      moveX = leftMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetTop > isMeetRight &&
                      isMeetTop >= isMeetBottom &&
                      !props.lockingY
                    ) {
                      moveY = topMini - nowHeight
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    } else if (
                      isMeetBottom > isMeetRight &&
                      isMeetBottom >= isMeetTop &&
                      !props.lockingY
                    ) {
                      moveY = topMax
                      emit('collision', {
                        targetId: id,
                        isContainer: false,
                        left: Number(moveX),
                        top: Number(moveY)
                      })
                      continue
                    }
                  }
                }
              }
              // 置空
              item = undefined
            }
          }
        }
        if (!props.lockingX) {
          nowItem.style.left = moveX + 'px'
        }
        if (!props.lockingY) {
          nowItem.style.top = moveY + 'px'
        }
        emit('move', {
          id: props.id,
          left: Number(moveX),
          top: Number(moveY)
        })
      }
    }
    const mouseoutEvent = () => {
      if (dragging && props.locking) {
        dragging = false
        let nowLeft = nowItem.style.left.replace('px', '')
        let nowTop = nowItem.style.top.replace('px', '')
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
        isContainer.value = id?.value ? true : false
        containerId.value = id?.value || ''
        containerItem = document.getElementById(containerId.value)
        // 父容器宽度最大值为：距离左侧边距 + 自身宽度
        let leftMax = containerItem.offsetLeft + containerItem.offsetWidth
        // 父容器宽度最小值：距离左侧边距
        let leftMini = containerItem.offsetLeft
        // 父容器高度最大值：距离顶部边距 + 自身高度
        let topMax = containerItem.offsetTop + containerItem.offsetHeight
        // 父容器高度最小值：距离顶部边距
        let topMini = containerItem.offsetTop
        // 设置默认值，如果不存在容器则此默认值生效采用body下第一个子元素的值
        defLeftMax.value.push(leftMax)
        defLeftMini.value.push(leftMini)
        defTopMax.value.push(topMax)
        defTopMini.value.push(topMini)
        defIds.value.push(containerId.value)
      }
    })
    // 遍历找到父容器,最多找到body容器
    const getParent = HTMLCollection => {
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
        let app = null
        for (let i in body.children) {
          let item = body.children[i]
          if (item.attributes !== undefined && item.attributes.id !== undefined) {
            app = item
          }
        }
        return app
      }
    }
    // 销毁
    onDeactivated(() => {
      // 父级
      parent = undefined
      // 当前元素对象
      nowItem = undefined
      // 容器对象
      containerItem = undefined
      // 移动状态
      dragging = false
    })
    return {
      mousedownEvent,
      mouseupEvent,
      mousemoveEvent,
      mouseoutEvent
    }
  }
})
</script>

<style>
.drag-drop {
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

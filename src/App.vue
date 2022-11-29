<template>
  <DragDropContainer id="conta" :width="300" :height="300" class="conta">
    <DragDrop
      id="item1"
      @change="dragDropChange"
      :data-index="NUMBER_ARR[0]"
      class="conta-box"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[0])">
        {{ NUMBER_ARR[0] }}
      </div>
    </DragDrop>
    <DragDrop
      id="item2"
      @change="dragDropChange"
      :data-index="NUMBER_ARR[1]"
      class="conta-box"
      :initialLeft="100"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[1])">{{ NUMBER_ARR[1] }}</div>
    </DragDrop>
    <DragDrop
      id="item3"
      @change="dragDropChange"
      :data-index="NUMBER_ARR[2]"
      class="conta-box"
      :initialLeft="200"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[2])">{{ NUMBER_ARR[2] }}</div>
    </DragDrop>
    <DragDrop
      id="item4"
      @change="dragDropChange"
      :data-index="NUMBER_ARR[3]"
      class="conta-box"
      :initialTop="100"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[3])">{{ NUMBER_ARR[3] }}</div>
    </DragDrop>
    <DragDrop
      id="item5"
      @change="dragDropChange"
      class="conta-box"
      :initialTop="100"
      :initialLeft="100"
      :data-index="NUMBER_ARR[4]"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[4])">{{ NUMBER_ARR[4] }}</div>
    </DragDrop>
    <DragDrop
      id="item6"
      @change="dragDropChange"
      class="conta-box"
      :initialTop="100"
      :initialLeft="200"
      :data-index="NUMBER_ARR[5]"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[5])">{{ NUMBER_ARR[5] }}</div>
    </DragDrop>
    <DragDrop
      id="item7"
      @change="dragDropChange"
      :data-index="NUMBER_ARR[6]"
      class="conta-box"
      :initialTop="200"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[6])">{{ NUMBER_ARR[6] }}</div>
    </DragDrop>
    <DragDrop
      id="item8"
      @change="dragDropChange"
      class="conta-box"
      :initialTop="200"
      :initialLeft="100"
      :data-index="NUMBER_ARR[7]"
      collision
    >
      <div class="conta-item" :style="getDeviation(NUMBER_ARR[7])">{{ NUMBER_ARR[7] }}</div>
    </DragDrop>
  </DragDropContainer>
  <button @click="reduction">还原</button>
  <button @click="disturbance">打乱</button>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const dragDropChange = ({ id, left, top }) => {
      console.log(id, left, top)
    }

    /**
     * 获取一个随机数
     */
    const ROW = 3
    const MINI = 1
    const MAX = ROW * ROW - 1
    const LEVE = Number((MAX + MINI) / ROW)
    const NUMBER_ARR = ref([])
    const getNumber = () => {
      while (NUMBER_ARR.value.length < MAX) {
        let item = Math.floor(Math.random() * (MAX - MINI + 1)) + MINI
        if (NUMBER_ARR.value.indexOf(item) < 0) {
          NUMBER_ARR.value.push(item)
        }
      }
    }
    /**
     * 排序
     */
    const reduction = () => {
      NUMBER_ARR.value.sort((a, b) => {
        return a - b
      })
    }
    /**
     * 打乱
     */
    const disturbance = () => {
      NUMBER_ARR.value = []
      getNumber()
    }
    /**
     * 获取图像偏移
     * 假设为正方形
     */
    const getDeviation = index => {
      const NOW = MAX + MINI - index
      let x = 0
      let y = 0
      if (NOW < LEVE) {
        x = Math.abs(NOW - LEVE * 1 + 1) * 50
        y = 100
      } else if (NOW >= LEVE && NOW < LEVE * 2) {
        x = Math.abs(NOW - LEVE * 2 + 1) * 50
        y = 50
      } else {
        x = Math.abs(NOW - LEVE * 3 + 1) * 50
        y = 0
      }
      return {
        'background-position-x': x + '%',
        'background-position-y': y + '%'
      }
    }
    getNumber()
    return { dragDropChange, NUMBER_ARR, reduction, disturbance, getDeviation }
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
.conta {
  margin-top: 100px;
  margin-left: 100px;
  border: 1px solid #000;
  box-sizing: border-box;
}
.conta-box {
  width: 100px;
  height: 100px;
}
.conta-item {
  width: 98px;
  height: 98px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: burlywood;
  /* background-image: url('../assets/6-6.png'); */
  background-size: 300% 300%;
}
</style>

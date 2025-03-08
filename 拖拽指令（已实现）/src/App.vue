<template>
    <div id="app">
        <div class="controls">
            <button @click="isShow=!isShow">{{isShow?'隐藏':'显示'}}拖拽</button>
            <p>状态：{{options.enable}}</p>
            <button @click="toggleDrag">{{options.enable?'停止':'开始'}}拖拽</button>
            <select v-model="direction">
                <option value="both">自由拖拽</option>
                <option value="horizontal">只允许水平</option>
                <option value="vertical">只允许垂直</option>
            </select>
        </div>
        <div v-if="isShow" v-drag="options" class="box"></div>
        <div class="position">
            <p>位置: X: {{position.x}}px, Y: {{position.y}}px</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isShow: false,
            options: {
                enable: false,
                parentSelector: '#app',
                onDragStart: this.handleDragStart,
                onDragMove: this.handleDragMove,
                onDragEnd: this.handleDragEnd
            },
            direction: 'both',
            position: { x: 0, y: 0 }
        }
    },
    methods: {
        toggleDrag() {
            this.options.enable = !this.options.enable
        },
        handleDragStart() {
            console.log('handleDragStart')
        },
        handleDragMove(pos) {
            this.position = pos
        },
        handleDragEnd(pos) {
            console.log('handleDragEnd')
            this.position = pos
        }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    white-space: nowrap;
    line-height: 1;
}

#app {
    width: 80vw;
    height: 80vh;
    margin: 2rem auto;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
}

.controls {
    position: relative;
    z-index: 2;
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-evenly;

    button, select {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #45a049;
        }
    }

    select {
        background-color: #2196F3;

        &:hover {
            background-color: #1976D2;
        }
    }
}

.box {
    width: 100px;
    height: 100px;
    background-color: #ff4444;
    border-radius: 10px;
    transition: transform 0.2s, box-shadow 0.2s;


    &.is-dragging {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
}

.position {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    padding: 0.5rem;
    background-color: rgba(0,0,0,0.7);
    color: white;
    border-radius: 4px;
}
</style>

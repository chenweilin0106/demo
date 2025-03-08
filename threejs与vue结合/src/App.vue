<template>
  <div id="container">
    <button id="moveCamera" @click="moveCamera">移动相机</button>
    <button id="moveCube" @click="moveCube">移动cube</button>
  </div>
</template>

<script setup>
  import * as dat from 'dat.gui'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { onMounted } from 'vue'
  // Creating a GUI with options.
  const gui = new dat.GUI({ name: 'My GUI' })
  gui.domElement.id = 'gui'
  const folder = gui.addFolder('Flow Field')
  const options = { rotationSpeed: 0.01, color: '#fff', wireframe: false }
  folder.add(options, 'rotationSpeed', 0.01, 0.1, 0.01)
  folder.addColor(options, 'color') // 颜色选择器
  folder.add(options, 'wireframe') // 勾选框
  folder.open() // 默认展开
  // ------------------------------------------------------------------------
  // 创建场景 scene 目前对这个的理解是一个容器，类似canvas的画布
  const scene = new THREE.Scene()
  // 启用雾化效果
  // scene.fog = new THREE.Fog(0xcccccc, 10, 15)
  // 生成一个白色
  // const whiteColor = new THREE.Color(0x000000)
  // 生成背景图片纹理
  // scene.background = new THREE.CubeTextureLoader()
  //   .setPath('/')
  //   .load([
  //     'logo.png',
  //     'logo.png',
  //     'logo.png',
  //     'logo.png',
  //     'logo.png',
  //     'logo.png'
  //   ])
  // 创建一个透视相机
  const camera = new THREE.PerspectiveCamera()
  camera.position.set(0, 2, 15)
  // 创建一个立方体 目前的理解是一个架子 canvas的描边 立方体结构
  const geometry = new THREE.BoxGeometry()
  // 创建一个材质 目前理解是canvas的填充 立方体材质对象
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 创建一个网格 用于控制立方体的位置 目前对这个的理解 将结构和材质合成 生成完整立方体对象
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0, 2, 0)
  // 将立方体网格放到场景中
  scene.add(cube)
  // 坐标轴辅助对象 目前的理解时辅助移动距离
  const axesHelper = new THREE.AxesHelper(5)
  axesHelper.position.set(0, 2, 0)
  scene.add(axesHelper)
  // 创建一个网格辅助器 用于辅助查看网格的位置
  const gridHelper = new THREE.GridHelper()
  scene.add(gridHelper)
  // 创建一个渲染器 准备开始渲染 目前理解 用于渲染场景和相机
  const renderer = new THREE.WebGLRenderer()
  // 添加一个控制器 可以调整视角
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    // console.log('正在调整视角...')
  })
  // 开启阻尼效果
  controls.enableDamping = true
  // 阻尼系数 default 0.05
  // controls.dampingFactor = 0.05
  // 开启自动围绕目标旋转
  // controls.autoRotate = true
  function rotateFn() {
    cube.rotation.x += options.rotationSpeed
    cube.rotation.y += options.rotationSpeed
    cube.material.color = new THREE.Color(options.color)
    material.wireframe = options.wireframe
    // controls.update() // 控制器默认朝向原点 立方体就在原点 所以当改变相机位置时 不调用相机的lookAt方法也会朝向立方体
    renderer.render(scene, camera)
    requestAnimationFrame(rotateFn)
  }
  function moveCamera() {
    camera.position.set(0, 15, 15)
    camera.lookAt(cube.position) // 看向立方体
    renderer.render(scene, camera)
  }
  function moveCube() {
    cube.position.set(0, 2, 10)
  }
  onMounted(() => {
    document.querySelector('#container').appendChild(gui.domElement)
    // 设置渲染器的大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 往页面中放置一个canvas用于渲染
    document.querySelector('#container').appendChild(renderer.domElement)
    // 开始渲染 传入场景和相机
    rotateFn()
  })
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  button {
    position: absolute;
    font-size: 25px;
    font-weight: bold;
  }
  #moveCube {
    top: 0;
    left: 0;
  }
  #moveCamera {
    top: 60px;
    left: 0;
  }
  #gui {
    position: absolute;
    right: 0;
    top: 0;
    /* width: 100px; */
  }
</style>

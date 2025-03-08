// 从https://esm.sh/three导入Three.js库
import * as THREE from 'https://esm.sh/three'
// 从https://esm.sh/three/examples/jsm/controls/OrbitControls导入OrbitControls，用于添加用户交互
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls'

// 获取窗口的宽度
let w = window.innerWidth
// 获取窗口的高度
let h = window.innerHeight

// 创建一个新的Three.js场景
const scene = new THREE.Scene()

// 创建一个透视相机，参数包括视野角度、长宽比、近裁剪面和远裁剪面
const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000)
// 设置相机的位置
camera.position.set(0, 0, 24)
// 让相机看向场景的中心
camera.lookAt(new THREE.Vector3())

// 创建一个WebGL渲染器，并设置抗锯齿为true
const renderer = new THREE.WebGLRenderer({
  antialias: true
  // alpha: true,
})
// 设置渲染器的像素比例为设备的像素比例
renderer.setPixelRatio(window.devicePixelRatio)
// 设置渲染器的大小为窗口的大小
renderer.setSize(w, h)
// 设置渲染器的清除颜色
renderer.setClearColor(0x000000, 1)
// 将渲染器的DOM元素添加到文档的body中
document.body.appendChild(renderer.domElement)

// 创建一个OrbitControls实例，使得用户可以通过鼠标操作来旋转、缩放和平移场景
const controls = new OrbitControls(camera, renderer.domElement)

// 创建一个球体几何体
const geometry = new THREE.SphereGeometry(10)
// 创建一个基础材质，设置颜色为白色，以线框模式渲染
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
})
// 使用几何体和材质创建一个网格（Mesh）
const mesh = new THREE.Mesh(geometry, material)
// 将网格添加到场景中
scene.add(mesh)

// 创建一个时钟，用于在渲染循环中获取经过的时间
const clock = new THREE.Clock()

// 定义一个渲染函数
function render() {
  // 获取时钟的经过时间，并乘以0.5
  const time = clock.getElapsedTime() * 0.5
  // 使用经过的时间来旋转网格
  mesh.rotation.y = time
  // 渲染场景和相机
  renderer.render(scene, camera)
  // 在下一帧时再次调用render函数
  requestAnimationFrame(render)
}

// 调用render函数，开始渲染循环
render()

# JSdoc 常用场景注释

## 基础函数注释

```js
/**
 * 计算两个数字之和
 * @param {number} a 第一个数字
 * @param {number} b 第二个数字
 * @returns {number} 两数之和
 */
function sum(a, b) {
  return a + b
}
```

## 无返回值函数

```js
/**
 * 打印日志
 * @param {string} message 日志内容
 * @returns {void}
 */
function log(message) {
  console.log(message)
}
```

## 可选参数

```js
/**
 * 获取用户信息
 * @param {string} id 用户 ID
 * @param {boolean} [withDetail] 是否返回详细信息
 * @returns {Object} 用户信息
 */
function getUser(id, withDetail) {
  return {}
}
```

## 带默认值的参数

```js
/**
 * 创建分页参数
 * @param {number} [page=1] 当前页
 * @param {number} [pageSize=20] 每页数量
 * @returns {{ page: number, pageSize: number }} 分页参数
 */
function createPageParams(page = 1, pageSize = 20) {
  return { page, pageSize }
}
```

## 联合类型

```js
/**
 * 格式化 ID
 * @param {string|number} id ID
 * @returns {string} 格式化后的 ID
 */
function formatId(id) {
  return String(id)
}
```

## 固定值枚举

```js
/**
 * 设置弹窗状态
 * @param {'open'|'close'} status 弹窗状态
 * @returns {void}
 */
function setDialogStatus(status) {}
```

## 数组

```js
/**
 * 获取数字总和
 * @param {number[]} list 数字列表
 * @returns {number} 总和
 */
function getTotal(list) {
  return list.reduce((total, item) => total + item, 0)
}
```

也可以写成：

```js
/**
 * 获取数字总和
 * @param {Array.<number>} list 数字列表
 * @returns {number} 总和
 */
function getTotal(list) {
  return list.reduce((total, item) => total + item, 0)
}
```

## 对象参数

```js
/**
 * 创建用户
 * @param {Object} user 用户信息
 * @param {string} user.name 用户名称
 * @param {number} user.age 用户年龄
 * @param {string} [user.avatar] 用户头像
 * @returns {void}
 */
function createUser(user) {}
```

## 嵌套对象参数

```js
/**
 * 提交订单
 * @param {Object} order 订单信息
 * @param {string} order.id 订单 ID
 * @param {Object} order.address 收货地址
 * @param {string} order.address.province 省份
 * @param {string} order.address.city 城市
 * @param {string} order.address.detail 详细地址
 * @returns {void}
 */
function submitOrder(order) {}
```

## 对象数组

```js
/**
 * 渲染用户列表
 * @param {{ id: string, name: string, age: number }[]} users 用户列表
 * @returns {void}
 */
function renderUsers(users) {}
```

如果对象结构比较复杂，建议配合 `@typedef`：

```js
/**
 * @typedef {Object} User
 * @property {string} id 用户 ID
 * @property {string} name 用户名称
 * @property {number} age 用户年龄
 */

/**
 * 渲染用户列表
 * @param {User[]} users 用户列表
 * @returns {void}
 */
function renderUsers(users) {}
```

## 返回对象

```js
/**
 * 获取用户配置
 * @returns {{ theme: string, showAvatar: boolean }} 用户配置
 */
function getUserConfig() {
  return {
    theme: 'dark',
    showAvatar: true
  }
}
```

## 返回 Promise

```js
/**
 * 获取用户信息
 * @param {string} id 用户 ID
 * @returns {Promise<{ id: string, name: string }>} 用户信息
 */
function fetchUser(id) {
  return request({ url: '/user/detail', data: { id } })
}
```

## 接口通用返回结构

```js
/**
 * @typedef {Object} ApiResponse
 * @property {number} errno 错误码
 * @property {string} errmsg 错误信息
 * @property {*} data 响应数据
 */

/**
 * 获取活动信息
 * @returns {Promise<ApiResponse>} 活动信息
 */
function getActivityInfo() {
  return request({ url: '/activity/info' })
}
```

如果 `data` 有明确结构，建议单独定义：

```js
/**
 * @typedef {Object} ActivityInfo
 * @property {string} id 活动 ID
 * @property {string} name 活动名称
 * @property {boolean} enabled 是否启用
 */

/**
 * @typedef {Object} ActivityInfoResponse
 * @property {number} errno 错误码
 * @property {string} errmsg 错误信息
 * @property {ActivityInfo} data 活动信息
 */

/**
 * 获取活动信息
 * @returns {Promise<ActivityInfoResponse>} 活动信息
 */
function getActivityInfo() {
  return request({ url: '/activity/info' })
}
```

## 动态 key 对象

适合后端返回对象的 key 不固定，但 value 类型固定的场景。

```js
/**
 * 获取活动模块红点状态
 * @returns {Promise<{ data: Object.<string, boolean>, errmsg: string, errno: number }>} 活动红点状态
 * @example
 * {
 *   "data": {
 *     "m1_status": true,
 *     "m3_status": false
 *   },
 *   "errmsg": "",
 *   "errno": 0
 * }
 */
function activityRedDot() {
  return request({ url: '/actserver/template2/receive', data: { type: 'general_red_info' } })
}
```

复杂一些时，建议抽成类型：

```js
/**
 * @typedef {Object.<string, boolean>} ActivityRedDotData
 */

/**
 * @typedef {Object} ActivityRedDotResponse
 * @property {ActivityRedDotData} data 活动红点状态
 * @property {string} errmsg 错误信息
 * @property {number} errno 错误码
 */

/**
 * 获取活动模块红点状态
 * @returns {Promise<ActivityRedDotResponse>} 活动红点状态
 * @example
 * {
 *   "data": {
 *     "m1_status": true,
 *     "m3_status": false
 *   },
 *   "errmsg": "",
 *   "errno": 0
 * }
 */
function activityRedDot() {
  return request({ url: '/actserver/template2/receive', data: { type: 'general_red_info' } })
}
```

## `@typedef` 定义对象类型

```js
/**
 * @typedef {Object} Product
 * @property {string} id 商品 ID
 * @property {string} name 商品名称
 * @property {number} price 商品价格
 * @property {boolean} [selected] 是否选中
 */

/**
 * 选中商品
 * @param {Product} product 商品信息
 * @returns {Product} 更新后的商品信息
 */
function selectProduct(product) {
  return {
    ...product,
    selected: true
  }
}
```

## `@callback` 定义回调函数

```js
/**
 * @callback SuccessCallback
 * @param {Object} result 执行结果
 * @returns {void}
 */

/**
 * 执行异步任务
 * @param {SuccessCallback} onSuccess 成功回调
 * @returns {void}
 */
function runTask(onSuccess) {
  onSuccess({})
}
```

## 回调函数参数

```js
/**
 * @callback Iterator
 * @param {number} item 当前项
 * @param {number} index 当前索引
 * @returns {void}
 */

/**
 * 遍历列表
 * @param {Array.<number>} list 数字列表
 * @param {Iterator} iterator 遍历函数
 * @returns {void}
 */
function each(list, iterator) {
  list.forEach(iterator)
}
```

## 变量注释

```js
/** @type {number} 当前页 */
let page = 1

/** @type {Array.<string>} 选中的 ID 列表 */
const selectedIds = []

/** @type {{ id: string, name: string }} 当前用户 */
const currentUser = {
  id: '10001',
  name: '张三'
}
```

## 类和实例方法

```js
/**
 * 倒计时工具
 */
class Countdown {
  /**
   * @param {number} seconds 倒计时秒数
   */
  constructor(seconds) {
    this.seconds = seconds
  }

  /**
   * 开始倒计时
   * @returns {void}
   */
  start() {}
}
```

## 模块导出函数

```js
/**
 * 获取活动模块红点状态
 * @returns {Promise<ActivityRedDotResponse>} 活动红点状态
 */
export const activityRedDot = () => {
  return request({ url: '/actserver/template2/receive', data: { type: 'general_red_info' } })
}
```

## `@example` 示例

```js
/**
 * 格式化金额
 * @param {number} amount 金额
 * @returns {string} 格式化后的金额
 * @example
 * formatMoney(12)
 * // 返回 "12.00"
 */
function formatMoney(amount) {
  return amount.toFixed(2)
}
```

## 常用类型写法

```js
/**
 * @param {string} name 字符串
 * @param {number} age 数字
 * @param {boolean} visible 布尔值
 * @param {Object} options 普通对象
 * @param {Array} list 普通数组
 * @param {string[]} names 字符串数组
 * @param {Array.<number>} scores 数字数组
 * @param {Function} callback 函数
 * @param {Promise<string>} promise Promise
 * @param {string|null} value 字符串或 null
 * @param {string|undefined} key 字符串或 undefined
 * @returns {void}
 */
function demo(name, age, visible, options, list, names, scores, callback, promise, value, key) {}
```

## 建议

- 简单对象可以直接写在 `@param` 或 `@returns` 中。
- 复杂对象建议使用 `@typedef` 和 `@property` 拆出来。
- 接口返回值建议把 `data` 的结构单独定义，避免一整行过长。
- 动态 key 对象可以使用 `Object.<string, boolean>`。
- `@example` 适合补充真实数据结构，尤其适合 key 不固定、字段含义不明显的接口。
- 注释重点写参数含义、返回结构和特殊约束，不需要重复描述代码本身已经很清楚的逻辑。

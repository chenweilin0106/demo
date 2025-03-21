# TypeScript

## typeof

`typeof` 操作符用于获取变量或属性的类型。

### 1. 基础用法
```typescript
const user = {
    name: 'Tom',
    age: 25
}
type User = typeof user
// 等价于:
// type User = {
//     name: string
//     age: number
// }
const statusMap = {
    1: { status: 'primary', text: '运行中' },
    2: { status: 'success', text: '成功' },
    '-1': { status: 'primary', text: '失败' }
}
type StatusMap = typeof statusMap
// 等价于:
// type StatusMap = {
//     1: { status: string, text: string }
//     2: { status: string, text: string }
//     '-1': { status: string, text: string }
// }
```

### 2. 函数类型
```typescript
function greet(name: string) {
    return `Hello ${name}`
}
type Greet = typeof greet  // (name: string) => string
```

## keyof

`keyof` 操作符用于获取一个类型的所有键的联合类型。

### 1. 对象键类型
```typescript
interface User {
    name: string
    age: number
}
type UserKeys = keyof User  // "name" | "age"
```

### 2. 与typeof组合
```typescript
// 自定义配置文件一般会带 as const 申明只读
const statusMap = {
    success: 'green',
    error: 'red'
} as const

// 可用于根据自定义map配置数据生成字面量限制 比如只能传入 "success" | "error"
type StatusType = keyof typeof statusMap  // "success" | "error"
```

### 3. 实际应用
```typescript
const statusTypeMap = {
    1: { status: 'primary', text: '运行中' },
    2: { status: 'success', text: '成功' },
    '-1': { status: 'primary', text: '失败' }
} as const

type StatusKeys = keyof typeof statusTypeMap  // "1" | "2" | "-1"
type StatusInfo = typeof statusTypeMap[StatusKeys]  // { status: string, text: string }
```
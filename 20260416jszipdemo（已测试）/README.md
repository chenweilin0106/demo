# JSZip 单页 Demo

这个目录是一个不依赖构建工具的 `JSZip` 单页演示，直接使用本地的 `jszip.min.js`。

## 文件说明

- `index.html`
  页面骨架，包含交互区、结果区、代码配方区。
- `style.css`
  页面样式。
- `main.js`
  示例 ZIP 生成、ZIP 解析、结果渲染、日志输出。
- `jszip.min.js`
  你已经下载好的 JSZip 原始文件。

## 如何使用

### 方式 1：直接双击 `index.html`

这个 demo 没有模块化依赖，直接用浏览器打开也能运行。

### 方式 2：起一个静态服务

例如在当前目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 页面里展示了什么

### 1. 生成 ZIP

页面会先用 `new JSZip()` 创建一个示例压缩包，并写入这些文件：

- `readme.txt`
- `data/info.json`
- `docs/changelog.md`
- `images/demo.svg`
- `binary/sample.bin`

生成时使用的是：

```js
const zip = new JSZip();
zip.file("readme.txt", "hello");
zip.file("images/demo.svg", svgText);

const blob = await zip.generateAsync({ type: "blob" });
```

### 2. 解析 ZIP

解析时使用的是：

```js
const zip = await JSZip.loadAsync(arrayBuffer);
```

这里要注意：

- `loadAsync` 不是把所有文件都一次性变成最终内容
- 它更像是把 ZIP 解析成一个“可操作的文件结构对象”
- 具体某个文件真正读取内容，是在后面的 `file(...).async(...)`

### 3. 按路径找到文件

```js
const jsonFile = zip.file("data/info.json");
```

这一步只是“定位文件入口”，不是最终取到内容。

### 4. 按指定类型读取文件

```js
const jsonText = await jsonFile.async("string");
const jsonData = JSON.parse(jsonText);
```

页面里演示了这些常见类型：

- `string`
- `base64`
- `blob`
- `arraybuffer`
- `uint8array`

## 常见读取方式建议

### 文本 / JSON

优先：

```js
const text = await file.async("string");
```

如果是 JSON，再：

```js
const data = JSON.parse(text);
```

### 图片

有两种常见方式：

#### 方式 A：`base64`

适合拼 `data:` URL：

```js
const base64 = await imageFile.async("base64");
const url = `data:image/png;base64,${base64}`;
```

#### 方式 B：`blob`

更适合较大的媒体文件：

```js
const blob = await imageFile.async("blob");
const url = URL.createObjectURL(blob);
img.src = url;
```

## MP4 怎么处理

不要写成：

```js
await file.async("mp4");
```

因为 `async` 没有 `mp4` 这种类型。

推荐这样写：

```js
const videoFile = zip.file("video/demo.mp4");
const videoBlob = await videoFile.async("blob");
const videoUrl = URL.createObjectURL(videoBlob);

video.src = videoUrl;
video.load();
```

原因是：

- `blob` 更适合视频、音频、大图片
- `base64` 会让体积进一步膨胀
- 浏览器原生对 `Blob + object URL` 的支持更自然

## 你可以怎么扩展这个 demo

### 场景 1：读取远程 ZIP

```js
const { data } = await axios.get(zipUrl, {
  responseType: "arraybuffer",
});

const zip = await JSZip.loadAsync(data);
```

### 场景 2：用正则查找文件

```js
const imageFiles = zip.file(/\.(png|jpe?g|svg)$/i);
```

### 场景 3：限定某个目录

```js
const imageFolder = zip.folder("images");
imageFolder.forEach((relativePath, file) => {
  console.log(relativePath, file);
});
```

## 适合这个 demo 的用途

- 认识 `JSZip.loadAsync`
- 理解 `zip.file(...)`
- 理解 `file.async(...)`
- 比较 `string / base64 / blob / arraybuffer / uint8array`
- 给后续接图片、动画、媒体资源打基础

## 注意点

- 如果 ZIP 很大，`base64` 会明显增加内存占用
- 媒体文件优先考虑 `blob`
- `loadAsync` 后最好只按需读取文件，不要无差别把所有文件都 `async()` 一遍
- 页面里的示例适合教学，不代表生产环境要一次性读取所有类型

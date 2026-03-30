# loupe（图片查看器）笔记

## 安装

```bash
sudo apt update
sudo apt install -y loupe
```

## 使用

打开图片：

```bash
loupe /path/to/image.png
```

如在 WSLg 下遇到窗口不弹/渲染异常，可强制软件渲染：

```bash
GSK_RENDERER=cairo loupe /path/to/image.png
```

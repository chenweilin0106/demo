# Docker 简单攻略（镜像 / 容器 / Volume / Compose）

> 适用人群：刚接触 Docker、主要想“和本机隔离开”或“跟着教程跑服务”的同学（尤其是 Windows 10）。

---

## 0. 一句话理解 Docker

- **镜像（Image）**：只读模板（“安装包/类”），里面包含运行所需的文件与默认启动方式。
- **容器（Container）**：镜像的运行实例（“运行中的程序/对象”），= 镜像只读层 + 容器可写层 + 运行配置 + 进程。
- **Volume**：从容器里“拿出来”的独立数据区，用于**持久化/复用/共享**（不是保存整个可写层，只覆盖你挂载的目录）。
- **Registry（镜像仓库）**：存镜像的地方（Docker Hub/公司私有仓库）。
- **Compose**：用一个 `compose.yaml` 一次拉起多容器（Web + DB + Redis…）。

---

## 1. 运行环境（你需要先具备什么）

### 1.1 通用前提

- 电脑需要安装 Docker 运行时（Docker Engine / Docker Desktop）。
- 能访问镜像仓库（如果要 `pull` 公共镜像）。

### 1.2 Windows 10（最常见情况：跑 Linux 容器）

大多数教程/镜像默认是 **Linux 容器**（Nginx、Redis、MySQL、各种开源服务基本都是）。

- Windows 10 上要跑 Linux 容器，通常需要：
  - **Docker Desktop**
  - **WSL2**（最常见）或 Hyper-V（取决于系统版本与配置）
  - BIOS/系统里启用虚拟化相关能力（不展开）

> 你当前截图表现：`wsl` 和 `docker` 命令都不存在，说明还没安装/启用这套运行环境。

### 1.3 Windows 容器（了解即可）

- 也可以跑 **Windows 容器**（用 Windows 内核），但生态/镜像与教程相对少，很多开源项目不会提供 Windows 容器镜像。

---

## 2. 目标一：跑“现成软件”（论坛里说“放 Docker 里跑”通常就是这个）

### 2.1 适用场景

- 你想跑一个软件/服务（如：面板、下载器、各种后端服务），但不想污染本机环境。
- 你想要“一条命令启动/停止/升级/回滚”，出问题直接删容器重来。

### 2.2 标准流程（心智模型）

1) **找镜像**（官方/可信作者）  
2) **明确运行参数**（端口、数据目录、账号密码/密钥、网络）  
3) **用 Volume 持久化数据**（重点！否则删容器数据就没了）  
4) **启动容器**（`docker run` 或 `docker compose up -d`）  
5) **验证**（打开端口/页面，`docker logs` 看日志）  
6) **升级**（`pull` 新镜像 → 重建容器；数据用 volume 保留）

### 2.3 最小可用命令（概念）

```powershell
# 1) 拉镜像（没有镜像时 run 也会自动拉）
docker pull some/image:tag

# 2) 跑起来（端口映射 + volume 持久化）
docker run -d --name app `
  -p 8080:80 `
  -v app_data:/data `
  some/image:tag

# 3) 看状态/日志
docker ps
docker logs -f app

# 4) 停止/删除容器（注意：volume 不会自动删除）
docker stop app
docker rm app
```

### 2.4 常见坑（非常重要）

- **安全隔离≠虚拟机级沙箱**：不要把容器当“绝对安全”。
- 少用/慎用：`--privileged`、`--net=host`、随意把整个磁盘挂进去（`-v C:\:/host` 这种）。
- **数据要放 Volume**：数据库/配置/下载内容等，建议用命名 volume 或明确的绑定挂载目录。

---

## 3. 目标二：搭“开发依赖环境”（最常见：MySQL/Redis/ES…）

### 3.1 适用场景

- 你做前端/全栈开发，想一键启动 MySQL/Redis 之类依赖，而不是在 Windows 上手装手卸。
- 你想让团队“同一份环境”，避免“我机器可以”。

### 3.2 推荐方式：Compose（比手写一堆 `docker run` 更稳）

标准流程：
1) 写 `compose.yaml`（声明服务、端口、volume、环境变量）
2) `docker compose up -d` 一键启动
3) 用 `docker compose logs -f` 看日志
4) 停止：`docker compose down`（是否保留数据取决于 volume）

最小 `compose.yaml`（示例：Redis）：

```yaml
services:
  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

常用命令：

```powershell
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

### 3.3 常见坑

- 端口冲突：本机已有同端口服务时会启动失败。
- 数据丢失：没有 volume 的数据库容器，删容器就没数据。
- Windows 路径挂载：绑定挂载写法与权限/换行符等问题较多；新手优先用命名 volume。

---

## 4. 目标三：把你的项目“打包交付”（更偏部署 / CI/CD）

### 4.1 适用场景

- 你想把项目打成一个镜像，交给另一台机器“只要能跑 Docker 就能跑起来”。
- 你想在 CI 里构建并 push 镜像，服务器 pull 之后启动。

### 4.2 关键原则：区分“构建依赖”和“运行依赖”

以 Vue3 静态站点为例：
- **构建时**需要 Node + 依赖（`npm ci` / `npm run build`）
- **运行时**只需要一个静态服务器（Nginx 或任意 HTTP server），通常不需要 Node，更不需要 `node_modules`

这就是 **多阶段构建** 的意义：让最终镜像更小、拉取更快。

### 4.3 流程（Vue3 静态站点）

1) 写 `Dockerfile`（多阶段：Node 打包 → Nginx 运行）
2) `docker build -t my-vue:1.0 .`
3) `docker run -d -p 8080:80 my-vue:1.0`
4) （可选）push 到仓库：CI/手动 `docker push`

你需要知道的事实：
- `dist/` 本身是一堆静态文件，“能被访问”仍需要一个服务器来托管（Nginx、CDN、对象存储等）。
- Docker 的价值常在于：把**托管方式/配置/启动**也一起打包，部署一致。

---

## 5. `docker run` 背后发生了什么（串起来理解）

当你执行：

```powershell
docker run --name web -p 8080:80 -v web_data:/data nginx:alpine
```

大致会发生：
1) 本机没有 `nginx:alpine` 就先去 **pull 镜像**（镜像是分层的）
2) 基于镜像创建容器：记录名字、端口映射、挂载、启动命令等“运行配置”
3) 挂载文件系统：镜像只读层 + 容器可写层（写时复制，仅记录差异）
4) 挂载 `web_data` volume 到容器 `/data`
5) 配置网络与端口：宿主机 `8080` → 容器 `80`
6) 启动进程：这里是 `nginx` 作为容器主进程（PID 1）

---

## 6. 常用命令速查（够新手用）

```powershell
# 镜像
docker images
docker pull repo/name:tag
docker rmi repo/name:tag

# 容器
docker ps
docker ps -a
docker run ...
docker stop <name>
docker start <name>
docker rm <name>
docker logs -f <name>
docker exec -it <name> sh

# 卷
docker volume ls
docker volume inspect <vol>
docker volume rm <vol>

# Compose
docker compose up -d
docker compose logs -f
docker compose down
```

---

## 7. 清理与“重来一次”（新手很常用）

思路：
- 想“软件重装”：删容器重建即可（镜像可复用）
- 想“数据也重置”：删除对应 volume（谨慎）

常用：
- 删除容器：`docker rm -f <name>`
- 删除 volume：`docker volume rm <vol>`

---

## 8. 给纯前端的建议（Vue3 视角）

- 先把 Docker 当成“启动第三方服务的工具”（Redis/MySQL/各种面板），会学得最快。
- 生产部署 Vue3 静态站点：
  - **最省心**：CDN/对象存储（不一定用 Docker）
  - **要和后端/网关一起编排**：Docker + Nginx/Compose 更常见
- 路由模式提示：
  - `hash`（`/#/xxx`）更省心
  - `history`（`/xxx`）通常要服务端做 SPA 回退（Nginx 配置）

---

## 9. 你下次问我问题时怎么描述目标（推荐模板）

把下面几项贴给我，我就能快速给出“可运行”的命令/compose：
- 你的目标：`跑现成软件 / 搭开发依赖 / 打包交付`
- 软件/服务名：例如 `openclaw`
- 是否需要持久化数据：是/否（如果是，数据目录在哪）
- 要开放的端口：例如 `8080:80`
- 是否要用 Compose：是/否
- 操作系统：`Windows 10`（以及是否已安装 Docker Desktop/WSL2）


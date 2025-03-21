# GitLab CI/CD 配置指南

## 基础概念

- `.gitlab-ci.yml`: GitLab CI/CD 的配置文件
- Pipeline: 流水线，由多个 Stages 组成
- Stage: 阶段，同一阶段的作业并行执行
- Job: 作业，流水线中的具体任务

## 常用配置参考

### 1. 基础结构
```yaml
# 定义流水线阶段
stages:
  - build      # 构建阶段
  - test       # 测试阶段
  - deploy     # 部署阶段

# 指定运行环境
image: node:16  # 使用 Node.js 镜像
```

### 2. 变量定义
```yaml
variables:
  # 全局变量
  GLOBAL_VAR: "value"
  # 带选项的变量
  DEPLOY_ENV:
    value: "test"
    options:
      - "dev"
      - "test"
      - "prod"
    description: "部署环境"
```

### 3. 工作流规则
```yaml
workflow:
  rules:
    - if: $CI_COMMIT_BRANCH == "main"    # 主分支触发
      when: always
    - if: $CI_COMMIT_TAG                 # 有标签时触发
      when: always
    - if: $CI_MERGE_REQUEST_ID           # MR 时触发
      when: always
```

### 4. 缓存配置
```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}   # 缓存键
  paths:                        # 缓存路径
    - node_modules/
    - dist/
```

### 5. 作业配置
```yaml
job_name:
  stage: build                # 所属阶段
  tags:                       # Runner 标签
    - docker
  only:                       # 触发条件
    - main
  script:                     # 执行脚本
    - npm install
    - npm run build
```

## 完整实例

以下是一个 Vue 项目的完整配置示例：

```yaml
# 定义阶段
stages:
  - install
  - build
  - deploy

# 基础镜像
image: node:16

# 变量定义
variables:
  ENVIRONMENT:
    value: "test"
    options: ["dev", "test", "prod"]
    description: "部署环境"
  ENVIRONMENT:
    value: "test"
    options: ["dev", "test", "prod"]
    description: "部署环境"

# 工作流规则
workflow:
  rules:
    - if: '$CI_COMMIT_MESSAGE =~ /deploy/'
      when: always
    - when: never

# 全局缓存配置
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - dist/

# 安装依赖
install_deps:
  stage: install # runner 标签
  script:
    - npm install
  artifacts:
    paths:
      - node_modules/

# 构建项目
build_app:
  stage: build # runner 标签
  script:
    - npm run build:${ENVIRONMENT}
  dependencies:
    - install_deps
  artifacts: # 添加 artifacts 配置
    paths:
      - dist/ # 保存构建产物

# 部署项目
deploy_app:
  stage: deploy # runner 标签
  script:
    - echo "Deploying to ${ENVIRONMENT}..."
    # 使用 ossutil 部署到阿里云 OSS
    - ossutil cp -rf dist/ oss://bucket-name/${ENVIRONMENT}/
  only:
    - main
  when: manual  # 手动触发部署
  dependencies: # 声明依赖 build_job
    - build_app # 这样可以使用 build_app 的构建产物
```

## 关键点说明

1. **阶段顺序**：从上到下按顺序执行
2. **缓存使用**：加速构建过程
3. **条件触发**：通过 rules 或 only/except 控制
4. **制品传递**：使用 artifacts 在作业间传递文件
5. **环境变量**：通过 variables 定义全局变量
6. **手动控制**：使用 when: manual 实现手动触发

这个配置文件包含了常用的 CI/CD 功能，适用于大多数 Web 项目的自动化部署需求。可以根据具体项目需求进行调整。
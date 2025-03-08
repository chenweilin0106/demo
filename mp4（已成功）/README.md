# 仓库介绍

该仓库为 H5 活动仓库，活动分为周常活动,特殊活动,版本活动；
周常活动一般是节日活动，或者是带有积分兑换、充值返利、钻石送礼等模块；
特殊活动,版本活动一般是单页面，并且一般不会带有积分兑换、充值返利、钻石送礼等模块；

## 分支介绍（活动开发流程具体见 doc 分支中活动开发流程文件）

### 周常活动分支

- trunk：周常活动主分支，代码版本为最新，周常活动只负责拉分支；
- weekly\_活动名称\_test：周常活动测试开发分支，该分支只负责开发和测试；

### 特殊活动分支

- 活动名称\_branch_dev：特殊活动开发测试分支，开发和测试都在该分支进行；
- 活动名称\_branch_release：特殊活动发布分支，该分支只负责修改打包配置、打外网包，并不进行代码更新；

# 活动开发

### 分支命名规则

特殊活动：

例：靓号摇摇乐活动

开发和测试分支：**`lotteryNumber_branch_dev`**（活动名称\_branch_dev）；

发布分支：**`lotteryNumber_branch_release`** （活动名称\_branch_release）；

周常活动：

例：儿童节活动

开发分支：**`trunk`**；

测试分支：**`weekly_childrenDay_test`**（weekly\_活动名称\_test）；

发布分支：**`weekly_release`**；

### 一、**周常活动开发流程**（以儿童节活动为例）

1. 活动开发和测试周期

   - 在开发分支（**`trunk`**）上拉出测试分支（**`weekly_childrenDay_test`**）；

     ```
     git fetch
     git checkout trunk
     git pull
     git checkout -b weekly_childrenDay_test
     git push -u origin weekly_childrenDay_test
     ```

   - 开发完成之后，让后端在开发服务器上部署开发环境，然后打开发包，在开发服务器上进行自测；

   - 自测完成后，让后端在测试服务器上部署测试环境，然后我们打测试包（第一次打测试包需带上 CDN，进行测试，后续可带可不带），开始修复 bug；

2. 发布外网流程

   - 测试完成之后，先从测试分支（**`weekly_childrenDay_test`**）合并代码到主分支（**`trunk`**）；

     ```
     git fetch
     git pull
     git checkout trunk
     git pull
     git merge weekly_childrenDay_test
     ```

   - 修改配置文件（**`.env.production`**中的环境变量值 CDN、活动名称等），并截图让前端后端确认，确认无误后，打包，压缩发给后端；
   - 活动结束后，删除本地开发测试分支

     ```
     // 删除本地分支
     git branch -d weekly_childrenDay_test
     ```

   - `gitlab`上删除远程分支后，本地执行以下命令同步分支

   - ```
     git fetch -p origin
     ```

3. 外网问题修复流程

   - 先从测试分支（**`weekly_childrenDay_test`**）修复问题，并打测试包提交测试；
   - 问题验证修复后，从测试分支（**`weekly_childrenDay_test`**）合并到主分支（**`trunk`**），并打外网包发布外网；

### 二、**特殊活动开发流程**（以靓号摇摇乐活动为例）

1. 活动开发和测试周期（提交测试前）

   - 新增开发测试分支（**`lotteryNumber_branch_dev`**）；

     ```
     git fetch
     git pull
     git checkout --orphan lotteryNumber_branch_dev
     git push -u origin lotteryNumber_branch_dev
     ```

   - 开发完成之后，让后端在开发服务器上部署开发环境，然后打开发包，在开发服务器上进行自测；

   - 自测完成后，让后端在测试服务器上部署测试环境，然后我们打测试包（第一次打测试包需带上 CDN，进行测试，后续可带可不带），开始修复 bug；

2. 发布外网流程

   - 从开发测试分支（**`lotteryNumber_branch_dev`**）拉发布分支（**`lotteryNumber_branch_release` **）；

     ```
     git fetch
     git pull
     git checkout -b lotteryNumber_branch_release
     git push -u origin lotteryNumber_branch_release
     ```

   - 修改配置文件（**`.env.production`**中的环境变量值 CDN、活动名称等），并截图让前端后端确认，确认无误后，打包，压缩发给后端；

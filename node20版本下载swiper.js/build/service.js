const { execSync } = require('child_process')
const fs = require('fs');
const path = require('path')
const glob = require('glob')

// 定义一个函数来加载.env文件
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  try {
    const data = fs.readFileSync(envPath, 'utf8');
    const lines = data.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } catch (err) {
    console.error('Failed to load .env file', err);
  }
}

loadEnv(); // 调用函数加载环境变量

const params = process.argv.slice(2)
const index = params.findIndex((item) => item.startsWith('page='))
const page = index !== -1 && params[index].split('=')[1] ? params[index] : `page=${process.env.VUE_APP_ICON_PATH}` // 在page=后面输入项目名称或者在.env文件中添加环境变量VUE_APP_ICON_PATH

if (index !== -1) params.splice(index, 1) // 移除指定目录参数 因为vue-cli-service不需要page参数

const paramsStr = params.join(' ')

console.log('params-----', params)
console.log('index-----', index)
console.log('page-----', page)
console.log('paramsStr-----', paramsStr)

if (page) {
  // 指定项目单独打包
  process.env.PAGE_NAME = page.split('=')[1]
  if (process.env.PAGE_NAME === 'undefined') return console.log('请在page=后面输入项目名称或者在.env文件中添加环境变量VUE_APP_ICON_PATH')
  execSync(`npx vue-cli-service ${paramsStr}`, { stdio: 'inherit' })
} else {
  // 分目录打包所有项目
  const PATH_ENTRY = path.resolve(__dirname, '../src/pages')
  const entryFilePaths = glob.sync(PATH_ENTRY + '/**/main.js')
  entryFilePaths.forEach((filePath) => {
    process.env.PAGE_NAME = filePath.match(/([^/]+)\/main\.js$/)[1]
    console.log(`正在打包 ${process.env.PAGE_NAME} 页面`, '\n')
    execSync(`vue-cli-service ${paramsStr}`, {
      stdio: 'inherit'
    })
  })
}

import request from '../utils/request'
// 主页数据
export const getPageData = (data) => {
  return request({
    url: '/actserver/lover2024/home',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
// 立即装扮接口 type：装扮种类 id：道具id
// 如果装扮失败，去对应后台查看是否有该装扮，再查看id是否正确
export const nowEquip = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 主页数据
export const home = (data) => {
  return request({
    url: '/actserver/lover2024/home',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块一
export const moduleOne = (data) => {
  return request({
    url: '/actserver/lover2024/module-one',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块二
export const moduleTwo = (data) => {
  return request({
    url: '/actserver/lover2024/module-two',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块三
export const moduleThree = (data) => {
  return request({
    url: '/actserver/lover2024/module-three',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块四
export const moduleFour = (data) => {
  return request({
    url: '/actserver/lover2024/module-four',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块五
export const moduleFive = (data) => {
  return request({
    url: '/actserver/lover2024/module-five',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块六
export const moduleSix = (data) => {
  return request({
    url: '/actserver/lover2024/module-six',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 模块七
export const moduleSeven = (data) => {
  return request({
    url: '/actserver/lover2024/module-seven',
    method: 'post',
    data: {
      ...data
    }
  })
}

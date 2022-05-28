import  Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'


Mock.mock('/home/getData',homeApi.getStaticalData)
// 使用正则来匹配请求地址 _添加用户数据接口
Mock.mock(/user\/add/,'post',userApi.createUser)
// 编辑用户数据接口
Mock.mock(/user\/edit/,'post',userApi.updateUser)

// 用户列表数据获取
Mock.mock(/user\/getUser/,'get',userApi.getUserList)

// 删除用户操作
Mock.mock(/user\/del/,'post',userApi.deletaUser)


// 定义用户登录操作

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
// Mock.mock('/permission/getMenu','post',permissionApi.getMenu)

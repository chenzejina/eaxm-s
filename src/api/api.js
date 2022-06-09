import axios from "axios";

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization=sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.status==401){
        window.location.href='/'
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  /**
 * @description 局部配置 token
 */
const baseURL='/api'
const getPostConfig =  { 
    baseURL, 
    headers: {
        contentType: 'application/json', 
        authorization:sessionStorage.getItem('token')
    } 
}
 

/** 
 * @description 获取验证码
 * **/
export function getCaptchaApi() {
    return '/api/captcha?' + Math.random()
}


/*** 
 * @description 注册接口 
 * @param payload <object>
 * @param payload.username
 * @param payload.password
 * @param payload.email
 * @param payload.phone
 * @param payload.caprcha 
**/
export function registerApi(payload = {}) {
    return axios.post('/user/register', payload, getPostConfig)
}

/**
 * @description 登录接口
 * @param payload <object>
 * @param payload.username
 * @param payload.password
 * @param payload.captcha
 **/
export function loginApi(payload = {}) {
    return axios.post('/user/login', payload, getPostConfig)
}


/** 
 * @description 获取用户信息接口
 * **/
export function getUserInfoApi(payload = {}) {
    return axios.post('/user/info', payload, getPostConfig)
}

/** 
 * @description 退出登录接口
 * **/
export function logOutApi(payload = {}) {
    return axios.post('/user/logout', payload, getPostConfig )
}

/**
 * @description 查询题库列表接口
 * @param payload <object>
 * @param payload.type  //题目类型 
 */
export function questionList(payload){
    return axios.post('question/list',payload,getPostConfig)
}
/**
 * @description 创建题接口
 * @param payload <object>
 * @param payload.type  //题目类型
 * @param payload.title  //题目标题 
 * @param payload.questionA  // 选项a,
 * @param payload.questionB  // 选项b,
 * @param payload.answer     // 答案   
 * @param payload.level     // 难度系数 1：简单  2：普通 3：困难
 */
export function questionCreate(payload){
    return axios.post('/question/create',payload,getPostConfig)
}


/**
 * @description 修改题接口
 * @param payload <object>
 * @param payload.id //题目id
 * @param payload.type  //题目类型
 * @param payload.title  //题目标题 
 * @param payload.questionA  // 选项a,
 * @param payload.questionB  // 选项b,
 * @param payload.answer     // 答案   
 * @param payload.level     // 难度系数 1：简单  2：普通 3：困难
 */
export function questionModify(payload){
    return axios.post('/question/update',payload,getPostConfig)
}

   

/**
 * @description 删除题接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function questiondalete(payload){
    return axios.post('/question/delete',payload,getPostConfig)
} 

/**
 * @description 修改接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function modifyInformation(payload){
    return axios.post('/user/update',payload,getPostConfig)
} 

/**
 * @description 查询任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function notepad(payload){
    return axios.post('/diary/list',payload)
} 

/**
 * @description 查询任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function diraryCreate(payload){
    return axios.post('/diary/create',payload,getPostConfig)
} 


/**
 * @description 創建任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createTesk(payload){
    return axios.post('/task/create',payload,getPostConfig)
} 

/**
 * @description 查看任務列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createList(payload){
    return axios.post('/task/list',payload,getPostConfig)
} 

/**
 * @description 查看用戶信息接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function userList(payload){
    return axios.post('/user/list',payload,getPostConfig)
} 

/**
 * @description 發佈任務接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function releaseTask(payload){
    return axios.post('/task/release',payload,getPostConfig)
} 

/**
 * @description 编辑任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function updateTask(payload){
    return axios.post('/task/update',payload,getPostConfig)
} 

/**
 * @description 查询任务详情接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function taskDetail(payload){
    return axios.post('/task/detail',payload,getPostConfig)
} 

/**
 * @description 创建角色接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createRole(payload){
    return axios.post('/role/create',payload,getPostConfig)
}

/**
 * @description 角色分组列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function roleGroupList(payload){
    return axios.post('/roleGroup/list',payload,getPostConfig)
} 

/**
 * @description 角色列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function roleEntry(payload){
    return axios.post('/role/list',payload,getPostConfig)
} 
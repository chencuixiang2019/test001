import axios from './http'
import QS from 'qs'
import base from './base'



export function ashowbooks(params) {
    return axios({
        url: `${base.url}/API/show_books`,//测试接口
        pragma:params,
        method: 'get'
    })
}

export function login(data) { //登录接口
    return axios({
        url: `${base.url}/API/login`,
        method: 'post',
        // data: QS.stringify(data)
        data:data
    })
}


export function uploadtoken(data) { //上传接口
    return axios({
        url: `${base.url}/API/uploadtoken`,
        method: 'get',

    })
}

export function addproject(data) { //添加项目接口
    return axios({
        url: `${base.url}/API/addProject`,
        method: 'post',
        // data: QS.stringify(data)
        data:data
    })
}

export function getproject(data) { //获取项目表中的内容
    return axios({
        url: `${base.url}/API/getProject`,
        method: 'get',

    })
}

export function addGroup(data) { //添加分组表中的内容
    return axios({
        url: `${base.url}/API/addGroup`,
        method: 'post',
        data:data
    })
}
export function getGroup(data) { //获取分组中的表中的内容
    return axios({
        url: `${base.url}/API/getGroup`,
        method: 'POST',
        data:data,
    })
}

export function updateGroupObj(data) { //获取分组中的表中的内容
    return axios({
        url: `${base.url}/API/updateGroup`,
        method: 'POST',
        data:data,
    })
}
export function deleteGroupObj(data) { //获取分组中的表中的内容
    return axios({
        url: `${base.url}/API/deleteGroup`,
        method: 'POST',
        data:data,
    })
}

export function addInterface(data) { //添加接口
    return axios({
        url: `${base.url}/API/addInterface`,
        method: 'post',
        data:data
    })
}
export function getInterface(data) { //获取接口列表
    return axios({
        url: `${base.url}/API/getInterface`,
        method: 'POST',
        data:data,
    })
}

export function updateInterfaceObj(data) { //修改接口中内容
    return axios({
        url: `${base.url}/API/updateInterface`,
        method: 'POST',
        data:data,
    })
}
export function deleteInterfaceObj(data) { //删除接口中的表中的内容
    return axios({
        url: `${base.url}/API/deleteInterface`,
        method: 'POST',
        data:data,
    })
}

export function copyCaseObj(data) { //复制当前用例中的内容
    return axios({
        url: `${base.url}/API/copyCase`,
        method: 'POST',
        data: data,
    })
}




export function addCase(data) { //添加接口
    return axios({
        url: `${base.url}/API/addCase`,
        method: 'post',
        data:data
    })
}

export function getCase(data) { //获取case列表
    return axios({
        url: `${base.url}/API/getCase`,
        method: 'POST',
        data:data,
    })
}

export function updateCaseObj(data) { //修改case中内容
    return axios({
        url: `${base.url}/API/updateCase`,
        method: 'POST',
        data:data,
    })
}

export function deleteCaseObj(data) { //删除case中的表中的内容
    return axios({
        url: `${base.url}/API/deleteCase`,
        method: 'POST',
        data:data,
    })
}


export function getRequest(data) { //删除case中的表中的内容
    return axios({
        url: `${base.url}/API/getRequest`,
        method: 'POST',
        data:data,
    })
}


export function getAllCass(data) { //获得单个用例
    return axios({
        url: `${base.url}/API/getAllCass`,
        method: 'POST',
        data:data,
    })
}

export function getcheckpoint(data) { //检查点接口
  return axios({
    url: `${base.url}/API/checkPoint`,
    method: 'POST',
    data: data
    // data: QS.stringify(data)
  })
}

export function getcheckCase(data) { //获得检查测试用例接口
  return axios({
    url: `${base.url}/API/checkCase`,
    method: 'POST',
    data: data
  })
}


export function getTestDB() { //获得数据库连接列表
  return axios({
    url: `${base.url}/API/getTestDB`,
    method: 'POST',
  })
}

export function getTestSQL(data) { //检查SQL语句
  return axios({
    url: `${base.url}/API/getTestSQL`,
    method: 'POST',
    data: data
  })
}


export function getHerders(data) { //获取herders库
  return axios({
    url: `${base.url}/API/getHerders`,
    method: 'POST',
  })
}


export function AssertionCase(data) { //检查herders
  return axios({
    url: `${base.url}/API/AssertionCase`,
    method: 'POST',
    data: data
  })
}


export function getOneCase(data) { //检查获得单个用例
  return axios({
    url: `${base.url}/API/getOneCase`,
    data: data,
    method: 'POST',

  })
}

export function executionCase(data) { //执行用例
  return axios({
    url: `${base.url}/API/executionCase`,
    data: data,
    method: 'POST',

  })
}

export function gettingUseCases(data) { //获取测试计划中用例筛选条件
  return axios({
    url: `${base.url}/API/gettingUseCases`,
    data: data,
    method: 'POST',

  })
}

export function getTestPlanCases(data) { //获取测试计划中用例筛选条件后的用例
  return axios({
    url: `${base.url}/API/getTestPlanCases`,
    data: data,
    method: 'POST',

  })
}

export function addTestPlan(data) { //获取测试计划中用例筛选条件后的用例
  return axios({
    url: `${base.url}/API/addTestPlan`,
    data: data,
    method: 'POST',

  })
}

export function queryTestPlan(data) { //获取查询测试计划内容
  return axios({
    url: `${base.url}/API/queryTestPlan`,
    data: data,
    method: 'POST',

  })
}

export function deleteTestPlan(data) { //获取查询测试计划内容
  return axios({
    url: `${base.url}/API/deleteTestPlan`,
    data: data,
    method: 'POST',

  })
}

export function executetTestPlan(data) { //执行测试计划内容
  return axios({
    url: `${base.url}/API/executetTestPlan`,
    data: data,
    method: 'POST',

  })
}

export function addPublicInterface(data) { //添加测试计划内容
  return axios({
    url: `${base.url}/API/addPublicInterface`,
    data: data,
    method: 'POST',

  })
}


export function queryPublicInterface(data) { //查询测试计划内容
  return axios({
    url: `${base.url}/API/queryPublicInterface`,
    data: data,
    method: 'POST',

  })
}

export function runNerPublicInterface(data) { //执行测试计划内容
  return axios({
    url: `${base.url}/API/runNerPublicInterface`,
    data: data,
    method: 'POST',
  })
}

export function delPublicInterface(data) { //删除测试计划内容
  return axios({
    url: `${base.url}/API/delPublicInterface`,
    data: data,
    method: 'POST',
  })
}

export function getReportPlan(data) { //删除测试计划内容
    return axios({
        url: `${base.url}/API/getReportPlan`,
        data: data,
        method: 'POST',
    })
}


export function getReportCase(data) { //删除测试计划内容
    return axios({
        url: `${base.url}/API/getReportCase`,
        data: data,
        method: 'POST',
    })
}


export function deletePhone(data) { //删除测试计划内容
    return axios({
        url: `${base.ohther}/base/tool/deletePhone`,
        data: data,
        method: 'POST',
    })
}

export function getVcode(data) { //删除测试计划内容
    return axios({
        url: `${base.ohther}/base/tool/getVcode`,
        data: data,
        method: 'GET',
    })
}
export function checkStyle(data) { //删除测试计划内容
    return axios({
        url: `${base.ohther}/base/tool/checkStyle`,
        data: data,
        method: 'POST',
    })
}


export function addEmail(data) { //添加修改计划
    return axios({
        url: `${base.url}/API/addEmail`,
        data: data,
        method: 'POST',
    })
}

export function getEmail(data) { //删除测试计划内容
    return axios({
        url: `${base.url}/API/getEmail`,
        data: data,
        method: 'POST',
    })
}

export function testEmail(data) { //删除测试计划内容
    return axios({
        url: `${base.url}/API/testEmail`,
        data: data,
        method: 'POST',
    })
}

export function adduserPresonnel(data) { //新增修改用户
    return axios({
        url: `${base.url}/API/adduserPresonnel`,
        data: data,
        method: 'POST',
    })
}

export function getPresonnel(data) { //获取用户信息
    return axios({
        url: `${base.url}/API/getPresonnel`,
        data: data,
        method: 'POST',
    })
}

export function getALLPresonnel(data) { //获取全部用户
    return axios({
        url: `${base.url}/API/getALLPresonnel`,
        data: data,
        method: 'POST',
    })
}

export function delPresonnel(data) { //删除用户
    return axios({
        url: `${base.url}/API/delPresonnel`,
        data: data,
        method: 'POST',
    })
}
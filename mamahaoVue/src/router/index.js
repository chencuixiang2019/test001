import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/components/login.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/home',
      component: () => import('@/components/homepage/homepage.vue'),
      meta: {
        title: '母版页'
      },
      children: [
        {
          path: '/index',
          name: '系统首页',
          component: () => import('@/components/projectMamahao/showProject'),
          meta: {
            title: '系统首页',
            hideclose: true,
            role: ['1', '2','3']
          }
        },
        {
          path: '/newProject',
          name: 'newProject',
          component: () => import('@/components/projectMamahao/newProject'),
          meta: {
            title: '新增项目',
            role: ['1', '2','3']
          }
        },
        {
          path: '/testPlan',
          name: 'testPlan',
          component: () => import('@/components/projectMamahao/testPlan'),
          meta: {
            title: '测试计划',
            role: ['1', '2', '3']
          }
        },
        {
          path: '/newGroup/:id',//防止刷新当前页面丢失冲上一个页面传过来的项目ID
          name: 'newGroup',
          component: () => import('@/components/projectMamahao/newGroup'),
          meta: {
            title: '项目分组',
            role: ['1', '2','3']
          }
        },
        {
          path: '/tablepage',
          name: 'tablepage',
          component: () => import('@/components/tablepage/tablepage'),
          meta: {
            title: '测试tabpage',
            role: ['1', '2','3']
          }
        },
        {
          path: '/ToolHome',
          name: 'ToolHome',
          component: () => import('@/components/tablepage/ToolHome'),
          meta: {
            title: '工具接口',
            role: ['1', '2', '3']
          }
        },


        {
          path: '/InterfaceManagementList/:id',
          name: 'InterfaceManagementList',
          component: () => import('@/components/InterfaceMamahao/InterfaceManagementList'),
          meta: {
            title: '接口列表',
            role: ['1', '2','3']
          }
        },

        {
          path: '/testCaseAction/:id',
          name: 'testCaseAction',
          component: () => import('@/components/InterfaceMamahao/testCaseAction'),
          meta: {
            title: '测试用例',
            role: ['1', '2','3']
          }
        },
         {
           path: '/addCase/:id/:case_id',
          name: 'addCase',
          component: () => import('@/components/InterfaceMamahao/addCase'),
          meta: {
            title: '新增编辑用例',
            role: ['1', '2','3']
          }
        },
        {
          path: '/ReportMamahao',
          name: 'ReportMamahao',
          component: () => import('@/components/ReportMamahao/ReportMamahao'),
          meta: {
            title: 'Case结果报表',
            role: ['1', '2', '3']
          }
        },
        {
          path: '/Personnel',
          name: 'Personnel',
          component: () => import('@/components/system/Personnel'),
          meta: {
            title: '人员配置',
            role: ['1']
          }
        },
        {
          path: '/ProjectEnvironmentSwitching',
          name: 'ProjectEnvironmentSwitching',
          component: () => import('@/components/system/ProjectEnvironmentSwitching'),
          meta: {
            title: '环境配置',
            role: ['1']
          }
        },
        {
          path: '/TestDatabase',
          name: 'TestDatabase',
          component: () => import('@/components/system/TestDatabase'),
          meta: {
            title: '数据库配置',
            role: ['1']
          }
        },
        {
          path: '/TestMail',
          name: 'TestMail',
          component: () => import('@/components/system/TestMail'),
          meta: {
            title: '邮件配置',
            role: ['1']
          }
        },
        {
          path: '/PublicInterface',
          name: 'PublicInterface',
          component: () => import('@/components/InterfaceMamahao/PublicInterface'),
          meta: {
            title: '公共接口',
            role: ['1', '2', '3']
          }
        },

      ],

    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/components/homepage/404.vue'),
      meta: { title: '路由不存在' }
    },
    {
      name: '403',
      path: '/403',
      component: () => import('@/components/homepage/403.vue'),
      meta: { title: '资源不可访问' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
})
/**
 * 全局路由守卫
 */
const rightPathList = ['/login', '/404', '/403'];//直接可以进入的页面
router.beforeEach((to, from, next) => {
  // debugger
  console.log('跳转到:', to.fullPath);
  var token = sessionStorage.getItem('token');
  if (!token && to.path != '/login') {//登陆认证校验,没登录则跳转/login
    next({ path: '/login' })
  }
  else {//权限认证
    if (rightPathList.includes(to.path)) {
      next();
    }
    else if (hasPermit(to)) {
      next();
    }
    else {
      next('403');
    }

  }
})

//获取当前路由是否有权限访问
function hasPermit(to) {
  var hasPermit = false;
  if (to.meta && to.meta.role) {
    var ruleList = getRuleList();
    hasPermit = ruleList.some(rule => {
      return to.meta.role.includes(rule);
    });
  }

  return hasPermit;

}
//获取登陆的角色集合
function getRuleList() {
  var ruleList = []; //角色数组
  var strRule = sessionStorage.getItem("position");
  if (strRule.indexOf("|") != -1) {
    ruleList = strRule.split("|");
  } else {
    ruleList.push(strRule);
  }

  return ruleList;
}

export default router

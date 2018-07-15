import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import xzqh from './views/nav1/xzqh.vue'

import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav2/Page6.vue'
import Page7 from './views/nav2/Page7.vue'
import Page8 from './views/nav2/Page8.vue'
import Page9 from './views/nav2/Page9.vue'


import facility1 from './views/nav3/facility1.vue'
import facility2 from './views/nav3/facility2.vue'
import facility3 from './views/nav3/facility3.vue'
import facility4 from './views/nav3/facility4.vue'


import depot1 from './views/nav4/depot1.vue'
import depot2 from './views/nav4/depot2.vue'
import depot3 from './views/nav4/depot3.vue'
import depot4 from './views/nav4/depot4.vue'


import scene1 from './views/nav5/scene1.vue'
import scene2 from './views/nav5/scene2.vue'
import scene3 from './views/nav5/scene3.vue'


import signal1 from './views/nav6/signal1.vue'
import signal2 from './views/nav6/signal2.vue'
import signal3 from './views/nav6/signal3.vue'
import signal4 from './views/nav6/signal4.vue'



import video1 from './views/nav7/video1.vue'
import video2 from './views/nav7/video2.vue'
import video3 from './views/nav7/video3.vue'
import video4 from './views/nav7/video4.vue'
import video5 from './views/nav7/video5.vue'
import video6 from './views/nav7/video6.vue'



import Tide1 from './views/nav8/Tide1.vue'
import Tide2 from './views/nav8/Tide2.vue'



import Relation1 from './views/nav9/Relation1.vue' 
import Relation2 from './views/nav9/Relation2.vue'
import Relation3 from './views/nav9/Relation3.vue'
import Relation4 from './views/nav9/Relation4.vue'
import Relation5 from './views/nav9/Relation5.vue'
import Relation6 from './views/nav9/Relation6.vue'
import Relation7 from './views/nav9/Relation7.vue'
import Relation8 from './views/nav9/Relation8.vue'




import police1 from './views/nav10/police1.vue'
import police2 from './views/nav10/police2.vue'
import police3 from './views/nav10/police3.vue'
import police4 from './views/nav10/police4.vue'
import police5 from './views/nav10/police5.vue'
import police6 from './views/nav10/police6.vue'

import Signboard1 from './views/nav11/Signboard1.vue'
import Signboard2 from './views/nav11/Signboard2.vue'



import Dictionaries1 from './views/nav12/Dictionaries1.vue'
import Dictionaries2 from './views/nav12/Dictionaries2.vue'
import Dictionaries3 from './views/nav12/Dictionaries3.vue'
import Dictionaries4 from './views/nav12/Dictionaries4.vue'





import traffic1 from './views/nav13/traffic1.vue'
import traffic2 from './views/nav13/traffic2.vue'

// import echarts from './views/charts/echarts.vue'

let routes = [
    {
        base: '/ttms/',
        path: '/login',
        component: Login, 
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '公共信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '人员基本信息' },
            { path: '/form', component: Form, name: '部门信息' },
            { path: '/user', component: user, name: '行政区划' },
            { path: '/xzqh', component: xzqh, name: '日志信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基础信息',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '高速出入口管理' },
            { path: '/page5', component: Page5, name: '特种车辆信息' },
            { path: '/page6', component: Page6, name: '路口基础信息' },
            { path: '/page7', component: Page7, name: '路段基础信息' },
            { path: '/page8', component: Page8, name: '道路基础信息' },
            { path: '/page9', component: Page9, name: '其他单位' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设备信息',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/facility1', component: facility1, name: '采集设备信息' },
            { path: '/facility2', component: facility2, name: '匝道控制器点位信息' },
            { path: '/facility3', component: facility3, name: '停车场采集信息' },
            { path: '/facility4', component: facility4, name: '信息板信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '停车场信息',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/depot1', component: depot1, name: '配建停车场' },
            { path: '/depot2', component: depot2, name: '公共停车场' },
            { path: '/depot3', component: depot3, name: '占到停车场' },
            { path: '/depot4', component: depot4, name: '执法停车场' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '非现场信息',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/scene1', component: scene1, name: '非现场设备信息' },
            { path: '/scene2', component: scene2, name: '非现场点位信息' },
            { path: '/scene3', component: scene3, name: '非现场主控设备信息' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '信号灯信息',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/signal1', component: signal1, name: '信号机基础信息' },
            { path: '/signal2', component: signal2, name: '信号灯组基础信息' },
            { path: '/signal3', component: signal3, name: '信号机点位基础信息' },
            { path: '/signal4', component: signal4, name: '信号机区域参数信息' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '视频信息',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/video1', component: video1, name: '视频分析仪信息' },
            { path: '/video2', component: video2, name: '视频矩阵' },
            { path: '/video3', component: video3, name: '视频编码器' },
            { path: '/video4', component: video4, name: '视频监控点位' },
            { path: '/video5', component: video5, name: '流媒体服务器' },
            { path: '/video6', component: video6, name: '控制代理服务器' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '潮汐车道信息',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/Tide1', component: Tide1, name: '潮汐信号灯信息' },
            { path: '/Tide2', component: Tide2, name: '潮汐点位信息' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '关联关系',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/Relation1', component: Relation1, name: '路段-路段关联' },
            { path: '/Relation2', component: Relation2, name: '路口-车道关联' },
            { path: '/Relation3', component: Relation3, name: '信息板-模组关联' },
            { path: '/Relation4', component: Relation4, name: '停车场-信息板关联' },
            { path: '/Relation5', component: Relation5, name: '道路-道路元素关联' },
            { path: '/Relation6', component: Relation6, name: '停车场-采集-车道关联' },
            { path: '/Relation7', component: Relation7, name: '路段-设备关联' },
            { path: '/Relation8', component: Relation8, name: '采集设备-车道关联' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '警用信息',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/police1', component: police1, name: '警用装备信息' },
            { path: '/police2', component: police2, name: '警车装备信息' },
            { path: '/police3', component: police3, name: '警用枪支信息' },
            { path: '/police4', component: police4, name: '设备管理记录' },
            { path: '/police5', component: police5, name: '设备申请管理' },
            { path: '/police6', component: police6, name: '其他设备信息' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '标牌标线',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/Signboard1', component: Signboard1, name: '标志标牌信息' },
            { path: '/Signboard2', component: Signboard2, name: '标线信息' },

        ]
    },
     {
        path: '/',
        component: Home,
        name: '数据字典',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/Dictionaries1', component: Dictionaries1, name: '设备信息字典' },
            { path: '/Dictionaries2', component: Dictionaries2, name: '公共信息字典' },
            { path: '/Dictionaries3', component: Dictionaries3, name: '交通信息字典' },
            { path: '/Dictionaries4', component: Dictionaries4, name: '车辆信息字典' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '交通设施',
        // iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/traffic1', component: traffic1, name: '交通设施' },
            { path: '/traffic2', component: traffic2, name: '设施管理记录' },
        ]
    },

    // {
    //     path: '*',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // }
];

export default routes;
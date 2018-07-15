import axios from 'axios';

let base = '';
const service = axios.create({
    //baseURL: '', // api的base_url
    // timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
     transformRequest: [function (data) {
         let ret = ''
         for (let it in data) {

             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         return ret;
     }]
})

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

//export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getUserListPage = params => { return service.post(`http://118.31.35.240:8081/ubms-server/Person/getPagePersonInfo.htm`,params); };

export const getdeptListPage = params => { return service.post(`http://118.31.35.240:8081/ubms-server/DeptInfo/getPageDeptInfo.htm`,params); };


export const delPersonInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/Person/delPersonInfo.htm',params)};

export const editPersonInfo = params=>{return service.post('http://118.31.35.240:8081/ubms-server/Person/editPersonInfo.htm',params)};


export const addPersonInfo = params=>{return service.post('http://118.31.35.240:8081/ubms-server/Person/addPersonInfo.htm',params)};

export const getRegionListPage = params => { return service.post(`http://118.31.35.240:8081/ubms-server/RegionInfo/getPageRegionInfo.htm`,params); };

export const getLogListPage = params => { return service.post(`http://118.31.35.240:8081/ubms-server/LogInfo/getPageLogInfo.htm`,params); };


//export const removeUser = params => { return axios.get(`http://118.31.35.240:8081/ubms-server/Person/delPersonInfo.htm`, { params: params }); };


export const removeDeptInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeptInfo/removeDeptInfo.htm',params)};
export const removeRegionInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/RegionInfo/removeRegionInfo.htm',params)};


export const addDeptInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeptInfo/addDeptInfo.htm',params)};

export const editDeptInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeptInfo/editDeptInfo.htm',params)};



export const addRegionInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/RegionInfo/addRegionInfo.htm',params)};


export const editRegionInfo =params=>{return service.post('http://118.31.35.240:8081/ubms-server/RegionInfo/editRegionInfo.htm',params)};



export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getSelectSource= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/getDicInfo.htm `,params);}
export const getSelectSourceos= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/getDicInfo.htm `,params);}
export const getSelectSourceer= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/getDicInfo.htm `,params);}


export const getPageHighWayInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/highWay/getPageHighWayInfo.htm `,params);}
export const insertHighWayInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/highWay/insertHighWayInfo.htm `,params);}
export const editHighWayInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/highWay/editHighWayInfo.htm `,params);}

export const deleteHighWayInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/highWay/deleteHighWayInfo.htm`,params);}




export const getPageVehicleSpecialInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleSpecialInfo/getPageVehicleSpecialInfo.htm`,params);}
export const addVehicleSpecialInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleSpecialInfo/addVehicleSpecialInfo.htm`,params);}
export const editVehicleSpecialInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleSpecialInfo/editVehicleSpecialInfo.htm`,params);}
export const removeVehicleSpecialInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleSpecialInfo/removeVehicleSpecialInfo.htm`,params);}




export const getPageCrossInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossInfo/getPageCrossInfo.htm`,params);}
export const addCrossInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossInfo/addCrossInfo.htm`,params);}
export const editCrossInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossInfo/editCrossInfo.htm`,params);}
export const removeCrossInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossInfo/removeCrossInfo.htm`,params);}
export const getDicInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDic/getDicInfo.htm`,params);}




export const getPageBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/getPageBlockInfo.htm`,params);}
export const addBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/addBlockInfo.htm`,params);}
export const editBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/editBlockInfo.htm`,params);}
export const removeBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/removeBlockInfo.htm`,params);}


export const getPageRoadInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadInfo/getPageRoadInfo.htm`,params);}
export const addRoadInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadInfo/addRoadInfo.htm`,params);}
export const editRoadInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadInfo/editRoadInfo.htm`,params);}
export const removeRoadInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadInfo/removeRoadInfo.htm`,params);}


export const getPageOrganInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OrganInfo/getPageOrganInfo.htm`,params);}
export const addOrganInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OrganInfo/addOrganInfo.htm`,params);}
export const editOrganInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OrganInfo/editOrganInfo.htm`,params);}
export const removeOrganInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OrganInfo/removeOrganInfo.htm`,params);}


export const getPageTrFlowDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowInfoController/getPageTrFlowDevInfo.htm`,params);}
export const addTrFlowDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowInfoController/addTrFlowDevInfo.htm`,params);}
export const editTrFlowDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowInfoController/editTrFlowDevInfo.htm`,params);}
export const removeTrFlowDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowInfoController/removeTrFlowDevInfo.htm`,params);}




export const getDicInfoDic =params=>{return service.post('http://118.31.35.240:8081/ubms-server/VehicleDic/getDicInfo.htm',params)};
export const getDetpTree =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeptInfo/getDetpTree.html',params)};



export const getDicInfoDob =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeviceDic/getDicInfo.htm',params)};
export const getDeviceDic =params=>{return service.post('http://118.31.35.240:8081/ubms-server/DeviceDic/getDeviceDic.htm',params)};


export const getPageRampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RampInfo/getPageRampInfo.htm`,params);}
export const addRampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RampInfo/addRampInfo.htm`,params);}
export const editRampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RampInfo/editRampInfo.htm`,params);}
export const removeRampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RampInfo/removeRampInfo.htm`,params);}



export const getPageParkDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevInfoController/getPageParkDevInfo.htm`,params);}
export const addParkDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevInfoController/addParkDevInfo.htm`,params);}
export const editParkDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevInfoController/editParkDevInfo.htm`,params);}
export const removeParkDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevInfoController/removeParkDevInfo.htm`,params);}



export const getPageLedInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedInfoController/getPageLedInfo.htm`,params);}
export const addLedInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedInfoController/addLedInfo.htm`,params);}
export const editLedInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedInfoController/editLedInfo.htm`,params);}
export const removeLedInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedInfoController/removeLedInfo.htm`,params);}



export const getPageOffsiteDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteDevInfo/getPageOffsiteDevInfo.htm`,params);}
export const addOffsiteDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteDevInfo/addOffsiteDevInfo.htm`,params);}
export const editOffsiteDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteDevInfo/editOffsiteDevInfo.htm`,params);}
export const removeOffsiteDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteDevInfo/removeOffsiteDevInfo.htm`,params);}


export const getPageOffsiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteInfo/getPageOffsiteInfo.htm`,params);}
export const addOffsiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteInfo/addOffsiteInfo.htm`,params);}
export const editOffsiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteInfo/editOffsiteInfo.htm`,params);}
export const removeOffsiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteInfo/removeOffsiteInfo.htm`,params);}


export const getPageOffsiteCtrlDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteCtrlDev/getPageOffsiteCtrlDevInfo.htm`,params);}
export const addOffsiteCtrlDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteCtrlDev/addOffsiteCtrlDevInfo.htm`,params);}
export const editOffsiteCtrlDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteCtrlDev/editOffsiteCtrlDevInfo.htm`,params);}
export const removeOffsiteCtrlDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OffsiteCtrlDev/removeOffsiteCtrlDevInfo.htm`,params);}


export const getDeptInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeptInfo/getDeptInfo.htm`,params);}


export const getPageSignalMachineInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalMachineInfo/getPageSignalMachineInfo.htm`,params);}
export const addSignalMachineInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalMachineInfo/addSignalMachineInfo.htm`,params);}
export const editSignalMachineInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalMachineInfo/editSignalMachineInfo.htm`,params);}
export const removeSignalMachineInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalMachineInfo/removeSignalMachineInfo.htm`,params);}



export const getPageSignalLampGroupInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalLampGroupInfo/getPageSignalLampGroupInfo.htm`,params);}
export const addSignalLampGroupInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalLampGroupInfo/addSignalLampGroupInfo.htm`,params);}
export const editSignalLampGroupInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalLampGroupInfo/editSignalLampGroupInfo.htm`,params);}
export const removeSignalLampGroupInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalLampGroupInfo/removeSignalLampGroupInfo.htm`,params);}


export const getPageSignalSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalSiteInfo/getPageSignalSiteInfo.htm`,params);}
export const addSignalSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalSiteInfo/addSignalSiteInfo.htm`,params);}
export const editSignalSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalSiteInfo/editSignalSiteInfo.htm`,params);}
export const removeSignalSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalSiteInfo/removeSignalSiteInfo.htm`,params);}




export const getPageSignalZoneInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalZoneInfo/getPageSignalZoneInfo.htm`,params);}
export const addSignalZoneInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalZoneInfo/addSignalZoneInfo.htm`,params);}
export const editSignalZoneInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalZoneInfo/editSignalZoneInfo.htm`,params);}
export const removeSignalZoneInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalZoneInfo/removeSignalZoneInfo.htm`,params);}


export const getPageVideoAnalyzerInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoAnalyzerInfo/getPageVideoAnalyzerInfo.htm`,params);}
export const addVideoAnalyzerInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoAnalyzerInfo/addVideoAnalyzerInfo.htm`,params);}
export const editVideoAnalyzerInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoAnalyzerInfo/editVideoAnalyzerInfo.htm`,params);}
export const removeVideoAnalyzerInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoAnalyzerInfo/removeVideoAnalyzerInfo.htm`,params);}


export const getPageVideoMatrixInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoMatrixInfo/getPageVideoMatrixInfo.htm`,params);}
export const addVideoMatrixInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoMatrixInfo/addVideoMatrixInfo.htm`,params);}
export const editVideoMatrixInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoMatrixInfo/editVideoMatrixInfo.htm`,params);}
export const removeVideoMatrixInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoMatrixInfo/removeVideoMatrixInfo.htm`,params);}


export const getPageVideoEncoderInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoEncoderInfo/getPageVideoEncoderInfo.htm`,params);}
export const addVideoEncoderInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoEncoderInfo/addVideoEncoderInfo.htm`,params);}
export const editVideoEncoderInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoEncoderInfo/editVideoEncoderInfo.htm`,params);}
export const removeVideoEncoderInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoEncoderInfo/removeVideoEncoderInfo.htm`,params);}


export const getVideoEncoderInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoEncoderInfo/getVideoEncoderInfo.htm`,params);}
export const getRegionInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RegionInfo/getRegionInfo.htm`,params);}
export const getVideoMatrixInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoMatrixInfo/getVideoMatrixInfo.htm`,params);}


export const getPageVideoSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoSiteInfo/getPageVideoSiteInfo.htm`,params);}
export const addVideoSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoSiteInfo/addVideoSiteInfo.htm`,params);}
export const editVideoSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoSiteInfo/editVideoSiteInfo.htm`,params);}
export const removeVideoSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoSiteInfo/removeVideoSiteInfo.htm`,params);}


export const getPageVideoStreamInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoStreamInfo/getPageVideoStreamInfo.htm`,params);}
export const addVideoStreamInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoStreamInfo/addVideoStreamInfo.htm`,params);}
export const editVideoStreamInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoStreamInfo/editVideoStreamInfo.htm`,params);}
export const removeVideoStreamInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoStreamInfo/removeVideoStreamInfo.htm`,params);}
export const getTideSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSiteInfoController/getTideSiteInfo.htm`,params);}


export const getPageVideoCProxyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoCProxyInfo/getPageVideoCProxyInfo.htm`,params);}
export const addVideoCProxyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoCProxyInfo/addVideoCProxyInfo.htm`,params);}
export const editVideoCProxyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoCProxyInfo/editVideoCProxyInfo.htm`,params);}
export const removeVideoCProxyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VideoCProxyInfo/removeVideoCProxyInfo.htm`,params);}

export const getRoadInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadInfo/getRoadInfo.htm`,params);}
export const getBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/getBlockInfo.htm`,params);}
export const getRltBlockInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockInfo/getBlockInfo.htm`,params);}

export const getPageTideSigLampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSigLampInfoController/getPageTideSigLampInfo.htm`,params);}
export const addTideSigLampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSigLampInfoController/addTideSigLampInfo.htm`,params);}
export const editTideSigLampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSigLampInfoController/editTideSigLampInfo.htm`,params);}
export const removeTideSigLampInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSigLampInfoController/removeTideSigLampInfo.htm`,params);}


export const getPageTideSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSiteInfoController/getPageTideSiteInfo.htm`,params);}
export const addTideSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSiteInfoController/addTideSiteInfo.htm`,params);}
export const editTideSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSiteInfoController/editTideSiteInfo.htm`,params);}
export const removeTideSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TideSiteInfoController/removeTideSiteInfo.htm`,params);}


export const getPageBlockBlock= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockBlock/getPageBlockBlock.htm`,params);}
export const addBlockBlock= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockBlock/addBlockBlock.htm`,params);}
export const editBlockBlock= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockBlock/editBlockBlock.htm`,params);}
export const removeBlockBlock= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/BlockBlock/removeBlockBlock.htm`,params);}
export const getCrossInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossInfo/getCrossInfo.htm`,params);}



export const getPageCrossLane= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossLane/getPageCrossLane.htm`,params);}
export const addCrossLane= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossLane/addCrossLane.htm`,params);}
export const editCrossLane= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossLane/editCrossLane.htm`,params);}
export const removeCrossLane= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/CrossLane/removeCrossLane.htm`,params);}


export const getLedInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedInfoController/getLedInfo.htm`,params);}



export const getPageLedModRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedModRltController/getPageLedModRlt.htm`,params);}
export const addLedModRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedModRltController/addLedModRlt.htm`,params);}
export const editLedModRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedModRltController/editLedModRlt.htm`,params);}
export const removeLedModRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/LedModRltController/removeLedModRlt.htm`,params);}


export const getParkInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkInfo/getParkInfo.htm`,params);}



export const getPageParkLedRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkLedRltController/getPageParkLedRlt.htm`,params);}
export const addParkLedRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkLedRltController/addParkLedRlt.htm`,params);}
export const editParkLedRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkLedRltController/editParkLedRlt.htm`,params);}
export const removeParkLedRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkLedRltController/removeParkLedRlt.htm`,params);}



export const getPageRoadElement= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadElement/getPageRoadElement.htm`,params);}
export const addRoadElement= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadElement/addRoadElement.htm`,params);}
export const editRoadElement= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadElement/editRoadElement.htm`,params);}
export const removeRoadElement= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadElement/removeRoadElement.htm`,params);}


export const getParkDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevInfoController/getParkDevInfo.htm`,params);}

export const getPageParkDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevLaneRltController/getPageParkDevLaneRlt.htm`,params);}
export const addParkDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevLaneRltController/addParkDevLaneRlt.htm`,params);}
export const editParkDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevLaneRltController/editParkDevLaneRlt.htm`,params);}
export const removeParkDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkDevLaneRltController/removeParkDevLaneRlt.htm`,params);}

export const getTrFlowDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowInfoController/getTrFlowDevInfo.htm`,params);}


export const getPageTrFlowDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowDevLaneRltController/getPageTrFlowDevLaneRlt.htm`,params);}
export const addTrFlowDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowDevLaneRltController/addTrFlowDevLaneRlt.htm`,params);}
export const editTrFlowDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowDevLaneRltController/editTrFlowDevLaneRlt.htm`,params);}
export const removeTrFlowDevLaneRlt= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrFlowDevLaneRltController/removeTrFlowDevLaneRlt.htm`,params);}




export const getPagePoliceDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceDeviceInfo/getPagePoliceDeviceInfo.htm`,params);}
export const addPoliceDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceDeviceInfo/addPoliceDeviceInfo.htm`,params);}
export const editPoliceDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceDeviceInfo/editPoliceDeviceInfo.htm`,params);}
export const removePoliceDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceDeviceInfo/removePoliceDeviceInfo.htm`,params);}

export const getElement= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/RoadElement/getElement.htm`,params);}


export const getPagePoliceCarInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceCarInfo/getPagePoliceCarInfo.htm`,params);}
export const addPoliceCarInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceCarInfo/addPoliceCarInfo.htm`,params);}
export const editPoliceCarInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceCarInfo/editPoliceCarInfo.htm`,params);}
export const removePoliceCarInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceCarInfo/removePoliceCarInfo.htm`,params);}


export const getPageDeviceOpratorRec= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeviceOpratorRec/getPageDeviceOpratorRec.htm`,params);}




export const getPageDeviceDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeviceDic/getPageDeviceDic.htm`,params);}
export const addDeviceDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeviceDic/addDeviceDic.htm`,params);}
export const editDeviceDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeviceDic/editDeviceDic.htm`,params);}
export const removeDeviceDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/DeviceDic/removeDeviceDic.htm`,params);}

export const getPagePublicDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/getPagePublicDic.htm`,params);}
export const addPublicDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/addPublicDic.htm`,params);}
export const editPublicDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/editPublicDic.htm`,params);}
export const removePublicDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PublicDic/removePublicDic.htm`,params);}



export const getPageTrafficDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDic/getPageTrafficDic.htm`,params);}
export const addTrafficDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDic/addTrafficDic.htm`,params);}
export const editTrafficDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDic/editTrafficDic.htm`,params);}
export const removeTrafficDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDic/removeTrafficDic.htm`,params);}

export const getPageVehicleDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleDic/getPageVehicleDic.htm`,params);}
export const addVehicleDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleDic/addVehicleDic.htm`,params);}
export const editVehicleDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleDic/editVehicleDic.htm`,params);}
export const removeVehicleDic= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/VehicleDic/removeVehicleDic.htm`,params);}



export const getPageTrafficDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDevInfo/getPageTrafficDevInfo.htm`,params);}
export const addTrafficDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDevInfo/addTrafficDevInfo.htm`,params);}
export const editTrafficDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDevInfo/editTrafficDevInfo.htm`,params);}
export const removeTrafficDevInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDevInfo/removeTrafficDevInfo.htm`,params);}




export const getDeviceOpratorPage= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/TrafficDevOpr/getDeviceOpratorPage.htm`,params);}


export const getPageParkInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkInfo/getPageParkInfo.htm`,params);}
export const addParkInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkInfo/addParkInfo.htm`,params);}
export const editParkInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkInfo/editParkInfo.htm`,params);}
export const removeParkInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ParkInfo/removeParkInfo.htm`,params);}


export const getOrganInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OrganInfo/getOrganInfo.htm`,params);}

export const getSignalSiteInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalSiteInfo/getSignalSiteInfo.htm`,params);}


export const getSignalMachineInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalMachineInfo/getSignalMachineInfo.htm`,params);}

export const getSignalZoneInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/SignalZoneInfo/getSignalZoneInfo.htm`,params);}



export const getPagePoliceGunInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceGunInfo/getPagePoliceGunInfo.htm`,params);}
export const addPoliceGunInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceGunInfo/addPoliceGunInfo.htm`,params);}
export const editPoliceGunInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceGunInfo/editPoliceGunInfo.htm`,params);}
export const removePoliceGunInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/PoliceGunInfo/removePoliceGunInfo.htm`,params);}



export const getPageApplyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ApplyInfo/getPageApplyInfo.htm`,params);}
export const addApplyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ApplyInfo/addApplyInfo.htm`,params);}
export const editApplyInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ApplyInfo/editApplyInfo.htm`,params);}
export const removeApplyInfoById= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/ApplyInfo/removeApplyInfoById.htm`,params);}




export const getPageOtherDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OtherDeviceInfo/getPageOtherDeviceInfo.htm`,params);}
export const addOtherDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OtherDeviceInfo/addOtherDeviceInfo.htm`,params);}
export const editOtherDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OtherDeviceInfo/editOtherDeviceInfo.htm`,params);}
export const removeOtherDeviceInfo= params=>{return service.post(`http://118.31.35.240:8081/ubms-server/OtherDeviceInfo/removeOtherDeviceInfo.htm`,params);}

























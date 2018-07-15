<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.vdSiteId" placeholder="点位编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.vdSiteName" placeholder="点位名称"></el-input>
        </el-form-item>
         <el-form-item>
                  <el-select  v-model="filters.deviceStatusCode" placeholder="设备状态">
                   <el-option
                       v-for="item in deviceStatusCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item >
                  <el-select  v-model="filters.devTypeCode" placeholder="设备类型">
                   <el-option
                       v-for="item in devTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item >
                  <el-select  v-model="filters.regionId" placeholder="所属辖区">
                   <el-option
                       v-for="item in regionId"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="newslist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="vdSiteId" label="点位编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="vdSiteName" label="点位名称" width="130" sortable>
			</el-table-column>
			<el-table-column prop="deptName" label="管理部门" width="160" sortable>
			</el-table-column>
			<el-table-column prop="pixLevelName" label="设备像素级别" width="150" sortable>
			</el-table-column>
			<el-table-column prop="devTypeName" label="设备类别" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="设备状态" width="150" sortable>
			</el-table-column>
			<el-table-column prop="model" label="设备型号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="streamTypeName" label="码流类型" width="130" sortable>
			</el-table-column>
			<el-table-column prop="realStreamSourceName" label="视频实时取流方式" width="180" sortable>
			</el-table-column>
			<el-table-column prop="replayStreamSourceName" label="视频回放取流方式" width="180" sortable>
			</el-table-column>
			<el-table-column prop="isVisibleName" label="是否显示" width="130" sortable>
			</el-table-column>
			<el-table-column prop="vdSiteLogcId" label="点位逻辑号" width="140" sortable>
			</el-table-column>
			<el-table-column prop="project" label="建设项目" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
			  :page-size="pagesize" :current-page="currentPage" :total="total" style="float:right;" >
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="点位编码" prop="vdSiteId">
					<el-input v-model="editForm.vdSiteId"></el-input>
				</el-form-item>
				<el-form-item label="点位名称" prop="vdSiteName">
					<el-input v-model="editForm.vdSiteName"></el-input>
				</el-form-item>
					<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="视频通道号" prop="channId">
					<el-input v-model="editForm.channId"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="devTypeCode">
                  <el-select :size="'mini'" v-model="editForm.devTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in devTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="设备状态" prop="deviceStatusCode">
                  <el-select :size="'mini'" v-model="editForm.deviceStatusCode" placeholder="请选择">
                   <el-option
                       v-for="item in deviceStatusCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				
				<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="editForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="editForm.model"></el-input>
				</el-form-item>
				 <el-form-item label="码流类型" prop="streamTypeCode">
                  <el-select :size="'mini'" v-model="editForm.streamTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in streamTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="视频实时流" prop="realStreamSourceCode">
                  <el-select :size="'mini'" v-model="editForm.realStreamSourceCode" placeholder="请选择">
                   <el-option
                       v-for="item in realStreamSourceCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="实时编码" prop="realEncode">
                  <el-select :size="'mini'" v-model="editForm.realEncode" placeholder="请选择">
                   <el-option
                       v-for="item in realEncode"
                      :key="item.vdenId"
                      :label="item.vdenName"
                      :value="item.vdenId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="视频回放流" prop="replayStreamSourceCode">
                  <el-select :size="'mini'" v-model="editForm.replayStreamSourceCode" placeholder="请选择">
                   <el-option
                       v-for="item in replayStreamSourceCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="回放编码" prop="replayEncode">
                  <el-select :size="'mini'" v-model="editForm.replayEncode" placeholder="请选择">
                   <el-option
                       v-for="item in replayEncode"
                      :key="item.vdenId"
                      :label="item.vdenName"
                      :value="item.vdenId">
                   </el-option>
               </el-select>
               </el-form-item>
				
					<el-form-item label="点位逻辑号" prop="vdSiteLogicId">
					<el-input v-model="editForm.vdSiteLogicId"></el-input>
				</el-form-item>
				<el-form-item label="DB33编码" prop="db33Id">
					<el-input v-model="editForm.db33Id"></el-input>
				</el-form-item>
				<el-form-item label="是否显示" prop="isVisibleCode">
                  <el-select :size="'mini'" v-model="editForm.isVisibleCode" placeholder="请选择">
                   <el-option
                       v-for="item in isVisibleCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="矩阵编码" prop="matrixId">
                  <el-select :size="'mini'" v-model="editForm.matrixId" placeholder="请选择">
                   <el-option
                       v-for="item in matrixId"
                      :key="item.manageId"
                      :label="item.matrixName"
                      :value="item.manageId">
                   </el-option>
               </el-select>
               </el-form-item>
				
				
				<el-form-item label="行政区域" prop="regionId">
                  <el-select :size="'mini'" v-model="editForm.regionId" placeholder="请选择">
                   <el-option
                       v-for="item in regionId"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionId">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="像素级别" prop="pixLevelCode">
                  <el-select :size="'mini'" v-model="editForm.pixLevelCode" placeholder="请选择">
                   <el-option
                       v-for="item in pixLevelCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="国际编码" prop="interId">
					<el-input v-model="editForm.interId"></el-input>
				</el-form-item>
				<el-form-item label="建设项目" prop="project">
					<el-input v-model="editForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="editForm.company"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="点位编码" prop="vdSiteId">
					<el-input v-model="addForm.vdSiteId"></el-input>
				</el-form-item>
				<el-form-item label="点位名称" prop="vdSiteName">
					<el-input v-model="addForm.vdSiteName"></el-input>
				</el-form-item>
					<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="视频通道号" prop="channId">
					<el-input v-model="addForm.channId"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="devTypeCode">
                  <el-select :size="'mini'" v-model="addForm.devTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in devTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="设备状态" prop="deviceStatusCode">
                  <el-select :size="'mini'" v-model="addForm.deviceStatusCode" placeholder="请选择">
                   <el-option
                       v-for="item in deviceStatusCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				
				<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="addForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="addForm.model"></el-input>
				</el-form-item>
				 <el-form-item label="码流类型" prop="streamTypeCode">
                  <el-select :size="'mini'" v-model="addForm.streamTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in streamTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="视频实时流" prop="realStreamSourceCode">
                  <el-select :size="'mini'" v-model="addForm.realStreamSourceCode" placeholder="请选择">
                   <el-option
                       v-for="item in realStreamSourceCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="实时编码" prop="realEncode">
                  <el-select :size="'mini'" v-model="addForm.realEncode" placeholder="请选择">
                   <el-option
                       v-for="item in realEncode"
                      :key="item.vdenId"
                      :label="item.vdenName"
                      :value="item.vdenId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="视频回放流" prop="replayStreamSourceCode">
                  <el-select :size="'mini'" v-model="addForm.replayStreamSourceCode" placeholder="请选择">
                   <el-option
                       v-for="item in replayStreamSourceCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="回放编码" prop="replayEncode">
                  <el-select :size="'mini'" v-model="addForm.replayEncode" placeholder="请选择">
                   <el-option
                       v-for="item in replayEncode"
                      :key="item.vdenId"
                      :label="item.vdenName"
                      :value="item.vdenId">
                   </el-option>
               </el-select>
               </el-form-item>
				
					<el-form-item label="点位逻辑号" prop="vdSiteLogicId">
					<el-input v-model="addForm.vdSiteLogicId"></el-input>
				</el-form-item>
				<el-form-item label="DB33编码" prop="db33Id">
					<el-input v-model="addForm.db33Id"></el-input>
				</el-form-item>
				<el-form-item label="是否显示" prop="isVisibleCode">
                  <el-select :size="'mini'" v-model="addForm.isVisibleCode" placeholder="请选择">
                   <el-option
                       v-for="item in isVisibleCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="矩阵编码" prop="matrixId">
                  <el-select :size="'mini'" v-model="addForm.matrixId" placeholder="请选择">
                   <el-option
                       v-for="item in matrixId"
                      :key="item.manageId"
                      :label="item.matrixName"
                      :value="item.manageId">
                   </el-option>
               </el-select>
               </el-form-item>
				
				
				<el-form-item label="行政区域" prop="regionId">
                  <el-select :size="'mini'" v-model="addForm.regionId" placeholder="请选择">
                   <el-option
                       v-for="item in regionId"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionId">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="像素级别" prop="pixLevelCode">
                  <el-select :size="'mini'" v-model="addForm.pixLevelCode" placeholder="请选择">
                   <el-option
                       v-for="item in pixLevelCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="国际编码" prop="interId">
					<el-input v-model="addForm.interId"></el-input>
				</el-form-item>
				<el-form-item label="建设项目" prop="project">
					<el-input v-model="addForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
			
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
 getPageVideoSiteInfo,
  // batchRemoveUser,
 addVideoSiteInfo,
  editVideoSiteInfo,
  removeVideoSiteInfo,
  getDicInfoDob,
  getDicInfo,
  getSelectSource,
  getVideoEncoderInfo,
  getRegionInfo,
  getVideoMatrixInfo

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        vdSiteId: "",
        vdSiteName:"",
        deviceStatusCode:"",
        devTypeCode:"",
        regionId:"",
     

      },
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      newslist: [], //接受后台数据
      currentPage: 1,
      pagesize: 10,

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        personName: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
          vdaId: "",
      	  vdaTypeCode:"",
      	  logInUser:"",
      	  logInPasswd:"",
      	  deviceStatusCode:"",
      	  ip: "",
      	  port:"",
      	  channels:"",
      	  beginChannel:"",
      	  warnChannelIn:"",
      	  warnChannelOut: "",
      	  manufact:"",
      	  model:"",
      	  manageId:"",
      	  manageDept:"",
      	  project: "",
      	  company:"",
      	  

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        vdSiteId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        vdSiteName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        policeRankCode: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],

        idCardNo: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
            message: "请输入正确的身份证号"
          }
        ],
        deptId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        compTypeName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        jobName: [{ required: true, message: "请输入内容", trigger: "blur" }],
        postName: [{ required: true, message: "请输入内容", trigger: "blur" }],
        jobRankName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        leader: [{ required: true, message: "请输入内容", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ]
      },
      //新增界面数据
      addForm: {

           vdaId: "",
      	  vdaTypeCode:"",
      	  logInUser:"",
      	  logInPasswd:"",
      	  deviceStatusCode:"",
      	  ip: "",
      	  port:"",
      	  channels:"",
      	  beginChannel:"",
      	  warnChannelIn:"",
      	  warnChannelOut: "",
      	  manufact:"",
      	  model:"",
      	  manageId:"",
      	  manageDept:"",
      	  project: "",
      	  company:"",
      	  replayEncode:""
      	  


      },

     
        deviceStatusCode:[],
        devTypeCode:[],
        streamTypeCode:[],
        realStreamSourceCode:[],
        replayStreamSourceCode:[],
        pixLevelCode:[],
        replayEncode:[],
        isVisibleCode:[],
        realEncode:[],
        regionId:[],
        matrixId:[],

      
       
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = new Object();
      para.currentPage = this.currentPage;
      para.pageSize = this.pagesize;
      para.vdSiteName = this.filters.vdSiteName;
      para.vdSiteId = this.filters.vdSiteId;
      para.deviceStatusCode = this.filters.deviceStatusCode;
      para.devTypeCode = this.filters.devTypeCode;
      para.regionId = this.filters.regionId;
      this.listLoading = true;
      getPageVideoSiteInfo({ data: JSON.stringify(para) }).then(res => {
        console.log(res);
        this.total = res.data.resultList.total;
        this.newslist = res.data.resultList.rows;
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { vdSiteId: row.vdSiteId };
          console.log(para);
          removeVideoSiteInfo({ data: JSON.stringify(para) }).then(res => {
            console.log(res);
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
           vdaId: "",
      	  vdaTypeCode:"",
      	  logInUser:"",
      	  logInPasswd:"",
      	  deviceStatusCode:"",
      	  ip: "",
      	  port:"",
      	  channels:"",
      	  beginChannel:"",
      	  warnChannelIn:"",
      	  warnChannelOut: "",
      	  manufact:"",
      	  model:"",
      	  manageId:"",
      	  manageDept:"",
      	  project: "",
      	  company:"",
      	  replayEncode:""
      	  
      	  
      	
      	 
      	 
      	 
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birthDay =
              !para.birthDay || para.birthDay == ""
                ? ""
                : util.formatDate.format(new Date(para.birthDay), "yyyy-MM-dd");

            if (para.genderName == 0) {
              para.genderName = "男";
              para.genderCode = "GENDERMALE";
              para.genderValue = "M";
            } else {
              para.genderName = "女";
              para.genderCode = "GENDERFEMALE";
              para.genderValue = "W";
            }

            //data:JSON.stringify(para)
            editVideoSiteInfo({ data: JSON.stringify(para) }).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
    	console.log(this.addForm);
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birthDay =
              !para.birthDay || para.birthDay == ""
                ? ""
                : util.formatDate.format(new Date(para.birthDay), "yyyy-MM-dd");
            addVideoSiteInfo({ data: JSON.stringify(para) }).then(res => {
              console.log(res);
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },

     getDicInfoDob: function() {
      getDicInfoDob().then(resp => {
        let  deviceStatusCode=[],
              streamTypeCode=[],
             realStreamSourceCode=[],
            pixLevelCode=[],
               replayStreamSourceCode=[],
       	     devTypeCode=[];
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "DEVICESTATUS":
               	deviceStatusCode.push(item);
                break;
                case "TYPEVIDEO":
               	devTypeCode.push(item);
                break;
                  case "STREAMTYPE":
               	streamTypeCode.push(item);
                break;
                   case "STREAMSOURCE":
               	realStreamSourceCode.push(item);
                break;
                  case "CAMPIX":
               	pixLevelCode.push(item);
                break;
                 case "STREAMSOURCE":
               	replayStreamSourceCode.push(item);
                break;
              default:
                break;
            }
          });
           this.deviceStatusCode=deviceStatusCode;
         	  this.devTypeCode=devTypeCode;
         	 this.streamTypeCode=streamTypeCode;
         	  this.realStreamSourceCode=realStreamSourceCode;
         	   this.pixLevelCode=pixLevelCode;
         	    this.replayStreamSourceCode=replayStreamSourceCode;
           	console.log(this);
        }
      });
    
    },
    getSelectSource: function() {
      getSelectSource().then(resp => {
        let  
       	     isVisibleCode=[];
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "COMMONVALUE":
               	isVisibleCode.push(item);
                break;
               
              default:
                break;
            }
          });
           this.isVisibleCode=isVisibleCode;
         	
           	console.log(this);
        }
      });
    
    },
     getVideoEncoderInfo: function() {
         let param = {
       replayEncode: "",
     	realEncode:"",
     	
      };
      getVideoEncoderInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.replayEncode = resp.data.resultList;
            this.realEncode = resp.data.resultList;
         

        }
      });
    
    },
     getRegionInfo: function() {
         let param = {
           regionId: "",
      };
      getRegionInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.regionId = resp.data.resultList;
           

        }
      });
    
    },
      getVideoMatrixInfo: function() {
         let param = {
          	matrixId:"",
      };
      getVideoMatrixInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
         this.matrixId = resp.data.resultList;
           

        }
      });
    
    },
    
  },
  mounted() {
    this.getUsers();
    this.getDicInfoDob();
    this.getSelectSource();
    this.getVideoEncoderInfo();
    this.getRegionInfo();
     this.getVideoMatrixInfo();
  }
};
</script>

<style scoped>
</style>
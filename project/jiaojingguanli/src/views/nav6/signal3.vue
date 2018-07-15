<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.ssId" placeholder="点位编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.ssName" placeholder="点位名称"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.manufact"  placeholder="设备厂家"></el-input>
        </el-form-item>
        <el-form-item >
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
                  <el-select  v-model="filters.regionId" placeholder="所属区域">
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
			<el-table-column prop="ssId" label="点位编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="ssName" label="点位名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="devTypeName" label="设备类型" width="130" sortable>
			</el-table-column>
			<el-table-column prop="ctrlModeName" label="控制方式" width="130" sortable>
			</el-table-column>
			<el-table-column prop="model" label="设备型号" width="130" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="设备状态" width="130" sortable>
			</el-table-column>
			<el-table-column prop="regionName" label="所属区域" width="130" sortable>
			</el-table-column>
			<el-table-column prop="crossName" label="路口" width="130" sortable>
			</el-table-column>
			<el-table-column prop="zoneName" label="控制区域" width="130" sortable>
			</el-table-column>
			<el-table-column prop="smId" label="信号机编码" width="140" sortable>
			</el-table-column>
			<el-table-column prop="project" label="建设单位" min-width="120" sortable>
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
				<el-form-item label="点位编码" prop="ssId">
					<el-input v-model="editForm.ssId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="点位名称" prop="ssName">
					<el-input v-model="editForm.ssName" auto-complete="off"></el-input>
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
               <el-form-item label="控制方式" prop="ctrlModeCode">
                  <el-select :size="'mini'" v-model="editForm.ctrlModeCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlModeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="联网状态" prop="netMode">
					<el-input v-model="editForm.netMode"></el-input>
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
				<el-form-item label="设备厂家" prop="manufact">
					<el-input v-model="editForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="editForm.model"></el-input>
				</el-form-item>
				<el-form-item label="厂家路口" prop="manuCrossId">
					<el-input v-model="editForm.manuCrossId"></el-input>
				</el-form-item>
					<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="editForm.coordX"></el-input>
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
				 <el-form-item label="所属路口" prop="crossId">
                  <el-select :size="'mini'" v-model="editForm.crossId" placeholder="请选择">
                   <el-option
                       v-for="item in crossId"
                      :key="item.crossId"
                      :label="item.crossName"
                      :value="item.crossId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				 <el-form-item label="所属控制区" prop="zoneId">
                  <el-select :size="'mini'" v-model="editForm.zoneId" placeholder="请选择">
                   <el-option
                       v-for="item in zoneId"
                      :key="item.zoneId"
                      :label="item.zoneName"
                      :value="item.zoneId">
                   </el-option>
               </el-select>
               </el-form-item>
          <el-form-item label="所属机编码" prop="smId">
                  <el-select :size="'mini'" v-model="editForm.smId" placeholder="请选择">
                   <el-option
                       v-for="item in smId"
                      :key="item.smId"
                      :label="item.manufact"
                      :value="item.smId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="建设项目" prop="project">
					<el-input v-model="editForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="editForm.company"></el-input>
				</el-form-item>
				<el-form-item label="设备IP" prop="ip">
					<el-input v-model="editForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="设备端口" prop="port">
					<el-input v-model="editForm.port"></el-input>
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
				<el-form-item label="点位编码" prop="ssId">
					<el-input v-model="addForm.ssId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="点位名称" prop="ssName">
					<el-input v-model="addForm.ssName" auto-complete="off"></el-input>
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
               <el-form-item label="控制方式" prop="ctrlModeCode">
                  <el-select :size="'mini'" v-model="addForm.ctrlModeCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlModeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="联网状态" prop="netMode">
					<el-input v-model="addForm.netMode"></el-input>
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
				<el-form-item label="设备厂家" prop="manufact">
					<el-input v-model="addForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="model">
					<el-input v-model="addForm.model"></el-input>
				</el-form-item>
				<el-form-item label="厂家路口" prop="manuCrossId">
					<el-input v-model="addForm.manuCrossId"></el-input>
				</el-form-item>
					<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
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
               <el-form-item label="所属路口" prop="crossId">
                  <el-select :size="'mini'" v-model="addForm.crossId" placeholder="请选择">
                   <el-option
                       v-for="item in crossId"
                      :key="item.crossId"
                      :label="item.crossName"
                      :value="item.crossId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
          <el-form-item label="所属控制区" prop="zoneId">
                  <el-select :size="'mini'" v-model="addForm.zoneId" placeholder="请选择">
                   <el-option
                       v-for="item in zoneId"
                      :key="item.zoneId"
                      :label="item.zoneName"
                      :value="item.zoneId">
                   </el-option>
               </el-select>
               </el-form-item>
	
        <el-form-item label="所属机编码" prop="smId">
                  <el-select :size="'mini'" v-model="addForm.smId" placeholder="请选择">
                   <el-option
                       v-for="item in smId"
                      :key="item.smId"
                      :label="item.manufact"
                      :value="item.smId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="建设项目" prop="project">
					<el-input v-model="addForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="设备IP" prop="ip">
					<el-input v-model="addForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="设备端口" prop="port">
					<el-input v-model="addForm.port"></el-input>
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
 getPageSignalSiteInfo,
  // batchRemoveUser,
 addSignalSiteInfo,
  editSignalSiteInfo,
  removeSignalSiteInfo,
  getDicInfoDob,
  getDicInfo,
  getRegionInfo,
  getSignalMachineInfo,
  getSignalZoneInfo,
  getCrossInfo,

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        ssId: "",
        ssName:"",
        deviceStatusCode:"",
        regionId:"",
        manufact:""
     

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
          ssId: "",
      	  ssName:"",
      	  devTypeCode:"",
      	  ctrlModeCode:"",
      	  netMode:"",
      	  deviceStatusCode: "",
      	  manufact:"",
      	  model:"",
      	  manuCrossId:"",
      	  coordX:"",
      	  coordY: "",
      	  regionId:"",
      	  crossId:"",
      	  manageId:"",
      	  regionId:"",
      	  manageId: "",
      	  manageDept:"",
      	  zoneId:"",
      	  smId:"",
      	  project:"",
      	  company:"",
      	  ip:"",
      	  port:""

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        ssId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        ssName: [
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

          slgId: "",
      	  ssName:"",
      	  devTypeCode:"",
      	  ctrlModeCode:"",
      	  netMode:"",
      	  deviceStatusCode: "",
      	  manufact:"",
      	  model:"",
      	  manuCrossId:"",
      	  coordX:"",
      	  coordY: "",
      	  regionId:"",
      	  crossId:"",
      	  manageId:"",
      	  regionId:"",
      	  manageId: "",
      	  manageDept:"",
      	  zoneId:"",
      	  smId:"",
      	  project:"",
      	  company:"",
      	  ip:"",
      	  port:""


      },

        devTypeCode:[],
        deviceStatusCode:[],
        ctrlModeCode:[],
        regionId:[],
        smId:[],
        zoneId:[],
        crossId:[]
      
       
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
      para.ssName = this.filters.ssName;
      para.ssId = this.filters.ssId;
      para.deviceStatusCode = this.filters.deviceStatusCode;
      para.regionId = this.filters.regionId;
      para.manufact = this.filters.manufact;
      this.listLoading = true;
      getPageSignalSiteInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { ssId: row.ssId };
          console.log(para);
          removeSignalSiteInfo({ data: JSON.stringify(para) }).then(res => {
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
           slgId: "",
      	  ssName:"",
      	  devTypeCode:"",
      	  ctrlModeCode:"",
      	  netMode:"",
      	  deviceStatusCode: "",
      	  manufact:"",
      	  model:"",
      	  manuCrossId:"",
      	  coordX:"",
      	  coordY: "",
      	  regionId:"",
      	  crossId:"",
      	  manageId:"",
      	  regionId:"",
      	  manageId: "",
      	  manageDept:"",
      	  zoneId:"",
      	  smId:"",
      	  project:"",
      	  company:"",
      	  ip:"",
      	  port:""
      	  
      	
      	 
      	 
      	 
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
            editSignalSiteInfo({ data: JSON.stringify(para) }).then(res => {
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
            addSignalSiteInfo({ data: JSON.stringify(para) }).then(res => {
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

    getDicInfo: function() {
      getDicInfo().then(resp => {
        let  devTypeCode=[],
             ctrlModeCode=[];
       
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "SIGMACHINETYPE":
               	devTypeCode.push(item);
                break;
                  case "SIGMACHINECTRL":
               	ctrlModeCode.push(item);
                break;
                
              default:
                break;
            }
          });
           this.devTypeCode=devTypeCode;
            this.ctrlModeCode=ctrlModeCode;
          
           	console.log(this);
        }
      });
    
    },
     getDicInfoDob: function() {
      getDicInfoDob().then(resp => {
        let  deviceStatusCode=[];
       
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "DEVICESTATUS":
               	deviceStatusCode.push(item);
                break;
                  
              default:
                break;
            }
          });
           this.deviceStatusCode=deviceStatusCode;
         
           	console.log(this);
        }
      });
    
    },
     getRegionInfo: function() {
         let param = {
            regionId:"",
      };
      getRegionInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.regionId = resp.data.resultList;
           

        }
      });
    
    },
     getSignalMachineInfo: function() {
         let param = {
            smId:"",
      };
      getSignalMachineInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.smId = resp.data.resultList;
           

        }
      });
    
    },
     getSignalZoneInfo: function() {
         let param = {
            zoneId:"",
      };
      getSignalZoneInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.zoneId = resp.data.resultList;
           

        }
      });
    
    },
     getCrossInfo: function() {
         let param = {
            crossId:"",
      };
      getCrossInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.crossId = resp.data.resultList;
           

        }
      });
    
    },
    
  },
  mounted() {
    this.getUsers();
    this.getDicInfo();
    this.getDicInfoDob();
    this.getRegionInfo();
    this.getSignalMachineInfo();
    this.getSignalZoneInfo();
    this.getCrossInfo()
  }
};
</script>

<style scoped>
</style>
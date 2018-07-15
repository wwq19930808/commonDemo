<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.streamId" placeholder="服务器编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.streamName" placeholder="服务器名称"></el-input>
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
			<el-table-column prop="streamId" label="服务器编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="streamName" label="服务器名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="ip" label="IP" width="130" sortable>
			</el-table-column>
			<el-table-column prop="port" label="端口" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="设备状态" width="120" sortable>
			</el-table-column>
			<el-table-column prop="config" label="服务配置" width="150" sortable>
			</el-table-column>
			<el-table-column prop="maxConnect" label="最大连接数" width="140" sortable>
			</el-table-column>
			<el-table-column prop="version" label="当前版本" width="130" sortable>
			</el-table-column>
			<el-table-column prop="versionUpdTime" label="版本时间" width="130" sortable>
			</el-table-column>
			<el-table-column prop="manageId" label="管理编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="deptName" label="管理部门" min-width="120" sortable>
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
				<el-form-item label="服务器编码" prop="streamId">
					<el-input v-model="editForm.streamId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="服务器名称" prop="streamName">
					<el-input v-model="editForm.streamName" auto-complete="off"></el-input>
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
				
					<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="服务器ip" prop="ip">
					<el-input v-model="editForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="服务器端口" prop="port">
					<el-input v-model="editForm.port"></el-input>
				</el-form-item>
				<el-form-item label="服务配置" prop="config">
					<el-input v-model="editForm.config"></el-input>
				</el-form-item>
				<el-form-item label="最大连接数" prop="maxConnect">
					<el-input v-model="editForm.maxConnect"></el-input>
				</el-form-item>
				<el-form-item label="当前版本" prop="version">
					<el-input v-model="editForm.version"></el-input>
				</el-form-item>
				 <el-form-item label="版本时间" prop="versionUpdTime">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.versionUpdTime"></el-date-picker>
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
				<el-form-item label="服务器编码" prop="streamId">
					<el-input v-model="addForm.streamId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="服务器名称" prop="streamName">
					<el-input v-model="addForm.streamName" auto-complete="off"></el-input>
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
				
					<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="服务器ip" prop="ip">
					<el-input v-model="addForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="服务器端口" prop="port">
					<el-input v-model="addForm.port"></el-input>
				</el-form-item>
				<el-form-item label="服务配置" prop="config">
					<el-input v-model="addForm.config"></el-input>
				</el-form-item>
				<el-form-item label="最大连接数" prop="maxConnect">
					<el-input v-model="addForm.maxConnect"></el-input>
				</el-form-item>
				<el-form-item label="当前版本" prop="version">
					<el-input v-model="addForm.version"></el-input>
				</el-form-item>
				 <el-form-item label="版本时间" prop="versionUpdTime">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.versionUpdTime"></el-date-picker>
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
 getPageVideoStreamInfo,
  // batchRemoveUser,
 addVideoStreamInfo,
  editVideoStreamInfo,
  removeVideoStreamInfo,
  getDicInfoDob,
  getDicInfo

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        streamId: "",
        streamName:"",
        deviceStatusCode:"",
     

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
        streamId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        streamName: [
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

        
        deviceStatusCode:[],

      
       
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
      para.streamName = this.filters.streamName;
      para.streamId = this.filters.streamId;
      para.deviceStatusCode = this.filters.deviceStatusCode;
      this.listLoading = true;
      getPageVideoStreamInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { streamId: row.streamId };
          console.log(para);
          removeVideoStreamInfo({ data: JSON.stringify(para) }).then(res => {
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
            para.versionUpdTime =
              !para.versionUpdTime || para.versionUpdTime == ""
                ? ""
                : util.formatDate.format(new Date(para.versionUpdTime), "yyyy-MM-dd");

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
            editVideoStreamInfo({ data: JSON.stringify(para) }).then(res => {
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
            para.versionUpdTime =
              !para.versionUpdTime || para.versionUpdTime == ""
                ? ""
                : util.formatDate.format(new Date(para.versionUpdTime), "yyyy-MM-dd");
            addVideoStreamInfo({ data: JSON.stringify(para) }).then(res => {
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
    
  },
  mounted() {
    this.getUsers();
    this.getDicInfoDob();
  }
};
</script>

<style scoped>
</style>
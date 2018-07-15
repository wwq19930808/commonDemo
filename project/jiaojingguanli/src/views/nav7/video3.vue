<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.vdenId" placeholder="设备编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.vdenName" placeholder="设备名称"></el-input>
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
			<el-table-column prop="vdenId" label="设备编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="vdenName" label="设备名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="deptName" label="设备管理部门" width="160" sortable>
			</el-table-column>
			<el-table-column prop="venTypeName" label="设置类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="设置状态" width="120" sortable>
			</el-table-column>
			<el-table-column prop="ip" label="IP" width="150" sortable>
			</el-table-column>
			<el-table-column prop="port" label="端口" width="120" sortable>
			</el-table-column>
			<el-table-column prop="channels" label="通道总数" width="130" sortable>
			</el-table-column>
			<el-table-column prop="model" label="型号名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="所属建设项目" min-width="150" sortable>
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
				<el-form-item label="视频编码" prop="vdenId">
					<el-input v-model="editForm.vdenId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="视频名称" prop="vdenName">
					<el-input v-model="editForm.vdenName" auto-complete="off"></el-input>
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
				
					<el-form-item label="型号名称" prop="model">
					<el-input v-model="editForm.model"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="venTypeCode">
                  <el-select :size="'mini'" v-model="editForm.venTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in venTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="登录账号" prop="logInUser">
					<el-input v-model="editForm.logInUser"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="logInPasswd">
					<el-input v-model="editForm.logInPasswd"></el-input>
				</el-form-item>
					<el-form-item label="IP" prop="ip">
					<el-input v-model="editForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input v-model="editForm.port"></el-input>
				</el-form-item>
				<el-form-item label="通道总数" prop="channels">
					<el-input v-model="editForm.channels"></el-input>
				</el-form-item>
				<el-form-item label="起始通道" prop="beginChannel">
					<el-input v-model="editForm.beginChannel"></el-input>
				</el-form-item>
				<el-form-item label="输入通道数" prop="warnChannelIn">
					<el-input v-model="editForm.warnChannelIn"></el-input>
				</el-form-item>
				<el-form-item label="输出通道数" prop="warnChannelOut">
					<el-input v-model="editForm.warnChannelOut"></el-input>
				</el-form-item>
				<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="editForm.manufact"></el-input>
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
				<el-form-item label="视频编码" prop="vdenId">
					<el-input v-model="addForm.vdenId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="视频名称" prop="vdenName">
					<el-input v-model="addForm.vdenName" auto-complete="off"></el-input>
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
				
					<el-form-item label="型号名称" prop="model">
					<el-input v-model="addForm.model"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="venTypeCode">
                  <el-select :size="'mini'" v-model="addForm.venTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in venTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="登录账号" prop="logInUser">
					<el-input v-model="addForm.logInUser"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="logInPasswd">
					<el-input v-model="addForm.logInPasswd"></el-input>
				</el-form-item>
					<el-form-item label="IP" prop="ip">
					<el-input v-model="addForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input v-model="addForm.port"></el-input>
				</el-form-item>
				<el-form-item label="通道总数" prop="channels">
					<el-input v-model="addForm.channels"></el-input>
				</el-form-item>
				<el-form-item label="起始通道" prop="beginChannel">
					<el-input v-model="addForm.beginChannel"></el-input>
				</el-form-item>
				<el-form-item label="输入通道数" prop="warnChannelIn">
					<el-input v-model="addForm.warnChannelIn"></el-input>
				</el-form-item>
				<el-form-item label="输出通道数" prop="warnChannelOut">
					<el-input v-model="addForm.warnChannelOut"></el-input>
				</el-form-item>
				<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="addForm.manufact"></el-input>
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
 getPageVideoEncoderInfo,
  // batchRemoveUser,
 addVideoEncoderInfo,
  editVideoEncoderInfo,
  removeVideoEncoderInfo,
  getDicInfoDob,
  getDicInfo

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        vdenId: "",
        vdenName:"",
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
        

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        vdenId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        vdenName: [
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
        venTypeCode: [{ required: true, message: "请输入内容", trigger: "blur" }],
        compTypeName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        manageId: [{ required: true, message: "请输入内容", trigger: "blur" }],
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

         


      },

     
        deviceStatusCode:[],
        venTypeCode:[],
      
       
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
      para.vdenName = this.filters.vdenName;
      para.vdenId = this.filters.vdenId;
      para.deviceStatusCode = this.filters.deviceStatusCode;
      this.listLoading = true;
      getPageVideoEncoderInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { vdenId: row.vdenId };
          console.log(para);
          removeVideoEncoderInfo({ data: JSON.stringify(para) }).then(res => {
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
            editVideoEncoderInfo({ data: JSON.stringify(para) }).then(res => {
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
            addVideoEncoderInfo({ data: JSON.stringify(para) }).then(res => {
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
       	     venTypeCode=[];
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "DEVICESTATUS":
               	deviceStatusCode.push(item);
                break;
                case "TYPEVIDEO":
               	venTypeCode.push(item);
                break;
                  
              default:
                break;
            }
          });
           this.deviceStatusCode=deviceStatusCode;
         	  this.venTypeCode=venTypeCode;
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
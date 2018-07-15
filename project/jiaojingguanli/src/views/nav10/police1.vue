<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.deviceCode" placeholder="设备编号"></el-input>
				</el-form-item>
				<el-form-item >
                  <el-select  v-model="filters.deviceType" placeholder="设备类别">
                   <el-option
                       v-for="item in deviceType"
                      :key="item.deviceTypeName"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item>
					<el-input v-model="filters.locationId" placeholder="定位标识"></el-input>
				</el-form-item>
				<el-form-item >
                  <el-select  v-model="filters.usageState" placeholder="设备状态">
                   <el-option
                        v-for="item in options"
                       :key="item.usageState"
                       :label="item.label"
                       :value="item.value">
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
			<el-table-column prop="deviceCode" label="设备编号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceName" label="设备名称" width="120"  sortable>
			</el-table-column>
			<el-table-column prop="deviceTypeName" label="设备类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="usageState" label="使用状态" width="120" sortable>
			</el-table-column>
			<el-table-column prop="personId" label="派发警号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="personName" label="派发警名" width="140" sortable>
			</el-table-column>
			<el-table-column prop="deviceLed" label="对讲呼号" width="140" sortable>
			</el-table-column>
			<el-table-column prop="adminDepartmentName" label="管理部门" width="120" sortable>
			</el-table-column>
			<el-table-column prop="localDepartmentName" label="所在部门" width="120" sortable>
			</el-table-column>
			<el-table-column prop="usageDepartmentName" label="使用部门" width="120" sortable>
			</el-table-column>
			<el-table-column prop="locationId" label="定位标识" min-width="140" sortable>
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
				<el-form-item label="设备类别" prop="deviceType">
                  <el-select :size="'mini'" v-model="editForm.deviceType" placeholder="请选择">
                   <el-option
                       v-for="item in deviceType"
                      :key="item.deviceTypeName"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="设备名称" prop="deviceName">
					<el-input v-model="editForm.deviceName"></el-input>
				</el-form-item>
				<el-form-item label="定位标识" prop="locationId">
					<el-input v-model="editForm.locationId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品尺寸" prop="deviceSize">
					<el-input v-model="editForm.deviceSize"></el-input>
				</el-form-item>
				<el-form-item label="产品重量" prop="deviceWeight">
					<el-input v-model="editForm.deviceWeight" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品颜色" prop="deviceColor">
					<el-input v-model="editForm.deviceColor"></el-input>
				</el-form-item>
				<el-form-item label="显示屏" prop="deviceLed">
					<el-input v-model="editForm.deviceLed" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="出厂日期" prop="factoryDate">
					<el-input v-model="editForm.factoryDate"></el-input>
				</el-form-item>
				<el-form-item label="生产厂商" prop="manufacture">
					<el-input v-model="editForm.manufacture" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="网络信息" prop="network">
					<el-input v-model="editForm.network"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="adminDepartment">
					<el-input v-model="editForm.adminDepartment"></el-input>
				</el-form-item>
				 <!-- <el-form-item label="管理部门" prop="adminDepartment">
                  <el-select :size="'mini'" v-model="editForm.adminDepartment" placeholder="请选择">
                   <el-option
                       v-for="item in adminDepartment"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.deptId">
                   </el-option>
               </el-select>
               </el-form-item> -->
				<el-form-item label="使用用途" prop="usage">
					<el-input v-model="editForm.usage"></el-input>
				</el-form-item>
				<el-form-item label="对讲呼号" prop="deviceModel">
					<el-input v-model="editForm.deviceModel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片信息" prop="picInfo">
					<el-input v-model="editForm.memo"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input v-model="editForm.memo" auto-complete="off"></el-input>
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
			  <el-form-item label="设备类别" prop="deviceType">
                  <el-select :size="'mini'" v-model="addForm.deviceType" placeholder="请选择">
                   <el-option
                       v-for="item in deviceType"
                      :key="item.deviceTypeName"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="设备名称" prop="deviceName">
					<el-input v-model="addForm.deviceName"></el-input>
				</el-form-item>
				<el-form-item label="定位标识" prop="locationId">
					<el-input v-model="addForm.locationId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品尺寸" prop="deviceSize">
					<el-input v-model="addForm.deviceSize"></el-input>
				</el-form-item>
				<el-form-item label="产品重量" prop="deviceWeight">
					<el-input v-model="addForm.deviceWeight" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品颜色" prop="deviceColor">
					<el-input v-model="addForm.deviceColor"></el-input>
				</el-form-item>
				<el-form-item label="显示屏" prop="deviceLed">
					<el-input v-model="addForm.deviceLed" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出厂日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.factoryDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="生产厂商" prop="manufacture">
					<el-input v-model="addForm.manufacture" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="网络信息" prop="network">
					<el-input v-model="addForm.network"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="adminDepartment">
					<el-input v-model="addForm.adminDepartment"></el-input>
				</el-form-item>
				 <!-- <el-form-item label="管理部门" prop="adminDepartment">
                  <el-select :size="'mini'" v-model="editForm.adminDepartment" placeholder="请选择">
                   <el-option
                       v-for="item in adminDepartment"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.deptId">
                   </el-option>
               </el-select>
               </el-form-item> -->
				<el-form-item label="使用用途" prop="usage">
					<el-input v-model="addForm.usage"></el-input>
				</el-form-item>
				<el-form-item label="对讲呼号" prop="deviceModel">
					<el-input v-model="addForm.deviceModel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片信息" prop="picInfo">
					<el-input v-model="addForm.picInfo"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input v-model="addForm.memo" auto-complete="off"></el-input>
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
 getPagePoliceDeviceInfo,
  // batchRemoveUser,
 addPoliceDeviceInfo,
  editPoliceDeviceInfo,
  removePoliceDeviceInfo,
  getDetpTree,
  getDicInfoDob,

} from "../../api/api";

export default {
  data() {
    return {
    	options: [{
           value: '全部',
          label: '全部'
        }, {
          value: '入库',
          label: '入库'
        },{
          value: '已领用',
          label: '已领用'
      },{
          value: '已报废',
          label: '已报废'
      },{
          value: '已派发',
          label: '已派发'
      },{
          value: '维修中',
          label: '维修中'
      },],
      filters: {
        deviceCode: "",
        deviceType:"",
        locationId:"",
        usageState:"",
        
     

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
        deviceType: [{ required: true, message: "请输入内容", trigger: "blur" }],
        deviceName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        locationId: [
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

        


      },

        
        deviceType:[],
        adminDepartment:[],
       


      
       
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
      para.deviceType = this.filters.deviceType;
      para.deviceCode = this.filters.deviceCode;
      para.locationId = this.filters.locationId;
      para.usageState = this.filters.usageState;
      this.listLoading = true;

      getPagePoliceDeviceInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { deviceCode: row.deviceCode };
          console.log(para);
          removePoliceDeviceInfo({ data: JSON.stringify(para) }).then(res => {
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
            editPoliceDeviceInfo({ data: JSON.stringify(para) }).then(res => {
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
            addPoliceDeviceInfo({ data: JSON.stringify(para) }).then(res => {
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
        let 
        deviceType=[];
       			
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "DEVICETYPE":
               	deviceType.push(item);
                break;
              
                  
              default:
                break;
            }
          });
           this.deviceType=deviceType;
           
           	console.log(this);
        }
      });
    
    },
    //   getDetpTree: function() {
    //      let param = {
    //        deptId:"610101000000"
    //   };
    //   getDetpTree({ data: JSON.stringify(param) }).then(resp => {
    //     console.log(resp);
    //     if ((resp.status = 200 && !!resp.data)) {
    //       this.adminDepartment = resp.data.resultList;
           

    //     }
    //   });
    
    // },
    
  },
  mounted() {
    this.getUsers();
     // this.getDetpTree();
    this.getDicInfoDob();

  }
};
</script>

<style scoped>
</style>
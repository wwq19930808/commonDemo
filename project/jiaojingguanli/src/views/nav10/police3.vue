<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.gunCode" placeholder="枪支编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.gunName" placeholder="枪支名称"></el-input>
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
			<el-table-column prop="gunCode" label="枪支编码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="gunName" label="枪支名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="gunTypeName" label="枪支类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="gunModelName" label="枪支型号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="fireLevelName" label="枪支火力" width="120" sortable>
			</el-table-column>
			<el-table-column prop="gunName" label="枪支标识" width="140" sortable>
			</el-table-column>
			<el-table-column prop="factoryDate" label="出厂日期" width="140" sortable>
			</el-table-column>
			<el-table-column prop="recordDate" label="登记日期" width="120" sortable>
			</el-table-column>
			<el-table-column prop="adminDepartmentName" label="设备管理部门" width="140" sortable>
			</el-table-column>
			<el-table-column prop="responsiblePerson" label="负责人" min-width="120" sortable>
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form  :inline="true" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="枪支名称" prop="gunName">
					<el-input v-model="editForm.gunName"></el-input>
				</el-form-item>
				<el-form-item label="枪支类别" prop="gunType">
                  <el-select :size="'mini'" v-model="editForm.carKind" placeholder="请选择">
                   <el-option
                       v-for="item in gunType"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="枪支型号" prop="gunModel">
                  <el-select :size="'mini'" v-model="editForm.gunModel" placeholder="请选择">
                   <el-option
                       v-for="item in gunModel"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
                <el-form-item label="枪支火力" prop="fireLevel">
                  <el-select :size="'mini'" v-model="editForm.fireLevel" placeholder="请选择">
                   <el-option
                       v-for="item in fireLevel"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="枪支标识" prop="gunID">
					<el-input v-model="editForm.gunID"></el-input>
				</el-form-item>
				<el-form-item label="出厂日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.factoryDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="登记日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.purchaseDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="生产厂商" prop="manufacture">
					<el-input v-model="editForm.manufacture"></el-input>
				</el-form-item>
				<el-form-item label="所在枪库" prop="gunDepot">
					<el-input v-model="editForm.gunDepot"></el-input>
				</el-form-item>
				<el-form-item label="所属主机" prop="localCabinet">
					<el-input v-model="editForm.localCabinet"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="adminDepartment">
					<el-input v-model="editForm.adminDepartment"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="responsiblePerson">
					<el-input v-model="editForm.responsiblePerson" ></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input v-model="editForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form  :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="枪支名称" prop="gunName">
					<el-input v-model="addForm.gunName"></el-input>
				</el-form-item>
				<el-form-item label="枪支类别" prop="gunType">
                  <el-select :size="'mini'" v-model="addForm.carKind" placeholder="请选择">
                   <el-option
                       v-for="item in gunType"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="枪支型号" prop="gunModel">
                  <el-select :size="'mini'" v-model="addForm.gunModel" placeholder="请选择">
                   <el-option
                       v-for="item in gunModel"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
                <el-form-item label="枪支火力" prop="fireLevel">
                  <el-select :size="'mini'" v-model="addForm.fireLevel" placeholder="请选择">
                   <el-option
                       v-for="item in fireLevel"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="枪支标识" prop="gunID">
					<el-input v-model="addForm.gunID"></el-input>
				</el-form-item>
				<el-form-item label="出厂日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.factoryDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="登记日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.purchaseDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="生产厂商" prop="manufacture">
					<el-input v-model="addForm.manufacture"></el-input>
				</el-form-item>
				<el-form-item label="所在枪库" prop="gunDepot">
					<el-input v-model="addForm.gunDepot"></el-input>
				</el-form-item>
				<el-form-item label="所属主机" prop="localCabinet">
					<el-input v-model="addForm.localCabinet"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="adminDepartment">
					<el-input v-model="addForm.adminDepartment"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="responsiblePerson">
					<el-input v-model="addForm.responsiblePerson" ></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input v-model="addForm.memo"></el-input>
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
 getPagePoliceGunInfo,
  // batchRemoveUser,
 addPoliceGunInfo,
  editPoliceGunInfo,
  removePoliceGunInfo,
  getDicInfo,

  getDicInfoDob

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        gunCode: "",
        gunName:"",
        
     

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
        gunName: [{ required: true, message: "请输入内容", trigger: "blur" }],

        gunType: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        gunModel: [
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
        fireLevel: [{ required: true, message: "请输入内容", trigger: "blur" }],
        gunID: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        factoryDate: [{ required: true, trigger: "blur" }],
        purchaseDate: [{ required: true,  trigger: "blur" }],
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

        
      
        gunType:[],
        gunModel:[],
        fireLevel:[]
       


      
       
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
      para.gunCode = this.filters.gunCode;
      para.gunName = this.filters.gunName;
      this.listLoading = true;

      getPagePoliceGunInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { gunCode: row.gunCode };
          console.log(para);
          removePoliceGunInfo({ data: JSON.stringify(para) }).then(res => {
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
            editPoliceGunInfo({ data: JSON.stringify(para) }).then(res => {
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
            addPoliceGunInfo({ data: JSON.stringify(para) }).then(res => {
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
        let  gunType=[],
            fireLevel=[],
       		gunModel=[];
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "GUNTYPE":
               	gunType.push(item);
                break;
                 case "GUNMODEL":
               	gunModel.push(item);
                break;   
                 case "FIRELEVEL":
               	fireLevel.push(item);
                break;     
              default:
                break;
            }
          });
           this.gunType=gunType;
          this.fireLevel=fireLevel;
          this.gunModel=gunModel;
           	console.log(this);
        }
      });
    
    },

   

  

    
    
  },
  mounted() {
    this.getUsers();
    this.getDicInfoDob()
  }
};
</script>

<style scoped>
</style>
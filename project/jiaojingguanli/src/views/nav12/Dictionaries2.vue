<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.dicCode" placeholder="字典编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.parentCode" placeholder="上级编码"></el-input>
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
			<el-table-column prop="dicCode" label="字典编码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="typeCode" label="字典类型" width="150"  sortable>
			</el-table-column>
			<el-table-column prop="itemCode" label="字典项" width="130" sortable>
			</el-table-column>
			<el-table-column prop="subItemCode" label="字典子项" width="130" sortable>
			</el-table-column>
			<el-table-column prop="dicValue" label="字典值" width="130" sortable>
			</el-table-column>
			<el-table-column prop="dicName" label="字典名称" width="130" sortable>
			</el-table-column>
			<el-table-column prop="parentCode" label="上级字典编码" width="150" sortable>
			</el-table-column>
			<el-table-column prop="sortNo" label="组内顺序编码" width="150" sortable>
			</el-table-column>
			<el-table-column prop="memo" label="备注" min-width="120" sortable>
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
				<el-form-item label="字典类型" prop="typeCode">
					<el-input v-model="editForm.typeCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典项" prop="itemCode">
					<el-input v-model="editForm.itemCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典子项" prop="subItemCode">
				   <el-input v-model="editForm.subItemCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典值" prop="dicValue">
					<el-input v-model="editForm.dicValue" ></el-input>
				</el-form-item>
				<el-form-item label="字典名称" prop="dicName">
					<el-input v-model="editForm.dicName"></el-input>
				</el-form-item>
					<el-form-item label="上级编码" prop="parentCode">
					<el-input v-model="editForm.parentCode"></el-input>
				</el-form-item>
				<el-form-item label="组内顺序" prop="sortNo">
					<el-input v-model="editForm.sortNo" ></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
				   <el-input v-model="editForm.memo" ></el-input>
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
				<el-form-item label="字典类型" prop="typeCode">
					<el-input v-model="addForm.typeCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典项" prop="itemCode">
					<el-input v-model="addForm.itemCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典子项" prop="subItemCode">
				   <el-input v-model="addForm.subItemCode" ></el-input>
				</el-form-item>
				<el-form-item label="字典值" prop="dicValue">
					<el-input v-model="addForm.dicValue" ></el-input>
				</el-form-item>
				<el-form-item label="字典名称" prop="dicName">
					<el-input v-model="addForm.dicName"></el-input>
				</el-form-item>
					<el-form-item label="上级编码" prop="parentCode">
					<el-input v-model="addForm.parentCode"></el-input>
				</el-form-item>
				<el-form-item label="组内顺序" prop="sortNo">
					<el-input v-model="addForm.sortNo" ></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
				   <el-input v-model="addForm.memo" ></el-input>
				</el-form-item>
				<el-form-item label="字典编码" prop="dicCode" >
				   <el-input v-model="addForm.dicCode"  ></el-input>
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
 getPagePublicDic,
  // batchRemoveUser,
 addPublicDic,
  editPublicDic,
  removePublicDic,
 

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        dicCode: "",
        parentCode:"",
        
     

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
        typeCode: [{ required: true, message: "请输入内容", trigger: "blur" }],
        itemCode: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        dicValue: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],

        dicName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
            message: "请输入正确的身份证号"
          }
        ],
        parentCode: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
      para.parentCode = this.filters.parentCode;
      para.dicCode = this.filters.dicCode;
      this.listLoading = true;

      getPagePublicDic({ data: JSON.stringify(para) }).then(res => {
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
          let para = { dicCode: row.dicCode };
          console.log(para);
          removePublicDic({ data: JSON.stringify(para) }).then(res => {
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
      this.dicCode= "";
      this.addForm = {
         
      	 dicCode:"",
      	 
      	 
      	 
      	 
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
            editPublicDic({ data: JSON.stringify(para) }).then(res => {
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
            addPublicDic({ data: JSON.stringify(para) }).then(res => {
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

  
   
   
   
    
    
  },
  mounted() {
    this.getUsers();
  

  }
};
</script>

<style scoped>
.dicCode1{
	width: 0;
	height: 0;
}
</style>
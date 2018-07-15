<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.slgId" placeholder="信号灯组编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.sigContent" placeholder="信号灯组"></el-input>
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
			<el-table-column prop="slgId" label="信号灯组编码" width="180" sortable>
			</el-table-column>
			<el-table-column prop="sigContent" label="信号灯组" width="180" sortable>
			</el-table-column>
			<el-table-column prop="directName" label="信号灯组方向" width="180" sortable>
			</el-table-column>
			<el-table-column prop="slTypeName" label="信号灯类型" width="180" sortable>
			</el-table-column>
			
			
			<el-table-column prop="ssName" label="所属信号机点位" min-width="180" sortable>
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
				<el-form-item label="灯组编码" prop="slgId">
					<el-input v-model="editForm.slgId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="信号灯组" prop="sigContent">
					<el-input v-model="editForm.sigContent" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="灯组方向" prop="directCode">
                  <el-select :size="'mini'" v-model="editForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="信号灯类型" prop="slTypeCode">
                  <el-select :size="'mini'" v-model="editForm.slTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in slTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
			  <el-form-item label="所属点位" prop="ssId">
                  <el-select :size="'mini'" v-model="editForm.ssId" placeholder="请选择">
                   <el-option
                       v-for="item in ssId"
                      :key="item.ssId"
                      :label="item.ssName"
                      :value="item.ssId">
                   </el-option>
               </el-select>
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
				<el-form-item label="灯组编码" prop="slgId">
					<el-input v-model="addForm.slgId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="信号灯组" prop="sigContent">
					<el-input v-model="addForm.sigContent" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="灯组方向" prop="directCode">
                  <el-select :size="'mini'" v-model="addForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="信号灯类型" prop="slTypeCode">
                  <el-select :size="'mini'" v-model="addForm.slTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in slTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
                 <el-form-item label="所属点位" prop="ssId">
                  <el-select :size="'mini'" v-model="addForm.ssId" placeholder="请选择">
                   <el-option
                       v-for="item in ssId"
                      :key="item.ssId"
                      :label="item.ssName"
                      :value="item.ssId">
                   </el-option>
               </el-select>
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
 getPageSignalLampGroupInfo,
  // batchRemoveUser,
 addSignalLampGroupInfo,
  editSignalLampGroupInfo,
  removeSignalLampGroupInfo,
  getDicInfoDob,
  getDicInfo,
  getSignalSiteInfo,

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        slgId: "",
        sigContent:"",
     

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
       
      	  slgId: "",
      	  sigContent:"",
      	  directCode:"",
      	  slTypeCode:"",
      	  ssId:"",

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        slgId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        sigContent: [
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
        directCode: [{ required: true, message: "请输入内容", trigger: "blur" }],
        compTypeName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        slTypeCode: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
      	  sigContent:"",
      	  directCode:"",
      	  slTypeCode:"",
      	  ssId:"",
      	 



      },

        directCode:[],
        slTypeCode:[],
        ssId:[]
      
       
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
      para.sigContent = this.filters.sigContent;
      para.slgId = this.filters.slgId;
      this.listLoading = true;
      getPageSignalLampGroupInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { slgId: row.slgId };
          console.log(para);
          removeSignalLampGroupInfo({ data: JSON.stringify(para) }).then(res => {
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
      	  sigContent:"",
      	  directCode:"",
      	  slTypeCode:"",
      	  ssId:"",
      	  
      	
      	 
      	 
      	 
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
            editSignalLampGroupInfo({ data: JSON.stringify(para) }).then(res => {
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
            addSignalLampGroupInfo({ data: JSON.stringify(para) }).then(res => {
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
        let  directCode=[],
             slTypeCode=[];
       
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "SIGLAMPDIRECT":
               	directCode.push(item);
                break;
                  case "SIGLAMPTYPE":
               	slTypeCode.push(item);
                break;
                
              default:
                break;
            }
          });
           this.directCode=directCode;
            this.slTypeCode=slTypeCode;
          
           	console.log(this);
        }
      });
    
    },
     getSignalSiteInfo: function() {
         let param = {
            ssId:"",
      };
      getSignalSiteInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.ssId = resp.data.resultList;
           

        }
      });
    
    },
    
  },
  mounted() {
    this.getUsers();
    this.getDicInfo();
    this.getSignalSiteInfo();
  }
};
</script>

<style scoped>
</style>
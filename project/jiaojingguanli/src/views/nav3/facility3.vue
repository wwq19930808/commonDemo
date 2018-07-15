<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.pdevId" placeholder="停车场设备编码"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.pdevName" placeholder="停车场设备名称"></el-input>
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
			<el-table-column prop="pdevId" label="停车场设备编码" width="160" sortable>
			</el-table-column>
			<el-table-column prop="pdevName" label="停车场设备名称" width="160"  sortable>
			</el-table-column>
			<el-table-column prop="parkName" label="停车场" width="120" sortable>
			</el-table-column>
			<el-table-column prop="devTypeName" label="设备类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="directName" label="方向类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="commModeName" label="通讯方式" width="120" sortable>
			</el-table-column>
			<el-table-column prop="commParam" label="Ip或COM口" width="140" sortable>
			</el-table-column>
			<el-table-column prop="commValue" label="端口或波特率" width="140" sortable>
			</el-table-column>
			<el-table-column prop="positionDesc" label="设备安装位置描述" min-width="180" sortable>
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
				<el-form-item label="设备编码" prop="pdevId">
					<el-input v-model="editForm.pdevId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="设备名称" prop="pdevName">
					<el-input v-model="editForm.pdevName" auto-complete="off"></el-input>
				</el-form-item>
         <el-form-item label="停车场名称" prop="parkId">
                  <el-select :size="'mini'" v-model="editForm.parkId" placeholder="请选择">
                   <el-option
                       v-for="item in parkId"
                      :key="item.parkId"
                      :label="item.parkName"
                      :value="item.parkId">
                   </el-option>
               </el-select>
               </el-form-item>

				<el-form-item label="设备类别" prop="devTypeCode">
                  <el-select :size="'mini'" v-model="editForm.devTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in devTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>

               <el-form-item label="方向类型" prop="directCode">
                  <el-select :size="'mini'" v-model="editForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="通讯方式" prop="commModeCode">
                  <el-select :size="'mini'" v-model="editForm.commModeCode" placeholder="请选择">
                   <el-option
                      v-for="item in commModeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="IP地址" prop="commParam">
					<el-input v-model="editForm.commParam"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="commValue">
					<el-input v-model="editForm.commValue"></el-input>
				</el-form-item>
				<el-form-item label="位置描述" prop="positionDesc">
					<el-input v-model="editForm.positionDesc" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="排序序号" prop="sortNo">
					<el-input v-model="editForm.sortNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="editForm.coordX"></el-input>
				</el-form-item>
					<el-form-item label="建设项目" prop="project">
					<el-input v-model="editForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="editForm.company"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
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
			<el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="设备编码" prop="pdevId">
					<el-input v-model="addForm.pdevId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="设备名称" prop="pdevName">
					<el-input v-model="addForm.pdevName" auto-complete="off"></el-input>
				</el-form-item>
         <el-form-item label="停车场名称" prop="parkId">
                  <el-select :size="'mini'" v-model="addForm.parkId" placeholder="请选择">
                   <el-option
                       v-for="item in parkId"
                      :key="item.parkId"
                      :label="item.parkName"
                      :value="item.parkId">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="设备类别" prop="devTypeCode">
                  <el-select :size="'mini'" v-model="addForm.devTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in devTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>

               <el-form-item label="方向类型" prop="directCode">
                  <el-select :size="'mini'" v-model="addForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="通讯方式" prop="commModeCode">
                  <el-select :size="'mini'" v-model="addForm.commModeCode" placeholder="请选择">
                   <el-option
                      v-for="item in commModeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="IP地址" prop="commParam">
					<el-input v-model="addForm.commParam"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="commValue">
					<el-input v-model="addForm.commValue"></el-input>
				</el-form-item>
				<el-form-item label="位置描述" prop="positionDesc">
					<el-input v-model="addForm.positionDesc" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="排序序号" prop="sortNo">
					<el-input v-model="addForm.sortNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
				</el-form-item>
					<el-form-item label="建设项目" prop="project">
					<el-input v-model="addForm.project"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
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
 getPageParkDevInfo,
  // batchRemoveUser,
 addParkDevInfo,
  editParkDevInfo,
  removeParkDevInfo,
  getDicInfoDob,
  getDicInfo,
  getParkInfo

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        pdevId: "",
        pdevName: "",

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
       
      	  pdevId: "",
      	  pdevName:"",
      	  letterAbbr:"",
      	  parkId:"",
      	  devTypeCode:"",
      	  directCode:"",
      	  commModeCode:"",
      	  commParam:"",
      	  commValue:"",
      	  positionDesc:"",
      	  sortNo:"",
      	  coordX: "",
      	  coordY:"",
      	  project:"",
      	  company:"",
      	  manageDept:"",
      	  manageId:"",
      	  memo:"",
      	 

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        pdevId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        pdevName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        parkId: [
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

      	  pdevId: "",
      	  pdevName:"",
      	  letterAbbr:"",
      	  parkId:"",
      	  devTypeCode:"",
      	  directCode:"",
      	  commModeCode:"",
      	  commParam:"",
      	  commValue:"",
      	  positionDesc:"",
      	  sortNo:"",
      	  coordX: "",
      	  coordY:"",
      	  project:"",
      	  company:"",
      	  manageDept:"",
      	  manageId:"",
      	  memo:"",
      	 



      },
        devTypeCode:[],
        directCode:[],
        commModeCode:[],
        parkId:[]
       
    };
  },
  methods: {
    getPagePersonInfo() {
      let self = this;
      this.$http
        .get(
          "http://118.31.35.240:8081/ubms-server/Person/getPagePersonInfo.htm",
          { data: JSON.stringify({ currentPage: 3 }) }
        )
        .then(result => {
          self.total = result.body.resultList.total;
          console.log(this.total);
          if (result.status === 200) {
            this.newslist = result.body.resultList.rows;
            console.log(this.newslist);
          }
          err => console.log(err);
        });
    },
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
      para.pdevName = this.filters.pdevName;
      para.pdevId = this.filters.pdevId;
      this.listLoading = true;
      getPageParkDevInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { pdevId: row.pdevId };
          console.log(para);
          removeParkDevInfo({ data: JSON.stringify(para) }).then(res => {
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
      
      	  pdevId: "",
      	  pdevName:"",
      	  letterAbbr:"",
      	  parkId:"",
      	  devTypeCode:"",
      	  directCode:"",
      	  commModeCode:"",
      	  commParam:"",
      	  commValue:"",
      	  positionDesc:"",
      	  sortNo:"",
      	  coordX: "",
      	  coordY:"",
      	  project:"",
      	  company:"",
      	  manageDept:"",
      	  manageId:"",
      	  memo:"",
      	 
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
            editParkDevInfo({ data: JSON.stringify(para) }).then(res => {
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
            addParkDevInfo({ data: JSON.stringify(para) }).then(res => {
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
        let deviceStatusCode = [],
        commModeCode=[],
        devTypeCode=[];
       
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
              case "DEVICESTATUS":
                deviceStatusCode.push(item);
                break;
                case "TYPEPARKDEV":
               	devTypeCode.push(item);
                break;
                case "LEDCOMM":
               	commModeCode.push(item);
                break;
              default:
                break;
            }
          });
           this.deviceStatusCode=deviceStatusCode;
           this.devTypeCode=devTypeCode;
           this.commModeCode=commModeCode;
           
           	console.log(this);
        }
      });
    
    },
    getDicInfo: function() {


      getDicInfo().then(resp => {
        let 
        
        directCode=[];
        	
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "PARKDEVDIRECT":
               	directCode.push(item);
                break;
              default:
                break;
            }
          });
         		this.directCode=directCode;
         		
           
           	console.log(this);
        }
      });
    
    },
     getParkInfo: function() {
         let param = {
           parkId: "",
      };
      getParkInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.parkId = resp.data.resultList;
           

        }
      });
    
    },
  },
  mounted() {
    this.getUsers();
    this.getDicInfoDob();
    this.getDicInfo();
    this.getParkInfo()
  }
};
</script>

<style scoped>
</style>
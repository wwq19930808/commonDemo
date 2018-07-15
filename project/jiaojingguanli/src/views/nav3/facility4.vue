<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.ledId" placeholder="信息板编号"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.ledName" placeholder="信息板名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.project" placeholder="建设期数"></el-input>
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
        <el-form-item >
                  <el-select  v-model="filters.purposeCode" placeholder="用途">
                   <el-option
                      v-for="item in purposeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item >
                  <el-select  v-model="filters.ctrlTypeCode" placeholder="控制器类型">
                   <el-option
                      v-for="item in ctrlTypeCode"
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
			<el-table-column prop="ledId" label="信息板编号" width="130" sortable>
			</el-table-column>
			<el-table-column prop="ledName" label="信息板名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="letterAddr" label="安装地址" width="120" sortable>
			</el-table-column>
			<el-table-column prop="directName" label="信息板朝向" width="140" sortable>
			</el-table-column>
			<el-table-column prop="regionId" label="行政区域" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deviceStatusName" label="设备状态" width="120" sortable>
			</el-table-column>
			<el-table-column prop="purpostName" label="用途" width="120" sortable>
			</el-table-column>
			<el-table-column prop="ctrlTypeName" label="控制器" width="120" sortable>
			</el-table-column>
			<el-table-column prop="modTypeName" label="模组" width="120" sortable>
			</el-table-column>
			<el-table-column prop="consTypeName" label="组成" width="120" sortable>
			</el-table-column>
			<el-table-column prop="width" label="宽度" width="100" sortable>
			</el-table-column>
			<el-table-column prop="height" label="高度" width="100" sortable>
			</el-table-column>
			<el-table-column prop="commModeName" label="通讯" width="100" sortable>
			</el-table-column>
			<el-table-column prop="commParam" label="IP" width="120" sortable>
			</el-table-column>
			<el-table-column prop="commValue" label="端口" min-width="120" sortable>
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
				<el-form-item label="信息板编码" prop="ledId">
					<el-input v-model="addForm.ledId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="信息板名称" prop="ledName">
					<el-input v-model="addForm.ledName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="朝向" prop="directCode">
                  <el-select :size="'mini'" v-model="editForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
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
				<el-form-item label="联网状态" prop="netMode">
					<el-input v-model="addForm.netMode"></el-input>
				</el-form-item>
				<el-form-item label="安装地址" prop="letterAddr">
					<el-input v-model="addForm.letterAddr"></el-input>
				</el-form-item>
				<el-form-item label="用途" prop="purposeCode">
                  <el-select :size="'mini'" v-model="editForm.purposeCode" placeholder="请选择">
                   <el-option
                      v-for="item in purposeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
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
				<el-form-item label="控制器类型" prop="ctrlTypeCode">
                  <el-select :size="'mini'" v-model="editForm.ctrlTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
					<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
					<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="addForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="模组类型" prop="modTypeCode">
                  <el-select :size="'mini'" v-model="editForm.modTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in modTypeCode"
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
				<el-form-item label="板高(px)" prop="height">
					<el-input v-model="addForm.height"></el-input>
				</el-form-item>
				<el-form-item label="板宽(px)" prop="width">
					<el-input v-model="addForm.width"></el-input>
				</el-form-item>
				<el-form-item label="ip" prop="commParam">
					<el-input v-model="addForm.commParam"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="commValue">
					<el-input v-model="addForm.commValue"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="建设期数" prop="project">
					<el-input v-model="addForm.project"></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
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
				<el-form-item label="信息板编码" prop="ledId">
					<el-input v-model="addForm.ledId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="信息板名称" prop="ledName">
					<el-input v-model="addForm.ledName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="朝向" prop="directCode">
                  <el-select :size="'mini'" v-model="editForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
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
				<el-form-item label="联网状态" prop="netMode">
					<el-input v-model="addForm.netMode"></el-input>
				</el-form-item>
				<el-form-item label="安装地址" prop="letterAddr">
					<el-input v-model="addForm.letterAddr"></el-input>
				</el-form-item>
				<el-form-item label="用途" prop="purposeCode">
                  <el-select :size="'mini'" v-model="editForm.purposeCode" placeholder="请选择">
                   <el-option
                      v-for="item in purposeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
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
				<el-form-item label="控制器类型" prop="ctrlTypeCode">
                  <el-select :size="'mini'" v-model="editForm.ctrlTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
					<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
					<el-form-item label="生产厂家" prop="manufact">
					<el-input v-model="addForm.manufact"></el-input>
				</el-form-item>
				<el-form-item label="模组类型" prop="modTypeCode">
                  <el-select :size="'mini'" v-model="editForm.modTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in modTypeCode"
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
				<el-form-item label="板高(px)" prop="height">
					<el-input v-model="addForm.height"></el-input>
				</el-form-item>
				<el-form-item label="板宽(px)" prop="width">
					<el-input v-model="addForm.width"></el-input>
				</el-form-item>
				<el-form-item label="ip" prop="commParam">
					<el-input v-model="addForm.commParam"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="commValue">
					<el-input v-model="addForm.commValue"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="建设期数" prop="project">
					<el-input v-model="addForm.project"></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
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
 getPageLedInfo,
  // batchRemoveUser,
 addLedInfo,
  editLedInfo,
  removeLedInfo,
  getDicInfoDob,
  getDicInfo,
  getRegionInfo,

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        ledId: "",
        ledName: "",
        project:"",
        purposeCode:"",
        ctrlTypeCode:"",
        regionId:""

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
       
      	  ledId: "",
      	  ledName:"",
      	  letterAbbr:"",
      	  directCode:"",
      	  deviceStatusCode:"",
      	  netMode:"",
      	  letterAddr:"",
      	  purposeCode:"",
      	  regionId:"",
      	  ctrlTypeCode:"",
      	  manageDept:"",
      	  manageId: "",
      	  manufact:"",
      	  modTypeCode:"",
      	  commModeCode:"",
      	  consTypeCode:"",
      	  height:"",
      	  width:"",
      	   commParam:"",
      	  commValue:"",
      	  company:"",
      	  project:"",
      	  coordX:"",
      	   coordY:"",
      	 

      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        ledId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        ledName: [
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

      	 ledId: "",
      	  ledName:"",
      	  letterAbbr:"",
      	  directCode:"",
      	  deviceStatusCode:"",
      	  netMode:"",
      	  letterAddr:"",
      	  purposeCode:"",
      	  regionId:"",
      	  ctrlTypeCode:"",
      	  manageDept:"",
      	  manageId: "",
      	  manufact:"",
      	  modTypeCode:"",
      	  commModeCode:"",
      	  consTypeCode:"",
      	  height:"",
      	  width:"",
      	   commParam:"",
      	  commValue:"",
      	  company:"",
      	  project:"",
      	  coordX:"",
      	   coordY:"",
      	 
      	 



      },
        purposeCode:[],
        directCode:[],
        commModeCode:[],
        deviceStatusCode:[],
        ctrlTypeCode:[],
        modTypeCode:[],
        regionId:[],
       
    };
  },
  methods: {
    // getPagePersonInfo() {
    //   let self = this;
    //   this.$http
    //     .get(
    //       "http://118.31.35.240:8081/ubms-server/Person/getPagePersonInfo.htm",
    //       { data: JSON.stringify({ currentPage: 3 }) }
    //     )
    //     .then(result => {
    //       self.total = result.body.resultList.total;
    //       console.log(this.total);
    //       if (result.status === 200) {
    //         this.newslist = result.body.resultList.rows;
    //         console.log(this.newslist);
    //       }
    //       err => console.log(err);
    //     });
    // },
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
      para.ledName = this.filters.ledName;
      para.ledId = this.filters.ledId;
      para.project = this.filters.project;
      para.purposeCode = this.filters.purposeCode;
      para.ctrlTypeCode = this.filters.ctrlTypeCode;
      para.regionId = this.filters.regionId;
      this.listLoading = true;
      getPageLedInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { ledId: row.ledId };
          console.log(para);
          removeLedInfo({ data: JSON.stringify(para) }).then(res => {
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
          ledId: "",
      	  ledName:"",
      	  letterAbbr:"",
      	  directCode:"",
      	  deviceStatusCode:"",
      	  netMode:"",
      	  letterAddr:"",
      	  purposeCode:"",
      	  regionId:"",
      	  ctrlTypeCode:"",
      	  manageDept:"",
      	  manageId: "",
      	  manufact:"",
      	  modTypeCode:"",
      	  commModeCode:"",
      	  consTypeCode:"",
      	  height:"",
      	  width:"",
      	   commParam:"",
      	  commValue:"",
      	  company:"",
      	  project:"",
      	  coordX:"",
      	   coordY:"",
      	 
      	 
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
            editLedInfo({ data: JSON.stringify(para) }).then(res => {
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
            addLedInfo({ data: JSON.stringify(para) }).then(res => {
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
         purposeCode=[],
         ctrlTypeCode=[],
         modTypeCode=[],
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
                 case "LEDPURPOSE":
               	purposeCode.push(item);
                break;
                case "LEDCTRLTYPE":
               	ctrlTypeCode.push(item);
                break;
                 case "LEDMODTYPE":
               	modTypeCode.push(item);
                break;
              default:
                break;
            }
          });
           this.deviceStatusCode=deviceStatusCode;
           this.devTypeCode=devTypeCode;
           this.commModeCode=commModeCode;
           this.purposeCode=purposeCode;
             this.ctrlTypeCode=ctrlTypeCode;
              this.modTypeCode=modTypeCode;
           
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
  },
  mounted() {
    this.getUsers();
    this.getDicInfoDob();
    this.getDicInfo();
    this.getRegionInfo();
  }
};
</script>

<style scoped>
</style>
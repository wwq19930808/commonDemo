<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.personName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.personId" placeholder="人号编码"></el-input>
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
			<el-table-column prop="personName" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="idCardNo" label="身份证号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="deptId" label="所属部门" width="120" sortable>
			</el-table-column>
			<el-table-column prop="policeRankName" label="警衔" width="120" sortable>
			</el-table-column>
			<el-table-column prop="compTypeName" label="编制类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="jobName" label="职务"  min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="postName" label="所在岗位"  min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="jobRankName" label="职级"  min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="sjld" label="上级领导"  min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="mobile" label="手机"  min-width="100" sortable>
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
			<el-form  :inline="true" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="人员编码" prop="personId">
					<el-input v-model="editForm.personId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="personName">
					<el-input v-model="editForm.personName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="警衔" prop="policeRankCode">
                  <el-select :size="'mini'" v-model="editForm.policeRankCode" placeholder="请选择">
                   <el-option
                      v-for="item in policeRankNames"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				
				</el-form-item>
				<el-form-item label="职务" prop="jobCode">
					<el-select :size="'mini'" v-model="editForm.jobCode" placeholder="请选择">
                   <el-option
                      v-for="item in jobName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="性别" prop="genderCode">
					<el-select :size="'mini'" v-model="editForm.genderCode" placeholder="请选择">
                   <el-option
                      v-for="item in gender"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>


				<el-form-item label="编制类型" prop="compTypeCode">
					<el-select :size="'mini'" v-model="editForm.compTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in compTypeName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>

				<el-form-item label="所在岗位" prop="postCode">
					<el-select :size="'mini'" v-model="editForm.postCode" placeholder="请选择">
                   <el-option
                      v-for="item in postName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				
				<el-form-item label="职级" prop="jobRankCode">
					<el-select :size="'mini'" v-model="editForm.jobRankCode" placeholder="请选择">
                   <el-option
                      v-for="item in jobRankName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="上级领导" prop="leader">
					<el-input v-model="editForm.leader"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idCardNo">
					<el-input v-model="editForm.idCardNo"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicCode">
					<el-input v-model="editForm.politicCode"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="editForm.mobile"></el-input>
				</el-form-item>

				
					<el-form-item label="民族" prop="nationCode">
					<el-select :size="'mini'" v-model="editForm.nationCode" placeholder="请选择">
                   <el-option
                      v-for="item in nationCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="家庭住址" prop="addr">
					<el-input v-model="editForm.addr"></el-input>
				</el-form-item>
				<el-form-item label="家庭电话" prop="homePhone">
					<el-input v-model="editForm.homePhone"></el-input>
				</el-form-item>
				<el-form-item label="工作电话" prop="workPhone">
					<el-input v-model="editForm.workPhone"></el-input>
				</el-form-item>
				<el-form-item label="入党/团">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.partyDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="参加工作">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.hireDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="入队日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.policeDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="任职日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.jobDay"></el-date-picker>
				</el-form-item>

				<el-form-item label="文化程度" prop="educationCode">
					<el-select :size="'mini'" v-model="editForm.educationCode" placeholder="请选择">
                   <el-option
                      v-for="item in educationCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>

				<el-form-item label="所学专业" prop="majorCode">
					<el-select :size="'mini'" v-model="editForm.majorCode" placeholder="请选择">
                   <el-option
                      v-for="item in majorCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
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
			<el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" width="193px">
				<el-form-item label="人员编码" prop="personId">
					<el-input v-model="addForm.personId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="personName">
					<el-input v-model="addForm.personName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="警衔" prop="policeRankCode">
                  <el-select :size="'mini'" v-model="addForm.policeRankCode" placeholder="请选择">
                   <el-option
                      v-for="item in policeRankNames"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				
				</el-form-item>
				<el-form-item label="职务" prop="jobCode">
					<el-select :size="'mini'" v-model="addForm.jobCode" placeholder="请选择">
                   <el-option
                      v-for="item in jobName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="性别" prop="genderCode">
					<el-select :size="'mini'" v-model="addForm.genderCode" placeholder="请选择">
                   <el-option
                      v-for="item in gender"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>


				<el-form-item label="编制类型" prop="compTypeCode">
					<el-select :size="'mini'" v-model="addForm.compTypeCode" placeholder="请选择">
                   <el-option
                      v-for="item in compTypeName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>

				<el-form-item label="所在岗位" prop="postCode">
					<el-select :size="'mini'" v-model="addForm.postCode" placeholder="请选择">
                   <el-option
                      v-for="item in postName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				
				<el-form-item label="职级" prop="jobRankCode">
					<el-select :size="'mini'" v-model="addForm.jobRankCode" placeholder="请选择">
                   <el-option
                      v-for="item in jobRankName"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="上级领导" prop="leader">
					<el-input v-model="addForm.leader"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idCardNo">
					<el-input v-model="addForm.idCardNo"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicCode">
					<el-input v-model="addForm.politicCode"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>

				
					<el-form-item label="民族" prop="nationCode">
					<el-select :size="'mini'" v-model="addForm.nationCode" placeholder="请选择">
                   <el-option
                      v-for="item in nationCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>
				<el-form-item label="家庭住址" prop="addr">
					<el-input v-model="addForm.addr"></el-input>
				</el-form-item>
				<el-form-item label="家庭电话" prop="homePhone">
					<el-input v-model="addForm.homePhone"></el-input>
				</el-form-item>
				<el-form-item label="工作电话" prop="workPhone">
					<el-input v-model="addForm.workPhone"></el-input>
				</el-form-item>
				<el-form-item label="入党/团">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.partyDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="参加工作">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.hireDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="入队日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.policeDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="任职日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.jobDay"></el-date-picker>
				</el-form-item>

				<el-form-item label="文化程度" prop="educationCode">
					<el-select :size="'mini'" v-model="addForm.educationCode" placeholder="请选择">
                   <el-option
                      v-for="item in educationCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
				</el-form-item>

				<el-form-item label="所学专业" prop="majorCode">
					<el-select :size="'mini'" v-model="addForm.majorCode" placeholder="请选择">
                   <el-option
                      v-for="item in majorCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
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
 getUserListPage,
  // batchRemoveUser,
  // editUser,
  // addUser,
  delPersonInfo,
  editPersonInfo,
  addPersonInfo,
  getSelectSource
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        personName: "",
        personId: ""
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
        personId: 0,
        personName: "",
        educationName: -1,
        //	age: 0,
        birthDay: "",
        addr: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        personId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        personName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        policeRankCode: [
          {
            required: false,
            message: "请输入内容",
            trigger: "blur"
          }
        ],

        idCardNo: [
          { required: false, message: "请输入内容", trigger: "blur" },
          {
            pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
            message: "请输入正确的身份证号"
          }
        ],
        deptId: [{ required: false, message: "请输入内容", trigger: "blur" }],
        compTypeName: [
          { required: false, message: "请输入内容", trigger: "blur" }
        ],
        jobName: [{ required: false, message: "请输入内容", trigger: "blur" }],
        postName: [{ required: false, message: "请输入内容", trigger: "blur" }],
        jobRankName: [
          { required: false, message: "请输入内容", trigger: "blur" }
        ],
        leader: [{ required: false, message: "请输入内容", trigger: "blur" }],
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
        personId: "",
        personName: "",
        idCardNo: "",
        deptId: "",
        policeRankName: "",
        compTypeName: "",
        jobName: "",
        postName: "",
        jobRankName: "",
        leader: "",
        gender:"",

        addr: "",
        birthDay: "",
        compTypeCode: "",
        compTypeValue: "",
        educationCode: "",
        educationName: "",
        educationValue: "",
        genderCode: "",
        genderName: "",
        genderValue: "",
        hireDay: "",
        jobCode: "",
        jobDay: "",
        jobRankCode: "",
        jobRankValue: "",
        jobValue: "",
        letterAbbr: "",
        majorCode: "",
        mobile: "",
        nationCode: "",
        nationName: "",
        nationValue: "",
        partyDay: "",
        policeDay: "",
        policeRankCode: "",
        policeRankValue: "",
        politicCode: "",
        politicName: "",
        politicValue: "",
        postCode: "",
        postValue: "",
        workPhone: ""
      },
      policeRankNames: [],
        jobName:[],
        gender:[],
        compTypeName:[],
        postName:[],
        jobRankName:[],
        nationCode:[],
        educationCode:[],
        majorCode:[],
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
      para.personName = this.filters.personName;
      para.personId = this.filters.personId;
      this.listLoading = true;
      getUserListPage({ data: JSON.stringify(para) }).then(res => {
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
          let para = { personId: row.personId };
          console.log(para);
          delPersonInfo({ data: JSON.stringify(para) }).then(res => {
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
        personId: "",
        personName: "",
        idCardNo: "",
        deptId: "",
        policeRankName: "",
        compTypeName: "",
        jobName: "",
        postName: "",
        jobRankName: "",
        leader: "",
        addr: "",
        birthDay: "",
        compTypeCode: "",
        compTypeValue: "",
        educationCode: "",
        educationName: "",
        educationValue: "",
        genderCode: "",
        genderName: "",
        genderValue: "",
        hireDay: "",
        jobCode: "",
        jobDay: "",
        jobRankCode: "",
        jobRankValue: "",
        jobValue: "",
        letterAbbr: "",
        majorCode: "",
        mobile: "",
        nationCode: "",
        nationName: "",
        nationValue: "",
        partyDay: "",
        policeDay: "",
        policeRankCode: "",
        policeRankValue: "",
        politicCode: "",
        politicName: "",
        politicValue: "",
        postCode: "",
        postValue: "",
        workPhone: ""
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
            editPersonInfo({ data: JSON.stringify(para) }).then(res => {
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
            addPersonInfo({ data: JSON.stringify(para) }).then(res => {
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

    getSelectSource: function() {
    //  let param = {
      //  parentCode: "PERSONRANK",
        // parentCode: "PERSONJOBRANK",
        
        // parentCode: "GENDER",
        // parentCode: "PERSONCOMPTYPE",
        // parentCode: "REGIONJOBTYPE",
        // parentCode: "PERSONLEVEL",
        // parentCode: "PERSONNATION",
         // parentCode: "PERSONEDU",
         // parentCode: "PERSONMAJOR"
        
     // };
      /*getSelectSource({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.policeRankNames = resp.data.resultList;
          // this.gender = resp.data.resultList;
          // this.compTypeName = resp.data.resultList;
          // this.postName = resp.data.resultList;
          // this.jobRankName = resp.data.resultList;
          // this.nationCode = resp.data.resultList;
         
           // this.educationCode = resp.data.resultList;
            // this.majorCode = resp.data.resultList;
         

        }
      });*/


      getSelectSource().then(resp => {
        let policeRankNames = [],
        	jobName=[],
        	gender=[],
        	compTypeName=[],
        	postName=[],
        	jobRankName=[],
        	nationCode=[],
        	educationCode=[],
        	majorCode=[];
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
              case "PERSONRANK":
                policeRankNames.push(item);
                break;
              case "PERSONJOBRANK":
               	jobName.push(item);
                break;
                case "GENDER":
               	gender.push(item);
                break;
              case "PERSONCOMPTYPE":
                compTypeName.push(item);
                break;
              case "REGIONJOBTYPE":
                postName.push(item);
                break;
              case "PERSONLEVEL":
                jobRankName.push(item);
                 break;
              case "PERSONNATION":
                nationCode.push(item);
                 break;
              case "PERSONEDU":
                educationCode.push(item);
                 break;
              case "PERSONMAJOR":
                majorCode.push(item);
                break;
              default:
                break;
            }
          });
           this.policeRankNames=policeRankNames;
           	this.jobName=jobName;
           	this.gender=gender;
           	this.compTypeName=compTypeName;
           	this.postName=postName;
           	this.jobRankName=jobRankName;
           	this.nationCode=nationCode;
           	this.educationCode=educationCode;
           	this.majorCode=majorCode;
           	console.log(this);
        }
      });
    
    }
  },
  mounted() {
    this.getUsers();
    this.getSelectSource();
  }
};
</script>

<style scoped>

</style>
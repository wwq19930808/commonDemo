<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.offsiteId" placeholder="点位编号"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.offsiteName" placeholder="点位名称"></el-input>
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
			<el-table-column prop="offsiteId" label="点位编号" width="130" sortable>
			</el-table-column>
			<el-table-column prop="offsiteName" label="点位名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="offsiteIdDirect" label="方向编码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="vioPlace" label="违法地点编码" width="140" sortable>
			</el-table-column>
			<el-table-column prop="purposeName" label="按用途分类" width="130" sortable>
			</el-table-column>
			<el-table-column prop="sceneName" label="按使用场景分类" width="160" sortable>
			</el-table-column>
			<el-table-column prop="theoryName" label="按原理分类" width="130" sortable>
			</el-table-column>
			<el-table-column prop="pixelName" label="按像素分类" width="130" sortable>
			</el-table-column>
			<el-table-column prop="ctrlDevName" label="按主控设备分类" width="160" sortable>
			</el-table-column>
			<el-table-column prop="position" label="安装位置" min-width="120" sortable>
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
				<el-form-item label="点位编码" prop="offsiteId">
					<el-input v-model="editForm.offsiteId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="点位名称" prop="offsiteName">
					<el-input v-model="editForm.offsiteName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="无向编码" prop="offsiteIdNoDirect">
					<el-input v-model="editForm.offsiteIdNoDirect"></el-input>
				</el-form-item>
				<el-form-item label="方向编码" prop="directCode">
                  <el-select :size="'mini'" v-model="editForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
					
				<el-form-item label="有向编码" prop="offsiteIdDirect">
					<el-input v-model="editForm.offsiteIdDirect"></el-input>
				</el-form-item>
				<el-form-item label="点位简称" prop="offsiteNameShort">
					<el-input v-model="editForm.offsiteNameShort"></el-input>
				</el-form-item>
				<el-form-item label="违法地码" prop="vioPlace">
					<el-input v-model="editForm.vioPlace"></el-input>
				</el-form-item>
				<el-form-item label="用途分类" prop="purposeCode">
                  <el-select :size="'mini'" v-model="editForm.purposeCode" placeholder="请选择">
                   <el-option
                      v-for="item in purposeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="场景分类" prop="sceneCode">
                  <el-select :size="'mini'" v-model="editForm.sceneCode" placeholder="请选择">
                   <el-option
                      v-for="item in sceneCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="原理分类" prop="theoryCode">
                  <el-select :size="'mini'" v-model="editForm.theoryCode" placeholder="请选择">
                   <el-option
                      v-for="item in theoryCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="像素分类" prop="pixelCode">
                  <el-select :size="'mini'" v-model="editForm.pixelCode" placeholder="请选择">
                   <el-option
                      v-for="item in pixelCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				 <el-form-item label="类型分类" prop="ctrlDevCode">
                  <el-select :size="'mini'" v-model="editForm.ctrlDevCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlDevCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="editForm.coordX"></el-input>
				</el-form-item>
					<el-form-item label="建设单位" prop="company">
					<el-input v-model="editForm.company"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="position">
					<el-input v-model="editForm.position"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="editForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="editForm.manageId"></el-input>
				</el-form-item>
				 <el-form-item label="区域编码" prop="regionId">
                  <el-select :size="'mini'" v-model="editForm.regionId" placeholder="请选择">
                   <el-option
                       v-for="item in regionId"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionId">
                   </el-option>
               </el-select>
               </el-form-item>
				 <el-form-item label="道路编码" prop="roadId">
          <el-select :size="'mini'" v-model="editForm.roadId" placeholder="请选择">
                   <el-option
                      v-for="item in roadId"
                      :key="item.roadId"
                      :label="item.roadName"
                      :value="item.roadId">
                   </el-option>
               </el-select>
        </el-form-item>
				  <el-form-item label="路段编码" prop="blockId">
                  <el-select :size="'mini'" v-model="editForm.blockId" placeholder="请选择">
                   <el-option
                       v-for="item in blockId"
                      :key="item.blockId"
                      :label="item.blockName"
                      :value="item.blockId">
                   </el-option>
               </el-select>
               </el-form-item>
					<el-form-item label="建设项目" prop="project">
					<el-input v-model="editForm.project" ></el-input>
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
				<el-form-item label="点位编码" prop="offsiteId">
					<el-input v-model="addForm.offsiteId" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item label="点位名称" prop="offsiteName">
					<el-input v-model="addForm.offsiteName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="无向编码" prop="offsiteIdNoDirect">
					<el-input v-model="addForm.offsiteIdNoDirect"></el-input>
				</el-form-item>
				<el-form-item label="方向编码" prop="directCode">
                  <el-select :size="'mini'" v-model="addForm.directCode" placeholder="请选择">
                   <el-option
                      v-for="item in directCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
					
				<el-form-item label="有向编码" prop="offsiteIdDirect">
					<el-input v-model="addForm.offsiteIdDirect"></el-input>
				</el-form-item>
				<el-form-item label="点位简称" prop="offsiteNameShort">
					<el-input v-model="addForm.offsiteNameShort"></el-input>
				</el-form-item>
				<el-form-item label="违法地码" prop="vioPlace">
					<el-input v-model="addForm.vioPlace"></el-input>
				</el-form-item>
				<el-form-item label="用途分类" prop="purposeCode">
                  <el-select :size="'mini'" v-model="addForm.purposeCode" placeholder="请选择">
                   <el-option
                      v-for="item in purposeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="场景分类" prop="sceneCode">
                  <el-select :size="'mini'" v-model="addForm.sceneCode" placeholder="请选择">
                   <el-option
                      v-for="item in sceneCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="原理分类" prop="theoryCode">
                  <el-select :size="'mini'" v-model="addForm.theoryCode" placeholder="请选择">
                   <el-option
                      v-for="item in theoryCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="像素分类" prop="pixelCode">
                  <el-select :size="'mini'" v-model="addForm.pixelCode" placeholder="请选择">
                   <el-option
                      v-for="item in pixelCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				 <el-form-item label="类型分类" prop="ctrlDevCode">
                  <el-select :size="'mini'" v-model="addForm.ctrlDevCode" placeholder="请选择">
                   <el-option
                      v-for="item in ctrlDevCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
				</el-form-item>
					<el-form-item label="建设单位" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="position">
					<el-input v-model="addForm.position"></el-input>
				</el-form-item>
				<el-form-item label="管理部门" prop="manageDept">
					<el-input v-model="addForm.manageDept"></el-input>
				</el-form-item>
				<el-form-item label="管理编码" prop="manageId">
					<el-input v-model="addForm.manageId"></el-input>
				</el-form-item>
          <el-form-item label="区域编码" prop="regionId">
                  <el-select :size="'mini'" v-model="addForm.regionId" placeholder="请选择">
                   <el-option
                       v-for="item in regionId"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionId">
                   </el-option>
               </el-select>
               </el-form-item>
         <el-form-item label="道路编码" prop="roadId">
          <el-select :size="'mini'" v-model="addForm.roadId" placeholder="请选择">
                   <el-option
                      v-for="item in roadId"
                      :key="item.roadId"
                      :label="item.roadName"
                      :value="item.roadId">
                   </el-option>
               </el-select>
        </el-form-item>
         <el-form-item label="路段编码" prop="blockId">
                  <el-select :size="'mini'" v-model="addForm.blockId" placeholder="请选择">
                   <el-option
                       v-for="item in blockId"
                      :key="item.blockId"
                      :label="item.blockName"
                      :value="item.blockId">
                   </el-option>
               </el-select>
               </el-form-item>
					<el-form-item label="建设项目" prop="project">
					<el-input v-model="addForm.project" ></el-input>
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
 getPageOffsiteInfo,
  // batchRemoveUser,
 addOffsiteInfo,
  editOffsiteInfo,
  removeOffsiteInfo,
  getDicInfoDob,
  getDicInfo,
  getRegionInfo,
  getRoadInfo,
  getBlockInfo,

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        offsiteId: "",
        offsiteName: "",

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
        offsiteId: "",
      	  offsiteName:"",
      	  letterAbbr:"",
      	  offsiteIdNoDirect	:"",
      	  directCode:"",
      	  offsiteIdDirect:"",
      	  offsiteNameShort:"",
      	  vioPlace:"",
      	  purposeCode:"",
      	  sceneCode:"",
      	  theoryCode:"",
      	 pixelCode:"",
      	 ctrlDevCode:"",
      	 coordX:"",
      	 coordY:"",
      	 company:"",
      	 position:"",
      	 manageDept:"",
      	 regionId:"",
      	 manageId:"",
      	 roadId:"",
      	 blockId:"",
      	 project:"",


      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        offsiteId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        offsiteName: [
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
        offsiteIdNoDirect: [{ required: true, message: "请输入内容", trigger: "blur" }],
        directCode: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        offsiteIdDirect: [{ required: true, message: "请输入内容", trigger: "blur" }],
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

      	 offsiteId: "",
      	  offsiteName:"",
      	  letterAbbr:"",
      	  offsiteIdNoDirect	:"",
      	  directCode:"",
      	  offsiteIdDirect:"",
      	  offsiteNameShort:"",
      	  vioPlace:"",
      	  purposeCode:"",
      	  sceneCode:"",
      	  theoryCode:"",
      	 pixelCode:"",
      	 ctrlDevCode:"",
      	 coordX:"",
      	 coordY:"",
      	 company:"",
      	 position:"",
      	 manageDept:"",
      	 regionId:"",
      	 manageId:"",
      	 roadId:"",
      	 blockId:"",
      	 project:"",




      },
       
        purposeCode:[],
        devTypeCode:[],
        sceneCode:[],
        theoryCode:[],
        pixelCode:[],
        ctrlDevCode:[],
        directCode:[],
        roadId:[],
        blockId:[],
        regionId:[],
       
       
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
      para.offsiteName = this.filters.offsiteName;
      para.offsiteId = this.filters.offsiteId;
      this.listLoading = true;
      getPageOffsiteInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { offsiteId: row.offsiteId };
          console.log(para);
          removeOffsiteInfo({ data: JSON.stringify(para) }).then(res => {
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
         offsiteId: "",
      	  offsiteName:"",
      	  letterAbbr:"",
      	  offsiteIdNoDirect	:"",
      	  directCode:"",
      	  offsiteIdDirect:"",
      	  offsiteNameShort:"",
      	  vioPlace:"",
      	  purposeCode:"",
      	  sceneCode:"",
      	  theoryCode:"",
      	 pixelCode:"",
      	 ctrlDevCode:"",
      	 coordX:"",
      	 coordY:"",
      	 company:"",
      	 position:"",
      	 manageDept:"",
      	 regionId:"",
      	 manageId:"",
      	 roadId:"",
      	 blockId:"",
      	 project:"",

      	 
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
            editOffsiteInfo({ data: JSON.stringify(para) }).then(res => {
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
            addOffsiteInfo({ data: JSON.stringify(para) }).then(res => {
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
        let directCode = [],
            sceneCode = [],
             theoryCode = [],
             pixelCode = [],
              ctrlDevCode = [],
            purposeCode=[];
       
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
              case "ROADDIRECT":
                directCode.push(item);
                break;
                case "OFFSITEPURPOSE":
               	purposeCode.push(item);
                break;
                case "OFFSITESCENE":
               	sceneCode.push(item);
                break;
                case "OFFSITETHEORY":
               	theoryCode.push(item);
                break;
                 case "OFFSITEPIX":
               	pixelCode.push(item);
                break;
                  case "OFFSITECTRLDEV":
               	ctrlDevCode.push(item);
                break;
              default:
                break;
            }
          });
           this.directCode=directCode;
              this.purposeCode=purposeCode;
               this.sceneCode=sceneCode;
           	 this.theoryCode=theoryCode;
           	 this.pixelCode=pixelCode;
           	 this.ctrlDevCode=ctrlDevCode;
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
     getRoadInfo: function() {
     let param = {
       roadId: "",
       
        
     };
      getRoadInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.roadId = resp.data.resultList;
         

        }
      });


   },
    getBlockInfo: function() {
         let param = {
         
           blockId:"",

      };
      getBlockInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
          this.blockId = resp.data.resultList;
           

        }
      });
    
    },
   
  },
  mounted() {
    this.getUsers();
    this.getDicInfo();
    this.getRegionInfo();
    this.getRoadInfo();
    this.getBlockInfo();
  }
};
</script>

<style scoped>
</style>
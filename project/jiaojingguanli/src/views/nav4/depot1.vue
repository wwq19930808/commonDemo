<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.parkId" placeholder="停车场编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.parkName" placeholder="停车场名称"></el-input>
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
			<el-table-column prop="parkId" label="停车场编码" width="130" sortable>
			</el-table-column>
			<el-table-column prop="parkName" label="停车场名称" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="regionName" label="行政区域" width="120" sortable>
			</el-table-column>
			<el-table-column prop="vehTypeName" label="车辆类型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="parkTypeName" label="停车场类型" width="130" sortable>
			</el-table-column>
			<el-table-column prop="parkClassName" label="停车场分类" width="130" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="停车场地址" width="130" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="停车场电话" width="130" sortable>
			</el-table-column>
			<el-table-column prop="carPortAmount" label="停车场总数" width="130" sortable>
			</el-table-column>
			<el-table-column prop="servIntervalName" label="服务时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="openTime" label="开放时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="closeTime" label="关闭时间" min-width="120" sortable>
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
				<el-form-item label="停车场编码" prop="parkId">
					<el-input v-model="editForm.parkId" ></el-input>
				</el-form-item>
				<el-form-item label="停车场名称" prop="parkName">
				   <el-input v-model="editForm.parkName" ></el-input>
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
               <el-form-item label="所在部门" prop="deptId">
                  <el-select :size="'mini'" v-model="editForm.deptId" placeholder="请选择">
                   <el-option
                       v-for="item in deptId"
                      :key="item.deptId"
                      :label="item.deptName"
                      :value="item.deptId">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="车辆类型" prop="vehTypeCode">
                  <el-select :size="'mini'" v-model="editForm.vehTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in vehTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				 <el-form-item label="停车场分类" prop="parkClassCode">
                  <el-select :size="'mini'" v-model="editForm.parkClassCode" placeholder="请选择">
                   <el-option
                       v-for="item in parkClassCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="停车场地址" prop="addr">
					<el-input v-model="editForm.addr" ></el-input>
				</el-form-item>
				<el-form-item label="停车场电话" prop="phone">
				   <el-input v-model="editForm.phone" ></el-input>
				</el-form-item>
				<el-form-item label="停车位总数" prop="carPortAmount">
					<el-input v-model="editForm.carPortAmount"></el-input>
				</el-form-item>
				<el-form-item label="服务时间" prop="servIntervalCode">
                  <el-select :size="'mini'" v-model="editForm.servIntervalCode" placeholder="请选择">
                   <el-option
                       v-for="item in servIntervalCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               	<el-form-item  label="开放时间" prop="openTime">
                <el-time-picker
                      	 format="'HH:mm'"
                         v-model="editForm.openTime"
                         arrow-control="true"
                       >
                </el-time-picker>
               </el-form-item>
					<el-form-item  label="关闭时间" prop="closeTime">
                <el-time-picker
                      
                         v-model="editForm.closeTime"
                         arrow-control="true"
                       >
                </el-time-picker>
               </el-form-item>
				<el-form-item label="白天价格" prop="dayPrice">
					<el-input v-model="editForm.dayPrice" ></el-input>
				</el-form-item>
				<el-form-item label="晚上价格" prop="nightPrice">
				   <el-input v-model="editForm.nightPrice" ></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="editForm.coordX"></el-input>
				</el-form-item>
				<el-form-item label="计费方式" prop="chargeCode">
                  <el-select :size="'mini'" v-model="editForm.chargeCode" placeholder="请选择">
                   <el-option
                       v-for="item in chargeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="付费方式" prop="payCode">
                  <el-select :size="'mini'" v-model="editForm.payCode" placeholder="请选择">
                   <el-option
                       v-for="item in payCode"
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
			<el-form  :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="停车场编码" prop="parkId">
					<el-input v-model="addForm.parkId" ></el-input>
				</el-form-item>
				<el-form-item label="停车场名称" prop="parkName">
				   <el-input v-model="addForm.parkName" ></el-input>
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
               <el-form-item label="所在部门" prop="deptId">
                  <el-select :size="'mini'" v-model="addForm.deptId" placeholder="请选择">
                   <el-option
                       v-for="item in deptId"
                      :key="item.deptId"
                      :label="item.deptName"
                      :value="item.deptId">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="车辆类型" prop="vehTypeCode">
                  <el-select :size="'mini'" v-model="addForm.vehTypeCode" placeholder="请选择">
                   <el-option
                       v-for="item in vehTypeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				 <el-form-item label="停车场分类" prop="parkClassCode">
                  <el-select :size="'mini'" v-model="addForm.parkClassCode" placeholder="请选择">
                   <el-option
                       v-for="item in parkClassCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
				<el-form-item label="停车场地址" prop="addr">
					<el-input v-model="addForm.addr" ></el-input>
				</el-form-item>
				<el-form-item label="停车场电话" prop="phone">
				   <el-input v-model="addForm.phone" ></el-input>
				</el-form-item>
				<el-form-item label="停车位总数" prop="carPortAmount">
					<el-input v-model="addForm.carPortAmount"></el-input>
				</el-form-item>
				<el-form-item label="服务时间" prop="servIntervalCode">
                  <el-select :size="'mini'" v-model="addForm.servIntervalCode" placeholder="请选择">
                   <el-option
                       v-for="item in servIntervalCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item >
             <!--   <el-time-select
                          v-model="addForm.openTime"
                       	  arrow-control="true"
                          >
                </el-time-select> -->
               	<el-form-item  label="开放时间" prop="openTime">
                <el-time-picker
                      		
                         v-model="addForm.openTime"
                         arrow-control="true"
                       >
                </el-time-picker>
               </el-form-item>
					<el-form-item  label="关闭时间" prop="closeTime">
                <el-time-picker
                      
                         v-model="addForm.closeTime"
                         arrow-control="true"
                       >
                </el-time-picker>
               </el-form-item>
				<el-form-item label="白天价格" prop="dayPrice">
					<el-input v-model="addForm.dayPrice" ></el-input>
				</el-form-item>
				<el-form-item label="晚上价格" prop="nightPrice">
				   <el-input v-model="addForm.nightPrice" ></el-input>
				</el-form-item>
				<el-form-item label="所在位置" prop="coordX">
					<el-input v-model="addForm.coordX"></el-input>
				</el-form-item>
				<el-form-item label="计费方式" prop="chargeCode">
                  <el-select :size="'mini'" v-model="addForm.chargeCode" placeholder="请选择">
                   <el-option
                       v-for="item in chargeCode"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                   </el-option>
               </el-select>
               </el-form-item>
               <el-form-item label="付费方式" prop="payCode">
                  <el-select :size="'mini'" v-model="addForm.payCode" placeholder="请选择">
                   <el-option
                       v-for="item in payCode"
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
 getPageParkInfo,
  // batchRemoveUser,
 addParkInfo,
  editParkInfo,
  removeParkInfo,
  getDicInfo,
  getRegionInfo,
  getDeptInfo,

} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        parkId: "",
        parkName:"",
        regionId:"",
        
     

      },
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      newslist: [], //接受后台数据
      currentPage: 1,
      pagesize: 10,
      parkTypeCode:"PARKTYPE01",


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
        parkId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        parkName: [
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
        dept: [{ required: true, message: "请输入内容", trigger: "blur" }],
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

        
        regionId:[],
        deptId:[],
        vehTypeCode:[],
        parkClassCode:[],
        servIntervalCode:[],
        chargeCode:[],
        payCode:[],
       


      
       
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
       para.parkTypeCode = this.parkTypeCode;
      para.parkName = this.filters.parkName;
      para.parkId = this.filters.parkId;
      para.regionId = this.filters.regionId;
      this.listLoading = true;

      getPageParkInfo({ data: JSON.stringify(para) }).then(res => {
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
          let para = { parkId: row.parkId };
          console.log(para);
          removeParkInfo({ data: JSON.stringify(para) }).then(res => {
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
            editParkInfo({ data: JSON.stringify(para) }).then(res => {
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
            addParkInfo({ data: JSON.stringify(para) }).then(res => {
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
        let 
        vehTypeCode=[],
         parkClassCode=[],
         chargeCode=[],
         payCode=[],
        servIntervalCode=[];
       			
        if ((resp.status = 200 && !!resp.data)) {
          resp.data.resultList.map((item, index) => {
            switch (item.parentCode) {
                case "PARKVEHTYPE":
               	vehTypeCode.push(item);
                break;
                 case "PARKCLASS":
               	parkClassCode.push(item);
                break;
              	 case "PARKSERVTIME":
               	servIntervalCode.push(item);
                break;
                  case "PARKCHARGE":
               	chargeCode.push(item);
                break;
              	 case "PARKPAY":
               	payCode.push(item);
                break;
                  
              default:
                break;
            }
          });
           this.vehTypeCode=vehTypeCode;
            this.parkClassCode=parkClassCode;
            this.servIntervalCode=servIntervalCode;
             this.chargeCode=chargeCode;
            this.payCode=payCode;
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
     getDeptInfo: function() {
         let param = {
            deptId:"",
      };
      getDeptInfo({ data: JSON.stringify(param) }).then(resp => {
        console.log(resp);
        if ((resp.status = 200 && !!resp.data)) {
            this.deptId = resp.data.resultList;
           

        }
      });
    
    },
    
    
  },
  mounted() {
    this.getUsers();
     this.getDicInfo();
    this.getRegionInfo();
    this.getDeptInfo();

  }
};
</script>

<style scoped>
</style>
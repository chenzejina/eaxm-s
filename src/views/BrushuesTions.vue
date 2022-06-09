<template>
  <div>
    <creat-task @user="onSubmit" :options="options"></creat-task>
     <el-dialog 
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    > 
    <div>
      <p>
      <span>提示</span>
      </p>
      <p  >是否查看任務列表</p>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="routerList">查看任務列表</el-button>
        <el-button type="primary" @click="chaungjian"
          >
          繼續創建</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createTesk,releaseTask,userList} from '@/api/api';
export default {
  data() {
    return {
      dialogVisible:false, 
      options:[]
    };
  },
  created(){
    userList({ pagination: false }).then((res) => { 
      this.options = res.data.data.data.rows; 
    });
  },
  methods: {
    onSubmit(form) {
      this.dialogVisible=true
      createTesk({
        name: form.name,
        desc: form.desc,
        duration: form.tiem,
        level: form.delivery,
      }).then((res) => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: "創建成功",
          });
          this.dialogVisible = true;
          this.id = res.data.data[0].id;
          releaseTask({
            userId: this.value1,
            taskId: this.id,
          }).then((res) => {
            console.log(res);
          });
        }
      });
    }, 
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(() => {});
      } , 
    chaungjian(){
      this.dialogVisible=false
      this.form.name=''
      this.form.tiem=''
      this.form.region=''
      this.form.desc=''
      this.form.delivery=false
      this.value1=[]
    },
    routerList(){
      this.$router.push({
        name:'list', 
      })
    },
  }, 
};
</script>


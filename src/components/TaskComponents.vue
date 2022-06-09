<template>
  <div>
    <h1>創建任務</h1>
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="lable" label="任務名稱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="lable" label="任务时长">
          <el-input v-model="form.duration" class="inp"></el-input>
          <span>小時</span>
        </el-form-item>

        <el-form-item label="任務説明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <div>
          <label for="" class="label">執行人</label>
          <el-select v-model="value1" multiple placeholder="请选择" class="sec">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <el-form-item label="重要通知">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

 <script> 
export default {
  props: ["asdf",'options'],
  data() {
    return {
      form: {
        name: "",
        duration: "",
        id: "",
        delivery: false,
        desc: "",
      },    
      dialogVisible: false, 
      id: "",
      value1:[], 
    };
  },
  created() { 
    if (this.asdf) {
      this.form.name = this.asdf.taskName;
      this.form.desc = this.asdf.desc;
      this.form.duration = this.asdf.isReceived;
      this.form.delivery = this.asdf.level== 1 ? true : false;
      this.form.id = this.asdf.id; 
    console.log(this.options);
    } 
  },
  watch: {
    asdf: function () {
      this.form.name = this.asdf.taskName;
      this.form.desc = this.asdf.desc;
      this.form.duration = this.asdf.isReceived;
      this.form.delivery = this.asdf.level == 1 ? true : false;
      this.form.id = this.asdf.id; 
    },
  },
  methods: {
    clear(){
      this.value1=[]
    },
    onSubmit() {
      this.$emit("user", this.form,this.value1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }, 
  },
  
};
</script>
<style lang="scss" scope>
.box {
  display: flex;
}
.inp {
  width: 50px;
}
.label {
  margin: 20px;
}
</style>
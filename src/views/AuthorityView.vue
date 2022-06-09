<template>
  <div>
    <el-container>
      <el-header class="header">
        <p>
          <img src="@/assets/role.png" alt="" class="icon-role" />
        </p>
        <p>角色管理</p>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div>
            <el-link type="primary" class="pd" @click="rouderole"
              >新增角色</el-link
            >
            <el-link type="primary" class="pd-5">新建分組</el-link>
          </div>

          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu
                  :index="index + ''"
                  v-for="(item, index) in newList"
                  :key="item.id"
                >
                  <template slot="title">
                    <span>{{ item.label }}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="(el, index) in item.children">
                      <el-menu-item :index="index + '-' + index" :key="index">{{
                        el.roleName
                      }}</el-menu-item>
                    </template>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div class="text">
            <p class="text-1">所有者</p>
            <p class="text-2">
              系统默认角色，默认具有企业所有功能权限和全部数据可见范围
            </p>
          </div>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="角色成员" name="first">
                <div class="pd-l">
                  <div class="justcont-between">
                    <div class="justcont">
                      <p>小千金</p>
                      <img src="@/assets/member.png" alt="" class="" />
                    </div>
                    <div>
                      <el-link icon="el-icon-user-solid">已离职成员</el-link>
                      <el-link icon="el-icon-user-solid"
                        >邀请成员加入本组织</el-link
                      >
                    </div>
                  </div>
                  <div class="justcont-between">
                    <div class="outer">
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动区域">
                          <el-select
                            v-model="form.region"
                            placeholder="请选择活动区域"
                          >
                            <el-option
                              label="区域一"
                              value="shanghai"
                            ></el-option>
                            <el-option
                              label="区域二"
                              value="beijing"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div>
                      <el-button type="primary">+ 添加成员</el-button>
                      <el-button plain>批量导入/导出</el-button>
                      <el-button plain>变更部门</el-button>
                      <el-button type="danger" plain>操作离职</el-button>
                    </div>
                  </div>
                  <div>
                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="date" label="日期" width="180">
                      </el-table-column>
                      <el-table-column prop="name" label="姓名" width="180">
                      </el-table-column>
                      <el-table-column prop="address" label="地址">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="功能权限" name="second">
                <div>
                  <choose-node></choose-node>
                </div>
              </el-tab-pane>
              <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import chooseNode from "@/components/ChooseElace.vue";
import { roleGroupList, roleEntry } from "@/api/api";
export default {
  components: {
    chooseNode,
  },
  data() {
    return {
      activeName: "second",
      newList: [],
      a: [],
      form: {
        region: "",
      },
      data: [
        {
          label: "默認",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  async created() {
    let [grouplist, rolelist] = await Promise.all([
      roleGroupList({ pagination: false }),
      roleEntry({ pagination: false }),
    ]);
    rolelist = rolelist.data.data.rows;
    grouplist = grouplist.data.data.rows;
    console.log(rolelist);
    console.log(grouplist);

    grouplist.forEach((group) => {
      var children = rolelist.filter((item) => {
        if (item.groupId == group.id) {
          return item;
        }
      });
      this.newList.push({
        label: group.groupName,
        children: children,
      });
    });
    console.log(this.newList);
  },
  methods: {
    rouderole() {
      this.$router.push({
        name: "newrole",
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.icon-role {
  width: 45px;
}
.el-tree-node__content {
  padding: 20px;
}
.text {
  display: flex;
}
.text-1 {
  font-size: 25px;
  line-height: 5px;
  color: #b39d9d;
}
.text-2 {
  font-size: 16px;
  line-height: 30px;
  color: #ccc;
}
.outer {
  margin-top: 20px;
}
::deep .el-col {
  height: calc(100vh - 60px);
}
</style>
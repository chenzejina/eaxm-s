<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header alitem">
          <div class="title alitem">
            <div class="logo alitem mrt-20">
              <img src="../assets/logo.png" alt="" class="icon-logo" />
              <p class="logo-text coanrf">现代学徒云平台</p>
            </div>
          </div>
          <div class="userinfo">
            <div class="text whit">
              山西省 2022-4-28 星期三 21~22℃ 晴 风力 112级 风向 无持续风向微风
            </div>
            <div class="cent mrt-20">
              <img src="../assets/icon_avatar.png" alt="" class="icon-head" />
              <p>
                hi，<span>{{ phone }}</span>
              </p>
            </div>
            <div class="shutdown cent mrt">
              <img src="../assets/shutdown.png" alt="" />
              <p @click="signout()">退出</p>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0b1b34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu 
              v-for="(item, index) in from"
              :key="index" 
              :index="index+''" 
            >
              <template slot="title"   >
                <i class="el-icon-location"></i>
                <span   @click="navigator(item.path)">{{item.lable}}</span>
              </template>
              <el-menu-item-group  v-for="(chil,i) in item.children"  :key="i" >
                <el-menu-item v-if="item.children"   @click="navigator(chil.path)" :index="index-i+''" >{{chil.lable}}</el-menu-item>
              </el-menu-item-group> 
            </el-submenu> 
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfoApi, logOutApi } from "@/api/api";
export default {
  name: "HomeView",
  created() {
    this.renInfo();
  },
  data() {
    return {
      phone: "",
      from: [
        {
          lable: "题库系统",
          path: "bank",
          children: [
            {
              lable: "题库类型",
              path: "question",
            },
            {
              lable: "js题库",
              path: "examination",
            },
          ],
        },
        {
          lable: "匹配比赛",
          path: "match",
        },
        {
          lable: "任务系统",
          path: "enlist",
          children: [
            {
              lable: "創建任務",
              path: "brush",
            },
            {
              lable: "任務列表",
              path: "list",
            },
            {
              lable: "任務列表详情",
              path: "task",
            },
          ],
        },
        {
          lable: "账号设置",
          children: [
            {
              lable: "个人信息",
              path: "personal",
            },
            {
              lable: "用戶信息",
              path: "information",
            },
            {
              lable: "任務列表详情",
              path: "details",
            },
          ],
        },
        {
          lable: "權限管理",
          path: "authority",
        },
        {
          lable: "新增角色",
          path: "newrole",
        },
      ],
    };
  },
  methods: {
    async renInfo() {
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.phone = res.data.data.phone;
      }
    },
    async signout() {
      let res = await logOutApi();
      if (res.data.status != 1) return;
      sessionStorage.setItem("token", "");
      this.$router.push({
        name: "logo",
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      console.log(name);
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style  lang="scss" scoped>
.el-header {
  background-color: #367fee;
  color: #fff;
}
.userinfo {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .mrt {
    margin-right: 50px;
  }
}
.container {
  height: calc(100vh - 60px);
}
.aside {
  background-color: #0b1b34;
}
.cent {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.conte {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.icon-head {
  width: 30px;
}
.el-main {
  padding: 0;
}
</style>

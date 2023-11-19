<template lang="">
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="查询手机信息">
        <div class="title"></div>
        <el-input placeholder="请输入电话号码" v-model="phone"></el-input>
        <el-button @click="getMobileCodeInfo">查询</el-button>
        <div class="result" v-show="data">{{ this.data }}</div>
      </el-tab-pane>
      <el-tab-pane label="获取所有手机服务区域">
        <el-table :data="result" stripe style="width: 100%">
          <el-table-column prop="province" label="省份" width="350">
          </el-table-column>
          <el-table-column prop="city" label="城市"> </el-table-column>
          <el-table-column prop="count" label="总数">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      result: "",
      data: "",
    };
  },
  methods: {
    // 获取所有地区数据
    async getDatabaseInfo() {
      await this.$http
        .get("/api/WebServices/MobileCodeWS.asmx/getDatabaseInfo")
        .then((res) => {
          console.log(res);
          this.result = res.data
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\r?\n/g, " ");

          // 封装为对象数组
          const lines = this.result.trim().split(" ");
          const result = [];
          for (let i = 0; i < lines.length; i += 3) {
            const province = lines[i];
            const city = lines[i + 1];
            const count = lines[i + 2];
            result.push({ province, city, count });
            i += 2;
          }
          this.result = result;
          this.result = this.result.slice(1);
          console.log(this.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 根据号码查询
    async getMobileCodeInfo() {
      this.$http
        .get("/api/WebServices/MobileCodeWS.asmx/getMobileCodeInfo", {
          headers: {
            "Content-Type": "text/xml",
          },
          params: {
            mobileCode: this.phone,
            userID: "",
          },
        })
        .then((response) => {
          // 处理响应数据
          this.data = response.data.match(/<string[^>]*>(.*?)<\/string>/)[1];
          console.log(this.data);
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
    },
  },
  mounted() {
    this.getDatabaseInfo();
  },
};
</script>
<style lang="scss" scoped>
.el-tabs {
  width: 800px;
  margin: auto;
  margin-top: 50px;
}

.el-input {
  width: 500px;
  margin-top: 30px;
}
.el-button {
  margin-left: 10px;
}
.result {
  margin-top: 30px;
}
</style>

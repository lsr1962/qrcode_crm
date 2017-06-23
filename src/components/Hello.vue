<template>
  <el-form label-width="80px">
    <el-table
      :data="list"
      border
      style="width: 100%;text-align: left;">

      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="current"
        label="开户数">
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  created () {
    this.getNamelist()
  },
  data () {
    return {
      list: [
        {'name': '骆书林', 'major': '自动化', 'current': 6},
        {'name': '陈树淘', 'major': '工商管理', 'current': 2},
        {'name': '吴允阳', 'major': '计算机科学与技术', 'current': 1}],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getNamelist () {
      axios.get('/getNamelist').then((response) => {
        this.list = response.data.list
      }).catch((response) => {
        this.$message.error('失败!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

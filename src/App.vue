<template>
  <div id="app">
   <div class="top">
     <h1><i class="el-icon-star-on"></i>简易版低代码平台<i class="el-icon-star-on"></i></h1>
   </div>
   
    <div class="bbox">
      
      <div class="left">
        <h2>菜单栏</h2>
        <div class="box">
       <el-button plain>朴素按钮</el-button>
       <el-button type="primary" plain>主要按钮</el-button>
       <el-button type="success" plain>成功按钮</el-button>
       <el-button type="info" plain>信息按钮</el-button>
       <el-button type="warning" plain>警告按钮</el-button>
       <el-button type="danger" plain>危险按钮</el-button>
       </div>
      </div>

    <div class="center">
      <h2>页面预览</h2>
    </div>
   </div>
  </div>
</template>

<style lang="less">

#app{
  width: 100%;
  height: 100%;
  
}

.bbox{
  display: flex;
}
.top{
  background-color: rgb(62, 136, 111);
  white-space: nowrap;
}

h1{
  color: aliceblue;
  text-align: center;
}
.el-icon-star-on{
  color: #3cef7dbf;
}

.left{
  width: 25vw;
  height: 100%;
  border: 1px solid #3cef7dbf;
  display: flex;
  flex-wrap: wrap;
}

.left .box{
  width: 25vw;
  border: 1px solid #3cef7dbf;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
h2{
  background: #70bc8cbf;
  color: aliceblue;
}

.center{
  width: 75vw;
  height: 100%;
  border: 1px solid #3cef7dbf;
  
}
</style>

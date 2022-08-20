<template>
  <div id="app">
    <div class="top">
      <h1>
        <i class="el-icon-star-on"></i>简易版低代码平台<i
          class="el-icon-star-on"
        ></i>
      </h1>
    </div>

    <div class="bbox">
      <div class="left">
        <h2>菜单栏</h2>
        <div class="box">
          <draggable :group="a">

            <!-- 按钮组件 -->
            <p>示例按钮</p>
            <el-button type="primary" plain>按钮</el-button>
            
            <!-- 文本输入框 -->
            <p>示例文本</p>
            <el-input v-model="input" placeholder="文本输入框"></el-input>
            
            <!--滑块-->
            <div class="slider">
            <span class="demonstration">滑块</span>
            <el-slider v-model="slider1" show-input input-size="mini"></el-slider>
            <!--单选多选框-->
            <p>单选</p>
            </div>
             <el-radio-group v-model="radio">
             <el-radio :label="3">草莓</el-radio>
             <el-radio :label="6">西瓜</el-radio>
             <el-radio :label="9">葡萄</el-radio>
            </el-radio-group>

            <p>多选</p>
            <div class="checkbox">
            <el-checkbox :indeterminate="indeterminate" v-model="checkAll" 
            @change="handleCheckAll">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checked" @change="handleCheck">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group></div>

            <!--选择器-->
            <p>选择器</p>
            <el-select v-model="select" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            
            <!-- 上传图片组件 -->
            <p>示例图片</p>
            <tab-img></tab-img>
            <router-view />
            <p>图片上传</p>
            <div>
              <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
            <p>视频上传</p>
            <div>
              <upload-video
                :videos="videoInfo.allVideo"
                :videoBaseUrl="IMAGEURL"
                @delete="deleteVideo"
                @change="getVideo" >
              </upload-video>
            </div>
          </draggable>
        </div>
      </div>

      <div class="center">
        <h2>页面预览</h2>
        <div id="content">
          <draggable :group="b" id="draggable">
            <!-- 占位盒子 -->
            <div class="empbox" id="deldrag">

            </div>
          </draggable>         
        </div>

        <!-- 删除按钮 -->
        <div class="delete">
          
            <el-button slot="reference" size="mini" @click="viewdel">删除</el-button>
          
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//导入draggable组件
import draggable from "vuedraggable";

// 导入img组件
import tabImg from "@/components/tabImg.vue";
import UploadVideo from '@/components/UploadVideo.vue';
const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
  data() {
    return {
    slider1:0,
      radio:3,
      checkAll:false,
      checked:['上海','广州'],
      cities:cityOptions,
      isIndeterminate: true,
      options: [{
        value: "选项1",
        label: "肠粉"
      }, {
        value: "选项2",
        label: "双皮奶"
      }, {
        value: "选项3",
        label: "油柑汁"
      }],
      select:"",
      a: {
        name: "ga",
        pull: "clone",
        put: false,
      },
      b: {
        name: "ga",

        put: true,
      },
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videoInfo: {
        allVideo: [],
        deleteVideo: []
      }

    };
  },
  //注册draggable组件
  components: {
    draggable,
    tabImg,
    UploadVideo
  },
  methods: {
    getVideo(event) {
      this.videoInfo.allVideo = event
    },
    deleteVideo(index) {
      const video = this.videoInfo.allVideo[index]
      if (video.videoLink) {
      this.videoInfo.deleteVideo.push(video)
      }
      this.videoInfo.allVideo.splice(index, 1)
    },
    uploadFiles() {
      const uploadList = []
      this.videoInfo.allVideo.map(item => {
            console.log(item, 'video')
            const videoFile = new FormData()
            if (!item.videoLink) {
              videoFile.append('file', item.videoFile.raw)
              videoFile.append('fileTag', 'video')
              uploadList.push(
                new Promise((resolve, reject) => {
                  return ImgServe.uploadSingleFile(videoFile).then(res => {
                    if (res.data.code === 200) {
                      resolve(res.data.data)
                    } else {
                      this.$message('上传视频失败！')
                    }
                  })
                })
              )
            }
          })
          return Promise.all(uploadList)
    },



    //点击上传的方法

    //删除上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //清空页面
    viewdel(){
      var del = document.getElementById('draggable');
      var childs = del.childNodes; 
      for(var i = childs.length - 1; i >= 0; i--) { 
        if(!(childs[i].isEqualNode(document.getElementById('deldrag')))){
          del.removeChild(childs[i]);
        }
      } 
      alert("您已清空当前页面，请刷新重新编辑");
    }
  },
  //全选
    handleCheckAll(val){
      this.checked = val ? cityOptions : [];
      this.isIndeterminate = false;

    },
    // 多选
    handleCheck(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

    }

};
</script>


<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

p{
  margin-top: 10px;
  margin-bottom: 5px;
}

.bbox {
  display: flex;
}
.top {
  background-color: rgb(62, 136, 111);
  white-space: nowrap;
}

h1 {
  color: aliceblue;
  text-align: center;
}
.el-icon-star-on {
  color: #3cef7dbf;
}

.left {
  width: 25vw;
  height: 100%;
  border: 1px solid #3cef7dbf;
  display: flex;
  flex-wrap: wrap;
}

.left .box {
  width: 25vw;
  border: 1px solid #3cef7dbf;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
h2 {
  background: #70bc8cbf;
  color: aliceblue;
  width: 99%;
}

.center {
  width: 75vw;
  height: 100%;
  border: 1px solid #3cef7dbf;
  position: relative;
}

.content{
  height: 100%;
}
.empbox {
  height: 5vh;
}

.box1 {
  height: 2vh;
  width: 25vw;
}

.delete{
  display: flex;
  justify-content: right;
  // border: 1px solid #3cef7dbf;
}

.slider{
  width: 25vw;
}


</style>

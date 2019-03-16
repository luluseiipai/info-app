<template>
  <div class="footer">
    <div class="container">
      班级：15软件开发B班&nbsp;&nbsp;姓名：曲华俊&nbsp;&nbsp;wechat:luluseiipai
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped>
.footer{
  background-color: #383b42;
  height: 100%;
  line-height: 60px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
@media screen and (max-width: 992px){
  .footer{
    font-size: 14px;
  }
}
</style>
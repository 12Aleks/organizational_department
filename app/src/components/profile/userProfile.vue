<template>
  <div class="col s12 m6 l6">
    <div class="userInfoWrapper">
      <div class="photoWrapper">
        <div class="profile" :style='{ backgroundImage: `url("${userInfo.photo}")` }'></div>
      </div>
      <div class="descriptionWrapper">
        <div class="description">
          <p><span>Imię i nazwisko:</span> {{userInfo.name}}</p>
        </div>
        <div class="description">
          <p><span>Zespol:</span> {{userInfo.department}}</p>
        </div>
        <div class="description">
          <p><span>Twoj e-mail:</span> {{userInfo.email}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userProfile",
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
div.userInfoWrapper.img_attachment {
  padding: 20px 15px;
  margin-bottom: 15px;
  -webkit-box-align: center;
  box-align: center;
  align-items: center;
  display: flex;
  .photoWrapper, .descriptionWrapper{
    /*display: inline-block;*/
    /*margin: 0 auto;*/
  }
  .photoWrapper{
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: 16px;
    overflow: hidden;
    position: relative;
    width: 180px;
  }
  .descriptionWrapper{
    box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    width: 400px;
  }
  div.description{
    span{
      font-weight: 500;
    }
  }
}
</style>

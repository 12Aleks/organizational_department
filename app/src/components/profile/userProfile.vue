<template>
  <div class="col s12 m4 l4 h-100">
    <div class="userInfoWrapper">
      <div class="profile-header">
        <div class="profile-img">
          <div class="photo">
            <img :src="`${userInfo.photo}`" alt="user photo" class="personPhoto">
          </div>
        </div>
        <div class="profile-nav-info">
          <h6>Imię i nazwisko:</h6>
          <h3 class="user-name">
           {{userInfo.name}}
          </h3>
          <div class="address">
            <h6>Zespol:</h6>
            <p class="worker_process">
               {{userInfo.department}}
            </p>
            <h6>Adres e-mail:</h6>
            <p class="worker_position">
               {{userInfo.email}}</p>
          </div>
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
.h-100{
  background-color: $blue_grey_darken-2;
  .profile-header {
    position: relative;
    .profile-img {
      width: 100%;
      height: 200px;
      position: relative;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        height: 150px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        height: 150px;
      }

      img.personPhoto{
        width: 100%;
        height: auto;
        margin: 0 auto;
        display: block;
      }
      .photo {
        border-radius: 50%;
        height: 150px;
        width: 150px;
        border: 2px solid #fff;
        overflow: hidden;
        background-color: #fefefe;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        z-index: 5;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          height: 100px;
          width: 100px;
        }

        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
          height: 100px;
          width: 100px;
        }
      }
    }
    .button-link{
      margin: 15px 0 7px;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        margin: 7px 0 3px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        margin: 7px 0 3px;
      }
    }
    .button-link-department{
      margin: 8px 0 15px;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        margin: 3px 0 7px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        margin: 3px 0 7px;
      }
    }
    .button-link, .button-link-department {
      background-color: $white;
      transition: all .7s;
      letter-spacing: 1px;
      color: $grey;
      &:hover {
        transition: all .7s;
        color: $white;
        background-color: $terma-color;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        font-size: 12px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        font-size: 12px;
      }
    }

    .profile-nav-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      h3.user-name, h6 {
        color: #fff;
        font-variant: small-caps;
        letter-spacing: 1px;
        text-align: center;
        font-family: sans-serif;
        font-weight: bold;
        margin: 10px 0;
        text-transform: uppercase;
      }
      h3{
        font-size: 1.2rem;
      }
      h6{
        font-size: 1rem;
      }
      p.worker_process, p.worker_position {
        font-size: 14px;
        letter-spacing: 1px;
        text-align: center;
        a {
          color: $white;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: 12px;
          margin: 10px 0;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
          font-size: 12px;
          margin: 10px 0;
        }
      }

      .address {
        color: #f9f6f6;
      }
    }
  }
}
div.userInfoWrapper.img_attachment {
  padding: 20px 15px;
  margin-bottom: 15px;
  -webkit-box-align: center;
  box-align: center;
  @include align-items(center);
  @include flex();

}
</style>

<template>
  <div class="holder">
    <div class="preloader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  mounted() {
    const colors = ['rgba(158,134,107,1)', 'rgba(69,90,100,1)', '#90a4ae'];
    const rez = colors[Math.trunc(Math.random() * 3)];
    document.querySelectorAll('.preloader > div').forEach(el => el.style.setProperty('--element-color', rez));
  }
}
</script>

<style scoped lang="scss">
  $count: 10;
  $time: 2;
  $size: 70;

  .holder {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    /*background-color: #2D2F48;*/
  }
  .preloader {
    width: $size + px;
    height: $size + px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: rotatePreloader $time + s infinite ease-in;
  }
  @keyframes rotatePreloader {
    0% {
      transform: translateX(-50%) translateY(-50%) rotateZ(0deg);
    }
    100% {
      transform: translateX(-50%) translateY(-50%) rotateZ(-360deg);
    }
  }
  .preloader div {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      width: 10%;
      height: 10%;
      background-color: var(--element-color);
      transform: translateX(-50%);
      border-radius: 50%;
    }
  }

  @for $i from 1 through $count {
    .preloader div:nth-child(#{$i}) {
      transform: rotateZ(((360 / $count) * ($i - 1)) + deg);
      animation: rotateCircle + $i $time + s infinite linear;
      z-index: $count - $i;
    }
    @keyframes rotateCircle#{$i} {
      #{percentage(((50 / $count) * ($i - 1)) / 100)} {
        opacity: 0;
      }
      #{percentage((((50 / $count) + 0.0001) * ($i - 1)) / 100)} {
        opacity: 1;
        transform: rotateZ((0 - ((360 / $count) * ($i - 2))) + deg);
      }
      #{percentage((((50 / $count) * ($i - 0)) + 2) / 100)} {
        transform: rotateZ((0 - ((360 / $count) * ($i - 1))) + deg);
      }
      #{percentage(((50 + ((50 / $count) * ($i - 0))) + 2) / 100)} {
        transform: rotateZ((0 - ((360 / $count) * ($i - 1))) + deg);
      }
      100% {
        transform: rotateZ((0 - ((360 / $count) * ($count - 1))) + deg);
        opacity: 1;
      }
    }
  }
</style>

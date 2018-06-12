<template lang="pug">
    #page-index
        .greetbox.wow.fadeInLeftCust
          .logo
            img(src="~assets/images/logo-o.png" class="rwd-img")
          h1.title
            span 溫馨服務情
            span 窩心衿日林
          .gobtn
            a(href="about" class="enterWeb" id="enterWeb" onclick="dataLayer.push({'event': 'customEvent', 'eventInfo': {'category': 'Button', 'action': 'press'}})") 進入網站
          .iconbox
            ul
              li
                a
                  .icon
                    img(src="~assets/images/icon/lodging.png" class="rwd-img" alt="宜蘭縣民宿0070號")
                  .name 宜蘭縣民宿0070號
              li
                a
                  .icon
                    img(src="~assets/images/icon/countrycard.png" class="rwd-img" alt="國民旅遊卡特約民宿")
                  .name 國民旅遊卡特約民宿
              li
                a
                  .icon
                    img(src="~assets/images/icon/facebook.png" class="rwd-img" alt="衿日林粉絲專頁")
                  .name 衿日林粉絲專頁
          .bottom
            .contact
              span 訂房專線：03-9500236
              span 行動：0928-073438
              span 張小姐
            .address
              span 地址：宜蘭縣冬山鄉武淵村(三)路116號
              span 傳真：03-9509677
        .sliderbox
          ul#bannerSlider
            li
              .pic
              //- img(src="../images/slider/slider1.jpg" class="rwd-img")
            li
              .pic
              //- img(src="../images/slider/slider2.jpg" class="rwd-img")
            li
              .pic
              //- img(src="../images/slider/slider3.jpg" class="rwd-img")
            li
              .pic
              //- img(src="../images/slider/slider4.jpg" class="rwd-img")
            li
              .pic
            li
              img(src="~assets/images/slider/slider5.jpg")
              //- img(src="~assets/images/slider/slider5.jpg" class="rwd-img")
        .newsbox.wow.fadeInRight
          .title 最新消息
          .contentbox.mCustomScrollbar(data-mcs-theme="dark")
            ul#newsListBox
              if(news)
                each newsElement,index in news
                  li #{newsElement.news_title} #{moment(newsElement.news_date).format("YYYY-MM-DD")}
        footer
          .contact
            span 訂房專線：03-9500236
            span 行動：0928-073438
            span 張小姐
          .address
            span 地址：宜蘭縣冬山鄉武淵村(三)路116號
            span 傳真：03-9509677
</template>

<script>
import Logo from '~/components/Logo.vue'
import $ from 'jquery'

if (process.BROWSER_BUILD) {
  if ($(window).width() < 641) {
    $('.logo img').attr('src', '/~assets/~assets/images/logo-s.png')
    $('.gobtn a').addClass('whitearrow')
  }
}
export default {
  components: {
    Logo
  },
  mounted: () => {
    $('#bannerSlider').bxSlider({
      'mode': 'fade',
      'controls': false,
      'pager': false,
      'auto': true,
      'speed': 2000,
      'touchEnabled': false
    })
  }
}
</script>

<style lang="scss">
@import '~assets/main.scss';
#page-index {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  #bannerSlider{
    li:nth-of-type(1) .pic{
      /*background-image:url('../~assets/~assets/images/slider/slider1.jpg');*/
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .greetbox {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 100vh;
    width: 30vw;
    padding-top: 50px;
    background-color: rgba($white,0.8);

    .logo {
      width: 160px;
    }

    .title {
      writing-mode: vertical-lr;
      margin-top: 30px;
      span {
        display: block;
        padding: 0 10px;
        font-size: 1.2rem;
        &:nth-of-type(2) {
          text-indent: 1em;
        }
      }
    }

    .gobtn {
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;

      a {
        display: block;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          top: 10px;
          left: 0;
          right: 0;
          width: 120px;
          height: 10px;
          margin: 0 auto;
          /*background-image: url('../~assets/~assets/images/icon/arrow.png');*/
          background-repeat: no-repeat;
          // background-size: cover;
          background-position: 50%;
        }

        &.whitearrow:after {
          /*background-image: url('../~assets/~assets/images/icon/arrow-o.png');*/
        }
      }
    }

    .iconbox {
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        li {
          margin: 0 10px;
        }

        a {
          display: block;
        }

        .icon {
          width: 40px;
          margin: 0 auto;
        }

        .name {
          padding: 10px 0;
          font-size: 0.625rem;
        }
      }
    }

    .bottom {
      width: 100%;
      padding: 10px 20px;
      background-color: rgba($black,0.7);

      .contact {
        display: flex;
        padding: 8px 0;
      }

      span {
        font-size: 0.725rem;
        color: $white;
        padding: 0 5px;
      }
    }
  }
  //greetingbox

  .sliderbox {
    height: 100vh;
    li {
      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
            .pic {
              background-image: url('~assets/images/slider/slider#{$i}.jpg');
            }
        }
      }
    }
    .pic {
      height: 100vh;
      background-size: cover;
      background-position: 50%;
    }
  }

  .newsbox {
    position: absolute;
    right: 40px;
    bottom: 25px;
    padding: 20px 10px 10px;
    color: $white;
    background-color: rgba($deepgreen,0.8);
    z-index: 1000;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-30%,-50%);
      padding: 10px;
      background-color: rgba($black,0.8);
      color: $white;
      letter-spacing: 1px;
      font-size: 1.2rem;
    }

    .contentbox {
      overflow-y: auto;
      height: 80px;
    }

    li {
      padding: 8px 0;
      // line-height: 1.5em;
      font-size: 1rem;
      color: $white;
      border-bottom: 1px dotted $white;
    }
  }

  footer {
    display: none;
  }
  //media query
  @media (max-width:1280px) {
    .greetbox .title span {
      font-size: 1rem;
    }
    .greetbox .bottom .address,
    .greetbox .bottom .contact {
      display: block;

      span {
        display: block;
        padding: 5px 0;
        font-size: 0.9rem;
      }
    }
  }
  @media (max-width:1024px) {
    .greetbox .title span {
      font-size: 1rem;
    }
  }
  @media (max-width:768px) {
    .newsbox {
      width: 55%;
      li{
        line-height: 1.5em;
      }
    }
  }
  @media (max-width:640px) {
    .greetbox {
      top: 30px;
      right: 0;
      width: 50vw;
      height: 70vh;
      margin: 0 auto;
      background-color: rgba($deepblue,0.8);
      box-shadow: 0 0 0 5px rgba($deepblue,0.5);
    }

    .title {
      span {
        color: $white;
      }
    }

    .gobtn {
      padding: 10px 0;

      a {
        color: $white;
      }
    }

    .iconbox {
      display: none;
    }

    .bottom {
      display: none;
    }

    .newsbox {
      width: 85%;
      right: 0;
      left: 0;
      bottom: 10px;
      margin: 0 auto;

      .title {
        transform: translate(-10%,-50%);
      }
    }
  }
  @media (max-width:480px) {
    .greetbox .title span{
      font-size: 1rem;
    }
  }
  @media (max-width:320px){
   .greetbox .title{
      writing-mode: initial;
      margin-top: 20px;
      span{
        padding: 5px 0;
      }
    }
    .greetbox .gobtn{
      height: 80px;
      line-height: 80px;
    }
  }
  footer {
    display: block;
  }
}

</style>

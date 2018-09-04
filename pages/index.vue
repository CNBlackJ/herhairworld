<template>
  <div class="index-container">
    <inquiry v-if="isInquiry" v-on:updateInquiry="cancelInquiry"></inquiry>
    <indexCarousel></indexCarousel>
    <indexContent title="featured categories"></indexContent>
    <category></category>

    <indexContent title="business solution"></indexContent>
    <div class="bs-container">
      <div class="bs-description">
        Growing your business is our target and we provide solutions to make you successful!
      </div>
      <div class="bs-imgs">
        <el-col class="bs-img-container" :span="12" v-for="i in 4" :key="i">
          <img class="bs-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/business_1.jpg"/>
          <div class="bs-title">FOR NEW START BUSINESS</div>
        </el-col>
      </div>
    </div>
    <indexBtn
      title="get your own solution"
      @click.native="getInquiry"
    ></indexBtn>

    <indexContent title="factory direct price"></indexContent>
    <div class="fc-container">
      <div class="bs-description">
        Lowest factory direct prices with Premuim quality
        <br>
        product help makebig profit
      </div>
      <img class="fc-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/plant.jpg"/>
    </div>
    <indexBtn
      title="get factory price now"
      @click.native="getInquiry"
    ></indexBtn>

    <indexContent title="secret of hair market"></indexContent>
    <div class="secret-container">
      <div class="bs-description">
        Are you still buying the hair as Brazilian Hair? 12A
        <br/>
        Grade? More secret of hair market are waiting for you!!
      </div>
      <img class="fc-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/market.jpg"/>
    </div>
    <indexBtn
      title="know more secret now"
      @click.native="getInquiry"
    ></indexBtn>

    <indexContent title="hair branding"></indexContent>
    <div class="brand-container">
      <div class="bs-description">
        Are you still buying the hair as Brazilian Hair? 12A
        <br/>
        Grade? More secret of hair market are waiting for you!!
      </div>
      <img class="fc-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/branding.jpg"/>
    </div>
    <indexBtn
      title="customize your branding now"
      @click.native="getInquiry"
    ></indexBtn>

    <indexContent title="why choose us"></indexContent>
    <div class="choose-container">
      <div class="choose-img-container" v-for="c in choices" :key="c.id">
        <img class="choose-img" :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + c.img"/>
        <div class="choose-title">{{c.title}}</div>
      </div>
    </div>

    <social></social>
  </div>
</template>

<script>
  import indexCarousel from '@/components/indexCarousel'
  import indexContent from '@/components/indexContent'
  import category from '@/components/category'
  import indexBtn from '@/components/indexBtn'
  import social from '@/components/social'
  import inquiry from '@/components/inquiry'

  import store from '@/store'

  export default {
    store,
    layout: 'main',
    components: {
      indexCarousel,
      indexContent,
      category,
      indexBtn,
      social,
      inquiry
    },
    computed: {
      isInquiry () { 
        return this.$store.state.isInquiry
      }
    },
    data () {
      return {
        choices: [
          { id: 1, title: 'High Quality', img: 'choose_1.jpg' },
          { id: 2, title: 'Hugu Profit', img: 'choose_2.jpg' },
          { id: 3, title: 'Unlimited', img: 'choose_3.jpg' },
          { id: 4, title: 'Professional', img: 'choose_4.jpg' }
        ]
      }
    },
    methods: {
      getInquiry () {
        this.$store.commit('setIsInquiry')
      },
      cancelInquiry () {
        this.$store.commit('setIsInquiry')
      }
    }
  }
</script>

<style>
  .index-container {
    padding-top: 50px;
  }

  .bs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .bs-description {
    font-size: 14px;
    text-align: center;
    width: 100%;
  }

  .bs-imgs {
    display: block;
    padding: 20px;
  }

  .bs-img-container {
    padding: 0 10px;
  }

  .bs-img {
    max-width: 100%;
  }

  .bs-title {
    padding: 10px 0;
    width: 100%;
    text-align: center;
    font-size: 70%;
    color: #dd127b;
  }

  .fc-container {
    padding: 0 10px;
  }

  .fc-img {
    padding: 20px 0;
    width: 100%;
  }

  .secret-container {
    padding: 0 10px;
  }

  .brand-container {
    padding: 0 10px;
  }

  .choose-container {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .choose-img-container {
    padding: 0 5px;
    width: 20%;
  }

  .choose-img {
    border-radius: 50%;
    width: 100%;
  }

  .choose-title {
    font-size: 70%;
    text-align: center;
  }
</style>
<template>
  <div class="index-container">
    <indexCarousel></indexCarousel>
    {{$store.state.home.pageConfig}}
    <indexContent title="featured categories"></indexContent>
    <category></category>

    <indexContent title="featured products"></indexContent>

    <div class="fd-con">
      <el-row>
        <el-col
          class="fd-item"
          :span="12"
          v-for="item in featuredProducts"
          :key="item._id">
          <card :product="item">
          </card>
        </el-col>
      </el-row>
    </div>

    <indexContent :title="serviceTitles[0]"></indexContent>
    <div class="bs-container">
      <div class="bs-description">
          {{serviceDescs[0]}}
      </div>
      <div class="bs-imgs">
        <el-col
          class="bs-img-container"
          :span="12"
          v-for="(item, i) in serviceImgs[0]"
          :key="i">
          <img
            class="bs-img"
            :src="item"/>
          <div class="bs-title">{{serviceFourTitles[i]}}</div>
        </el-col>
      </div>
    </div>
    <indexBtn
      :title="serviceBtns[0]"
      @click.native="getInquiry(serviceTitles[0])"
    ></indexBtn>

    <indexContent :title="serviceTitles[1]"></indexContent>
    <div class="fc-container">
      <no-ssr>
        <div class="bs-description">
          {{serviceDescs[1]}}
        </div>
      </no-ssr>
      <img
        class="fc-img"
        :src="serviceImgs[1]"/>
    </div>
    <indexBtn
      :title="serviceBtns[1]"
      @click.native="getInquiry(serviceTitles[1])"
    ></indexBtn>

    <indexContent :title="serviceTitles[2]"></indexContent>
    <div class="secret-container">
      <div class="bs-description">
        {{serviceDescs[2]}}
      </div>
      <img
        class="fc-img"
        :src="serviceImgs[2]"/>
    </div>
    <indexBtn
      :title="serviceBtns[2]"
      @click.native="getInquiry(serviceTitles[2])"
    ></indexBtn>

    <indexContent title="hair branding"></indexContent>
    <div class="brand-container">
      <div class="bs-description">
        {{serviceDescs[3]}}
      </div>
      <img
        class="fc-img"
        :src="serviceImgs[3]"/>
    </div>
    <indexBtn
      :title="serviceBtns[3]"
      @click.native="getInquiry(serviceTitles[3])"
    ></indexBtn>

    <indexContent title="WHY CHOOSE US"></indexContent>
    <whyChooseUs></whyChooseUs>
    <social></social>
  </div>
</template>

<script>
  import indexCarousel from '@/components/indexCarousel'
  import indexContent from '@/components/indexContent'
  import category from '@/components/category'
  import indexBtn from '@/components/indexBtn'
  import social from '@/components/social'
  import card from '@/components/card'
  import whyChooseUs from '@/components/whyChooseUs'

  import { mapState, mapGetters } from 'vuex'

  export default {
    layout: 'mainWithInquiry',
    components: {
      indexCarousel,
      indexContent,
      category,
      indexBtn,
      social,
      card,
      whyChooseUs
    },
    computed: {
      ...mapGetters({
        serviceTitles: 'home/serviceTitles',
        serviceBtns: 'home/serviceBtns',
        serviceDescs: 'home/serviceDescriptions',
        serviceImgs: 'home/serviceImgs'
      }),
      ...mapState({
        services: state => state.home.pageConfig.index.services,
        featuredProducts: state => state.featuredProducts
      })
    },
    data () {
      return {
        serviceFourTitles: [
          'For New Start Business',
          'For Salon Owners/Stylists',
          'For Online Sellers',
          'For Store Owner'
        ]
      }
    },
		async created () {
      await this.$store.dispatch('home/setPageConfig')
      await this.$store.dispatch('setFeaturedProducts')
		},
    methods: {
      getInquiry (title) {
        const sendPage = {
					name: this.$route.name,
					path: this.$route.fullPath,
					additional: title
				}
        this.$store.commit('inquiry/SET_SEND_PAGE', sendPage)
        this.$router.push({ path: '/inquiry' })
      }
    }
  }
</script>

<style>
  .index-container {
    padding-top: 44px;
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

  .fd-con {
    padding: 0 2px;
  }

  .fd-item {
    padding: 2px;
  }

  .secret-container {
    padding: 0 10px;
  }

  .brand-container {
    padding: 0 10px;
  }

</style>
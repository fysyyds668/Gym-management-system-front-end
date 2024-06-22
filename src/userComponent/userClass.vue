<script setup lang="ts">

import {ref} from "vue";

const selectImg1=ref(false)
const selectImg2=ref(false)
const selectImg3=ref(false)
const selectImg4=ref(false)

</script>

<template>
  <div class="container">
    <el-row class="container1" >
      <div class="container2"></div>
      <el-col :span="2" ></el-col>

      <el-col :span="20" class="content1">
       <div class="container3" @click="selectImg1=true">减脂 FAT LOSS</div>
       <div class="container4" @click="selectImg2=true">骑行RIDE</div>
       <div class="container5" @click="selectImg3=true">瑜伽YOGA</div>
       <div class="container6" @click="selectImg4=true">游泳SWIMMING</div>
      </el-col>
      <el-col :span="2" ></el-col>

    </el-row>

    <el-drawer v-model="selectImg1" title="I am the title" :with-header="false" style="background: black">
      <span style="color: white;font-size:20px">减脂 FAT LOSS</span>
      <span style="color: white"><br/><br/>减脂，就是体内脂肪超过正常范围，通过各种手段减掉自己身上多余脂肪的行为。 [2-3]为了加快减肥减脂效率，每天三餐保证营养均衡，本着早餐吃饱、午餐吃好、晚餐吃少的原则，尤其是晚餐尽可能避免吃过多，更不能吃任何热量高的食物，包括用餐时间也尽可能控制在晚上6：00左右<br/>
        Fat loss is the act of losing excess fat on your body by various means when your body fat exceeds the normal range. [2-3] In order to speed up the efficiency of weight loss and fat loss, three meals a day should ensure balanced nutrition, in line with the principle of eating full breakfast, eating good lunch, and eating less dinner, especially at dinner, avoid eating too much at dinner, and not eat any high-calorie food, including meal time as much as possible to control around 6:00 pm
      </span>
    </el-drawer>
    <el-drawer v-model="selectImg2" title="I am the title" :with-header="false" style="background: black">
      <span style="color: white;font-size:20px">骑行RIDE</span>
      <span style="color: white"><br/><br/>骑行是一种健康自然的运动旅游方式 ，能充分享受旅行过程之美 。一辆单车，一个背包即可出行 ，简单又环保。在不断而来的困难当中体验挑战，在旅途的终点体验成功 [1]。
骑行可以改善记忆力。不论是对于记忆力较强还是较弱的人来说，骑自行车都具有提高记忆力的作用，缓解帕金森，骑车可以改善与运动有关的大脑区域的活动情况。骑行也可以防癌。日常缺乏运动，就是容易致癌的不良行为之一。长期坚持骑自行车可增强心血管功能，尤其是有氧运动，提高人体新陈代谢和免疫力，起到健身防癌的作用<br/>
Cycling is a healthy and natural way to travel and enjoy the beauty of the travel process. A bicycle and a backpack can travel, simple and environmentally friendly. Experience challenges in the midst of constant difficulties and experience success at the end of the journey [1].
Riding can improve memory. Cycling has the effect of improving memory, relieving Parkinson's disease, and improving the activity of areas of the brain involved in exercise for both people with strong and weak memory. Riding can also prevent cancer. Lack of daily exercise is one of the bad behaviors that can easily cause cancer. Long-term cycling can enhance cardiovascular function, especially aerobic exercise, improve human metabolism and immunity, and play a role in fitness and cancer prevention
      </span>
    </el-drawer>
    <el-drawer v-model="selectImg3" title="I am the title" :with-header="false" style="background: black">
      <span style="color: white;font-size:20px">瑜伽YOGA</span>
      <span style="color: white;"><br/><br/>瑜伽（英文：Yoga，印地语：योग）是一个汉语词汇，最早是从印度梵语“yug”或“yuj”而来，其含意为“一致”、“结合”或“和谐”。瑜伽源于古印度，是古印度六大哲学派别中的一系，探寻“梵我合一”的道理与方法。而现代人所称的瑜伽则主要是一系列的修身养心方法。
大约在公元前300年，印度的大圣哲瑜伽之祖帕坦伽利（英文：Patanjali，印地语：पतंजलि）创作了《瑜伽经》，印度瑜伽在其基础上才真正成形，瑜伽行法被正式订为完整的八支体系。瑜伽是一个通过提升意识，帮助人类充分发挥潜能的体系。
瑜伽姿势运用古老而易于掌握的技巧，改善人们生理、心理、情感和精神方面的能力，是一种达到身体、心灵与精神和谐统一的运动方式，包括调身的体位法、调息的呼吸法、调心的冥想法等，以达至身心的合一。
瑜伽是一项有着5000年历史的关于身体、心理以及精神的练习，起源于印度，其目的是改善身体和心性。2014年12月11日，联大宣布6月21日为国际瑜伽日，2015年举办了首届6.21国际瑜伽日<br/>Yoga (Hindi: योग) is a Chinese word originally derived from the Indian Sanskrit word "yug" or "yuj", which means "unity", "union" or "harmony". Yoga originated in ancient India and is one of the six major philosophical schools in ancient India, exploring the principles and methods of "unity of Brahman and self". What modern people call yoga is mainly a series of self-cultivation methods.
Around 300 B.C., Patanjali (English: Patanjali, Hindi: पतंजलि), the ancestor of India's great sage yoga, wrote the Yoga Sutra, on the basis of which Indian yoga was truly formed, and the yoga practice was officially established as a complete eight-limb system. Yoga is a system that helps human beings reach their full potential by raising awareness.
Yoga posture is a way of movement to achieve harmony and unity of body, mind and spirit, including asana, pranayama, and meditation to achieve the unity of body and mind, using ancient and easy-to-master techniques to improve people's physical, mental, emotional and spiritual abilities.
Yoga is a 5,000-year-old physical, mental and spiritual practice that originated in India with the aim of improving the body and mind. On 11 December 2014, the United Nations General Assembly proclaimed 21 June as International Yoga Day, and in 2015, the first International Yoga Day was held on 21 June
      </span>
    </el-drawer>
    <el-drawer v-model="selectImg4" title="I am the title" :with-header="false" style="background: black">
      <span style="color: white;font-size:20px">游泳SWIMMING</span>
      <span style="color: white;"><br/><br/>游泳（Swimming [1]），是人在水的浮力作用下产生向上漂浮，凭借浮力通过肢体有规律的运动，使身体在水中有规律运动的技能。
17世纪60年代，英国不少地区的游泳活动就开展得相当活跃。1828年，英国在利物浦乔治码头修造了第一个室内游泳池，这种泳池到19世纪30年代，在英国各大城市相继出现。1837年，在英国伦敦成立了第一个游泳组织，同时举办了英国最早的游泳比赛。1896年，游泳被列为奥运会竞赛项目。 [2]
游泳的最高组织机构是世界游泳联合会，总部设在瑞士洛桑。1908年由比利时、丹麦、芬兰、法国、德国、英国、匈牙利和瑞典游泳协会倡议成立。<br/>Swimming (1) is the skill of a person to float upward under the action of water buoyancy, and make the body move regularly in the water by virtue of the buoyancy through the regular movement of the limbs.
In the 60s of the 17th century, swimming activities were quite active in many parts of the UK. In 1828, the first indoor swimming pool was built in Liverpool's George Dock, and this kind of pool appeared in major cities in Britain in the thirties of the 19th century. In 1837, the first swimming organization was established in London, England, and the first swimming competition in Britain was held at the same time. In 1896, swimming was included in the Olympic Games. [2]
The highest organizing body for swimming is the World Swimming Federation, headquartered in Lausanne, Switzerland. It was founded in 1908 on the initiative of the swimming associations of Belgium, Denmark, Finland, France, Germany, Great Britain, Hungary and Sweden.
      </span>
    </el-drawer>


  </div>
</template>

<style scoped>

.container{
  border: #181818 solid 2px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  background: grey;


}
.content1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container1 {
  position: absolute;
  width: 100%;
  height: 100%;

  background: url('@/recourse/image/jpg1.jpg') no-repeat center center;
  background-size: cover;
}
.container2 {
  position: absolute;
  width: 100%;
  height: 100%;
  background: grey;
  filter:alpha(Opacity=80);
  -moz-opacity:0.5;
  opacity: 0.6;

}
/*设置透明*/

.container3{
  position: relative;
  width: 50%;
  height: 50%;
  background: url('@/recourse/image/img10.jpg') no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
}
.container4{
  position: relative;
  width: 50%;
  height: 50%;
  background: url('@/recourse/image/img11.jpg') no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
}
.container5{
  position: relative;
  width: 50%;
  height: 50%;
  background: url('@/recourse/image/img12.jpg') no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
}
.container6{
  position: relative;
  width: 50%;
  height: 50%;
  background: url('@/recourse/image/img13.jpg') no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
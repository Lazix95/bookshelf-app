<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <div class="c-book__list-item p-relative text-center" @click="goToBook">
      <v-img v-if="src" aspect-ratio='3/4' class="ma-auto" width='200px' :lazy-src="src" :src="src"/>
      <BookNoCover v-else/>
      <BaseTitle class='u-grayscale-80 u-font-semi-bold' :level='2' :value="name || 'Unknown Name'"/>
      <BaseText class='u-grayscale-80 u-font-semi-bold' :value="author || 'Unknown Author'"/>
    </div>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BookNoCover from './BookNoCover.vue';
import BaseTitle from '../Base/BaseTitle.vue';
import BaseText from '../Base/BaseText.vue';
@Component({
  components: { BaseText, BaseTitle, BookNoCover }
})
export default class BookListItem extends Vue {
  @Prop(String) readonly src: string | undefined;
  @Prop(String) readonly name: string | undefined;
  @Prop(String) readonly author: string | undefined;
  @Prop(String) readonly publisher: string | undefined;

  protected goToBook(): void {
    this.$emit('goToBook');
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../assets/styles/components/book";
</style>

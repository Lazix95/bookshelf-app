import { Vue, Component } from 'vue-property-decorator';

@Component
export class NavigationMixin extends Vue {
  public userDataLoading = null;

  goToHome(): void {
    this.$router.push({ name: 'Books' });
  }

  goToBook(bookID: string): void {
    this.$router.push({ name: 'Books.details', params: { bookID } });
  }
}

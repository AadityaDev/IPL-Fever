import navigation from '@/data/navigation';

export default () => ({
  state: navigation,
  getters: {
    navigation: state => state,
  },
});

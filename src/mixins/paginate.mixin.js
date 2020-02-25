import chunkArray from '@/utils/chunkArray'

export default {
  data(vm) {
    return {
      page: +vm.$route.query.page || 1,
      itemsPerPage: 4,
      pageCount: 0,
      allItems: [],
      items: [],
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = chunkArray(allItems, this.itemsPerPage)

      this.pageCount = this.allItems.length
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    paginateHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
  },
}

import _ from 'lodash'

export default {
  data() {
    return {
      // page: +this.$router.query.page || 1,
      page: 1,
      itemsPerPage: 4,
      pageCount: 0,
      allItems: [],
      items: [],
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.itemsPerPage)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    paginateHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
  },
}
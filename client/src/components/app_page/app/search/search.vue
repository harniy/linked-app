<template>
  <div class="search__block">
    <div class="search">
      <form class="search" @submit.prevent="findLink">
        <div class="input__block">
          <input
            type="text"
            name="search"
            placeholder="Search links"
            v-model="searchValue"
          />
          <span class="material-icons search_icon">search</span>
        </div>
        <button name="search">Search</button>
      </form>
    </div>
    <div class="filter__block"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      isNoResult: false,
    };
  },
  methods: {
    findLink() {
      const links = document.querySelectorAll(".user_link_block");

      let searchResult = 0;

      links.forEach((el) => {
        let linkName =
          el.children[1].children[0].children[0].innerHTML.toLowerCase();
        if (!linkName.includes(this.searchValue)) {
          el.classList.add("hide");
          searchResult ++
        } else {
          el.classList.remove("hide");
          searchResult --
        }
      });

      if(links.length === searchResult) {
          this.$store.dispatch('searchError', true)
      } else {
          this.$store.dispatch('searchError', false)
      }
    },
  },
};
</script>
<template>
  <div class="filter__block">
    <div class="filter__block__name">
      <h3>Links</h3>
    </div>
    <div class="filters__section">
      <span class="material-icons list__design" @click="listStyle">menu</span>
      <span class="material-icons app__design" @click="appStyle">apps</span>
      <div class="filter_span">
        Filter:
        <span class="filter__name" @click="showFilter"
          >ALL<span class="material-icons filter__icon"
            >arrow_drop_down</span
          ></span
        >
      </div>

      <div class="filter__menu" v-if="isFilter">
        <ul>
          <li>
            <p @click="filterLinks('all')">all</p>
          </li>
          <li v-for="filter in categories" :key="filter">
            <p @click="filterLinks(filter)">{{ filter }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFilter: false,
    };
  },
  methods: {
    showFilter() {
      this.isFilter = !this.isFilter;
    },
    listStyle() {
      const links = document.querySelectorAll(".user_link_block");
      links.forEach((el) => {
        el.classList.add("list__style");
      });
    },
    appStyle() {
      const links = document.querySelectorAll(".user_link_block");
      links.forEach((el) => {
        el.classList.remove("list__style");
      });
    },
    filterLinks(data) {
      const links = document.querySelectorAll(".user_link_block");
      const filter = data;

      links.forEach((el) => {
        if (filter === "all") {
          el.classList.remove("hide");
          return;
        }
        if (el.dataset.filter !== filter) {
          el.classList.add("hide");
          return;
        }
        el.classList.remove("hide");
      });
      /* hide youtube btn */
      this.$store.dispatch('showYtbBtn', false)
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getUniqCategory;
    },
  },
};
</script>


<style>
.filter__block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  padding: 0 50px;
  user-select: none;
}
.filter__block__name {
  color: #73bf75;
  font-family: "Poppins";
  text-transform: capitalize;
}
.filters__section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  color: #a5aab4;
  position: relative;
}
.filters__section span {
  cursor: pointer;
}
.filter_span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins";
  padding: 0 10px;
}
.filter__name {
  padding: 0 10px;
  font-weight: 600;
  font-family: "Atkinson Hyperlegible";
  position: relative;
  user-select: none;
}
.filter__icon {
  position: absolute;
  top: -2px;
}
.list__design {
  margin: 0 10px;
}
.list__design {
  font-size: 2.3rem !important;
}
.app__design {
  font-size: 2rem !important;
}
.filter__menu ul {
  position: absolute;
  top: 40px;
  right: 40px;
  background: #f2f2f2;
  padding: 0 20px;
  transition: 0.2s linear;
  z-index: 2;
}
.filter__menu ul li {
  cursor: pointer;
}
.filter__menu ul li:hover {
  color: #858093;
}
.list__style {
  float: none !important;
  width: 100% !important;
  min-height: 200px !important;
}
.hide {
  display: none !important;
}
</style>
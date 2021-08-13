<template>
  <div class="nav__block">
    <slot name="title"></slot>
    <div class="app__name">Linked-app</div>
    <div class="nav__menu">
      <ul ref="navList">
        <li class="active_list" @click="isCategory = !isCategory">
          <div class="categories">
            <span class="material-icons">menu</span>
            <h3>Categories</h3>
          </div>
        </li>
        <div
          class="category__block slideInDown"
          v-show="isCategory"
          ref="category_list"
        >
          <div class="category__list">
            <ul>
              <li @click="filterList('all')">
                all
              </li>
              <li
                v-for="category in categories"
                :key="category"
                @click="filterList(category)"
              >
                {{ category }}
              </li>
            </ul>
          </div>
        </div>
        <li>
          <div class="categories" @click="filterYoutube">
            <span class="material-icons">ondemand_video</span>
            <h3>YouTube</h3>
          </div>
        </li>
        <li>
          <div class="categories">
            <span class="material-icons-outlined">play_lesson</span>
            <h3>Lessons</h3>
          </div>
        </li>
        <li>
          <div class="categories" @click="showAll">
            <span class="material-icons-outlined">stars</span>
            <h3>Popular</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCategory: false,
    };
  },
  methods: {
    filterYoutube() {
      let elements = document.querySelectorAll('.user_link_block')
      elements.forEach(el => {
        if(![...el.classList].includes('youtube')) {
          el.classList.add('hide')
        }
      })

      this.$store.dispatch('showYtbBtn', true)
    },
    showAll() {
      let elements = document.querySelectorAll('.user_link_block')
      elements.forEach((el) => el.classList.remove("hide"));
      this.$store.dispatch('showYtbBtn', false)
    },
    filterList(filter) {
      const links = document.querySelectorAll(".user_link_block");
  
      links.forEach((el) => {
        if(filter === 'all') {
          el.classList.remove('hide')
          return
        }
        if(el.dataset.filter !== filter) {
          el.classList.add('hide')
        } else {
          el.classList.remove('hide')
        }
      });
      /* hide youtube btn */
      this.$store.dispatch('showYtbBtn', false)
    },

  },
  mounted() {
    let nav_elements = this.$refs.navList.children;

    nav_elements.forEach((el) => {
      el.addEventListener("click", function () {
        if ([...this.classList].includes("category__block")) {
          return;
        }

        let active = [...document.querySelectorAll(".active_list")];
        active.forEach((item) => {
          item.classList.remove("active_list");
        });

        this.classList.add("active_list");
      });
    });
  },
  computed: {
    allLinks() {
      let links = document.querySelectorAll(".user_link_block");
      return [...links];
    },
    categories() {
      return this.$store.getters.getUniqCategory;
    },
  },
  watch: {},
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap");

ul {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}
.nav__block {
  width: 15%;
  background: #fcfbfc;
  font-family: "Atkinson Hyperlegible", sans-serif;
}
.app__name {
  padding: 30px 0 35px 0;
  font-weight: 700;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  background: #eedff1;
}
.nav__menu ul li {
  width: 75%;
  margin: 20px auto;
}
.categories {
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: #a5aab4;
  cursor: pointer;
  position: relative;
  justify-content: flex-start;
  padding: 5px 0;
}
.categories h3 {
  margin: 0px;
  font-weight: 100;
  padding: 0 20px;
}
.active_list {
  background: #5943be;
  padding: 5px 10px;
  border-radius: 15px;
}

.active_list h3 {
  color: #c1b7e6;
  font-weight: 100;
}

.active_list span {
  color: #f2efff;
}
.category__list {
  color: #aaaaaa;
}
.category__list ul li {
  cursor: pointer;
}
.category__list ul li:hover {
  color: #88859a;
}
.slideInDown {
  animation-name: slideInDown;
  animation-duration: 1s;
}
@keyframes slideInDown {
  0% {
    margin: -140px auto;
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  60% {
    opacity: 0.3;
  }
  100% {
    margin: 0 auto;
    opacity: 1;
  }
}

</style>
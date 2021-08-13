<template>
  <div class="app__block__header">
    <Search />

    <div class="add_block">
      <span class="material-icons add_icon" title="add link" @click="addLink"
        >add_circle_outline</span
      >
      <p>add</p>
    </div>

    <AddLink />
  </div>
</template>


<script>
import AddLink from "./add-link/addLink.vue";
import Search from "./search/search.vue"

export default {
  components: { AddLink, Search },
  data() {
    return {
    };
  },
  methods: {
    addLink() {
      this.$store.dispatch("addModal");
    },

  },
};
</script>



<style>
.app__block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
}
.search__block {
  width: 50%;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.input__block {
  width: 55%;
  position: relative;
}

input[name="search"] {
  border: 1px solid #eaeaea;
  margin: 0 20px 0 -30px;
  border-radius: 30px;
  height: 40px;
  background-color: #fcfcfc;
  padding: 0 40px;
  width: 80%;
}
input[name="search"]:focus {
  box-shadow: 0px 1px 4px 0 #6c50d92b;
}
input[name="search"]:focus + .search_icon {
  color: #5943bead;
}
button[name="search"] {
  background: #f5f7f9;
  border-radius: 16px;
  font-size: 1rem;
  padding: 10px 13px;
  border: 1px solid #dbdbdb;
  box-shadow: 1px 1px 4px 0px #ecececc7;
  color: #b5b3b4;
  cursor: pointer;
}

button[name="search"]:hover {
  box-shadow: 0px 1px 4px 0px #b5badbe6;
}

.search_icon {
  position: absolute;
  left: -19px;
  top: 11px;
  color: #e3e3dc;
  transition: 0.2s;
}

.add_block {
  padding-right: 150px;
  user-select: none;
}
.add_block p {
  margin: 0;
  font-weight: 800;
  color: #b4b5b8;
  font-size: 1.2rem;
  line-height: 10px;
}
.add_icon {
  color: #b4b5b8;
  font-size: 2.4rem !important;
  cursor: pointer;
}
.add_icon:hover {
  color: #03a9f4a3;
}
</style>
<template>
  <div class="add__modal" v-if="isModal" @click="closeModal">
    <div class="modal__block">
      <form class="modal__form" @submit.prevent="createLink">
        <h3>ADD link</h3>
        <div class="link__info">
          <div class="link__name">
            <span>*Name: </span>
            <input type="text" name="link" required v-model="name" />
          </div>
          <div class="link__description">
            <span>Category: </span>
            <div class="select__add">
              <select name="select" ref="select" @change="getCategory">
                <option>----</option>
                <option
                  :value="cat"
                  v-for="(cat, idx) of categoryList"
                  :key="idx"
                >
                  {{ cat }}
                </option>
              </select>
              <p>or <span @click="isAddCategory = !isAddCategory">add</span></p>
              <div class="new__category__block" v-if="isAddCategory">
                <input type="text" name="newCategory" v-model="newCategory" />
                <button @click.prevent="addCategory">add</button>
              </div>
            </div>
          </div>
          <div class="link__link">
            <span>*URL: </span>
            <input type="text" name="link" required v-model="url" />
          </div>
        </div>

        <div class="add__button">
          <button name="add">add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModal: false,
      name: "",
      category: "",
      url: "",
      isAddCategory: false,
      newCategory: "",
    };
  },
  methods: {
    createLink() {
      fetch(`${this.getPort}/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          category: this.category,
          url: this.url,
          user: {
            username: this.$store.getters.getUserInfo.username,
            password: this.$store.getters.getUserInfo.password,
          },
        }),
      }).then(() => {
        this.$store.dispatch("addModal");
        this.$store.dispatch("reloadLinks", true);
      });
    },
    closeModal(e) {
      let el = e.target.className;

      if (el === "add__modal") {
        this.$store.dispatch("addModal");
      }
    },
    addCategory() {
      let sel = this.$refs.select;

      if (this.newCategory !== "") {
        let option = document.createElement("option");
        option.innerHTML = this.newCategory;
        option.setAttribute("selected", "selected");
        sel.append(option);

        this.isAddCategory = false;

        this.category = this.newCategory;
      }
    },
    getCategory() {
      this.category = this.$refs.select.value;
    },
  },
  computed: {
    categoryList() {
      return this.$store.getters.getUniqCategory;
    },
    getPort() {
      return this.$store.getters.getServerPort;
    },
  },
  watch: {
    "$store.state.showModal": function () {
      this.isModal = this.$store.getters.getModal;

      this.name = "";
      this.url = "";
      this.category = "";
    },
  },
};
</script>


<style>
.add__modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  z-index: 999;
  background: #00000017;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[name="link"] {
  border-bottom: 1px solid rgb(168, 168, 168);
  height: 30px;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0 10px;
}
.modal__block {
  background: #fff;
  border-radius: 10px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  width: 400px;
}
.modal__form {
  width: 100%;
  text-align: center;
}
.link__info {
  width: 100%;
  text-align: left;
}
.link__info span {
  width: 25%;
}
.link__name,
.link__description,
.link__link {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.add__button {
  padding: 20px 0 5px 0;
}
button[name="add"] {
  color: #76797d;
  font-size: 1.2rem;
  padding: 5px 25px;
  cursor: pointer;
  border: 2px solid #d5d5d5;
  border-radius: 10px;
  box-shadow: 0px 1px 4px 0px #534b6340;
  transition: 0.2s ease-in-out;
}
button[name="add"]:hover {
  box-shadow: 0px 1px 4px 0px #534b63af;
}
select {
  width: 40%;
  height: 25px;
  outline: none;
  border: 1px solid #c6c6c6;
  padding: 0 10px;
  text-align: center;
  text-align-last: center;
}
.link__description {
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.select__add {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
}
.select__add p {
  width: 30%;
  user-select: none;
}
.select__add p span {
  font-weight: 600;
  cursor: pointer;
  margin: 0 10px;
}
.new__category__block {
  position: absolute;
  width: 60%;
  top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
}
input[name="newCategory"] {
  border: 1px solid;
  height: 20px;
  font-weight: 100;
}
</style>
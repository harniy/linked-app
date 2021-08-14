<template>
  <div class="login__page">
    <div class="login__block">
      <form @submit.prevent="register">
        <h3 class="login__title">Register</h3>

        <div class="login__username">
          <span class="login__span">Username</span>
          <input
            type="text"
            placeholder="Type your username"
            v-model="username"
            required
          />
          <span class="material-icons-outlined user__icon">account_circle</span>
          <div class="border__bottom"></div>
        </div>

        <div class="register_error" 
        v-if="isRegister"
        >
          <p>this user exists</p>
        </div>
        <div class="password__username">
          <span class="password__span">Password</span>
          <input
            type="password"
            placeholder="Type your password"
            v-model="password"
            required
            autocomplete="on"
          />
          <span class="material-icons-outlined user__icon">lock</span>
          <div class="border__bottom"></div>
        </div>

        <div class="button__section">
          <div class="login__button"></div>
          <button class="button__title">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isRegister: false,
    };
  },
  methods: {
    register() {
      fetch("http://localhost:2000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {

          console.log(data)
          if(data === false) {
            this.isRegister = true
          } else {
            this.setCookies(data)
          }
        });
    },
    setCookies(data) {
      document.cookie = `username=${data.username}`
      document.cookie = `password=${data.password}`

      this.$router.push({ name: 'app' })
    }
  },
};
</script>


<style>
</style>
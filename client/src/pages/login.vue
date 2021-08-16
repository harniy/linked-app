<template>
  <div class="login__page">
    <div class="login__block">
      <form @submit.prevent="login">
        <h3 class="login__title">Login</h3>

        <div class="login__username">
          <span class="login__span">Username</span>
          <input
            type="text"
            placeholder="Type your username"
            required
            v-model="username"
          />
          <span class="material-icons-outlined user__icon">account_circle</span>
          <div class="border__bottom"></div>
        </div>

        <div class="login__error" v-if="loginError === 1">
          <p>
            User not find! Please check your login or go to
            <router-link to="/register"
              ><p class="register__link">SIGN UP</p></router-link
            >
          </p>
        </div>
        <div class="login__error" v-else-if="loginError === 2">
          <p>Password is not correct</p>
        </div>

        <div class="password__username">
          <span class="password__span">Password</span>
          <input
            type="password"
            placeholder="Type your password"
            required
            v-model="password"
            autocomplete="on"
          />
          <span class="material-icons-outlined user__icon">lock</span>
          <div class="border__bottom"></div>
        </div>

        <div class="button__section">
          <div class="login__button"></div>
          <button class="button__title">login</button>
        </div>

        <div class="sign__up">
          <p>or</p>
          <router-link to="/register"><p>SIGN UP</p></router-link>
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
      loginError: 0,
      errorInfo: "",
    };
  },
  methods: {
    login() {
      fetch(`${this.getPort}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then(this.getLinks())
        .then((data) => this.loginInfo(data));
    },
    loginInfo(data) {
      if (data === false) {
        this.loginError = 1;
        return;
      }
      if (data.password !== this.password) {
        this.loginError = 2;
        return;
      }
      if (data.username === this.username && data.password === this.password) {
        this.workWithCookies(data);
        this.$router.push({ name: "app" });
      }
    },
    getLinks() {
      fetch(`${this.getPort}/getLinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.$store.dispatch("setAllUserLinks", data.links);
        });
    },
    workWithCookies(data) {
      let date = new Date();
      date.setDate(date.getDate() + 7); // прибавляем один день
      date = date.toUTCString();
      console.log(date);
      document.cookie = `username=${data.username}; expires=${date} `;
      document.cookie = `password=${data.password}; expires=${date} `;
    },
    getCookiesUsername() {
      const results = document.cookie.match(/username=(.+?)(;|$)/);
      return results[1];
    },
    getCookiesPassword() {
      const results = document.cookie.match(/password=(.+?)(;|$)/);
      return results[1];
    },
  },
  computed: {
    getPort() {
      return this.$store.getters.getServerPort;
    },
  },
  mounted() {
    let cook = document.cookie;
    if (cook !== "") {
      this.$store.dispatch("setCookies", cook);
      this.username = this.getCookiesUsername("username");
      this.password = this.getCookiesPassword("password");
      this.login();
    }
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&display=swap");

.login__page {
  background-image: url("../assets/bg-01.jpg");
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login__block {
  background: #fff;
  padding: 50px;
  border-radius: 5px;
  width: 400px;
}
.login__title {
  font-size: 2.2rem;
  font-weight: 700;
}

.login__username {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
}

span.login__span {
  color: #333;
  line-height: 3rem;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  height: 45px;
  padding: 0 20px 0 35px;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Noto Sans TC", sans-serif;
}

input[type="text"]:focus + .user__icon {
  color: #bc70e3;
}
input[type="password"]:focus + .user__icon {
  color: #bc70e3;
}

::placeholder {
  color: rgb(179, 179, 179);
  opacity: 1;
}
.border__bottom {
  background: #eaeaea;
  height: 2px;
  width: 100%;
  transition: 0.2s ease-out;
}
.user__icon {
  position: absolute;
  bottom: 13px;
  color: #c6c6c6;
  transition: 0.2s linear;
}

/* user password */

.password__username {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
  margin: 35px 0;
}

input[type="text"]:focus ~ .border__bottom {
  background: #696969 !important;
}
input[type="password"]:focus ~ .border__bottom {
  background: #696969 !important;
}

/* button */

.button__section {
  width: 100%;
  height: 50px;
  overflow: hidden;
  z-index: 10;
  position: relative;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(
    right,
    #00dbde,
    #fc00ff,
    #00dbde,
    #fc00ff
  );
  cursor: pointer;
  position: absolute;
  width: 300%;
  height: 100%;
  left: -100%;
  z-index: 1;
  transition: 0.3s ease-out;
}

.button__title {
  position: absolute;
  color: #fff;
  z-index: 20;
  font-family: "Noto Sans TC", sans-serif;
  padding: 10px 180px;
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
}

.button__section:hover .login__button {
  left: 0;
}

.sign__up {
  padding: 50px 0 10px 0;
  font-size: 15px;
}

.sign__up p {
  padding-top: 10px;
  margin: 0;
}

.register__link {
  font-weight: 600;
}
</style>
<template>
    <div class="app__section" v-if="isUser">
        <Menu />
        <App />
    </div>
</template>

<script>
import Menu from '../components/app_page/menu.vue'
import App from '../components/app_page/appBlock.vue'

export default {
    components: {Menu, App},
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
        }
    },
    methods: {
    extraxtCookieInfo(text, cook) {
        let arr = cook.replace(/[" "]/g, '').split(';')

        let a = arr.filter(el => el.includes(text))
        let res = a.join('').split('=')[1]
        return res
    }
    },
    computed: {
        isUser() {
            return this.user.username !== undefined && this.user.password !== undefined ? true : false
        }
    },
    watch: {
        isUser() {
            this.$router.push({name: 'login'})
        }
    },
    mounted() {
        let cook = document.cookie
        this.user.username = this.extraxtCookieInfo('username', cook)
        this.user.password = this.extraxtCookieInfo('password', cook)      
        
        this.$store.dispatch('setCookies', cook)
        this.$store.dispatch('setUserInfo', this.user)
    }
}
</script>


<style>
.app__section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
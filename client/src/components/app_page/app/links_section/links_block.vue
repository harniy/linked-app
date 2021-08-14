<template>
  <div class="all_links_section">
    <YoutubeMode v-if="youtubeMode" />

    <div class="all_links" v-if="links.length && !youtubeMode">
      <div
        class="user_link_block"
        v-for="(link, i) in paginationLinks"
        :key="i"
        :data-filter="link.category"
        :class="{ youtube: youtubeLinks(link.url) }"
      >
        <div class="link_img">
          <img
            src="@/assets/youtube.png"
            alt=""
            v-if="youtubeLinks(link.url)"
          />
          <img src="@/assets/logo.png" alt="" v-else />
        </div>
        <div class="link_info_block">
          <h4 class="link_name_block">
            Name:
            <span class="link_name" :title="link.name">{{
              link.name.length > 45
                ? link.name.slice(0, 45) + " ..."
                : link.name
            }}</span>
          </h4>
          <h4>
            Category: <span>{{ link.category }}</span>
          </h4>
          <h4>
            Link:
            <span
              ><a
                :href="link.url"
                target="blank"
                class="link__url"
                :title="link.url"
                >{{
                  link.url.length > 50
                    ? link.url.slice(0, 50) + " ..."
                    : link.url
                }}</a
              ></span
            >
          </h4>
        </div>

        <div class="remove__link">
          <span
            class="material-icons close__btn"
            title="remove"
            @click="removeLink(link)"
            >close</span
          >
        </div>
      </div>
    </div>
    <div class="no__links" v-else-if="!links.length">
      <h3>No links saved !</h3>
    </div>

    <div class="no__search__result" v-if="searchError">
      <h3>No search result!</h3>
    </div>

    <div class="paginations">
      <ul>
        <li
          v-for="i in paginationPages"
          :key="i"
          :class="{ pagination__active: i === 1 }"
          @click="setPage(i), activePaginationPage($event)"
        >
          {{ i }}
        </li>
      </ul>
    </div>

    <PlayerBtn v-if="youtubeBtn" />
  </div>
</template>

<script>
import PlayerBtn from "./youtube/player-btn.vue";
import YoutubeMode from "./youtube/youtube-mode.vue";

export default {
  components: { PlayerBtn, YoutubeMode },
  data() {
    return {
      user: {},
      paginationLinks: [],
      onPage: 20,
      current: 1,
    };
  },
  methods: {
    getLinks() {
      fetch("http://localhost:2000/getLinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.userInfo.username,
          password: this.userInfo.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.$store.dispatch("setAllUserLinks", data.links);
          this.setPage(this.current);
        });
    },
    removeLink(data) {
      let link = data;
      let user = this.$store.getters.getUserInfo;

      fetch("http://localhost:2000/removeLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
          user: user,
        }),
      }).then(this.$store.dispatch("reloadLinks", true));
    },
    /* youtube image */
    youtubeLinks(url) {
      if (url !== undefined) {
        if (url.includes("youtu")) {
          return true;
        }
      }
    },
    /* PAGINATIONS */
    setPage(page = 1) {
      this.paginationLinks = [];

      this.current = page;
      const current =
        page * this.onPage === this.onPage
          ? 0
          : page * this.onPage - this.onPage;
      const linksNum =
        current + this.onPage > this.links.length
          ? this.links.length
          : current + this.onPage;

      for (let i = current; i < linksNum; i++) {
        this.paginationLinks.push(this.links[i]);
      }
    },
    activePaginationPage(e) {
      const pages = document.querySelectorAll(".paginations ul li");
      pages.forEach((el) => {
        if ([...el.classList].includes("pagination__active")) {
          el.classList.remove("pagination__active");
        }
      });
      e.target.classList.add("pagination__active");
    },
  },
  computed: {
    paginationPages() {
      return Math.ceil(this.links.length / this.onPage);
    },
    links() {
      return this.$store.getters.getAllLinks;
    },
    searchError() {
      return this.$store.getters.getSearchError;
    },
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    youtubeMode() {
      return this.$store.getters.getYoutubeMode;
    },
    youtubeBtn() {
      return this.$store.getters.getYoutubeBtn
    }
  },
  watch: {
    "$store.state.cookies": function () {
      this.user = this.$store.getters.getUserInfo;
      this.getLinks();
    },
    "$store.state.isReload": function () {
      if (this.$store.getters.refreshLinks === true) {
        this.getLinks();
        this.setPage();
        this.$store.dispatch("reloadLinks", false);
      }
    },
    links() {
      this.youtubeLinks();
    },
  },
  mounted() {
    this.$store.dispatch("reloadLinks", true);
  },
};
</script>


<style>
@import "../../../../assets/pagination.css";

.all_links_section {
  width: 100%;
  height: 80%;
}
.all_links {
  padding: 20px;
  display: inline-block;
  width: 96%;
}
.user_link_block {
  width: 22%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #74dbef;
  border-radius: 20px;
  flex-direction: column;
  min-height: 265px;
  float: left;
  margin: 1%;
  position: relative;
  max-height: 265px;
  color: #475e80;
}
.user_link_block:hover .close__btn {
  color: #525e68;
}
.close__btn {
  position: absolute;
  top: 7px;
  right: 13px;
  cursor: pointer;
  color: #9aa1a8;
  transition: 0.3s;
}
.link_img {
  width: 70px;
  height: 70px;
  margin: 20px 0 10px 0;
}

.link_img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  background: aquamarine;
}

.link_info_block h4 {
  margin: 5px 0;
  font-size: 15px;
  word-wrap: break-word;
  width: 100%;
}

.link_info_block h4 span {
  font-family: "Noto Sans TC";
  line-height: 0;
  text-overflow: ellipsis;
  color: #434064;
  font-weight: 100;
}

.link_info_block h4 span a {
  font-weight: 600;
  color: #3672a8;
}

.link_info_block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 90%;
  text-align: left;
  padding-bottom: 20px;
}
.no__links {
  color: rgb(136, 136, 136);
}
.youtube {
  background-color: #ff6f3c !important;
  color: #fffdfd;
}
.youtube span,
.youtube a {
  color: #fff0e9 !important;
}

.youtube .link_img img {
  background-color: #ff8f5f !important;
}
</style>
<template>
  <div class="youtube__player__btn">
    <span
      class="material-icons-sharp player__mode__btn"
      title="player mode"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      @click="playerModeOn"
      ref="btn"
      >play_circle_filled</span
    >
    <p v-if="isHover">
      <span v-if="btnInfo">link mode</span>
      <span v-else>player mode</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    playerModeOn() {
      const currentMode = this.$store.getters.getYoutubeMode;

      this.$store.dispatch("ytbModeChange", !currentMode);
    },
  },
  computed: {
    btnInfo() {
      return this.$store.getters.getYoutubeMode;
    },
  },
};
</script>


<style>
.youtube__player__btn {
  position: fixed;
  bottom: 0px;
  right: 55px;
  width: 100px;
  height: 100px;
  user-select: none;
}
.player__mode__btn {
  color: #1e92be;
  font-size: 45px !important;
  cursor: pointer;
  opacity: 0.5;
  z-index: 20;
  transition: 0.3s;
}
.player__mode__btn:hover {
  opacity: 1;
}
.youtube__player__btn p {
  margin: 0;
  animation-name: slideInDown;
  animation-duration: 0.4s;
  z-index: 10;
}

.animate__btn {
  font-size: 50px !important;
}

@keyframes slideInDown {
  0% {
    transform: translate(0px, -10px);
    opacity: 0;
  }
  100% {
    transform: translate(0px, 0px);
    opacity: 1;
  }
}
</style>
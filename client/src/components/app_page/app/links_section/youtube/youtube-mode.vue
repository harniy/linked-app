<template>
  <div class="all_links">
    <div
      class="player__section"
      v-for="(video, idx) in youtubeLinks"
      :key="idx"
    >
      <iframe
        width="100%"
        height="100%"
        :src="editYoutubeLink(video.url)"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <a
        class="youtube__link__name"
        :title="video.name"
        :href="video.url"
        target="blank"
        >
        {{
          video.name.length > 25 ? video.name.slice(0, 25) + " ..." : video.name
        }}</a
      >
    </div>
  </div>

  <!-- https://www.youtube.com/watch?v=-yOBAYDYrOM&ab_channel=KushSessions -->
  <!-- https://www.youtube.com/embed/-yOBAYDYrOM -->
</template>



<script>
export default {
  data() {
    return {};
  },
  methods: {
    editYoutubeLink(link) {
      let x = link.split("&");
      let url = x[0].replace("watch?v=", "embed/");
      return url;
    },
  },
  computed: {
    youtubeLinks() {
      let res = [];
      let links = this.$store.getters.getAllLinks;

      links.forEach((el) => (el.url.includes("youtu") ? res.push(el) : ""));
      return res;
    },
  },
};
</script>


<style>
.player__section {
  width: 30%;
  height: 220px;
  float: left;
  padding: 2% 1%;
}
a.youtube__link__name {
  margin: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
<template>
  <div class="about-page">
    <!--<div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>-->
    <p class="mt20 tc" v-if="gitHubCommitListState">
      <img src="../assets/404.svg" alt="404">
    </p>
    <!--<div class="loader st-loader">
      <div class="loader-inner pacman"><div></div><div></div><div></div><div></div><div></div></div>
    </div>-->

    <st-loader v-if="refreshing"></st-loader>
    <mu-stepper class="about-page" orientation="vertical">
      <mu-step v-for="item in gitHubCommitList">
        <mu-step-label>
          {{item.commit.author.name}}
        </mu-step-label>
        <mu-step-content :active="true">
          <p>
            {{item.commit.message}}
            <a :href="item.html_url" target="_blank">点击查看</a>
          </p>
        </mu-step-content>
      </mu-step>
    </mu-stepper>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      gitHubCommitList: [],
      gitHubCommitListState: false,
      refreshing: false
    }
  },
  created () {
    this.getGitHubCommits()
  },
  methods: {
    getGitHubCommits: function () {
      let vm = this
      vm.refreshing = true
      api.get('https://api.github.com/repos/ChaoLeer/strun-vue/commits', {
        since: '2017-06-22T19:05:00Z'
      }).then(res => {
        // console.info(res.data)
        vm.gitHubCommitList = res.data
        vm.refreshing = false
        vm.gitHubCommitListState = false
      })
      .catch((e) => {
        // console.info(e.response.data.message)
        vm.$toast(e.response.data.message, 'top', 3600)
        vm.refreshing = false
        vm.gitHubCommitListState = true
      })
    }
  }
}
</script>


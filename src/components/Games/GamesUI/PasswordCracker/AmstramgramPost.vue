<script lang="ts">
import type { PropType } from 'vue'

export interface Post {
  username: string
  description: string
  date: string
  profilePicUrl: string
  imageUrl: string
  numberOfLikes: number
}
export default {
  props: {
    post: Object as PropType<Post>,
  },
}
</script>

<template>
  <div class="amstramgram-post">
    <div class="amstramgram-bar amstramgram-header">
      <div class="amstramgram-icon">
        <div class="circle-picture">
          <img :src="post.profilePicUrl" :alt="`${post.username} profile picture`">
        </div>
      </div>
      <div class="amstramgram-username">
        <strong>{{ post.username }}</strong>
      </div>
      <div />
    </div>
    <div class="amstramgram-picture">
      <img :src="post.imageUrl" :alt="`${post.username} image post`">
    </div>

    <div class="amstramgram-bar amstramgram-footer">
      <div class="amstramgram-icon">
        <i-fa6-regular-heart />
      </div>
      <div class="amstramgram-icon second-icon">
        <i-fa6-regular-comment />
      </div>
    </div>
    <div class="amstramgram-like-bar">
      <span>{{ post.numberOfLikes }} J'aime</span>
    </div>
    <div class="amstramgram-description">
      <span>{{ post.description }}</span>
    </div>
    <div class="amstramgram-date amstramgram-description">
      <span>{{ post.date }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  .amstramgram-post {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
  }
  .amstramgram-bar {
    display: grid;
    height: 60px;
    align-items: center;
    div {
      display: flex;
    }
  }
  .amstramgram-header {
      grid-template-columns: 80px 120px auto;
  }
  .amstramgram-footer {
    grid-template-columns: 60px 60px auto;
    height: 40px;
  }
  .circle-picture {
    width: 50px;
    border-radius: 200px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .amstramgram-icon {
    justify-content: flex-start;
    padding-left: 15px;
    font-size: 24px;
  }
  .amstramgram-picture {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .amstramgram-like-bar {
    font-size: 12px;
    font-weight: 600;
    padding: 0 15px;
  }
  .amstramgram-description {
    font-size: 12px;
    padding: 4px 15px;
  }
  .amstramgram-date {
    color: #9f9f9f;
    border: #cacaca;
    text-transform: uppercase;
    margin-top: -7px;
  }
  .amstramgram-username {
    font-size: 14px;
  }
  .second-icon {
    padding-left: 10px;
  }
</style>

<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ post.date | date }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <img :src="post.imageUrl"
             alt="post image">
      </div>
    </header>
    <main class="post-content">

      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"
        :postId="post._id"
      />
      <div v-if="post.comments.length">
        <app-comment
          v-for="item in post.comments"
          :key="item._id"
          :comment="item"
        />
      </div>
    <div class="text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
  import AppComment from '@/components/main/Comment'
  import AppCommentForm from '@/components/main/CommentForm'

  export default {
    validate({params}) {
      return Boolean(params.id)
    },
    head() {
      return {
        title: `${this.post.title} | ${process.env.appName}`,
        meta: [
          {hid: `post - ${this.post._id}`, name: 'description', content: this.post.title},
          {hid: `post - ${this.post._id}`, name: 'keywords', content: 'post, vue, nuxt'},
        ]
      }
    },
    async asyncData({store, params}) {
      const post = await store.dispatch('post/fetchById', params.id)
      await store.dispatch('post/addView', post)
      return {post: {...post, views: ++post.views}}
    },
    data() {
      return {
        canAddComment: true
      }
    },
    methods: {
      createCommentHandler(comment) {
        this.post.comments.unshift(comment)
        this.canAddComment = false
      }
    },
    components: {
      AppComment,
      AppCommentForm
    }
  }
</script>

<style scoped>
  .post {
    margin: 0 auto;
    max-width: 600px;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
  }
</style>

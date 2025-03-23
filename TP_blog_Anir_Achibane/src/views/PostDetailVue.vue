<template>
    <div class="PostDetail">
        <div v-if="blog">
            <div class="sniprow">
                <p class="title">Title: </p>
                <p>{{ blog.title }}</p>
            </div> 
            <div class="sniprow">
                <p class="title">Tag:</p>
                <p>{{ blog.tag }}</p>
            </div>
            <p class="title" id="content">Content:</p>
            <p class="blog">{{ blog.article }}</p>
            <div class="snipinput">
                <router-link to="/" class="back-link">
                    <input type="button" value="Back to Posts">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostDetail',
    data(){
        return{
            blog: null,
        }
    },
    created() {
    const id = this.$route.params.id;
    fetch(`http://localhost:3000/blogs/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        return response.json();
      })
      .then(data => {
        this.blog = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
</script>

<style scoped>
.PostDetail {
    max-width: 800px;
    margin: 2rem auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sniprow {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.title {
    font-weight: bold;
    margin: 0;
}

.blog {
    white-space: pre-wrap;
    line-height: 1.6;
    margin: 1rem 0;
}
.sniprow p {
    margin: 0;
    line-height: 1.5;
}

.sniprow .title {
    min-width: 100px;
    text-align: right;
}
.loading {
    color: #666;
    text-align: center;
    padding: 2rem;
}

.error {
    color: #ff4444;
    text-align: center;
    padding: 2rem;
}

.back-link {
    display: inline-block;
    margin-top: 2rem;
}

input[type="button"] {
    padding: 8px 16px;
    background: rgb(3, 105, 69);
    box-shadow: 0px 1px 1px black;

    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type="button"]:hover {
    opacity: 75%;
}
input[type="button"]:active {
    box-shadow: none;
}
</style>
<template>
  <div class="tag-cloud">
    <h3>Tags: </h3>

      <span 
        v-for="tag in uniqueTags" 
        :key="tag" 
        class="tag"
      >
      <router-link :to="`/tags/${tag}`" >
        <input type="button" v-bind:value=tag>
      </router-link>
      </span>

  </div>
</template>

<script>
export default {
  name: "TagCloud",
  props: {
    blogs: {
      type: Array,
      required: true,
    },
  },
  computed: {
   uniqueTags() {
    return [...new Set(this.blogs.map((blog) => blog.tag))];
    },
  },
};
</script>

<style scoped>
.tag-cloud {
  gap:10px;
  padding: 1rem;
  display:flex;
  flex-direction: row; margin-top:20px;
  border: black 1px solid; border-radius: 10px;
  justify-content: center;
  align-content: center;
  width:45%;
  align-self: center; justify-self: center;
}
.tag-cloud h3{
  position: relative;
  bottom: 0.5rem;
  margin-right: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag input{
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 5px; border:none;
  font-family: Arial, Helvetica, sans-serif; font-weight: bold;
  font-size: 0.9rem;
}
.tag input[type="button"]:hover{
  cursor: pointer; opacity: 75%;
}
.tag input[type="button"]:active{
  opacity:50%
}
</style>
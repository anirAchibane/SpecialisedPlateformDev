<template>
<nav-bar :editEnable="editEnable" @toggle-edit="ToggleEdit"></nav-bar>
<h1>Tagged blogs: {{ tags }}</h1>
 <div class="Postlist">
         <single-post  class="Postsnippet"
          v-for="blog in filteredBlogs"
          :key="blog.id"
          :blog="blog"
          :edit-Enable="editEnable"
        />

    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SinglePost from '@/components/SinglePost.vue'

export default{
    components:{
        SinglePost,
        NavBar
    },
    data(){
        return{
            editEnable: "Edit post",
            blogsList: []
        }
    },
    async created(){
        try{
            const response = await fetch('http://localhost:3000/blogs');
            this.blogsList = await response.json();
        }catch(error){
            console.log(error);
        }
        },
    methods:{

        ToggleEdit(){
            this.editEnable = this.editEnable === "Edit post" ? "Cancel" : "Edit post";
        }
    }, 
    computed: {
        filteredBlogs() {
            return this.blogsList.filter(blog => blog.tag === this.$route.params.tag);
        }
    }
}
</script>

<style scoped>

.Postlist{
    justify-self: center; align-self: center;
    width:50%; padding:15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: rgb(0, 194, 126);
    border-radius: 15px;
}
.Postsnippet{
    width:100%;
    margin-top: 10px;
    display: flex; flex-direction: column;
    justify-content: space-between;
    border-radius: 8px; border:1px solid black;
    
}
</style>
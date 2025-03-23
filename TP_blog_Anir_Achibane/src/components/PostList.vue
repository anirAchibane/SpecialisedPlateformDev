<template>
    <nav-bar :editEnable="editEnable" @toggle-edit="ToggleEdit"></nav-bar>
    <tag-cloud :blogs="blogsList" id="tagCloud"></tag-cloud>
    <p id="blogstitle">Blogs:</p>
    <div class="Postlist">
         <single-post 
          v-for="blog in blogsList" 
          :key="blog.id" 
          :blog="blog"
          :edit-Enable="editEnable"
        />

    </div>
</template>

<script>

import SinglePost from './SinglePost.vue'
import NavBar from '@/components/NavBar.vue'
import TagCloud from './TagCloud.vue'

export default{
    components:{
        NavBar,

        SinglePost,
        TagCloud
    },
    data(){
        return{
            editEnable: "Edit post",
            blogsList: []
        }
    },
    methods:{
        ToggleEdit(){
            this.editEnable = this.editEnable === "Edit post" ? "Cancel" : "Edit post";
        }
    },
    async created(){
        try{
            const response = await fetch('http://localhost:3000/blogs');
            this.blogsList = await response.json();
        }catch(error){
            console.log(error);
        }
        }
}

</script>

<style scoped>

#blogstitle{
    position: relative; right:21%;
    font-weight: bold; font-size: 20px;
}
#tagCloud{
    margin-bottom: 30px;
}
.Postlist{
    justify-self: center; align-self: center;
    width:700px;
    border-radius: 20px;
    padding:15px;
    background-color: rgb(0, 194, 126);
}
</style>
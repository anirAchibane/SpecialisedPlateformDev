<template>

    <form @submit.prevent="confirm()" class="form" v-if="blog">
    <div>
        <div class="inrow"><label>Title: </label>
             <input type="text" v-model="blog.title">
        </div>
        <div class="inrow"><label>Tag: </label>
             <input type="text" v-model="blog.tag">
        </div>
        <div class="inrow"><label>Article: </label>
             <textarea v-model="blog.article"></textarea>
        </div>
    </div>
    <div class="inrowbut">
    <input type="submit" value="Confirm Edit">
    <router-link to="/">
    <input type="button" value="Cancel" id="cancel">
    </router-link>
    <input id="delete" type="button" value="Delete" @click="remove()">
    </div>
    </form>
</template>

<script>


export default{

    data(){
        return{
            isDeleting : false,
            blog: null,
        }
    },
    methods: {
    async confirm() {
      const updatedBlog = {
        title: this.blog.title,
        tag: this.blog.tag,
        article: this.blog.article,
      };
      try {
        await fetch(`http://localhost:3000/blogs/${this.$route.params.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBlog),
        });
        this.$router.push('/');
      } catch (error) {
        console.error("Couldn't edit blog", error);
      }
    },
    async remove(){
        this.isDeleting = true;
        try{
            const postID = this.$route.params.id;
            const response = await fetch(`http://localhost:3000/blogs/${postID}`, {
                method: 'DELETE'
            });
            if(!response.ok){
                throw new Error("Failed to delete blog");
            }}
            catch(error){
                console.error("Error:", error);
            }
            finally{
                this.isDeleting = false;
                this.$router.push('/');
            }
        }
    },
    async created(){
        try{
            const ID = this.$route.params.id;
            const response = await fetch(`http://localhost:3000/blogs/${ID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            const data = await response.json();
            this.blog = data;
        }
        catch(error){
            console.error("Error:", error);
        }
    }
}
</script>

<style scoped>
.form{
    padding-top: 30px;
    justify-self: center; align-self: center;
    display: flex; flex-direction: column;
    border: 1px solid black; border-radius: 20px;
    width:600px;
    height: 500px;
    font-weight: bold
}
.inrow{
    justify-self: center;
    display: flex; flex-direction: row;
    justify-content: space-between;
    width:70%;
    margin-top:10px;
}
.inrow input{
    height: 25px;
}
.inrow textarea{
    height: 300px;
}
.inrow input, .inrow textarea{
    width:300px;
}
.form input[type="submit"], #cancel{
    justify-self: center; align-self: center;
    margin-top:30px;
    width:150px; height: 35px;
    border:none; border-radius: 7px;
    background-color: rgb(0, 194, 126); color:white;
    font-weight: bold;
    box-shadow: 0px 1px 1px black;
}
.form input[type="submit"]:hover, #cancel:hover{
    cursor: pointer; opacity: 75%;
}
.form input[type="submit"]:active, #cancel:active{
    box-shadow: none;
}
.inrowbut{
    display: flex;
    flex-direction: row;
    justify-content: center; align-items: center;
    gap:10px;
}
#delete{
    position:  relative; top: 15px;
    justify-self: center; align-self: center;
    width:150px; height: 35px;
    border:none; border-radius: 7px;
    background-color: rgb(161, 38, 0); color:white;
    font-weight: bold;
    box-shadow: 0px 1px 1px black;
}
#delete:hover{
    cursor: pointer; opacity: 75%;
}
#delete:active{
    box-shadow: none;
}
</style>
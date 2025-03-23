<template>
    <div class="Postsnippet">
       <div class="sniprow"><p class="title">Title: </p><p>{{ blog.title }}</p></div> 
        <div class="sniprow"><p class="title">Tag:</p><p>{{ blog.tag  }}</p></div>
        <p class="title" id="content">Content:</p>
        <div class="article"><p>{{ blog.article.substring(0, 50)}}...</p></div>
        <div class="snipinput">
        <router-link :to="`/post/${blog.id}`">
            <input type="button" value="Read Article">
        </router-link>
        <router-link :to="`/edit/${blog.id}`">
            <input id="edit" type="button" value="Edit" v-if="editEnable == 'Cancel'">
        </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SinglePost',
    props: {       
        blog: {
            type: Object,
            required: true
        },
        editEnable:{
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.snipinput {
  display: flex;
  justify-content: center;align-content: center;
  flex-direction: row; 
  gap: 10px;
}
.Postsnippet{
    margin-top: 10px;
    display: flex; flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    background-color: white;
}
.Postsnippet input{
  height:30px; width:100px;
  margin-bottom: 10px;
  border: none;
    border-radius: 5px;
    background-color: rgb(3, 105, 69); color:white;
    box-shadow: 0px 1px 1px black;
    font-family: Arial, Helvetica, sans-serif; font-weight: bold;
}
.Postsnippet input:hover{
  cursor: pointer; opacity: 75%;
}
.Postsnippet input:active{
  box-shadow: none;
}
.sniprow{
    justify-self: center; align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:20%;
}
.title{
  font-weight: bold;
}
#content{
  position: relative; right:35px;
}
.article{
  display: flex;
  flex-direction: row;
  border:1px solid black; border-radius: 10px;
  height: 50px; margin: 10px; justify-content: left; align-content: left;
}
</style>
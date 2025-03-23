<template>
    <div class="navBar">
    <router-link to="/">
        <input type="button" value="Home">
    </router-link>
    <router-link to="/create">
        <input type="button" value="New post">
    </router-link>
    <input type="button" :value="editEnable" v-on:click="$emit('toggleEdit')">
    </div>
</template>

<script>

 export default{
    props:{
        editEnable: {
            type: String,
            required: true
        }
        }
}

</script>
<style scoped>
.navBar{
    border: 1px solid black;
    height: 50px; width:100%;
    display: flex; flex-direction: row;
    align-items: center;justify-content: center;
    gap:10px;
    background-color: rgb(0, 194, 126); border-radius: 10px;
    border: none
}   
.navBar input{
    width: 100px; height: 30px;
    border: none;
    border-radius: 5px;
    background-color: rgb(3, 105, 69); color:white;
    box-shadow: 1px 1px 1px black;
    font-family: Arial, Helvetica, sans-serif; font-weight: bold;
}
.navBar input:hover{
    cursor: pointer; 
}
.navBar input:active{
    box-shadow: none;
}
</style>

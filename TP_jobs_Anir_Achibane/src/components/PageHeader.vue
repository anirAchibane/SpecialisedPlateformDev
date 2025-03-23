<template>
    
    <div class="head"> 
        <router-link to="/"><input type="button" value="Acceuil"></router-link>
        <h1>Pôle Emploi</h1>
    </div>
</template>

<style scoped>
.head{
    display: flex;
    flex-direction: row;
    justify-content: space-between; align-items: center;
    border-radius: 15px;
    background-color: rgb(18, 42, 97);
}
.head h1{
    color: white;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    position: relative; right: 30px
}
.head input{
    height: 50px; width: 100px;
    font-size: 17px; font-weight: bold;
    position: relative; left: 30px;
    border-radius: 10px; border: none;
    background-color:rgb(156, 156, 230); color:white
}
.head input:hover{
    background-color:rgb(181, 181, 225);
    cursor: pointer;
}
.head input:active{
    background-color:rgb(200, 200, 222);
}
</style>
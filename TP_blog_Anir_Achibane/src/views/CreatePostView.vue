<template>

    <form @submit.prevent="submitblog()" class="form">
    <div>
        <div class="inrow"><label>Title: </label>
             <input type="text" v-model="title">
        </div>
        <div class="inrow"><label>Tag: </label>
             <input type="text" v-model="tag">
        </div>
        <div class="inrow"><label>Article: </label>
             <textarea v-model="article"></textarea>
        </div>
    </div>
    <div class="inrowbut">
    <input type="submit" value="Confirm">
    <router-link to="/">
    <input type="button" value="Cancel" id="cancel">
    </router-link>
    </div>
    </form>
</template>

<script>


export default{

    data(){
        return{
            title:'',
            tag:'',
            article:''
        }
    },
    methods: {
    submitblog() {
        const newBlog = {
            title: this.title,
            tag: this.tag,
            article: this.article
        };
        fetch('http://localhost:3000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
        .then(response => response.json())
        .then(() => {  
            this.$router.push('/');
        })
        .catch(error => {
            console.log(error);
        });
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

</style>
<template>
    <page-header></page-header>
    <form @submit.prevent="submitJob()">
    <div class="actualForm">
        <div class="formrow"><label>Titre: </label> <input type="text" v-model="titre"></div>
        <div class="formrow"><label>Description: </label> <textarea v-model="desc"></textarea></div>
        <div class="formrow"><label>Salaire annuel: </label> <input type="text" v-model="salaire"></div>
        <div class="formrow"> <label>Date de création: </label> <input type="text" v-model="dateDeCreation"></div>
        <input type="submit" value="valider">
    </div>
    </form>
</template>

<script >

import PageHeader from './PageHeader.vue';
    export default{
        components:{
            PageHeader
        },
        data(){
            return {
                titre: "",
                desc: "",
                salaire: "",
                dateDeCreation: "",
                jobs2: {}
            }
        },

        methods: {
    async submitJob() {
      const newJob = {
        titre: this.titre,
        description: this.desc,
        salaire: this.salaire + ' MAD/an',
        date_de_création: this.dateDeCreation
      };

      try {
        const response = await fetch('http://localhost:3000/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newJob)
        });

        const addedJob = await response.json();
        console.log('Added job:', addedJob); 
        this.$router.push('/'); 
      } catch (err) {
        console.error('Failed to add job:', err);
      }
    }
  },
        mounted(){
            fetch('http://localhost:3000/jobs')
            .then(response => response.json())
            .then(data => this.jobs2 = data)
            .catch(err => console.log(err))
        }
    }
</script>

<style scoped>
.actualForm{
    margin-top:30px;
    display: flex;
    flex-direction: column;
    justify-self: center; align-self: center;
    gap:10px;
    justify-content: center; align-items: center;
}
.actualForm input[type="submit"]{
    height: 40px; width:100px;
    height: 50px; width: 100px;
    font-size: 17px; font-weight: bold;
    border-radius: 10px; border: none;
    background-color:rgb(156, 156, 230); color:white
}
.actualForm input[type="submit"]:hover{
    cursor: pointer; opacity: 75%;
}
.actualForm input[type="submit"]:active{
    opacity: 50%;
}
.formrow{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:400px;
    font-family: Arial, Helvetica, sans-serif; font-weight: bold;
}
.formrow input{
    height: 30px;
    font-size: 14px;
}
</style>
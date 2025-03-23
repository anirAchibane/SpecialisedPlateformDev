<template>
    <page-header></page-header>
    <form @submit.prevent="confirm">
    <div class="actualForm">
        <div class="formrow"><label>Titre: </label> <input type="text" v-model="titre"></div>
        <div class="formrow"><label>Description: </label> <textarea v-model="desc"></textarea></div>
        <div class="formrow"><label>Salaire annuel: </label> <input type="text" v-model="salaire"></div>

        <input type="submit" value="confirmer">
    </div>
    </form>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      id: null,
      titre: '',
      desc: '',
      salaire: '',
      dateDeCreation: '',
    };
  },
  methods: {
    async confirm() {
      const updatedJob = {
        titre: this.titre,
        description: this.desc,
        salaire: this.salaire + 'MAD/an',
        date_de_création: this.dateDeCreation,
      };

      try {
        await fetch(`http://localhost:3000/jobs/${this.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedJob),
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    },
  },
  mounted() {
  this.id = this.$route.params.id;
  console.log('Editing job with ID:', this.id); 

  fetch(`http://localhost:3000/jobs/${this.id}`)
    .then((res) => res.json())
    .then((job) => {
      this.titre = job.titre;
      this.desc = job.description;
      this.salaire = job.salaire?.replace('MAD/an', '') || '';
      this.dateDeCreation = job.date_de_création;
    })
    .catch((err) => console.error(err));
}

};
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
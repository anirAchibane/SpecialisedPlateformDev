<template>
    <div class="detail" v-if="job">
        <p>{{ job.description }}</p>
        <div class="detailRow"><div><p>{{ job.salaire }}</p></div> <div><p>{{job.date_de_création}}</p></div></div>
        <div class="detailRow"></div>
        <div class="detailRowinput">
        <router-link :to="`/jobs/${job.id}`"><input type="button" value="Modifier"></router-link>
        <input type="button" value="supprimer" @click="remove(job.id)">
        </div>
    </div>
</template>

<script >
    export default{
        props: {
            job: {
                type : Object,
                required: true,
                validator: (value) => {
                    return 'description' in value && 'salaire' in value;
                }
            }
        },
        methods: {
    async remove(jobID) {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${jobID}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          console.log(`Deleted job ${jobID}`);
          this.$emit('job-deleted', jobID); 
          this.$router.go(); 
        } else {
          console.error(`Failed to delete job ${jobID}`, response.status);
        }
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  }


}
            
</script>

<style scoped>
    .detail{
        display: flex; flex-direction:column;
        justify-content: center; align-items: center;
    }
    .detailRow{
        display: flex; flex-direction: row;
        justify-content: space-between;
        width: 100%;

    }
    .detailRowinput{
        display: flex; flex-direction: row;
        gap:20px
    }
    .detail input{
        width:90px;
        height: 30px;
        border-radius: 7px; border:none;
        background-color: rgb(181, 181, 225); color:white;
        font-weight: bold;

    }
    .detail input:hover{
        opacity: 75%; cursor: pointer;
    }
    .detail input:active{
        opacity: 50%;
    }
</style>
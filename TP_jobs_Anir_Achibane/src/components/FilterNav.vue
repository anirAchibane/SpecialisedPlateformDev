<template>
    <div class="container">
    <div class="searchBar">
    <div class="searchBarComp">
        <input type="text" placeholder="Chercher un travail" v-model="search">
        <label>Salaire Min: </label>
        <div class="salaireInput">
        <input type="number" min="0" max="999999" v-model="minSalary">
        <p>MAD</p>
        </div>
    </div>
    <div class="searchBarComp">
           <router-link to="/add">
                 <input id="addJob" type="button" value="Ajouter un emploi">
            </router-link>
        </div>
    </div>
    <div class="jobs">
        <ul v-for="job in show_jobs" :key="job.id">
            <li class="jobItem">
                <p>{{job.titre}}</p>
                <input class="but" type="button" value="Détails" v-on:click="showDetailsjob(job.id)">
                <JobDetail v-if="showDetails[job.id]" :job="job"></JobDetail>
                
            </li>
        </ul>
    </div>
    </div>
</template>


<style scoped>
.container{
    display: flex;
    flex-direction: row;
}
.salaireInput{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:5px
}
.searchBar{
    margin-top:20px; height:150px; width:500px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column; 
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    justify-content: center
}
.searchBarComp{
    display: flex;
    justify-content: center; align-items: center; gap: 30px;
    flex-direction: row;
}
#addJob{
    margin-top:30px;
    height: 40px;
    border-radius: 7px; border:none;
    background-color:  rgb(18, 42, 97); color:white;
    font-weight: bold;
}
.searchBar input{
    height:30px;
}
.but{
    width:90px;
    height: 30px;
    border-radius: 7px; border:none;
    background-color: rgb(181, 181, 225); color:white;
    font-weight: bold;
}
.but:hover ,#addJob:hover{
    opacity: 75%; cursor: pointer;
}
.but:active, #addJob:active{
    opacity: 50%;
}
ul {
    list-style-type: none;
}
.jobItem{
    border: 1px solid black; border-radius: 10px;
    width:500px;
    padding:10px;
}
</style>


<script>
    import JobDetail from './JobDetail.vue'


    export default{
        name: "FilterNav",
        components:{
            JobDetail
        },
        data() {
                return {
                search: "",
                minSalary:0,
                jobs: [],
                showDetails: {}
            }
        },
        methods:{
            showDetailsjob(jobID){
                if(jobID in this.showDetails){
                    this.showDetails[jobID] = !this.showDetails[jobID];
                }
                else{
                    this.showDetails[jobID] = true;
                }
            }

        },
        computed:{
            show_jobs(){
                
                return this.jobs.filter(job => {
                    const matchSearch = job.titre.toLowerCase().includes(this.search.toLowerCase())
                    const matchSalary = Number(this.jobs.salaire) >= this.minSalary
                    return (!this.search && matchSalary)  | matchSearch})

            }
        },
        mounted(){
            fetch("http://localhost:3000/jobs")
            .then(response => response.json())
            .then(data => this.jobs = data)
            .catch(err => console.log(err))
        }
}

</script>
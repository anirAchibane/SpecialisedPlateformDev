<template>
<div id="app">
	<header>
		<img src="/images/logo.png" alt="LOGO">
		<h1>Les Bonnes Pièces</h1>
	</header>

	<!--Barre de recherche-->
	<div class="recherche">
		<input type="text" placeholder="Chercher un produit" v-model="search">
	</div>

	<main>
		<!-- Menu de recherche -->
		<section class="filtres">
			<h3>Filtres</h3>
			<select id="filterChanger" v-model="filterChoice">
				<option value=""> Tout </option>
				<option value="Électricité"> Électricité </option>
				<option value="Filtration"> Filtration </option>
				<option value="Moteur"> Moteur </option>
				<option value="Freinage"> Freinage </option>
				<option value="Refroidissement"> Refroidissement </option>
				<option value="Suspension"> Suspension </option>
				<option value="Sécurité"> Sécurité </option>
				<option value="Transmission"> Transmission </option>
				<option value="Carburant"> Carburant </option>
				<option value="Carrosserie"> Carrosserie </option>
				<option value="Échappement"> Échappement </option>
				<option value="Direction"> Direction </option>
			</select>

			<h3>Trier par</h3>
			<select id="orderChanger" v-model="order">
				<option value=""> Par défaut </option>
				<option value="up"> Prix croissant </option>
				<option value="down"> Prix décroissant </option>
			</select>

			<div id="filtercat"><p>Afficher disponibles</p> <input type="checkbox" v-model="available"></div>

		</section>

		<!-- Fiches produits -->
    <section class="fiches">
        <ul>
          <li class="item" v-for="item in changeOrder" :key="item.id">
            <div class="itemrow">
              <p>{{ item.nom }}</p>
              <p><b>{{ item.prix }} MAD</b></p>
            </div>
            <div>Catégorie: {{ item.categorie }}</div>  
            <img :src="item.image" :alt="item.nom">
            <div class="itemrow">
              Disponible: {{ item.disponible }}
              <input v-show="item.disponible === 'oui'" class="button" type="button" value="Ajouter au panier" @click="ajouter(item)">
            </div>
          </li>
        </ul>
      </section>

		<!--Panier-->
    <section id="panier" class="panier" :style="{ width: '30%', display: panier.length > 0 ? 'inline' : 'none'}">
        <h3 id="panierHead">Panier:</h3>
        <ul>
          <li class="itemPanier" v-for="item in panier" :key="item.id">
            <div class="itemrow">
              <p>{{ item.nom }}</p>
              <p><b>{{ item.prix }} MAD</b></p>
            </div>
            <div>Catégorie: {{ item.categorie }}</div>
            <img :src="item.image" style="height: 200px; width: 200px">
            <input class="button" type="button" value="Retirer" @click="retirer(item)">
          </li>
        </ul>
      </section>

	</main>
</div>
</template>

<script>
export default {
  data() {
    return {
      available: true,
      order: "",
      search: "",
      itemlist: [],
      filterChoice: "",
      panier: []
    };
  },
  computed: {
    changeOrder() {
      let sorted_items = this.itemlist.filter(item => {
        return (
          (!this.available || item.disponible === "oui") &&
          (this.filterChoice === "" || item.categorie === this.filterChoice) &&
          (this.search === "" || item.nom.toLowerCase().includes(this.search.toLowerCase()))
        );
      });

      if (this.order == "up") {
        sorted_items.sort((a, b) => {
          return a.prix - b.prix;
        });
      } else if (this.order == "down") {
        sorted_items.sort((a, b) => {
          return b.prix - a.prix;
        });
      }

      return sorted_items;
    }
  },
  methods: {
    ajouter(item) {
      this.panier.push(item);
    },
    retirer(item) {
      const index = this.panier.indexOf(item);
      if (index > -1) {
        this.panier.splice(index, 1);
      }
    }
  },
  mounted() {
    fetch("pieces-autos.json")
      .then(response => response.json())
      .then(data => {
        this.itemlist = data;
      });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
	max-width: 1200px;
	margin: auto;
	padding: 16px;
	font-family: 'Montserrat', sans-serif;
}

header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
	padding: 8px;
	background-color: #7451eb;
	text-align: center;
	color: white;
}
header img {
	height: 60px;
	margin-left: 1rem;
}
header h1 {
	flex-grow: 1;
}

.recherche{
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #442d90;
	height: 70px;
}

.recherche input{
	height: 40px; width: 50%;
	border-radius: 5px; border: none;
}

main {
	display: flex;
	flex-direction: row;
}

.filtres {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 4px;
	box-shadow: 0px 0px 4px gray;
	margin: 8px;
	padding: 8px;
	min-width: 300px;
	min-height: 400px;
}
#filterChanger{
	width: 60%;	height: 50px;
	font-size: 17px;
}

#orderChanger{
	width: 60%;	height: 50px;
	font-size: 17px;

}
.filtres h3 {
	text-align: center;
}
#filtercat{
	display: flex;
	width: 60%;
	justify-content: space-between;
	padding-top: 7px;
}
#priceDisplay{
	display: flex;
	width: 60%;
	justify-content: space-between;
	padding-top: 7px;
}
#panierHead{
	position: relative;
	left: 40px;
}
.item{
	border-radius: 4px;
	box-shadow: 0px 0px 4px gray;
	padding: 10px;
}
.itemPanier{
	border-radius: 4px;
	box-shadow: 0px 0px 4px gray;
	padding: 10px;
}
.itemPanier input{
	position: relative;
	left: 55px;
}
.itemrow{
	display: flex; flex-direction: row;
	justify-content: space-between;
}
.button {
	height: 30px; 
	background-color: #7451eb; color: white;
	border-radius: 5px; border: none;
	box-shadow: 0px 0px 4px gray; 
}
.button:hover{
	opacity: 75%; cursor: pointer;
}
.button:active{
	opacity: 50%; cursor: pointer;
}

.fiches {
	flex: 1;
	margin: 8px;
}
.fiches img {
	max-width: 200px;
}
.fiches p {
	margin-top: 4px;
	margin-bottom: 4px;
}

ul {
	list-style-type: none;
  }

</style>

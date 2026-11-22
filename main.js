import { formaterDonnee, filtrerParNom } from "./utils.js"

const URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/parissetransforme/records?limit=20"
const LIST = document.querySelector(".cartes")
const COMPTEUR = document.querySelector(".compteur")
const RECHERCHE = document.querySelector("#recherche")

const projets = []

const createCard = (data) => {
    const carte = document.createElement("article")
    carte.classList.add("carte")

    const titre = document.createElement("h2")
    titre.textContent = data.titre

    const etiquettes = document.createElement("div")
    etiquettes.classList.add("etiquettes")

    const categorie = document.createElement("span")
    categorie.classList.add("etiquette_categorie")
    categorie.textContent = data.categorie

    const sousCategorie = document.createElement("span")
    sousCategorie.classList.add("etiquette_sous_categorie")
    sousCategorie.textContent = data.sousCategorie

    etiquettes.append(categorie, sousCategorie)

    const adresse = document.createElement("address")
    adresse.classList.add("carte_adresse")

    const rue = document.createElement("p")
    const pin = document.createElement("span")
    pin.setAttribute("aria-hidden", "true")
    pin.textContent = "📍"
    rue.append(pin, data.adresse)

    const codePostal = document.createElement("p")
    codePostal.textContent = data.codeP

    adresse.append(rue, codePostal)
    carte.append(titre, etiquettes, adresse)

    return carte
}

const afficherCartes = (data) => {
  LIST.innerHTML = ""
  data.forEach(data => {
    LIST.append(createCard(data))
  })
}

const afficherCompteur = (nb) => {
  if (nb > 1) {
    COMPTEUR.textContent = nb + " projets trouvés"
  } 
  else {
    COMPTEUR.textContent = nb + " projet trouvé"
  }
}

const afficher = (data) => {
  afficherCartes(data)
  afficherCompteur(data.length)
}

const loadData = async () => {
  try {
    // Récupération données de l'API
    const response = await fetch(URL)

    // Je vérifie que le serveur me renvoie des résultats
    if (response.ok) {
      const jsonResponse = await response.json()

      jsonResponse.results.forEach(item => {
        projets.push(formaterDonnee(item))
      })
      afficher(projets)
    } else {
        // Dans le cas où il y a une erreur serveur (Not Found)
        throw new Error("Erreur Serveur " + response.status)
    }
  } catch (error) {
      // J'attrape toutes les erreurs qui peuvent se produire, par exemple de chargement ou les erreurs lancés dans le else
      console.log(error)
  }
}

RECHERCHE.addEventListener("input", () => {
  const resultat = filtrerParNom(projets, RECHERCHE.value)
  afficher(resultat)
})

loadData()
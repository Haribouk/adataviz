export const formaterDonnee = (item) => ({
    titre : item.titre_descriptif,
    categorie : item.categorie,
    sousCategorie : item.sous_categorie,
    adresse : item.adresse,
    codeP : item.code_postal
})

export const filtrerParNom = (data, recherche) => {
    return data.filter(projet => projet.titre.toLowerCase().includes(recherche.toLowerCase()))
}
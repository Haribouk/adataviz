const loadData = async () => {
  try {
    // Récupération données de l'API
    const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/parissetransforme/records?limit=20")

    // Je vérifie que le serveur me renvoie des résultats
    if (response.ok) {
      console.log("YOUPI")

      const jsonResponse = await response.json()

      const results = jsonResponse.results
      results.forEach(element => {
        console.log(element)
      })
    } else {
        // Dans le cas où il y a une erreur serveur (Not Found)
        throw new Error("Erreur Serveur " + response.status)
    }
  } catch (error) {
      // J'attrape toutes les erreurs qui peuvent se produire, par exemple de chargement ou les erreurs lancés dans le else
      console.log(error)
  }
}
loadData()
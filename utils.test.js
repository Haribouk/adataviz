import { formaterDonnee, filtrerParNom } from "./utils.js"

describe("formaterDonnee", () => {
    const result = {
        titre_descriptif: "Ravalement Groupe Scolaire Pereire",
        categorie: "Ecoles et crèches",
        sous_categorie: "Créations et rénovations des écoles et des crèches",
        adresse: "26 rue Hippolyte Lebas",
        code_postal: "75009"
    }
    it("retourne l'objet formaté à partir de l'objet de l'API", () => {
        expect(formaterDonnee(result)).toEqual({
            titre: "Ravalement Groupe Scolaire Pereire",
            categorie: "Ecoles et crèches",
            sousCategorie: "Créations et rénovations des écoles et des crèches",
            adresse: "26 rue Hippolyte Lebas",
            codeP: "75009"
        })
    })
})

describe("filtrerParNom", () => {
    const titres = [
        { titre: "Ravalement Groupe Scolaire Pereire" },
        { titre: "Salon de tatouage - 75 Tattoo Paris" },
        { titre: "Maternelle Cujas" }
    ]

    it("trouve le projet 'Maternelle Cujas' avec la chaîne 'Cujas'", () => {
        expect(filtrerParNom(titres, "Cujas")).toEqual([{ titre: "Maternelle Cujas" }])
    })

    it("retourne tous les projets si la recherche est vide", () => {
        expect(filtrerParNom(titres, "")).toEqual(titres)
    })

    it("retourne un tableau vide si le projet n'existe pas", () => {
        expect(filtrerParNom(titres, "abc")).toEqual([])
    })
})
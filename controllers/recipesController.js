let recipeController = (function() {

    function addRecipe(context) {
        return templates.get('add-recipe')
            .then((tmpl) => {
                context.$element().html(tmpl);

                $("body").on('click', '#recipe-submit', () => {

                    let title = $("#recipe-title").val();
                    let category = $('#recipe-category').val();
                    let image = $('#recipe-image').val();
                    let text = $('#recipe-text').val();

                    console.log(title);
                    console.log(category);
                    console.log(image);
                    console.log(text);

                    const database = firebase.database();

                    database.ref('recipes/').push({
                        title: title,
                        category: category,
                        image: image,
                        text: text,
                        date: new Date().toLocaleString(),
                        uid: firebase.auth().currentUser.uid,
                        userEmail: firebase.auth().currentUser.email
                    })
                });
            })
    }

    function getAllRecipes(context) {
        let recipes = [];

        return firebase.database().ref().child('recipes').once('value')
            .then((snapshot) => {

                snapshot.forEach((child) => {
                    recipes.push({
                        text: child.val().text,
                        category: child.val().category,
                        title: child.val().title,
                        image: child.val().image,
                        userEmail: child.val().userEmail,
                        date: child.val().date,
                        comments: child.val().comments,
                        _key: child.key,
                    });
                })
                console.log(recipes);

                return templates.get('all-recipes')
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes }));

            })
    }

    function getRecipeById(context) {
        let id = context.params['id'];
        let recipe;

        return firebase.database().ref().child(`recipes/${id}`).once('value')
            .then((snap) => {
                recipe = snap.val();

                return templates.get('recipe');
            })
            .then((tmpl) => {
                context.$element().html(tmpl(recipe));

                $("body").on('click', '#comment-submit', () => {

                    const database = firebase.database();

                    let comment = $('#recipe-comment').val();
                    console.log(comment);
                    database.ref(`recipes/${id}/comments/`).push({
                        text: comment
                    })
                });
            })

    }

    return {
        addRecipe,
        getAllRecipes,
        getRecipeById
    }
})();
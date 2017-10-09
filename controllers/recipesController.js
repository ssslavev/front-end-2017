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
                    }).then(() => {
                        context.redirect('#/home');
                    })
                });
            })
    }

    function getAllRecipes(context) {
        let recipes = [];
        let limitRecipes;
        let lastComments;

        Promise.all([data.recipes.getAllRecipes(), data.recipes.getLimitRecipes(5), data.recipes.getLastComments(8)])
            .then(([reqRecipes, reqLimitRecipes, reqLastComments]) => {
                recipes = reqRecipes;
                limitRecipes = reqLimitRecipes;
                lastComments = reqLastComments;
                console.log(recipes);
                console.log(lastComments);
                return templates.get('all-recipes')
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes, limitRecipes: limitRecipes, lastComments: lastComments }));

            })
    }



    function getRecipeById(context) {
        let id = context.params['id'];
        let recipe;
        let limitRecipes;
        let lastComments;
        let recipeArr = [];

        Promise.all([data.recipes.getById(id), data.recipes.getLimitRecipes(5), data.recipes.getLastComments(8)])
            .then(([snap, reqLimitRecipes, reqLastComments]) => {

                recipe = snap.val();
                recipeArr.push(recipe);
                console.log(recipe);
                limitRecipes = reqLimitRecipes;
                lastComments = reqLastComments;
                console.log(limitRecipes);
                console.log(lastComments);
                return templates.get('recipe');
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipeArr, limitRecipes, lastComments }));

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
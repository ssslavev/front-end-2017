let homeController = (function() {

    function getHomePage(context) {

        let recipes = [];

        return data.recipes.getLimitRecipes(10)
            .then((reqRecipes) => {

                recipes = reqRecipes;

                return templates.get('home');
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes }));

            })
    }

    return {
        getHomePage
    }
})();
let categoriesController = (function() {

    function getCategories(context) {
        let recipes = [];

        return data.recipes.getLimitRecipes(10)
            .then((reqRecipes) => {
                recipes = reqRecipes;

                return templates.get('categories')
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes }));
            })
    }

    return {
        getCategories
    }
})();
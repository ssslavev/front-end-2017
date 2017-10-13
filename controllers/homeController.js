let homeController = (function() {

    function getHomePage(context) {

        let recipes = [];
        let sliderRecipes;


        return data.recipes.getLimitRecipes(10)
            .then((reqRecipes) => {

                recipes = reqRecipes;
                sliderRecipes = reqRecipes.slice(0, 7);
                console.log(sliderRecipes);

                return templates.get('home');
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes, sliderRecipes: sliderRecipes }));
                slider.slide();
            })
    }

    return {
        getHomePage
    }
})();
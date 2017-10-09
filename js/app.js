(function() {
    const sammyApp = Sammy('#main-content', function() {


        this.get('#/home', homeController.getHomePage);

        this.get('#/categories', categoriesController.getCategories);

        this.get('#/register', authController.register);

        this.get('#/login', authController.login);

        this.get('#/add-recipe', recipeController.addRecipe);

        this.get('#/all-recipes', recipeController.getAllRecipes);

        this.get('#/recipes/:id', recipeController.getRecipeById);
    });

    $(() => {
        sammyApp.run('#/home');
        console.log(firebase.auth().currentUser);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $('#signin').addClass('hidden');
                $('#current-user').html('Hello, ' + firebase.auth().currentUser.email + '!');
            } else {
                $('#logout').addClass('hidden');
                $('#add-recipe').addClass('hidden');
            }
        });

        $('#logout').on('click', () => {
            firebase.auth().signOut();
            location.reload();
        });
    });
}());
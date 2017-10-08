(function() {

    var sammyApp = Sammy('#main-content', function() {
        var $main = $('#main-content');

        this.get('#/home', homeController.getHomePage);

        this.get('#/categories', categoriesController.getCategories);

        this.get('#/register', authController.register);

        this.get('#/login', authController.login);

        this.get('#/add-recipe', recipeController.addRecipe)

        this.get('#/all-recipes', recipeController.getAllRecipes)


    })

    $(() => {
        sammyApp.run('#/home')

        console.log(firebase.auth().currentUser);

        if (firebase.auth().currentUser) {
            $('#signin').addClass('hidden');
            $('#current-user').html('Hello, ' + firebase.auth().currentUser.email + '!');

        } else {

            $('#logout').addClass('hidden');
        }

        $('#logout').on('click', () => {

            firebase.auth().signOut();
            location.reload();
        })

    })

})();
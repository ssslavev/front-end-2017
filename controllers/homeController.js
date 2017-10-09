let homeController = (function() {

    function getHomePage(context) {
        let recipes = [];
        let recipesNext = [];

        return firebase.database().ref().child('recipes').limitToLast(5).once('value')
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

                return templates.get('home')
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes }));

            })
    }

    return {
        getHomePage
    }
})();
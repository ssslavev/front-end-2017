data = (function() {

    function getById(id) {


        return firebase.database().ref().child(`recipes/${id}`).once('value')
    }

    function getAllRecipes() {
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

            }).then(() => {
                return recipes;
            })
    }

    function getLimitRecipes(limit) {
        let recipes = [];

        return firebase.database().ref().child('recipes').limitToLast(limit).once('value')
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

            }).then(() => {
                return recipes;
            })

    }

    function getLastComments(limit) {
        let comments = [];

        return firebase.database().ref().child('comments').limitToLast(limit).once('value')
            .then((snapshot) => {

                snapshot.forEach((child) => {
                    comments.push({
                        text: child.val().text,
                    });

                })

            }).then(() => {
                console.log(comments);
                return comments;
            })
    }


    return {
        recipes: {
            getById,
            getLimitRecipes,
            getAllRecipes,
            getLastComments
        }
    }
})();
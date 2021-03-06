let recipeController = (function() {

    function addRecipe(context) {
        return templates.get('add-recipe')
            .then((tmpl) => {
                context.$element().html(tmpl);

                $("body").off().on('click', '#recipe-submit', () => {

                    let title = $("#recipe-title").val();
                    let category = $('#recipe-category').val();
                    let image = $('#recipe-image').val();
                    let text = $('#recipe-text').val();

                    //console.log(title);
                    //console.log(category);
                    //console.log(image);
                    //console.log(text);

                    const database = firebase.database();
                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                    database.ref('recipes/').push({
                        title: title,
                        category: category,
                        image: image,
                        text: text,
                        date: moment().format('LL'),
                        uid: firebase.auth().currentUser.uid,
                        userEmail: firebase.auth().currentUser.email
                    }).then(() => {
                        location.reload();
                    })
                });
            })
    }

    function getAllRecipes(context) {
        let page = +context.params.page;
        let max = page * 2;
        let min = max - 2;
        console.log(page)
        let recipes = [];
        let limitRecipes;
        let lastComments;

        Promise.all([data.recipes.getAllRecipes(), data.recipes.getLimitRecipes(8), data.recipes.getLastComments(3)])
            .then(([reqRecipes, reqLimitRecipes, reqLastComments]) => {
                recipes = reqRecipes.reverse().slice(min, max);
                limitRecipes = reqLimitRecipes;
                lastComments = reqLastComments;
                console.log(recipes);
                console.log(lastComments);
                return templates.get('all-recipes')
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipes: recipes, limitRecipes: limitRecipes, lastComments: lastComments }));

                $('#pagination a').click(function() {
                    $('#pagination a').removeClass("active");
                    $(this).addClass("active");
                })

            })
    }



    function getRecipeById(context) {
        let id = context.params['id'];

        let recipe;
        let limitRecipes;
        let lastComments;
        let recipeArr = [];

        Promise.all([data.recipes.getById(id), data.recipes.getLimitRecipes(8), data.recipes.getLastComments(8)])
            .then(([snap, reqLimitRecipes, reqLastComments]) => {

                recipe = snap.val();
                recipeArr.push(recipe);
                //console.log(recipe);
                limitRecipes = reqLimitRecipes;
                lastComments = reqLastComments;
                //console.log(limitRecipes);
                //console.log(lastComments);
                return templates.get('recipe');
            })
            .then((tmpl) => {
                context.$element().html(tmpl({ recipeArr, limitRecipes, lastComments }));

                $("body").off().on('click', '#comment-submit', (event) => {
                    event.preventDefault();
                    const database = firebase.database();

                    let comment = $('#recipe-comment').val();
                    let author = firebase.auth().currentUser.email;
                    let date = moment().format('MM-DD-YYYY');

                    Promise.all([
                        database.ref(`recipes/${id}/comments/`).push({
                            text: comment,
                            author: author,
                            date: date
                        }),
                        database.ref('comments/').push({
                            text: comment,
                            author: author,
                            date: date
                        })
                    ])


                    .then(() => {

                            return templates.get('comment');

                            //window.location.href = `#/recipes/${id}`
                            //location.reload();
                        })
                        .then((tmpl) => {
                            console.log(comment);
                            $('#users-comments').append(tmpl({ text: comment, author: author, date: date }));
                            $('#recipe-comment').val('');
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
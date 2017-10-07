let categoriesController = (function() {

    function getCategories(context) {
        return templates.get('categories')
            .then((tmpl) => {
                context.$element().html(tmpl);
            })
    }

    return {
        getCategories
    }
})();
let homeController = (function() {

    function getHomePage(context) {
        return templates.get('home')
            .then((tmpl) => {
                context.$element().html(tmpl);
            })
    }

    return {
        getHomePage
    }
})();
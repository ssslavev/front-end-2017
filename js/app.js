(function() {

    let router = new Navigo(null, false);


    router
        .on({

            '/home': () => templates.get("home").then((tmpl) => $('#main-content').html(tmpl)),
            '/post': () => templates.get("post").then((tmpl) => $('#main-content').html(tmpl)),
            '/sign': () => templates.get("login").then((tmpl) => $('#main-content').html(tmpl)),
            '/register': () => templates.get("register").then((tmpl) => $('#main-content').html(tmpl))



        })
        .resolve();





}());
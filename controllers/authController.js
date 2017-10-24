let authController = (function() {

    function register(context) {
        return templates.get('register')
            .then((tmpl) => {
                context.$element().html(tmpl);

                $("body").on('click', '#btn-register', () => {

                    let email = $("#email-register").val();
                    let password = $('#password-register').val();

                    const auth = firebase.auth();

                    const promise = auth.createUserWithEmailAndPassword(email, password);

                    promise.then(user => console.log(user))
                        .catch(e => {
                            if (e.message.includes('The email address is already in use by another account.')) {
                                console.log('Yahooo');
                            }
                        });
                    context.redirect('#/home');
                    location.reload(true);

                });
            })
    }

    function login(context) {
        return templates.get('login')
            .then((tmpl) => {
                context.$element().html(tmpl);

                $("body").on('click', '#login-submit', () => {

                    var email = $("#login-email").val();
                    var password = $('#login-password').val();

                    const auth = firebase.auth();

                    const promise = auth.signInWithEmailAndPassword(email, password);

                    promise.then(() => {
                        context.redirect('#/home');
                        window.setTimeout(function() {

                            location.reload(true)
                        }, 750)
                    })

                    promise.catch(e => console.log(e.message));




                });
            })
    }



    return {
        register,
        login,
        logout
    }
})();
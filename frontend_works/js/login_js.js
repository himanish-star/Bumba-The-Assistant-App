const passport = require('passport');

$(function () {

        $.get('auth/google/', ( passport.authenticate('google',
                {
                    scope: ['profile']
                } )
            )
        );
    }
)


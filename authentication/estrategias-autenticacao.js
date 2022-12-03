import passport from "passport";
import bearer from "passport-http-bearer"
import local from "passport-local"

const localStrategy = new local.Strategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, (email, password, done) => {
    try {
        
    } catch (error) {
        
    }
})

passport.use(
    
)

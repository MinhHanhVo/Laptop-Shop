import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal = async () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {

        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }

        console.log("check username passwork: ", username, password);
        // check user exist in database
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (!user) {
            // throw error
            // throw new Error(`Username ${username} not found`)
            return callback(null, false, { message: `Username ${username} not found` });
        }

        // compare password
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            // throw new Error("Invalid password")
            return callback(null, false, { message: 'Incorrect password.' });
        }
        return callback(null, user as any);
    }));
    passport.serializeUser(function (user: any, cb) {

        cb(null, { id: user.id, username: user.username });

    });

    passport.deserializeUser(async function (user: any, cb) {
        const { id, username } = user
        // query to database
        const userInDB: any = await getUserWithRoleById(id);
        const sumCart = await getUserSumCart(id);
        return cb(null, { ...userInDB, sumCart: sumCart });

    });
}

export default configPassportLocal;
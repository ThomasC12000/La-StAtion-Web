import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../../../../models/user";
import connectToDatabase from "../../../../lib/mongodb";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error(
            JSON.stringify({
              message: "Aucun utilisateur trouvé avec cette adresse e-mail",
              status: "emailNotFound",
            })
          );
        }

        const isPasswordValid = await user.comparePassword(
          credentials.password
        );
        if (!isPasswordValid) {
          throw new Error(
            JSON.stringify({
              message: "Mot de passe incorrect",
              status: "incorrectPassword",
            })
          );
        }
        console.log(
          "Authorize callback - Utilisateur trouvé et authentifié :",
          user
        );
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        // Mettre à jour le token avec les données de session actuelles
        token = {
          ...token,
          id: session.user.id,
          firstName: session.user.firstName,
          lastName: session.user.lastName,
          email: session.user.email,
          profileImage: session.user.profileImage,
          name: `${session.user.firstName} ${session.user.lastName}`,
          role: session.user.role,
        };
      } else if (user) {
        // Mettre à jour le token avec les données de l'utilisateur
        token.id = user._id.toString(); // Convert ObjectId to string
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.profileImage = user.profileImage;
        token.name = `${user.firstName} ${user.lastName}`;
        token.role = user.role;
      }

      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback - token:", token);
      // Transférez les informations du token à la session
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.profileImage = token.profileImage;
      session.user.role = token.role;
      console.log("Session callback - session:", session);
      return session;
    },
  },
});

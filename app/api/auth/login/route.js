// // app/api/auth/login.js
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/user';

// export async function POST(req) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return new Response(JSON.stringify({ status: 'error', message: 'Adresse e-mail ou mot de passe manquant !' }), { status: 400 });
//   }

//   try {
//     await connectToDatabase();

//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return new Response(JSON.stringify({ status: 'error', message: 'Aucun utilisateur trouvé avec cette adresse e-mail !' }), { status: 404 });
//     }

//     const isPasswordValid = await existingUser.comparePassword(password);

//     if (!isPasswordValid) {
//       return new Response(JSON.stringify({ status: 'error', message: 'Mot de passe incorrect !' }), { status: 401 });
//     }

//     return new Response(JSON.stringify({ status: 'success', message: 'Connexion réussie !'}), { status: 200 });
//   } catch (error) {
//     console.error('Erreur lors de la connexion :', error);
//     return new Response(JSON.stringify({ status: 'error', message: 'Erreur lors de la connexion !' }), { status: 500 });
//   }
// }

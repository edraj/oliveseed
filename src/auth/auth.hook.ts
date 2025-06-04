// import { redirect, type Handle } from '@sveltejs/kit';


// export const AuthGuard: Handle = async ({ event, resolve }) => {
//   // check res.locals
//   event.locals.user = 'Bbq';
//   // handle 401
//   if (event.url.pathname.startsWith('/posts')){
//     // console.log('AuthGuard', event.locals?.user);
//     if (!event.locals?.user) {
//       throw redirect(303, '/login');
//     }
//   }

//   const res = await resolve(event);
//   return res;
// };

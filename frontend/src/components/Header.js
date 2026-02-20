import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMe, logoutUser } from '../services/auth';
import { Menu, X, Home, MessageCircle, User } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const path = router.pathname;
  const isHome = path === '/';
  const isChat = path.startsWith('/chat');
  const isProfile = path.startsWith('/tutor-profile') || path.startsWith('/tutor-edit');

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
       

            <span className="inline-flex items-center justify-center mr-[5px]" aria-hidden>
              <Image src="/icons/iconicone" alt="Ícone de pata" width={24} height={24} priority />
            </span>

            <h1 className="text-2xl font-bold text-[#ffa98f]">
              PetFind
            </h1>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isHome ? 'bg-[rgba(255,169,143,0.13)] hover:bg-[rgba(255,169,143,0.2)]' : 'hover:bg-gray-50'
              }`}
              aria-label="Início"
            >
              <Home className={`w-6 h-6 ${isHome ? 'text-[#FFA98F]' : 'text-[#4A5565]'}`} />
            </Link>
            <Link
              href="/chat-on"
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isChat ? 'bg-[rgba(255,169,143,0.13)] hover:bg-[rgba(255,169,143,0.2)]' : 'hover:bg-gray-50'
              }`}
              aria-label="Chat"
            >
              <MessageCircle className={`w-6 h-6 ${isChat ? 'text-[#FFA98F]' : 'text-[#4A5565]'}`} />
            </Link>
            <Link
              href="/tutor-profile"
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isProfile ? 'bg-[rgba(255,169,143,0.13)] hover:bg-[rgba(255,169,143,0.2)]' : 'hover:bg-gray-50'
              }`}
              aria-label="Perfil"
            >
              <User className={`w-6 h-6 ${isProfile ? 'text-[#FFA98F]' : 'text-[#4A5565]'}`} />
            </Link>
          </div>
        </div>
      </header>
  );
}




// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { getMe, logoutUser } from '../services/auth';
// import { Menu, X } from 'lucide-react';

// export default function Header() {
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const data = await getMe();
//         setUser(data);
//       } catch (err) {
//         setUser(null);
//       }
//     }

//     loadUser();
//   }, []);

//   async function handleLogout() {
//     await logoutUser();
//     setUser(null);
//   }

//   return (
//     <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
//       <div className="container-page flex items-center justify-between py-4">
//         <Link className="text-xl font-semibold tracking-tight" href="/">PetFind</Link>

//         <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4 text-sm text-slate-600">
//           <Link className="hover:text-slate-900" href="/register">Cadastro</Link>
//           <Link className="hover:text-slate-900" href="/login">Login</Link>
//           <Link className="hover:text-slate-900" href="/pets">Pets</Link>
//           <Link className="hover:text-slate-900" href="/matches">Matches</Link>
//           <Link className="hover:text-slate-900" href="/chat">Chat</Link>
//         </nav>

//         <div className="flex items-center gap-3 text-sm">
//           <div className="hidden md:flex items-center gap-3">
//             {user ? (
//               <>
//                 <span className="text-slate-600">Olá, {user.name}</span>
//                 <button
//                   className="btn-secondary"
//                   onClick={handleLogout}
//                   type="button"
//                 >
//                   Sair
//                 </button>
//               </>
//             ) : (
//               <span className="text-slate-500">Visitante</span>
//             )}
//           </div>

//           <button
//             aria-expanded={open}
//             aria-label={open ? 'Fechar menu' : 'Abrir menu'}
//             onClick={() => setOpen((v) => !v)}
//             className="md:hidden p-2 rounded-lg hover:bg-slate-100"
//             type="button"
//           >
//             {open ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden ${open ? 'block' : 'hidden'}`}>
//         <div className="border-t border-slate-100 bg-white">
//           <div className="px-4 py-3 space-y-2">
//             <Link className="block py-2 px-2 rounded hover:bg-slate-50" href="/register">Cadastro</Link>
//             <Link className="block py-2 px-2 rounded hover:bg-slate-50" href="/login">Login</Link>
//             <Link className="block py-2 px-2 rounded hover:bg-slate-50" href="/pets">Pets</Link>
//             <Link className="block py-2 px-2 rounded hover:bg-slate-50" href="/matches">Matches</Link>
//             <Link className="block py-2 px-2 rounded hover:bg-slate-50" href="/chat">Chat</Link>
//             <div className="pt-2">
//               {user ? (
//                 <>
//                   <div className="text-sm text-slate-700">Olá, {user.name}</div>
//                   <button className="mt-2 btn-secondary w-full" onClick={handleLogout} type="button">Sair</button>
//                 </>
//               ) : (
//                 <div className="text-sm text-slate-600">Visitante</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

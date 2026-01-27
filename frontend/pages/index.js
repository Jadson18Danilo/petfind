import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">PetFind</div>
          <nav className="flex gap-4 text-sm">
            <Link className="text-gray-700 hover:text-black" href="/register">Cadastro</Link>
            <Link className="text-gray-700 hover:text-black" href="/login">Login</Link>
            <Link className="text-gray-700 hover:text-black" href="/pets">Pets</Link>
            <Link className="text-gray-700 hover:text-black" href="/matches">Matches</Link>
            <Link className="text-gray-700 hover:text-black" href="/chat">Chat</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="bg-white rounded-xl border p-6">
          <h1 className="text-3xl font-bold">Encontre o par ideal para seu pet</h1>
          <p className="mt-2 text-gray-600">
            Cadastre seu pet, encontre matches e converse com responsáveis.
          </p>
          <div className="mt-4 flex gap-3">
            <Link className="bg-black text-white px-4 py-2 rounded" href="/register">Começar</Link>
            <Link className="border px-4 py-2 rounded" href="/pets">Ver pets</Link>
          </div>
        </section>

        <section className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold">Cadastro rápido</h3>
            <p className="text-sm text-gray-600 mt-1">Crie sua conta e adicione pets em minutos.</p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold">Matches inteligentes</h3>
            <p className="text-sm text-gray-600 mt-1">Curta pets e gere matches automaticamente.</p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold">Chat integrado</h3>
            <p className="text-sm text-gray-600 mt-1">Converse direto com o responsável.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
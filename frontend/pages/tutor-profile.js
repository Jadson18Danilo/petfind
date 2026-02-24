import React, { useEffect, useState } from 'react';
import { Edit, LogOut, Trash2 } from 'lucide-react';
import Layout from '../src/components/Layout';
import { useRouter } from 'next/router';
import { getMe } from '../src/services/auth';
import { listPets } from '../src/services/pets';

export default function PerfilTutor({
  onNavigateToMatches,
  onNavigateToChat,
  onNavigateToPerfil,
  onNavigateToHome,
  onNavigateToEditarPet,
  onNavigateToEditarTutor,
  petData,
  tutorData
}) {
  const router = useRouter();

  const [me, setMe] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const [meData, allPets] = await Promise.all([getMe(), listPets()]);
        if (!mounted) return;

        setMe(meData);

        const ownedPets = Array.isArray(allPets)
          ? allPets.filter((pet) => pet.ownerId === meData?.id)
          : [];
        setPets(ownedPets);

        const storedId = typeof window !== 'undefined'
          ? Number(window.localStorage.getItem('activePetId'))
          : null;
        const hasStored = storedId && ownedPets.some((pet) => pet.id === storedId);
        const initialId = hasStored ? storedId : (ownedPets[0]?.id ?? null);

        setSelectedPetId(initialId);
        if (typeof window !== 'undefined') {
          if (initialId) {
            window.localStorage.setItem('activePetId', String(initialId));
          } else {
            window.localStorage.removeItem('activePetId');
          }
        }
      } catch (err) {
        if (!mounted) return;
        setMe(null);
        setPets([]);
        setSelectedPetId(null);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const tutorSource = tutorData || me || {};
  const tutor = {
    nome: tutorSource.nome ?? tutorSource.name ?? '',
    email: tutorSource.email ?? '',
    telefone: tutorSource.telefone ?? '',
    cidade: tutorSource.cidade ?? '',
    estado: tutorSource.estado ?? '',
    avatar: tutorSource.avatar ?? tutorSource.foto ?? '',
  };

  const formatarIdade = (idade) => {
    const idadeNum = parseInt(idade, 10);
    if (isNaN(idadeNum)) return '-';
    if (idadeNum === 0 || idadeNum === 1) return 'Filhote (0-1 ano)';
    if (idadeNum <= 7) return 'Adulto (2-7 anos)';
    return 'Idoso (8+ anos)';
  };

  const handleSelectPet = (petId) => {
    setSelectedPetId(petId);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('activePetId', String(petId));
    }
  };

  const handleVerMatches = (petId) => {
    handleSelectPet(petId);
    router.push('/match-display');
  };

  const mappedPets = Array.isArray(pets)
    ? pets.map((pet) => ({
        id: pet.id,
        nome: pet.nome ?? pet.name ?? '-',
        raca: pet.raca ?? pet.breed ?? '-',
        tipo: pet.especie ?? pet.species ?? '-',
        idade: formatarIdade(pet.idade ?? pet.age ?? pet.ageMonths),
        sexo: pet.sexo ?? pet.sex ?? '-',
        foto: pet.mainPhoto || ''
      }))
    : [];

  const handleSair = () => {
    if (typeof window !== 'undefined' && window.confirm('Deseja realmente sair?')) {
      if (onNavigateToHome) return onNavigateToHome();
      router.push('/');
    }
  };

  const handleEditarPerfil = () => {
    if (onNavigateToEditarTutor) return onNavigateToEditarTutor();
    router.push('/tutor-edit');
  };

  const handleEditarPet = (petId) => {
    if (onNavigateToEditarPet) return onNavigateToEditarPet(petId);
    router.push(`/pet-edit?id=${petId}`);
  };

  const handleExcluirPet = (petId) => {
    if (typeof window !== 'undefined' && window.confirm('Deseja realmente excluir este pet?')) {
      // TODO: call backend to delete pet
      alert(`Pet ${petId} excluído`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#FFF7F1]">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <p className="text-[#4a5565]">Gerencie suas informações e seus pets</p>
            </div>

            <button onClick={handleSair} className="bg-white px-4 py-3 rounded-2xl flex gap-2">
              <LogOut className="size-5 text-[#FFA98F]" />
              <span className="text-xl bg-gradient-to-r from-[#ffa98f] to-[#ff8566] bg-clip-text text-transparent">Sair</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Informações do Tutor</h3>
              <button onClick={handleEditarPerfil} className="flex gap-2" aria-label="Editar perfil do tutor">
                <Edit className="size-4 text-[#FFA98F]" />
                <span className="text-[#FFA98F]">Editar</span>
              </button>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="size-24 rounded-full overflow-hidden bg-gray-100">
                {tutor.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tutor.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Sem foto</div>
                )}
              </div>
              <div>
                <p><strong>Nome:</strong> {tutor.nome || '-'}</p>
                <p><strong>Email:</strong> {tutor.email || '-'}</p>
                <p><strong>Telefone:</strong> {tutor.telefone || '-'}</p>
                <p><strong>Local:</strong> {tutor.cidade ? `${tutor.cidade}${tutor.estado ? ` - ${tutor.estado}` : ''}` : '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Meus Pets ({mappedPets.length})</h3>
            {mappedPets.length === 0 ? (
              <div className="card p-6 text-center">
                <p className="text-slate-600">Você ainda não cadastrou pets.</p>
                <button
                  onClick={() => router.push('/pet-register')}
                  className="mt-4 btn"
                >
                  Cadastrar pet
                </button>
              </div>
            ) : (
              mappedPets.map((pet) => (
                <div key={pet.id} className="border rounded-2xl p-6 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{pet.nome}</h4>
                      <p>{pet.raca} • {pet.tipo}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectPet(pet.id)}
                        className={`px-3 py-1 rounded-xl text-sm ${
                          pet.id === selectedPetId
                            ? 'bg-[rgba(255,169,143,0.2)] text-[#FFA98F]'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                        aria-pressed={pet.id === selectedPetId}
                      >
                        {pet.id === selectedPetId ? 'Selecionado' : 'Selecionar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerMatches(pet.id)}
                        className="px-3 py-1 rounded-xl text-sm bg-[rgba(255,169,143,0.2)] text-[#FFA98F] hover:bg-[rgba(255,169,143,0.3)] font-semibold"
                        aria-label={`Ver matches para ${pet.nome}`}
                      >
                        Ver Matches
                      </button>
                      <button onClick={() => handleEditarPet(pet.id)} aria-label={`Editar pet ${pet.nome}`}>
                        <Edit className="text-[#FFA98F]" />
                      </button>
                      <button onClick={() => handleExcluirPet(pet.id)} aria-label={`Excluir pet ${pet.nome}`}>
                        <Trash2 className="text-[#FFA98F]" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-sm">Idade: {pet.idade}</p>
                  <p className="text-sm">Sexo: {pet.sexo}</p>
                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </Layout>
  );
}


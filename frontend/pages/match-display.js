import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, User, MapPin, X, Sparkles } from 'lucide-react';
import { likePet } from '../src/services/matches';
import { listPets } from '../src/services/pets';
import { getMe } from '../src/services/auth';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import Image from 'next/image';

export default function MatchDisplay({
  onNavigateToMatches,
  onNavigateToChat,
  onNavigateToPerfil,
  onMatch,
  matches = [],
  currentPetId // id of the user's active pet used when liking other profiles
}) {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectionIssue, setSelectionIssue] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const currentProfile = pets[currentIndex];
  const currentImageUrl = currentProfile ? getImageUrl(currentProfile) : '';
  const hasMoreProfiles = currentIndex < pets.length - 1;
  const noProfiles = !loading && !error && pets.length === 0;
  const activePetId = selectedPet?.id ?? currentPetId;

  function normalizeText(value) {
    if (!value) return '';
    return value
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function getOppositeSex(value) {
    const sex = normalizeText(value);
    if (sex === 'macho') return 'femea';
    if (sex === 'femea') return 'macho';
    return '';
  }

  useEffect(() => {
    let mounted = true;

    async function fetchPets() {
      setLoading(true);
      setSelectionIssue('');
      try {
        const [meData, data] = await Promise.all([
          getMe().catch(() => null),
          listPets()
        ]);
        if (!mounted) return;

        const allPets = Array.isArray(data) ? data : [];
        const ownedPets = meData ? allPets.filter((pet) => pet.ownerId === meData.id) : [];
        const storedId = typeof window !== 'undefined'
          ? Number(window.localStorage.getItem('activePetId'))
          : null;
        const activePet = storedId
          ? ownedPets.find((pet) => pet.id === storedId)
          : ownedPets[0];

        if (typeof window !== 'undefined') {
          if (activePet?.id) {
            window.localStorage.setItem('activePetId', String(activePet.id));
          } else {
            window.localStorage.removeItem('activePetId');
          }
        }

        setSelectedPet(activePet || null);

        if (!activePet) {
          setPets([]);
          setSelectionIssue('Selecione um pet no perfil para ver os matches.');
          return;
        }

        const species = normalizeText(activePet.species || activePet.especie);
        const opposite = getOppositeSex(activePet.sex || activePet.sexo);

        if (!species || !opposite) {
          setPets([]);
          setSelectionIssue('Complete a espécie e o sexo do pet selecionado.');
          return;
        }

        const filtered = allPets.filter((pet) => {
          if (meData?.id && pet.ownerId === meData.id) return false;
          const petSpecies = normalizeText(pet.species || pet.especie);
          const petSex = normalizeText(pet.sex || pet.sexo);
          return petSpecies === species && petSex === opposite;
        });

        setPets(filtered);
      } catch (err) {
        console.error('Error loading pets', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPets();

    return () => { mounted = false; };
  }, []);

  function getImageUrl(profile) {
    if (!profile) return '';
    // Common shapes: profile.mainPhoto, profile.image (string), profile.image.url,
    // profile.images = [{url}] or ['url'], profile.photos, profile.imageUrl
    const maybeUrl =
      (typeof profile.mainPhoto === 'string' && profile.mainPhoto) ||
      (typeof profile.image === 'string' && profile.image) ||
      (profile.image && typeof profile.image === 'object' && profile.image.url) ||
      (profile.imageUrl) ||
      '';
    if (maybeUrl) {
      // If server returns a relative path, prefix with API base URL
      if (maybeUrl.startsWith('/')) {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        return `${base.replace(/\/$/, '')}${maybeUrl}`;
      }
      return maybeUrl;
    }
    if (Array.isArray(profile.images) && profile.images.length > 0) {
      const first = profile.images[0];
      if (typeof first === 'string') return first;
      if (first && first.url) return first.url;
    }
    if (Array.isArray(profile.photos) && profile.photos.length > 0) {
      const first = profile.photos[0];
      if (typeof first === 'string') return first;
      if (first && first.url) return first.url;
    }
    if (profile.imageUrl) return profile.imageUrl;
    // fallback: unknown
    return '';
  }

  const handleSwipe = async (direction) => {
    if (!currentProfile) return;

    setSwipeDirection(direction);

    // If user swiped right, notify backend of the like. Backend will create a match
    // if the other side already liked this pet.
    if (direction === 'right' && activePetId) {
      try {
        const resp = await likePet(currentProfile.id, activePetId);

        // Determine if backend reported a match. Be permissive about response shape.
        const matched = !!(
          resp && (
            resp.matched === true ||
            resp.isMatch === true ||
            resp.match ||
            resp.id
          )
        );

        if (matched || currentProfile?.hasLikedYou) {
          setCurrentMatch(resp.match || resp || currentProfile);
          setShowMatchNotification(true);

          if (onMatch) {
            onMatch(resp.match || { id: currentProfile.id, petProfile: currentProfile, timestamp: new Date() });
          }
        }
      } catch (err) {
        // ignore for now; could show a toast later
      }
    } else if (direction === 'right' && !activePetId) {
      // when we don't have an active pet id, keep the previous local behavior
      if (currentProfile?.hasLikedYou) {
        setCurrentMatch(currentProfile);
        setShowMatchNotification(true);
        if (onMatch) {
          onMatch({ id: currentProfile.id, petProfile: currentProfile, timestamp: new Date() });
        }
      }
    }

    setTimeout(() => {
      setSwipeDirection(null);
      if (hasMoreProfiles) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 300);
  };

  const handleLike = () => handleSwipe('right');
  const handleReject = () => handleSwipe('left');

  const closeMatchNotification = () => {
    setShowMatchNotification(false);
    setCurrentMatch(null);
  };

  const handleChatFromMatch = () => {
    closeMatchNotification();
    if (onNavigateToChat) return onNavigateToChat();
    router.push('/chat-on');
  };

  const handleGoMatches = () => {
    if (onNavigateToMatches) return onNavigateToMatches();
    router.push('/matches');
  };

  const handleGoChat = () => {
    if (onNavigateToChat) return onNavigateToChat();
    router.push('/chat-on');
  };

  const handleGoRegister = () => {
    router.push('/pet-register');
  };

  const handleGoPerfil = () => {
    if (onNavigateToPerfil) return onNavigateToPerfil();
    router.push('/tutor-profile');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#FFF7F1]">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 min-h-screen">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-500">Carregando perfis...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500">Erro ao carregar perfis.</p>
            </div>
          ) : selectionIssue ? (
            <div className="text-center">
              <p className="text-gray-500">{selectionIssue}</p>
              <button onClick={handleGoPerfil} className="mt-4 btn">Ir para perfil</button>
            </div>
          ) : currentProfile ? (
            <div className="w-full max-w-md">
              {/* Card do Pet */}
              <div 
                className={`group bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 relative ${
                  swipeDirection === 'left' ? 'translate-x-[-100vw] opacity-0' : 
                  swipeDirection === 'right' ? 'translate-x-[100vw] opacity-0' : 
                  'translate-x-0 opacity-100'
                }`}
              >
                {/* Borda gradiente no hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" 
                  style={{
                    background: 'linear-gradient(to right, #FFA98F, #FF8566)',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />
                
                {/* Imagem */}
                <div className="relative h-80 sm:h-96 overflow-hidden rounded-t-2xl">
                  {currentImageUrl ? (
                    <Image
                      src={currentImageUrl}
                      alt={currentProfile.name || 'Pet'}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      priority={currentIndex === 0}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Sem foto
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-[#ffa98f] to-[#ff8566] px-3 py-1 rounded-full">
                      <p className="text-xs font-bold text-white">NOVO!</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-[rgba(255,255,255,0.9)] px-3 py-1 rounded-full">
                      <p className="text-xs text-[#0a0a0a]">{currentProfile.species || 'Pet'}</p>
                    </div>
                  </div>
                </div>

                {/* Informações */}
                <div className="p-5">
                  {/* Nome e informações */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0a0a0a]">
                        {currentProfile.name || 'Pet'}, {currentProfile.age || '-'}
                      </h2>
                      <p className="text-[#4a5565]">{currentProfile.breed || '-'}</p>
                    </div>
                    <div className="text-3xl">🐾</div>
                  </div>

                  {/* Localização */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="size-4 text-[#4a5565]" />
                    <p className="text-sm text-[#4a5565]">{currentProfile.location || 'Localização não informada'}</p>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-[#364153] mb-4 leading-relaxed">
                    {currentProfile.description || 'Sem descrição.'}
                  </p>

                  {/* Tutor */}
                  <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#6a7282]">Tutor</p>
                      <p className="text-sm text-[#0a0a0a]">{currentProfile.tutorName || 'Tutor'}</p>
                    </div>
                    
                    {currentProfile.hasLikedYou && (
                      <div className="flex items-center gap-1 text-[#ffa98f]">
                        <Sparkles className="size-4" />
                        <p className="text-xs font-medium">Curtiu você!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={handleReject}
                  className="size-16 rounded-full border-4 border-[#ff6b6b] bg-white flex items-center justify-center hover:bg-[#fff5f5] transition-all hover:scale-110 active:scale-95"
                  aria-label="Rejeitar perfil"
                >
                  <X className="size-8 text-[#ff6b6b]" />
                </button>
                <button
                  onClick={handleLike}
                  className="size-20 rounded-full bg-gradient-to-r from-[#ffa98f] to-[#ff8566] flex items-center justify-center hover:shadow-2xl transition-all hover:scale-110 active:scale-95"
                  aria-label="Curtir perfil"
                >
                  <Heart className="size-10 text-white fill-white" />
                </button>
              </div>

              {/* Contador de Perfis */}
              <div className="text-center mt-4">
                <p className="text-sm text-[#6a7282]">
                  {currentIndex + 1} de {pets.length} perfis
                </p>
              </div>
            </div>
          ) : noProfiles ? (
            <div className="text-center">
              <div className="size-24 mx-auto mb-4 rounded-full bg-[rgba(255,169,143,0.13)] flex items-center justify-center">
                <Heart className="size-12 text-[#ffa98f]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">
                Nenhum perfil disponível
              </h2>
              <p className="text-[#4a5565] mb-6">
                Cadastre um pet para começar a encontrar matches 💕
              </p>
              <button
                onClick={handleGoRegister}
                className="px-6 py-3 bg-gradient-to-r from-[#ffa98f] to-[#ff8566] text-white rounded-full hover:shadow-lg transition-shadow"
              >
                Cadastrar pet
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="size-24 mx-auto mb-4 rounded-full bg-[rgba(255,169,143,0.13)] flex items-center justify-center">
                <Heart className="size-12 text-[#ffa98f]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">
                Você viu todos os perfis!
              </h2>
              <p className="text-[#4a5565] mb-6">
                Volte mais tarde para ver novos pets 💕
              </p>
              <button
                onClick={handleGoMatches}
                className="px-6 py-3 bg-gradient-to-r from-[#ffa98f] to-[#ff8566] text-white rounded-full hover:shadow-lg transition-shadow"
              >
                Ver Meus Matches
              </button>
            </div>
          )}
        </main>

      {/* Notificação de Match */}
      {showMatchNotification && currentMatch && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in duration-500">
            <div className="size-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#ffa98f] to-[#ff8566] flex items-center justify-center animate-bounce">
              <Heart className="size-12 text-white fill-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-[#0a0a0a] mb-3">
              É um Match! 🎉
            </h2>
            
            <p className="text-[#4a5565] mb-2">
              Você e <span className="font-bold text-[#0a0a0a]">{currentMatch.name || 'este pet'}</span>
            </p>
            <p className="text-[#4a5565] mb-8">
              demonstraram interesse mútuos!
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="size-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                {getImageUrl(currentMatch) ? (
                  <Image
                    src={getImageUrl(currentMatch)}
                    alt={currentMatch.name || 'Pet'}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    🐾
                  </div>
                )}
              </div>
              <div className="size-16 rounded-full bg-gradient-to-r from-[#ffa98f] to-[#ff8566] flex items-center justify-center">
                <Heart className="size-8 text-white fill-white" />
              </div>
              <div className="size-20 rounded-full bg-[#e5e7eb] flex items-center justify-center text-3xl">
                🐕
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeMatchNotification}
                className="flex-1 px-4 py-3 border-2 border-[#e5e7eb] text-[#4a5565] rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Continuar
              </button>
              <button
                onClick={handleChatFromMatch}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#ffa98f] to-[#ff8566] text-white rounded-full hover:shadow-lg transition-shadow font-medium"
              >
                Conversar
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
}

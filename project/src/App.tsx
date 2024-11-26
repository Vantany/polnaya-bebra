import React, { useEffect, useState } from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';
import EventCard from './components/EventCard';
import EventDetails from './components/EventDetails';
import Logo from './components/Logo';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const mockEvents = [
  {
    id: 1,
    title: "Lakers vs Warriors - Lakers to Win",
    league: "NBA",
    probability: 58,
    endDate: "2024-03-15T20:00:00",
    yesPool: 2450,
    noPool: 1890,
  },
  {
    id: 2,
    title: "Man City vs Arsenal - Over 2.5 Goals",
    league: "Premier League",
    probability: 75,
    endDate: "2024-03-16T15:30:00",
    yesPool: 3200,
    noPool: 1100,
  },
  {
    id: 3,
    title: "Djokovic to Win Miami Open 2024",
    league: "ATP Tour",
    probability: 62,
    endDate: "2024-03-31T21:00:00",
    yesPool: 5600,
    noPool: 3400,
  }
];

function App() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white font-chakra">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {selectedEventId ? (
                <button 
                  onClick={() => setSelectedEventId(null)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              ) : (
                <>
                  <Logo />
                  <h1 className="text-xl font-semibold tracking-wider">LAMIA</h1>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Wallet className="w-5 h-5" />
              <span className="text-zinc-400">1000 LAM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        <div className="px-4 py-4">
          {!selectedEventId && <h2 className="text-lg font-semibold mb-4">Live Predictions</h2>}
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <React.Fragment key={event.id}>
                {selectedEventId === event.id ? (
                  <EventDetails 
                    event={event} 
                    onClose={() => setSelectedEventId(null)}
                  />
                ) : !selectedEventId && (
                  <EventCard 
                    event={event}
                    isSelected={false}
                    onClick={() => setSelectedEventId(event.id)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// interface User {
//   id: string;
//   username: string;
// }

// interface RefreshTokenResponse {
//   access_token: string;
// }

// interface RefreshTokenResponse {
//   access_token: string;
// }

// interface RegisterResponse {
//   access_token: string;
//   refresh_token: string;
//   user: User;
// }

// const App: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
//   const [user, setUser] = useState<User | null>(null); // Состояние пользователя
//   const [error, setError] = useState<string | null>(null); // Состояние для ошибок

//   // Проверка истечения токена
//   const isTokenExpired = (token: string): boolean => {
//     try {
//       const decoded: any = jwt_decode(token);
//       return decoded.exp * 1000 < Date.now();
//     } catch (e) {
//       return true; // Если не удалось декодировать токен, считаем его истёкшим
//     }
//   };

//   // Получение нового Access токена через Refresh токен
//   const refreshAccessToken = async (refreshToken: string): Promise<string> => {
//     try {
//       const response = await axios.post<RefreshTokenResponse>("/api/auth/refresh", {
//         refresh_token: refreshToken,
//       });
//       const { access_token } = response.data;
//       localStorage.setItem("access_token", access_token); // Сохраняем новый токен
//       return access_token;
//     } catch (e) {
//       throw new Error("Не удалось обновить токен");
//     }
//   };

//   // Регистрация или вход через Telegram
//   const registerUser = async (): Promise<User> => {
//     try {
//       const initData = window.Telegram.WebApp.initData; // Получаем initData от Telegram
//       const response = await axios.post<RegisterResponse>("/api/auth/telegram", {
//         initData,
//       });

//       if (response.status === 200) {
//         const { access_token, refresh_token, user } = response.data;
//         localStorage.setItem("access_token", access_token); // Сохраняем Access токен
//         localStorage.setItem("refresh_token", refresh_token); // Сохраняем Refresh токен
//         return user; // Возвращаем данные пользователя
//       } else {
//         throw new Error("Ошибка при регистрации");
//       }
//     } catch (e: any) {
//       throw new Error(e.message || "Не удалось зарегистрировать пользователя");
//     }
//   };

//   // Инициализация приложения
//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         const accessToken = localStorage.getItem("access_token");
//         const refreshToken = localStorage.getItem("refresh_token");

//         if (accessToken && !isTokenExpired(accessToken)) {
//           // Если Access токен валиден
//           const decoded: any = jwt_decode(accessToken);
//           setUser({ id: decoded.user_id, username: decoded.username });
//         } else if (refreshToken) {
//           // Если Access токен истёк, но есть Refresh токен
//           const newAccessToken = await refreshAccessToken(refreshToken);
//           const decoded: any = jwt_decode(newAccessToken);
//           setUser({ id: decoded.user_id, username: decoded.username });
//         } else {
//           // Если нет токенов, регистрируем пользователя
//           const newUser = await registerUser();
//           setUser(newUser);
//         }
//       } catch (e: any) {
//         setError(e.message || "Произошла ошибка при инициализации приложения");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initApp();
//   }, []);

//   if (isLoading) {
//     return <div>Загрузка...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   if (!user) {
//     return <div>Не удалось загрузить данные пользователя</div>;
//   }

//   return (
//     <div>
//       <h1>Добро пожаловать, {user.username}!</h1>
//       <p>Ваш ID: {user.id}</p>
//     </div>
//   );
// };

export default App;
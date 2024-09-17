
import { createContext, ReactNode, useState } from "react";
import { UserValidator } from "../../package/validators/users";
import { useRouter } from "next/navigation";

type SessionStatus = "authenticated" | "unauthenticated";

type SignInParams = {
  email: string;
  password: string;
};

interface SessionContextProps {
  user: UserValidator;
  status: SessionStatus;
  signIn(params: SignInParams): Promise<void>;
  signOut(): Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface SessionProviderProps {
  children: ReactNode;
}

// MOCKED API CALL <3
// --------------------------------------------------------
type MockUser = {
  email: string;
  password: string;
  name: string;
};

// Lista de usuários simulados
const mockUsers: MockUser[] = [
  { email: "teste@teste.com", password: "teste", name: "User One" },
  { email: "user2@example.com", password: "password456", name: "User Two" },
];
// --------------------------------------------------------
//MOCKED FUNCTIONS
// --------------------------------------------------------
async function mockFetchApi(endpoint: string, options?: any) {
  if (endpoint === "authentication/login" && options.method === "POST") {
    const { email, password } = options.body;

    // Verifica se o usuário existe na lista de mock
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return [null, { message: "Email ou senha inválidos." }];
    }

    // Retorna o usuário válido como resposta simulada
    return [user, null];
  }

  if (endpoint === "authentication/logout") {
    // Simular o logout
    return [null, null];
  }

  return [null, { message: "Endpoint não encontrado." }];
}

// --------------------------------------------------------

export default function SessionProvider({ children }: SessionProviderProps) {
  const [status, setStatus] = useState<SessionStatus>("unauthenticated");
  const [user, setUser] = useState<UserValidator>({} as UserValidator);

  const router = useRouter();

  async function signIn({ email, password }: SignInParams) {
    const [data, error] = await mockFetchApi("authentication/login", {
      method: "POST",
      body: { email, password },
    });

    if (error && "message" in error) {
      throw new Error(error.message);
    }

    if (data && "email" in data && "password" in data) {
      setUser(data); // Garantimos que 'data' é do tipo MockUser
      setStatus("authenticated");
      router.replace("/painel");
    } else {
      throw new Error("Invalid user data");
    }
    setStatus("authenticated");
    router.replace("/pagamentos");
  }

  async function signOut() {
    await mockFetchApi("authentication/logout");
    setStatus("unauthenticated");
    router.replace("/entrar");
  }

  return (
    <SessionContext.Provider value={{ status, signIn, signOut, user }}>
      {children}
    </SessionContext.Provider>
  );
}

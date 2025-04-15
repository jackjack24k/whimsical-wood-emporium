
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { findUserByEmail, createUser, validateUserPassword } from '@/utils/mongodbUtils';

type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved auth token
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Using MongoDB to validate user credentials
      const validatedUser = await validateUserPassword(email, password);
      
      if (validatedUser) {
        setUser(validatedUser as User);
        localStorage.setItem('user', JSON.stringify(validatedUser));
        toast({
          title: 'Login successful',
          description: `Welcome back, ${validatedUser.name}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login error',
        description: 'An error occurred connecting to the database. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      
      if (existingUser) {
        toast({
          title: 'Signup failed',
          description: 'An account with this email already exists.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      // Create new user in MongoDB
      const newUserData = {
        email,
        name,
        password, // In production, NEVER store plain text passwords!
        isAdmin: false,
      };
      
      const result = await createUser(newUserData);
      
      if (result && result.insertedId) {
        const newUser = {
          id: result.insertedId.toString(),
          email,
          name,
          isAdmin: false,
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast({
          title: 'Account created',
          description: `Welcome, ${name}! Your account has been created successfully.`,
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Failed to create user account');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup error',
        description: 'An error occurred creating your account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

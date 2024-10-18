interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = 'videoai_users';

export const registerUser = (name: string, email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  
  // Check if user already exists
  if (users.some((user: User) => user.email === email)) {
    return null;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, never store plain text passwords!
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find((u: User) => u.email === email && u.password === password);
  return user || null;
};
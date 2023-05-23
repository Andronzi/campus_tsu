export type Profile = {
    fullName: string;
    email: string;
    birthDate: string;
  }
  
  export type Login = {
    email: string;
    password: string;
  }
  
  export type User = {
    id: string;
    fullName: string;
  }
  
  export type Registration = Profile & Login & {
    confirmPassword: string;
  };
  
  export type Role = "Teacher" | "Student" | "Admin";
  
  export type RolesList = {
    [P in Role as `is${P}`]: boolean;
  }
  
  export type ProfileRequest = Omit<Profile, "email">;
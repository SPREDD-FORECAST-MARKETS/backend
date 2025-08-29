export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

export interface TwitterApiResponse {
  data?: TwitterUser;
  errors?: Array<{ message: string }>;
}

export interface TwitterValidationResult {
  isValid: boolean; 
  user?: TwitterUser; 
  error?: string;
}
export type ServiceResponseSuccess<T extends Record<string, any>> = {
  success: true;
} & T;

export type ServiceResponseFailure ={
  success: false;
  message: string;
};

export type ServiceResponse<T extends Record<string, any>> = Promise<ServiceResponseSuccess<T> | ServiceResponseFailure>;

export type OrderResponse = {
  name: string;
  order: {
    number: number;
  }
};

export type SuccessResponse = {
  message: string
}

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = {
  user: {
    email: string;
    name: string;
  }
};

export type ServiceParams = {
  signal?: AbortSignal;
  method?: string;
  body?: string;
  headers?: {
    [key: string]: string;
  }
}

export type AuthResponse = TokenResponse & UserResponse

import {AuthService} from "../modules/auth/services/auth.service";

export function appInitializer(authService: AuthService) {
  return () => authService.checkIsLoginUser();
}


import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "../modules/auth/services/auth.service";

export function appInitializer(authService: AuthService) {
  return () => authService.checkCurrentLoggedInUser();
}

export const appInitializercreater = {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [AuthService],
    multi: true
}

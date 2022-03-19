import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "../services/auth.service";

function appInitializer(authService: AuthService) {
    return () => authService.checkIsLoginUser();
}
export const appInitializerInterceptor = {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [AuthService],
    multi: true
}
import { HttpErrorResponse } from "@angular/common/http";


export function errorResponse(err: HttpErrorResponse) {

    return Array.isArray(err.error.message)? err.error.message : [err.error.message];
}
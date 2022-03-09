import { HttpErrorResponse } from "@angular/common/http";

// const errorResponse: HttpErrorResponse = 
// Array.isArray(err.error.message)?err.error.message:[err.error.message]
export function errorResponse(err: HttpErrorResponse) {
    // let x = Array.isArray(err.error.message)?err.error.message:[err.error.message];
    // console.log("X", x);
    
    return Array.isArray(err.error.message)? err.error.message : [err.error.message];
}
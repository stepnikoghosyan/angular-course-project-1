import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {PaginatedResponseModel} from "../../../models/paginated-response.model";
import {environment} from "../../../../environments/environment";
import {UserQueryParamsModel} from "../models/user-query-params.model";
import {Observable} from "rxjs";
import {paramsToHttpParams} from "../helpers/convert-to-http-params.helper";

@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) {
  }

  getUsers(params?: UserQueryParamsModel): Observable<PaginatedResponseModel<UserModel>> {
    return this.httpClient.get<PaginatedResponseModel<UserModel>>(`${environment.apiUrl}/users`, {
      params: params ? paramsToHttpParams(params) : {}
    });
  }

}

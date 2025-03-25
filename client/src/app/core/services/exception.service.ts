import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreHttpService, ResponseModel } from "./core-http.service";
import { BasedDto } from "./core-auth.service";

@Injectable({
    providedIn: 'root',
})
export class ExceptionService {
    constructor(
        private http: HttpClient,
        private coreHttp: CoreHttpService
    ) { }

    getAllExceptions(): Observable<ResponseModel<ExceptionLogDto[]>> {
        return this.coreHttp.get<ExceptionLogDto[]>('exception');
    }

}

export class ExceptionLogDto extends BasedDto {
    project: string;
    module: string;
    server?: string;
    serverType?: string;
    method?: string;
    baseUrl?: string;
    path?: string;
    clientIp?: string;
    clientId?: string;
    statusCode?: number;
    errorMessage?: string;
    messageStack?: string;
}
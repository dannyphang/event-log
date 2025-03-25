import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreHttpService, ResponseModel } from "./core-http.service";
import { BasedDto } from "./core-auth.service";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    constructor(
        private http: HttpClient,
        private coreHttp: CoreHttpService
    ) { }

    getAllEvents(): Observable<ResponseModel<EventLogDto[]>> {
        return this.coreHttp.get<EventLogDto[]>('event');
    }

}

export class EventLogDto extends BasedDto {
    project: string;
    eventName: string;
    description: string;
    module: string;
    appPlatform?: string;
    browser?: string;
    browserVersion?: string;
    mobileModel?: string;
    mobileOSVersion?: string;
    clientIMEI?: string;
    clientHostName?: string;
    clientIP?: string;
    clientPort?: string;
    clientLatitude?: string;
    clientLongitude?: string;
}
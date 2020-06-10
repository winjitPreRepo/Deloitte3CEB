import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { TranslatorService } from './translator/translator.service';
import { MenuService } from './menu/menu.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { HttpService } from './http/http.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SettingsService,
        ThemesService,
        TranslatorService,
        MenuService,
        {
            provide: HttpClient,
            useClass: HttpService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        }
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

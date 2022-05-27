import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ErrorService } from '../_services/error.service';
import { LoggingService } from '../_services/logging.service';
import { NotificationService } from '../_services/notification.service';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorService: ErrorService, private logger: LoggingService,
        private notifier: NotificationService) {}

    handleError(error: Error | HttpErrorResponse) {

        let message;
        let stackTrace;
        debugger
        if (error instanceof HttpErrorResponse) {
            // Server Error
            alert('server error')
            message = this.errorService.getServerMessage(error.error);
            stackTrace = this.errorService.getServerStack(error);
            this.notifier.showError(message);
        } else {
            // Client Error
            alert('client error')
            message = this.errorService.getClientMessage(error);
            stackTrace = this.errorService.getClientStack(error);
            this.notifier.showError(message);
        }

        // Always log errors
        this.logger.logError(message, stackTrace);

        console.error(error);
    }
}

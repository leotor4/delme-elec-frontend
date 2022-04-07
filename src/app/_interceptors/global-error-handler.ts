import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ErrorService } from '../_services/error.service';
import { LoggingService } from '../_services/logging.service';
import { NotificationService } from '../_services/notification.service';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;
        debugger
        if (error instanceof HttpErrorResponse) {
            // Server Error
            alert('server error')
            message = errorService.getServerMessage(error.error);
            stackTrace = errorService.getServerStack(error);
            notifier.showError(message);
        } else {
            // Client Error
            alert('client error')
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            notifier.showError(message);
        }

        // Always log errors
        logger.logError(message, stackTrace);

        console.error(error);
    }
}

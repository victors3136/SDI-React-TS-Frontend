import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import HTTPRequestCommand from "./HTTPRequestCommand";
import axios from "axios";

import {handleCommandResponseProblemStatus} from "../commands/auxilliaries/handleCommandResponseProblemStatus";

export abstract class RetryableHTTPRequestCommand extends HTTPRequestCommand {

    protected constructor(client?: IHTTPClient) {
        super(client);
    }

    protected abstract request(state: ApplicationState): Promise<any>;

    protected abstract showEffectOnPageBeforeSendingToServer(): boolean;

    protected abstract syncLocal(state: ApplicationState): void;

    async execute(state: ApplicationState) {
        if (this.showEffectOnPageBeforeSendingToServer()) {
            this.syncLocal(state);
        }
        if (HTTPRequestCommand.serverIsDown || RetryableHTTPRequestCommand.requestQueue.length > 0) {
            RetryableHTTPRequestCommand.enqueue(this, state);
            return;
        }
        try {
            await this.request(state);
        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                state.setErrorMessage("Server seems to be down :(\n Keeping a local session for now...");
                HTTPRequestCommand.serverIsDown = true;
                RetryableHTTPRequestCommand.enqueue(this, state);
            } else if (axios.isAxiosError(error) && error.response) {
                handleCommandResponseProblemStatus({status: error.response.status}, state);
            } else {
                state.setErrorMessage("Unexpected error occurred");
            }
            return;
        }
        if (!this.showEffectOnPageBeforeSendingToServer()) {
            this.syncLocal(state);
        }
    }

    private static requestQueue: RetryableHTTPRequestCommand[] = [];
    private static isBusy = false;

    protected static enqueue(command: RetryableHTTPRequestCommand, state: ApplicationState) {
        RetryableHTTPRequestCommand.requestQueue.push(command);
        RetryableHTTPRequestCommand.retry(state).then(_discard => {
        });
    }

    private static retryDelay = 1_000 /*milliseconds*/;
    private static maxRetryDelay = 60_000 /*milliseconds*/;

    private static async retry(state: ApplicationState) {
        if (RetryableHTTPRequestCommand.isBusy) {
            // there is already a running instance of this function -- the queue is managed
            return;
        }
        if (RetryableHTTPRequestCommand.requestQueue.length <= 0) {
            return;
        }
        RetryableHTTPRequestCommand.isBusy = true;
        while (RetryableHTTPRequestCommand.requestQueue.length > 0) {
            const current = RetryableHTTPRequestCommand.requestQueue[0];
            try {
                await current.request(state);
                console.log("Reestablishing connection successful :) Moving on...");
                HTTPRequestCommand.serverIsDown = false;
                RetryableHTTPRequestCommand.requestQueue.shift();
                RetryableHTTPRequestCommand.retryDelay = 1_000;
            } catch (error) {
                RetryableHTTPRequestCommand.retryDelay = Math.min(
                    RetryableHTTPRequestCommand.retryDelay * 1.5,
                    RetryableHTTPRequestCommand.maxRetryDelay);

                console.log(`Reestablishing connection failed -- waiting for ${RetryableHTTPRequestCommand.retryDelay} milliseconds`);

                await new Promise(resolve => setTimeout(resolve, RetryableHTTPRequestCommand.retryDelay));

            }
        }
        RetryableHTTPRequestCommand.isBusy = false;
    }
}
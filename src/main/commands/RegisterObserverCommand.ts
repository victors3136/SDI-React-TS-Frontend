import ICommand from "./ICommand";
import React from "react";
import ApplicationState from "../../state/public/ApplicationStateType";
import GetTaskPageCommand from "./read/GetTaskPageCommand";

export class RegisterObserverCommand implements ICommand {
    private underTheLastLoadedItem: React.MutableRefObject<null>;

    private intersectCallback = (state: ApplicationState, tasks: IntersectionObserverEntry[]) => {
        const lastLoadedTask = tasks[tasks.length - 1];
        if (lastLoadedTask.intersectionRatio > 0) {
            new GetTaskPageCommand(state.latestPage).execute(state);
        }
    }

    public constructor(observer: React.MutableRefObject<any>) {
        this.underTheLastLoadedItem = observer;
    }

    execute(state: ApplicationState) {
        const callback = async (observedTasks: IntersectionObserverEntry[]) =>
            this.intersectCallback(state, observedTasks);
        const options = {threshold: 1};
        const observer = new IntersectionObserver(callback, options);
        const current = this.underTheLastLoadedItem.current;
        const cleanup = () => {
            if (current) {
                observer.unobserve(current);
            }
        };
        if (current) {
            observer.observe(current);
        }
        return cleanup;
    }
}
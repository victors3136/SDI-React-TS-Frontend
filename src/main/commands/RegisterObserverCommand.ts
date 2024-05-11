import ICommand from "./ICommand";
import React from "react";
import ApplicationState from "../../state/public/ApplicationStateType";
import {incrementPageCounter} from "../../state/public/utils/incrementPageCounter";
import GetTaskPageCommand from "./read/GetTaskPageCommand";

export class RegisterObserverCommand implements ICommand {
    private underTheLastLoadedItem: React.MutableRefObject<null>;

    private intersectCallback = (state: ApplicationState, tasks: IntersectionObserverEntry[]) => {
        const lastLoadedTask = tasks[tasks.length - 1];
        if (lastLoadedTask.intersectionRatio > 0) {
            incrementPageCounter(state);
            // console.log(state.latestPage);
            new GetTaskPageCommand(state.latestPage).execute(state);
        }
    }

    public constructor(observer: React.MutableRefObject<any>) {
        this.underTheLastLoadedItem = observer;
    }

    execute(state: ApplicationState) {
        const observer = new IntersectionObserver(
            async (observedTasks) =>
                this.intersectCallback(state, observedTasks),
            {threshold: 1});
        const current = this.underTheLastLoadedItem.current;
        if (current) {
            observer.observe(current);
        }
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }
}
import ITask from "../../state/interface-task";

export const TaskView = (task: ITask) => {
    return <div className="col">
        <div key={task.id}
             className="card Entry-View"
             style={{
                 // backgroundColor: backgroundColor,
                 // color: textColor,
                 border: "2px solid black",
                 borderRadius: "5px",
                 display: "flex",
                 flexDirection: "column",
                 minHeight: "100%"
             }}>
            <div style={{padding: "1%"}}>
                <h1 className="card-title"
                    style={{
                        // color: getColorByDate(target.target.dueDate, today),
                        textAlign: "center",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        padding: "2px"
                    }}> {task.name}
                </h1>
                <h2 className="card-subtitle"
                    style={{width: "100%", justifyContent: "center", display: "flex"}}>
                    Due on {
                    task.dueDate.getDate()
                    + '/'
                    + (task.dueDate.getMonth() + 1)
                    + '/'
                    + task.dueDate.getFullYear()
                }
                </h2>
            </div>
            <div className="card-footer" style={{marginTop: "auto"}}>
                <div className="container-fluid flex-row justify-content-evenly"
                     style={{padding: "8px", display: "flex", height: "100%"}}>
                    {/*<ViewButton target={target.target}/>*/}
                    {/*<EditButton target={target.target}/>*/}
                    {/*<DeleteButton target={target.target}/>*/}
                    {/*<ToggleSelectionButton target={target.target}/>*/}
                    {/*<AddSubentryButton id={target.target.id}/>*/}
                </div>
            </div>
        </div>
    </div>;
};
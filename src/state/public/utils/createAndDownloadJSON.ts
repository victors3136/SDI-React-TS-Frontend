import ITask from "../ITask";

export const createAndDownloadJSON = (list: ITask[], filename = 'data.json') => {
    const jsonContents = JSON.stringify(list);
    const fileObject = new Blob([jsonContents], {type: 'application/json'});
    const url = URL.createObjectURL(fileObject);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
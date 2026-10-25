export function getTaskStats(tasks){
    const today=new Date();
    today.setHours(0,0,0,0);
    const total=tasks.length;
    const completed= tasks.filter(
        (task)=> task.status==="Completed"
    ).length;

    const inProgress=tasks.filter(
        (task)=> task.status==="In Progress"
    ).length;

    const overdue= tasks.filter((task)=>{
        if(task.status==="Completed"||!task.dueDate){
            return false;
        }
        const dueDate=new Date(task.dueDate);

        if(Number.isNaN(dueDate.getTime())){
            return false;
        }
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
    }).length;

    const toDo=tasks.filter(
        (task)=>task.status==="To Do"
    ).length;

    return {
        total,
        completed,
        inProgress,
        overdue,
        toDo,
        completionPercentage:
            total ===0 ? 0 : Math.round((completed/total)*100),
    };
}
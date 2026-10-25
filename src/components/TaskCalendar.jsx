import { useState } from "react";

function TaskCalendar({ tasks, onViewTask }){

    const [currentDate, setCurrentDate] =useState(()=>new Date());
    const year=currentDate.getFullYear();
    const month=currentDate.getMonth();
    const firstDay=new Date(year, month, 1).getDay();
    const daysInMonth=new Date(year, month+1, 0).getDate();
    const today = new Date();

    const isToday = (day) =>
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
        
    const monthName=currentDate.toLocaleDateString("en-US",{
        month:"long",
        year: "numeric",
    });

    function getTaskDate(dateString){
        if(!dateString) return null;

        const date= new Date(dateString);

        if(Number.isNaN(date.getTime())) return null;

        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }

    function tasksForDay(day){
        return tasks.filter((task)=>{
            const date=getTaskDate(task.dueDate);
            return (
                date &&
                date.getFullYear()===year &&
                date.getMonth()==month &&
                date.getDate()===day
            );
        });
    }

    function changeMonth(offset){
        setCurrentDate(new Date(year, month+offset, 1));
    }

    const cells =[
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, index)=> index+1),
    ];

    return (
        <section className="calendar-section">
            <div className="calendar-header">
                <div>
                    <h2>Task Calendar</h2>
                    <p>View tasks by their due dates.</p>
                </div>
                <div className="calendar-controls">
                    <button
                        type="button"
                        onClick={()=> changeMonth(-1)}
                        aria-label="Pervious month"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={()=> setCurrentDate(new Date())}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={()=> changeMonth(1)}
                        aria-label="Next month"
                    >
                        →
                    </button>
                </div>
            </div>
            <h3 className="calendar-month-title">{monthName}</h3>
            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day)=>(
                        <div className="calendar-weekday" key={day}>
                            {day}
                        </div>
                    )
                )}
                {cells.map((day,index)=>{
                    const dayTasks=day ? tasksForDay(day) : [];
                    return (
                        <div className={`calendar-day ${day ? "": "calendar-empty"}`}
                            key={`${day ?? "empty"}-${index}`}
                        >
                            {day && (
                                <>
                                    <span className={`calendar-day-number 
                                        ${isToday(day) ? "Today-number" : ""}`}
                                    >
                                        {day}
                                    </span>
                                    <div className="calendar-day-tasks">
                                        {dayTasks.slice(0,2).map((task)=>(
                                            <button
                                                type="button"
                                                className={`calendar-task status-${(task.status ?? "To Do")
                                                            .toLowerCase()
                                                            .replace(/\s+/g, "-")}`}
                                                key={task.id}
                                                onClick={()=> onViewTask(task)}
                                                title={task.title}
                                            >
                                                {task.title}
                                            </button>
                                        ))}
                                        {dayTasks.length>2 && (
                                            <span className="calendar-more">
                                                +{dayTasks.length-2} more
                                            </span>

                                        )}
                                    </div>
                                </>
                            )}
                        </div>    
                    )
                })}
            </div>
        </section>
    )
}

export default TaskCalendar;
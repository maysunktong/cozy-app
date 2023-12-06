import { useEffect, useState } from "react";

export const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "todo");
    const filterInProgress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterReview = tasks.filter((task) => task.status === "review");
    const filterDone = tasks.filter((task) => task.status === "done");

    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setReview(filterReview);
    setDone(filterDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "review", "done"];

  return (
    <div className='flex gap-4 w-screen'>
      {statuses.map((status, index) => {
        return <Section key={index} status={status} tasks={tasks} setTasks={setTasks} 
        todos={todos} inProgress={inProgress} review={review} done={done} />;
      })}
    </div>
  );
};

const Section = ({ status, tasks, setTasks, todos, inProgress, review, done }) => {
  const taskCount = { todo: todos.length, inprogress: inProgress.length, review: review.length, done: done.length };
  const statusColor = { todo: 'bg-blue-500', inprogress: 'bg-yellow-500', review: 'bg-orange-500', done: 'bg-green-500' };
  return (
    <div className={`flex items-center w-full ${statusColor[status]}`}>
      <h2 className='text-xl font-bold'>{status}</h2>
      <div className='w-10 h-10 rounded-full flex items-center justify-center text-white'>
        {taskCount[status]}
      </div>
    </div>
  );
};

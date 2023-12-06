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
    <div className='flex gap-4'>
      {statuses.map((status, index) => {
        return <Section key={index} status={status} />;
      })}
    </div>
  );
};

const Section = ({ status }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2>{status}</h2>
    </div>
  );
};

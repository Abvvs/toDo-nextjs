"use client";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  try {
    console.log("Iniciando solicitud fetch...");
    const res = await fetch("/api/tasks/");
    console.log("Respuesta recibida:", res);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data); // Para ver qué datos estás recibiendo
    return data;
  } catch (error) {
    console.error("Hubo un problema con la solicitud fetch:", error);
  }
}

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const data = await loadTasks();
      setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
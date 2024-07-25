"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setTitle(data.title);
          setDescription(data.description);
          setCompleted(data.completed);
        });
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    //console.log(event);
    //const title = event.target.title.value;
    //const description = event.target.description.value;
    //const completed = event.target[2].checked;
    console.log({ title, description, completed });
    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description, completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    }
    //console.log(data);
    router.refresh();
    router.push("/");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Título de la tarea
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              type="text"
              placeholder="Hacer compras"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Descripción
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="description"
              placeholder="Hacer compras en el supermercado"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="completed"
              onChange={(event) => setCompleted(event.target.checked)}
              checked={completed}
            />
            <span className="text-sm">Completado</span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-between">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Crear
            </button>
            {params.id && (
              <button
                className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-4" onClick={async () => {
                  const res = await fetch(`/api/tasks/${params.id}`, {
                    method: "DELETE",
                  });
                  router.refresh();
                  router.push("/");
                }}
                type="button"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPage;

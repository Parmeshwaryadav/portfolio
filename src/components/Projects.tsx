import data from "../data/projects.json";

export default function Projects() {
  return (
    <section className="px-8 flex flex-col mb-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Poof of work</h1>
      <div className="flex flex-col">
        {data.projects.map(() => (
          <div className="bg-red-300">red</div>
        ))}
      </div>
    </section>
  );
}

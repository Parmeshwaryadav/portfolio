import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

type Project = {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  links?: { name: string; href: string; icon: string }[];
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="w-full max-w-md mx-auto border border-gray-700 rounded-2xl bg-transparent shadow-none text-white p-0">
      {project.image && (
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover rounded-t-2xl border-b border-gray-800"
        />
      )}
      <div className="px-8 pt-8 pb-0 flex flex-col">
        <CardTitle className="text-2xl font-extrabold mb-2 text-white">
          {project.name}
        </CardTitle>
        <CardDescription className="text-base text-gray-300 mb-4 font-normal">
          {project.description}
        </CardDescription>
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-[#23272f] text-white font-semibold px-3 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="px-8 pb-8 pt-0">
        <div className="flex gap-3">
          {project.links &&
            project.links.map(
              (
                link: { name: string; href: string; icon: string },
                i: number
              ) => (
                <a
                  key={i}
                  href={link.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 font-semibold text-sm"
                  style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.04)" }}
                >
                  {link.icon === "github" && (
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                    </svg>
                  )}
                  {link.icon === "globe" && (
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.657 0 3.156.672 4.242 1.758A5.978 5.978 0 0 0 18 12c0 1.657-.672 3.156-1.758 4.242A5.978 5.978 0 0 0 12 18a5.978 5.978 0 0 0-4.242-1.758A5.978 5.978 0 0 0 6 12c0-1.657.672-3.156 1.758-4.242A5.978 5.978 0 0 0 12 4zm0 2a4 4 0 0 0-4 4c0 1.657.672 3.156 1.758 4.242A4 4 0 0 0 12 16a4 4 0 0 0 4-4c0-1.657-.672-3.156-1.758-4.242A4 4 0 0 0 12 6z" />
                    </svg>
                  )}
                  {link.name}
                </a>
              )
            )}
        </div>
      </div>
    </Card>
  );
}

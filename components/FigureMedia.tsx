import type { Project } from "@/lib/data";
import ModelViewport from "./ModelViewport";

/** The drawing inside a figure frame: the project's 3D model. */
export default function FigureMedia({ project }: { project: Project }) {
  return (
    <div className="frame">
      <i className="mark tl" />
      <i className="mark tr" />
      <i className="mark bl" />
      <i className="mark br" />
      <div className="aspect-[4/3] max-h-[calc(100svh-7rem)] min-h-[200px] w-full sm:aspect-video">
        <ModelViewport
          model={project.model}
          label={`${project.title} — 3D model.`}
        />
      </div>
    </div>
  );
}

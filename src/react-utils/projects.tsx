import { Bird, Grid, Octagon, Phone } from "lucide-react";
import { Noclip } from "../components/windows/contents/Noclip.tsx";
import { type Project, ProjectId } from "./project-types.ts";

export const noclip: Project = {
	id: ProjectId.NOCLIP,
	title: <h1>Noclip</h1>,
	defaultIcon: <Grid size={16} />,
	desktopIcon: <Grid size={48} />,
	footerIcon: <Grid size={16} />,
	content: <Noclip />,
};

export const octant: Project = {
	id: ProjectId.OCTANT,
	title: <h1>Octant</h1>,
	defaultIcon: <Octagon size={16} />,
	desktopIcon: <Octagon size={48} />,
	footerIcon: <Octagon size={16} />,
	content: <div>Octant content</div>,
};

export const phony: Project = {
	id: ProjectId.PHONY,
	title: <h1>Phony</h1>,
	defaultIcon: <Phone size={16} />,
	desktopIcon: <Phone size={48} />,
	footerIcon: <Phone size={16} />,
	content: <div>Phony content</div>,
};

export const apus: Project = {
	id: ProjectId.APUS,
	title: <h1>Apus</h1>,
	defaultIcon: <Bird size={16} />,
	desktopIcon: <Bird size={48} />,
	footerIcon: <Bird size={16} />,
	content: <div>Apus content</div>,
};

export const projects: Project[] = [noclip, octant, phony, apus];

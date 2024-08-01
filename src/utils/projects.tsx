import { Bird, Grid, Octagon, Phone } from "lucide-react";
import type { ReactElement } from "react";

export type Project = {
	id: string;
	title: string;
	defaultIcon: ReactElement;
	desktopIcon?: ReactElement;
	footerIcon?: ReactElement;
	content?: ReactElement;
};

export const noclip: Project = {
	id: "noclip",
	title: "Noclip",
	defaultIcon: <Grid size={16} />,
	desktopIcon: <Grid size={32} />,
	footerIcon: <Grid size={16} />,
	content: <div>Noclip content</div>,
};

export const octant: Project = {
	id: "octant",
	title: "Octant",
	defaultIcon: <Octagon size={16} />,
	desktopIcon: <Octagon size={32} />,
	footerIcon: <Octagon size={16} />,
	content: <div>Octant content</div>,
};

export const phony: Project = {
	id: "phony",
	title: "Phony Game",
	defaultIcon: <Phone size={16} />,
	desktopIcon: <Phone size={32} />,
	footerIcon: <Phone size={16} />,
	content: <div>Phony content</div>,
};

export const apus: Project = {
	id: "apus",
	title: "Apus",
	defaultIcon: <Bird size={16} />,
	desktopIcon: <Bird size={32} />,
	footerIcon: <Bird size={16} />,
	content: <div>Apus content</div>,
};

export const projects: Project[] = [noclip, octant, phony, apus];

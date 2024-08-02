import type { ReactElement } from "react";

export enum ProjectId {
	NOCLIP = "noclip",
	OCTANT = "octant",
	PHONY = "phony",
	APUS = "apus",
}

export type Project = {
	id: ProjectId;
	title: ReactElement;
	defaultIcon: ReactElement;
	desktopIcon?: ReactElement;
	footerIcon?: ReactElement;
	content?: ReactElement;
};

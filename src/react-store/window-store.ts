import { create } from "zustand";

interface ProjectWindowState {
	isOpen: boolean;
	isReduced: boolean;
}

interface ProjectState extends ProjectWindowState {
	setIsOpen: (state: boolean) => void;
	setIsReduced: (state: boolean) => void;
}

interface WindowState {
	noclip: ProjectState;
	octant: ProjectState;
	phony: ProjectState;
	apus: ProjectState;
	toggleWindow: (window: string) => void;
	closeWindow: (window: string) => void;
}

const createProjectSlice = (set: any) => ({
	isOpen: false,
	isReduced: false,
	setIsOpen: (state: boolean) => set({ isOpen: state }),
	setIsReduced: (state: boolean) => set({ isReduced: state }),
});

export const useWindowStore = create<WindowState>()((set) => ({
	noclip: createProjectSlice((state: ProjectWindowState) =>
		set((prevState: WindowState) => ({
			noclip: { ...prevState.noclip, ...state },
		})),
	),
	octant: createProjectSlice((state: ProjectWindowState) =>
		set((prevState: WindowState) => ({
			octant: { ...prevState.octant, ...state },
		})),
	),
	phony: createProjectSlice((state: ProjectWindowState) =>
		set((prevState: WindowState) => ({
			phony: { ...prevState.phony, ...state },
		})),
	),
	apus: createProjectSlice((state: ProjectWindowState) =>
		set((prevState: WindowState) => ({
			apus: { ...prevState.apus, ...state },
		})),
	),

	toggleWindow: (window: string) =>
		set((state: WindowState) => {
			const project = state[window as keyof WindowState] as ProjectState;
			if (project.isReduced) {
				return { [window]: { ...project, isOpen: true, isReduced: false } };
			}
			if (project.isOpen) {
				return { [window]: { ...project, isOpen: false, isReduced: true } };
			}
			return { [window]: { ...project, isOpen: true, isReduced: false } };
		}),

	closeWindow: (window: string) =>
		set((state: WindowState) => {
			const project = state[window as keyof WindowState] as ProjectState;
			return { [window]: { ...project, isOpen: false, isReduced: false } };
		}),
}));

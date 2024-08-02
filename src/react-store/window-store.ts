import { create } from "zustand";
import { ProjectId } from "../react-utils/project-types";

interface ProjectState {
	isOpen: boolean;
	isReduced: boolean;
}

type ProjectStates = {
	[K in ProjectId]: ProjectState;
};

interface WindowStateMethods {
	toggleWindow: (window: ProjectId) => void;
	toggleWindowFromFooter: (window: ProjectId) => void;
	closeWindow: (window: ProjectId) => void;
	getWindowState: (window: ProjectId) => ProjectState;
	unReduceWindow: (window: ProjectId) => void;
}

type WindowState = ProjectStates & WindowStateMethods;

export const useWindowStore = create<WindowState>()((set, get) => ({
	[ProjectId.NOCLIP]: { isOpen: false, isReduced: false },
	[ProjectId.OCTANT]: { isOpen: false, isReduced: false },
	[ProjectId.PHONY]: { isOpen: false, isReduced: false },
	[ProjectId.APUS]: { isOpen: false, isReduced: false },
	toggleWindow: (window) =>
		set((state) => ({
			[window]: {
				isOpen: !state[window].isReduced && !state[window].isOpen,
				isReduced: state[window].isOpen,
			},
		})),
	toggleWindowFromFooter: (window) =>
		set((state) => {
			const currentState = state[window];
			if (currentState.isOpen) {
				return { [window]: { isOpen: false, isReduced: true } };
			}
			if (currentState.isReduced) {
				return { [window]: { isOpen: true, isReduced: false } };
			}
			return { [window]: { isOpen: true, isReduced: false } };
		}),
	closeWindow: (window) =>
		set((state) => ({
			[window]: { isOpen: false, isReduced: false },
		})),
	getWindowState: (window) => get()[window],
	unReduceWindow: (window) =>
		set((state) => ({
			[window]: { isOpen: true, isReduced: false },
		})),
}));

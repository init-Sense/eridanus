import { create } from "zustand";

interface WindowState {
	isNoclipOpen: boolean;
	isOctantOpen: boolean;
	isPhonyOpen: boolean;
	isApusOpen: boolean;
	setIsNoclipOpen: (state: boolean) => void;
	setIsOctantOpen: (state: boolean) => void;
	setIsPhonyOpen: (state: boolean) => void;
	setIsApusOpen: (state: boolean) => void;
}

export const useWindowStore = create<WindowState>()((set) => ({
	isNoclipOpen: false,
	isOctantOpen: false,
	isPhonyOpen: false,
	isApusOpen: false,
	setIsNoclipOpen: (state) => set({ isNoclipOpen: state }),
	setIsOctantOpen: (state) => set({ isOctantOpen: state }),
	setIsPhonyOpen: (state) => set({ isPhonyOpen: state }),
	setIsApusOpen: (state) => set({ isApusOpen: state }),
}));

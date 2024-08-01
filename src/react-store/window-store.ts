import { create } from "zustand";

interface WindowState {
	isNoclipOpen: boolean;
	isOctantOpen: boolean;
	isPhonyOpen: boolean;
	isApusOpen: boolean;
	isNoclipReduced: boolean;
	isOctantReduced: boolean;
	isPhonyReduced: boolean;
	isApusReduced: boolean;
	setIsNoclipOpen: (state: boolean) => void;
	setIsOctantOpen: (state: boolean) => void;
	setIsPhonyOpen: (state: boolean) => void;
	setIsApusOpen: (state: boolean) => void;
	setIsNoclipReduced: (state: boolean) => void;
	setIsOctantReduced: (state: boolean) => void;
	setIsPhonyReduced: (state: boolean) => void;
	setIsApusReduced: (state: boolean) => void;
	toggleWindow: (window: string) => void;
	closeWindow: (window: string) => void;
}

export const useWindowStore = create<WindowState>()((set) => ({
	isNoclipOpen: false,
	isOctantOpen: false,
	isPhonyOpen: false,
	isApusOpen: false,
	isNoclipReduced: false,
	isOctantReduced: false,
	isPhonyReduced: false,
	isApusReduced: false,
	setIsNoclipOpen: (state) => set({ isNoclipOpen: state }),
	setIsOctantOpen: (state) => set({ isOctantOpen: state }),
	setIsPhonyOpen: (state) => set({ isPhonyOpen: state }),
	setIsApusOpen: (state) => set({ isApusOpen: state }),
	setIsNoclipReduced: (state) => set({ isNoclipReduced: state }),
	setIsOctantReduced: (state) => set({ isOctantReduced: state }),
	setIsPhonyReduced: (state) => set({ isPhonyReduced: state }),
	setIsApusReduced: (state) => set({ isApusReduced: state }),
	toggleWindow: (window) =>
		set((state) => {
			const isOpenKey = `is${window}Open` as keyof WindowState;
			const isReducedKey = `is${window}Reduced` as keyof WindowState;

			if (state[isReducedKey]) {
				// If the window is reduced, open it and un-reduce it
				return {
					[isOpenKey]: true,
					[isReducedKey]: false,
				};
			}
			if (state[isOpenKey]) {
				// If the window is open, reduce it
				return {
					[isOpenKey]: false,
					[isReducedKey]: true,
				};
			}
			// If the window is neither open nor reduced, open it
			return {
				[isOpenKey]: true,
				[isReducedKey]: false,
			};
		}),
	closeWindow: (window) =>
		set((state) => {
			const isOpenKey = `is${window}Open` as keyof WindowState;
			const isReducedKey = `is${window}Reduced` as keyof WindowState;

			// Close the window without reducing it
			return {
				[isOpenKey]: false,
				[isReducedKey]: false,
			};
		}),
}));

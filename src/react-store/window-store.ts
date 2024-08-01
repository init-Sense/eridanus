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

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

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
			const capitalizedWindow = capitalizeFirstLetter(window);
			const isOpenKey = `is${capitalizedWindow}Open` as keyof WindowState;
			const isReducedKey = `is${capitalizedWindow}Reduced` as keyof WindowState;

			if (state[isReducedKey]) {
				return {
					[isOpenKey]: true,
					[isReducedKey]: false,
				};
			}
			if (state[isOpenKey]) {
				return {
					[isOpenKey]: false,
					[isReducedKey]: true,
				};
			}

			return {
				[isOpenKey]: true,
				[isReducedKey]: false,
			};
		}),
	closeWindow: (window) =>
		set((state) => {
			const capitalizedWindow = capitalizeFirstLetter(window);
			const isOpenKey = `is${capitalizedWindow}Open` as keyof WindowState;
			const isReducedKey = `is${capitalizedWindow}Reduced` as keyof WindowState;

			return {
				[isOpenKey]: false,
				[isReducedKey]: false,
			};
		}),
}));

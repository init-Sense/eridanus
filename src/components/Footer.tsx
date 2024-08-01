import { AppWindowIcon, Gamepad2Icon, MenuIcon } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="flex flex-row bg-gray-800 text-white px-2 py-2 gap-4">
			<MenuIcon size={14} />
			<AppWindowIcon size={14} />
			<Gamepad2Icon size={14} />
		</footer>
	);
};

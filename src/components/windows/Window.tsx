import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { FC, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";

interface WindowProps {
	title: string;
	onClose: () => void;
	children: ReactNode;
	zIndex: number;
	onFocus: () => void;
}

export const Window: FC<WindowProps> = ({
	title,
	onClose,
	children,
	zIndex,
	onFocus,
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDown = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onFocus();
		}
	};

	return (
		<motion.div
			drag
			dragMomentum={false}
			onDragStart={() => setIsDragging(true)}
			onDragEnd={() => setIsDragging(false)}
			className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
			style={{ width: "400px", height: "300px", zIndex }}
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.5, opacity: 0 }}
			onMouseDown={handleMouseDown}
		>
			<div
				className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move"
				onMouseDown={onFocus}
			>
				<h2 className="text-sm font-semibold">{title}</h2>
				<button
					type={"button"}
					onClick={onClose}
					className="text-gray-500 hover:text-gray-700"
					style={{ pointerEvents: isDragging ? "none" : "auto" }}
				>
					<X size={16} />
				</button>
			</div>
			<div className="p-4 h-[calc(100%-40px)] overflow-auto">{children}</div>
		</motion.div>
	);
};

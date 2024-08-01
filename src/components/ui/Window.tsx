import { AnimatePresence, motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useState } from "react";

interface WindowProps {
	title: string;
	onClose: () => void;
	onReduce: () => void;
	children: ReactNode;
	zIndex: number;
	onFocus: () => void;
	isOpen: boolean;
	isReducing: boolean;
}

const windowVariants = {
	open: {
		scale: 1,
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 30 },
	},
	closedExit: {
		scale: 0.5,
		opacity: 0,
		transition: { duration: 0.2 },
	},
	reducedExit: {
		scale: 0.2,
		opacity: 0,
		y: "100vh",
		transition: { duration: 0.3 },
	},
};

export const Window: FC<WindowProps> = ({
	title,
	onClose,
	onReduce,
	children,
	zIndex,
	onFocus,
	isOpen,
	isReducing,
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onFocus();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					drag
					dragMomentum={false}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={() => setIsDragging(false)}
					className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
					style={{ width: "400px", height: "300px", zIndex }}
					variants={windowVariants}
					initial="closedExit"
					animate="open"
					exit={isReducing ? "reducedExit" : "closedExit"}
					onMouseDown={handleMouseDown}
				>
					<div
						className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move"
						onMouseDown={onFocus}
					>
						<h2 className="text-sm font-semibold">{title}</h2>
						<div className="flex items-center">
							<button
								type="button"
								onClick={onReduce}
								className="text-gray-500 hover:text-gray-700 mr-2"
								style={{ pointerEvents: isDragging ? "none" : "auto" }}
							>
								<Minus size={16} />
							</button>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700"
								style={{ pointerEvents: isDragging ? "none" : "auto" }}
							>
								<X size={16} />
							</button>
						</div>
					</div>
					<div className="p-4 h-[calc(100%-40px)] overflow-auto">
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

import { AnimatePresence, motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface WindowProps {
	title: string;
	onClose: () => void;
	onReduce: () => void;
	children: ReactNode;
	zIndex: number;
	onFocus: () => void;
	isOpen: boolean;
	isReducing: boolean;
	screenSize: { width: number; height: number };
}

const windowVariants = {
	open: ({ x, y }: { x: number; y: number }) => ({
		scale: 1,
		opacity: 1,
		x,
		y,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			y: { type: "spring", stiffness: 500, damping: 30 },
		},
	}),
	closedExit: {
		scale: 0.5,
		opacity: 0,
		y: "100%",
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
	screenSize,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState(() => {
		const centerX = screenSize.width / 2 - 200;
		const centerY = screenSize.height / 2 - 150;
		return {
			x: centerX + (Math.random() - 0.5) * 100,
			y: centerY + (Math.random() - 0.5) * 100,
		};
	});

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isOpen) {
			if (isInitialMount.current) {
				onFocus();
				isInitialMount.current = false;
			}
		} else {
			isInitialMount.current = true;
		}
	}, [isOpen, onFocus]);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			onFocus();
			e.stopPropagation();
		},
		[onFocus],
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					drag
					dragMomentum={false}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={handleDragEnd}
					className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
					variants={windowVariants}
					custom={position}
					initial={{
						...position,
						y: screenSize.height,
						opacity: 0,
						scale: 0.5,
					}}
					animate="open"
					exit={isReducing ? "reducedExit" : "closedExit"}
					onMouseDown={handleMouseDown}
					style={{
						width: "400px",
						height: "300px",
						zIndex,
					}}
				>
					<div
						className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move"
						onMouseDown={handleMouseDown}
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

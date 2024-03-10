import { useState } from 'react';
import styles from './css-modules/app.module.css';
import data from './data/data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleBack = () => {
		const previousIdx = activeIndex - 1;
		if (previousIdx < 0) {
			return;
		}
		setActiveIndex(previousIdx);
	};

	const handleForward = () => {
		const nextIdx = activeIndex + 1;
		if (nextIdx > steps.length - 1) {
			return;
		}
		setActiveIndex(nextIdx);
	};

	const handleFromVeryBegin = () => {
		setActiveIndex(0);
	};

	const handleStep = event => {
		const currentIdx = Number(event.target.innerText) - 1;
		setActiveIndex(currentIdx);
	};

	const isFirstStep = activeIndex === 0 && true;
	const isLastStep = activeIndex === steps.length - 1 && true;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, idx) => {
							const currentIdx = idx;
							return (
								<li
									key={item.id}
									className={
										currentIdx === activeIndex
											? styles['steps-item'] +
												' ' +
												styles.done +
												' ' +
												styles.active
											: currentIdx < activeIndex
												? styles['steps-item'] + ' ' + styles.done
												: styles['steps-item']
									}
								>
									<button
										className={styles['steps-item-button']}
										onClick={handleStep}
									>
										{currentIdx + 1}
									</button>
									{item.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={isFirstStep}
							onClick={handleBack}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? handleFromVeryBegin : handleForward}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

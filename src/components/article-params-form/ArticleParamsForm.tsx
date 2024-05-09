import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormStates = {
	mainData: ArticleStateType;
	setMainData: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	mainData,
	setMainData,
}: ArticleParamsFormStates) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [status, setStatus] = useState(false);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		mainData.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		mainData.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		mainData.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(mainData.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		mainData.contentWidth
	);

	useEffect(() => {
		const outSideClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setStatus(false);
			}
		};

		document.addEventListener('mousedown', outSideClick);
		return () => {
			document.removeEventListener('mousedown', outSideClick);
		};
	}, [status]);

	const toggleStatus = () => {
		!status ? setStatus(true) : setStatus(false);
	};

	const applyChanges = () => {
		setMainData({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const resetForm = () => {
		setMainData(defaultArticleState);
	};

	return (
		<>
			<div ref={containerRef}>
				<ArrowButton status={status} OnClick={() => toggleStatus()} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: status,
					})}>
					<form
						className={styles.form}
						onSubmit={(event) => {
							event.preventDefault();
							applyChanges();
						}}
						onReset={resetForm}>
						<Select
							options={fontFamilyOptions}
							selected={selectedFontFamily}
							onChange={setSelectedFontFamily}
							title='Шрифт'
						/>
						<RadioGroup
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={setSelectedFontSize}
							title='Размер шрифта'
							name='size'
						/>
						<Select
							options={fontColors}
							selected={selectedFontColor}
							onChange={setSelectedFontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={selectedBackgroundColor}
							onChange={setSelectedBackgroundColor}
							title='Цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={selectedContentWidth}
							onChange={setSelectedContentWidth}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};

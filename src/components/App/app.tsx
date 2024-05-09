import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [mainData, setMainData] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': mainData.fontFamilyOption.value,
					'--font-size': mainData.fontSizeOption.value,
					'--font-color': mainData.fontColor.value,
					'--container-width': mainData.contentWidth.value,
					'--bg-color': mainData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm mainData={mainData} setMainData={setMainData} />
			<Article />
		</div>
	);
};

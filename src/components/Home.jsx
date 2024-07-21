import React from 'react';
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="home">
            <h1>{t('welcome')}</h1>
            <p>{t('journey_start')}</p>
        </div>
    );
}

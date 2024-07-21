import React from 'react';
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="about">
            <h1>{t('about')}</h1>
            <p>{t('about_description')}</p>
        </div>
    );
}

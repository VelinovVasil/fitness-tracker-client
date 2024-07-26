import React from 'react';
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="about">
            <h1>{t('about')}</h1>
            <p>{t('about_description')}</p>
            
            <section className="mission">
                <h2>{t('mission_title')}</h2>
                <p>{t('mission_description')}</p>
            </section>
            
            <section className="team">
                <h2>{t('team_title')}</h2>
                <p>{t('team_description')}</p>
                <ul>
                    <li>{t('team_member1')}</li>
                </ul>
            </section>
            
            <section className="contact">
                <h2>{t('contact_title')}</h2>
                <p>{t('contact_description')}</p>
                <ul>
                    <li>{t('contact_email')}: vasil@gmail.com</li>
                    <li>{t('contact_phone')}: +359 888 888 888</li>
                    <li>{t('contact_address')}: Sofia, Business Park, Mladost 4 distr.</li>
                </ul>
            </section>
        </div>
    );
}

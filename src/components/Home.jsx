import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();


    function handleSignUp() {
        navigate('/register');
    }

    return (
        <div className="home">
            <h1>{t('welcome')}</h1>
            <p>{t('journey_start')}</p>

            <section className="features">
                <h2>{t('features_title')}</h2>
                <ul>
                    <li>{t('feature1')}</li>
                    <li>{t('feature2')}</li>
                    <li>{t('feature4')}</li>
                    <li>{t('feature3')}</li>
                </ul>
            </section>

            { !user &&


            <section className="call-to-action">
                <h2>{t('cta_title')}</h2>
                <p>{t('cta_description')}</p>
                <button onClick={() => handleSignUp()}>{t('cta_button')}</button>
            </section>

            }

            <section className="testimonials">
                <h2>{t('testimonials_title')}</h2>
                <blockquote>
                    <p>{t('testimonial1_text')}</p>
                    <footer>- {t('testimonial1_author')}</footer>
                </blockquote>
                <blockquote>
                    <p>{t('testimonial2_text')}</p>
                    <footer>- {t('testimonial2_author')}</footer>
                </blockquote>
            </section>
        </div>
    );
}

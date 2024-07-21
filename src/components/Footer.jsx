import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <p>&copy; 2024 Fitness Tracker. {t('all_rights_reserved')}</p>
        </footer>
    );
}

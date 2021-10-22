import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AuthContainer,
    AuthTitle,
    Description
} from './styled/styled';

interface AuthProps {
    title: string;
    description: string;
}

export const AuthLayout: FC<AuthProps> = ({
    children,
    title,
    description
}) => {
    const { t } = useTranslation();
    return (
        <AuthContainer>
            <AuthTitle>{t(title)}</AuthTitle>
            <Description>{t(description)}</Description>
            {children}
        </AuthContainer>
    );
};

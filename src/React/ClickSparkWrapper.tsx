import React from 'react';
import ClickSpark from './ClickSpark';

interface ClickSparkWrapperProps {
    children: React.ReactNode;
}

const ClickSparkWrapper: React.FC<ClickSparkWrapperProps> = ({ children }) => {
    return (
        <ClickSpark
            sparkColor="#a476ff"
            sparkSize={8}
            sparkRadius={20}
            sparkCount={12}
            duration={500}
            easing="ease-out"
            extraScale={1.2}
        >
            {children}
        </ClickSpark>
    );
};

export default ClickSparkWrapper; 
import { createContext, useContext, useState } from 'react';

const FlowContext = createContext();

function FlowProvider({ children }) {
    const [flowNodes, setFlowNodes] = useState(null);

    return (
        <FlowContext.Provider value={{ flowNodes, setFlowNodes }}>
            {children}
        </FlowContext.Provider>
    );
}

function useFlow() {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowContext Provider');
    }

    return context;
}

export { FlowProvider, useFlow };

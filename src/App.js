import { useState } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { createFlowElement } from './utils/flow-utils';
import { EditableMathField } from 'react-mathquill';
import { useFlow } from './context/FlowContext';
import ExpressionNode from './CustomNodes/ExpressionNode/ExpressionNode';
import './App.css';

function App() {
    const nodeTypes = { expressionNode: ExpressionNode };
    const [rootName, setRootName] = useState('');
    const [rootUnit, setRootUnit] = useState('');
    const { flowNodes, setFlowNodes } = useFlow();

    function onLoad(reactFlowInstance) {
        reactFlowInstance.fitView();
    }

    function setRoot(name, unit) {
        setFlowNodes([
            createFlowElement({
                id: '0',
                name,
                unit,
                parent: null,
                children: [],
                unknowns: [name],
            }),
        ]);
    }

    return (
        <div className="App">
            {!flowNodes && (
                <div className="new-problem">
                    <label htmlFor="root-name">
                        Enter a description of the solution to the problem
                    </label>
                    <EditableMathField
                        latex={rootName}
                        onChange={(mathField) => setRootName(mathField.latex())}
                    />
                    <label htmlFor="root-unit">Enter an associated unit</label>
                    <EditableMathField
                        latex={rootUnit}
                        onChange={(mathField) => setRootUnit(mathField.latex())}
                    />
                    <button onClick={() => setRoot(rootName, rootUnit)}>
                        Submit
                    </button>
                </div>
            )}
            <div className="flow-container">
                {flowNodes && (
                    <ReactFlow
                        elements={flowNodes}
                        onLoad={onLoad}
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                    </ReactFlow>
                )}
            </div>
        </div>
    );
}

export default App;

import { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { createFlowElement } from './utils/flow-utils';
import { EditableMathField } from 'react-mathquill';
import stringParser from './utils/stringParser';
import ExpressionNode from './CustomNodes/ExpressionNode/ExpressionNode';
import './App.css';

function App() {
    const nodeTypes = { expressionNode: ExpressionNode };
    const [flowElements, setFlowElements] = useState(null);
    const [rootName, setRootName] = useState('');
    const [rootUnit, setRootUnit] = useState('');
    const [nodeToEdit, setNodeToEdit] = useState(null);

    function setRoot(name, unit) {
        setFlowElements([
            createFlowElement({
                id: 0,
                name,
                unit,
                parent: null,
                children: [],
                unknowns: [name],
                editNode: setNodeToEdit,
            }),
        ]);
    }

    return (
        <div className="App">
            {!flowElements && (
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
                {flowElements && (
                    <ReactFlow elements={flowElements} nodeTypes={nodeTypes} />
                )}
            </div>
        </div>
    );
}

export default App;

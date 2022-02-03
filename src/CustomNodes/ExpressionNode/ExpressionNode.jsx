import { Handle } from 'react-flow-renderer';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import { useFlow } from '../../context/FlowContext';
import { useState } from 'react';
import { createFlowElement } from '../../utils/flow-utils';
import stringParser from '../../utils/stringParser';
addStyles();

export default function ExpressionNode({ data }) {
    const numEls = data.children.length;
    const { flowNodes, setFlowNodes } = useFlow();
    const [newExpression, setNewExpression] = useState('');
    const [newUnit, setNewUnit] = useState('');
    const [isEditing, setIsEditing] = useState(null);

    function handleSubmitEdits() {
        const currentNode = flowNodes.filter((node) => node.id === data.id)[0];

        const newElement = createFlowElement({
            id: String(flowNodes.length),
            parent: data.id,
            name: newExpression,
            children: [],
            unknowns: stringParser([newExpression, 0, []])
                .filter((node) => node.nodeType === 'expression')
                .map((node) => node.name),
            unit: newUnit,
        });

        const newEdge = {
            id: data.id + '-' + String(flowNodes.length),
            source: data.id,
            target: String(flowNodes.length),
            label: data.unknowns[isEditing],
            sourceHandle: data.unknowns[isEditing],
        };

        currentNode.data.children.push(data.unknowns[isEditing]);
        currentNode.data.unknowns.splice(isEditing, 1);

        setIsEditing(null);
        setNewUnit('');
        setNewExpression('');

        setFlowNodes([
            currentNode,
            ...flowNodes.filter((node) => node.id !== data.id),
            newEdge,
            newElement,
        ]);
    }

    return (
        <>
            <Handle type="target" position="top" isConnectable={true} />
            <StaticMathField>{data.name}</StaticMathField>
            <StaticMathField>{data.unit}</StaticMathField>
            {data.unknowns.map((expression, i) => (
                <button onClick={() => setIsEditing(i)} key={i}>
                    {expression}
                </button>
            ))}
            {isEditing !== null && (
                <div className="expression-form">
                    <label htmlFor="expression-input">Expression:</label>
                    <EditableMathField
                        latex={newExpression}
                        onChange={(mathField) =>
                            setNewExpression(mathField.latex())
                        }
                    />
                    <label htmlFor="unit-input">Unit:</label>
                    <EditableMathField
                        latex={newUnit}
                        onChange={(mathField) => setNewUnit(mathField.latex())}
                    />
                    <button
                        onClick={() => {
                            handleSubmitEdits();
                            setIsEditing(null);
                        }}
                    >
                        Done{' '}
                    </button>
                </div>
            )}
            {data.children.map((el, i) => (
                <Handle
                    key={el}
                    type="source"
                    id={el}
                    position="bottom"
                    isConnectable={true}
                    style={{
                        left: `${Math.round((100 / numEls) * (i + 0.5))}%`,
                    }}
                />
            ))}
        </>
    );
}

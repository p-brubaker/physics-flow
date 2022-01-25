import { Handle } from 'react-flow-renderer';
import { addStyles, StaticMathField } from 'react-mathquill'
addStyles();

export default function ExpressionNode({ data }) {
    const numEls = data.childElements.length;
    return (
        <>
            <Handle
                type="target"
                position="top"
                isConnectable={true}
            />
            <div><StaticMathField>{data.label}</StaticMathField></div>
            {data.unresolvedSubexpressions.map(expression => (
                <button >
                    {expression}
                </button>
            ))}
            {
                data.childElements.map((el, i) => (
                    <Handle
                        key={el}
                        type="source"
                        id={el}
                        position="bottom"
                        isConnectable={true}
                        style={{left: `${Math.round((100/numEls)*(i+0.5))}%` }}
                    />
                ))
            }
        </>
    )
}

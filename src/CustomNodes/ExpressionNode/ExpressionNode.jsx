import { Handle } from 'react-flow-renderer';
import { addStyles, StaticMathField } from 'react-mathquill';
addStyles();

export default function ExpressionNode({ data, editNode }) {
    const numEls = data.children.length;
    return (
        <>
            <Handle type="target" position="top" isConnectable={true} />
            <StaticMathField>{data.name}</StaticMathField>
            <StaticMathField>{data.unit}</StaticMathField>
            {data.unknowns.map((expression) => (
                <button onClick={() => editNode(data.id)}>{expression}</button>
            ))}
            {data.children.map((el, i) => (
                <Handle
                    key={el.id}
                    type="source"
                    id={el.id}
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

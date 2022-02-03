export function createFlowElement(expressionNode) {
    return {
        id: expressionNode.id,
        parent: expressionNode.parent,
        type: 'expressionNode',
        data: {
            name: expressionNode.name,
            children: expressionNode.children,
            unknowns: expressionNode.unknowns,
            unit: expressionNode.unit,
            id: expressionNode.id,
        },
        position: { x: 100, y: 100 },
        style: { border: '2px solid #777', padding: 10 },
        isInitialized: true,
    };
}

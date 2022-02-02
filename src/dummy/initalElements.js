const initialElements = [
  {
    id: '1',
    type: 'expressionNode',
    data: {label: 'x+\\frac{y}{z}' , childElements: ['x', 'y'], unresolvedSubexpressions: ['z']},
    position: { x: 250, y: 125 },
    style: {border: '2px solid #777', padding: 10}
  },
  {
    id: '2',
    type: 'output',
    style: { border: '1px solid #777', padding: 10 },
    position: {x: 150, y: 250},
    data: {label: 'x'}
  },
  {
    id: '3',
    type: 'output',
    style: { border: '1px solid #777', padding: 10 },
    data: { label: 'y'},
    position: { x: 200, y: 250 }
  },
  // {
  //   id: '4',
  //   type: 'output',
  //   style: { border: '1px solid #777', padding: 10 },
  //   data: { label: 'z' },
  //   position: { x: 250, y: 250 }
  // },
  {
    id: 'e1-2:1',
    source: '1',
    target: '2',
    sourceHandle: 'x'
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    sourceHandle: 'y'
  }
];

export default initialElements;

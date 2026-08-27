const fs = require('fs');
let code = fs.readFileSync('src/pages/OrderDetails.tsx', 'utf8');

// The patch inserted a duplicate block right before `if (!order) {`. Let's remove it.
const duplicateBlock = `
  const timelineSteps = [
    'Order Placed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const currentStepIndex = timelineSteps.indexOf(order.orderStatus);
`;

code = code.replace(duplicateBlock, '');

fs.writeFileSync('src/pages/OrderDetails.tsx', code);

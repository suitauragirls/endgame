const fs = require('fs');
let code = fs.readFileSync('src/pages/OrderDetails.tsx', 'utf8');

const importStatement = `import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { Order } from '../types';`;

code = code.replace(
  /import React[\s\S]*?import { Order } from '\.\.\/types';/,
  importStatement
);

const timelineLogic = `
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

code = code.replace(
  `if (!order) {`,
  `${timelineLogic}\n\n  if (!order) {`
);

fs.writeFileSync('src/pages/OrderDetails.tsx', code);

export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sku: string;
  stock: number;
  isPreorder: boolean;
  isFeatured: boolean;
  specs: { label: string; value: string }[];
  b2bPricing?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Arduino', slug: 'arduino', image: 'https://picsum.photos/seed/arduino/400/400' },
  { id: '2', name: 'Sensors', slug: 'sensors', image: 'https://picsum.photos/seed/sensors/400/400' },
  { id: '3', name: 'Robotics', slug: 'robotics', image: 'https://picsum.photos/seed/robotics/400/400' },
  { id: '4', name: 'IoT', slug: 'iot', image: 'https://picsum.photos/seed/iot/400/400' },
  { id: '5', name: 'Development Boards', slug: 'dev-boards', image: 'https://picsum.photos/seed/devboards/400/400' },
  { id: '6', name: 'Components', slug: 'components', image: 'https://picsum.photos/seed/components/400/400' },
  { id: '7', name: 'Motors', slug: 'motors', image: 'https://picsum.photos/seed/motors/400/400' },
  { id: '8', name: '3D Printers', slug: '3d-printers', image: 'https://picsum.photos/seed/3dprinters/400/400' },
  { id: '9', name: 'Starter Kits', slug: 'starter-kits', image: 'https://picsum.photos/seed/starterkits/400/400' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Arduino Uno R3 Compatible',
    slug: 'arduino-uno-r3',
    price: 3850,
    image: 'https://picsum.photos/seed/uno/600/600',
    category: 'Arduino',
    description: 'The standard microcontroller board for beginners and professionals alike. Fully compatible with Arduino IDE.',
    sku: 'NX-ARD-001',
    stock: 25,
    isPreorder: false,
    isFeatured: true,
    specs: [
      { label: 'Microcontroller', value: 'ATmega328P' },
      { label: 'Operating Voltage', value: '5V' },
      { label: 'Input Voltage', value: '7-12V' },
      { label: 'Digital I/O Pins', value: '14' },
      { label: 'Analog Input Pins', value: '6' },
    ],
    b2bPricing: true,
  },
  {
    id: 'p2',
    name: 'ESP32 DevKit V1',
    slug: 'esp32-devkit-v1',
    price: 2450,
    image: 'https://picsum.photos/seed/esp32/600/600',
    category: 'IoT',
    description: 'Powerful dual-core processor with integrated WiFi and Bluetooth. Ideal for smart home and IoT projects.',
    sku: 'NX-IOT-002',
    stock: 0,
    isPreorder: true,
    isFeatured: true,
    specs: [
      { label: 'Connectivity', value: 'WiFi & Bluetooth' },
      { label: 'Cores', value: 'Dual Core' },
      { label: 'Flash Memory', value: '4MB' },
    ],
  },
  {
    id: 'p3',
    name: 'HC-SR04 Ultrasonic Sensor',
    slug: 'hc-sr04-ultrasonic',
    price: 450,
    image: 'https://picsum.photos/seed/ultrasonic/600/600',
    category: 'Sensors',
    description: 'Non-contact ultrasonic distance sensor using high-frequency sound waves.',
    sku: 'NX-SEN-003',
    stock: 150,
    isPreorder: false,
    isFeatured: false,
    specs: [
      { label: 'Range', value: '2cm - 400cm' },
      { label: 'Angle', value: '15 degrees' },
    ],
  },
  {
    id: 'p4',
    name: 'SG90 Micro Servo 9g',
    slug: 'sg90-servo',
    price: 850,
    image: 'https://picsum.photos/seed/servo/600/600',
    category: 'Motors',
    description: 'Tiny and lightweight servo motor with high output power. Great for hobbyist robotics.',
    sku: 'NX-MOT-004',
    stock: 45,
    isPreorder: false,
    isFeatured: true,
    specs: [
      { label: 'Torque', value: '1.8 kg/cm' },
      { label: 'Speed', value: '0.1s/60 degree' },
    ],
  },
  {
    id: 'p5',
    name: 'Raspberry Pi 4 Model B (4GB)',
    slug: 'raspberry-pi-4-4gb',
    price: 28500,
    image: 'https://picsum.photos/seed/rpi4/600/600',
    category: 'Development Boards',
    description: 'High performance single board computer with quad-core 64-bit processor.',
    sku: 'NX-DEV-005',
    stock: 5,
    isPreorder: false,
    isFeatured: true,
    specs: [
      { label: 'RAM', value: '4GB LPDDR4' },
      { label: 'CPU', value: '1.5GHz Quad-core' },
      { label: 'Ports', value: '2x Micro HDMI, 2x USB 3.0' },
    ],
    b2bPricing: true,
  },
  {
    id: 'p6',
    name: 'Basic Electronics Starter Kit',
    slug: 'basic-electronics-kit',
    price: 5500,
    image: 'https://picsum.photos/seed/kit/600/600',
    category: 'Starter Kits',
    description: 'Perfect for beginners. Includes LEDs, resistors, jumper wires, and breadboard.',
    sku: 'NX-KIT-006',
    stock: 12,
    isPreorder: false,
    isFeatured: true,
    specs: [
      { label: 'Pieces', value: '50+' },
      { label: 'Tutorial', value: 'Digital Guide Included' },
    ],
  },
];

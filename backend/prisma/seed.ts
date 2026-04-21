import { PrismaClient, UserRole, B2bTier, B2bStatus, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic components and devices for STEM learning',
    },
  });

  const kits = await prisma.category.upsert({
    where: { slug: 'kits' },
    update: {},
    create: {
      name: 'STEM Kits',
      slug: 'kits',
      description: 'Complete STEM learning kits for beginners to advanced',
    },
  });

  // Create sample products
  const arduinoUno = await prisma.product.upsert({
    where: { sku: 'ARDUINO-UNO-V3' },
    update: {},
    create: {
      name: 'Arduino Uno R3',
      slug: 'arduino-uno-r3',
      sku: 'ARDUINO-UNO-V3',
      description: 'Microcontroller board based on ATmega328P. Perfect for beginners.',
      categoryId: electronics.id,
      basePriceLkr: 2500,
      b2bPriceLkr: 2000,
      stockQty: 50,
      preorderEnabled: false,
      status: ProductStatus.ACTIVE,
    },
  });

  const raspberryPi = await prisma.product.upsert({
    where: { sku: 'RASPI-4-8GB' },
    update: {},
    create: {
      name: 'Raspberry Pi 4 (8GB)',
      slug: 'raspberry-pi-4-8gb',
      sku: 'RASPI-4-8GB',
      description: 'Full-featured single board computer with 8GB RAM',
      categoryId: electronics.id,
      basePriceLkr: 15000,
      b2bPriceLkr: 12000,
      stockQty: 25,
      preorderEnabled: false,
      status: ProductStatus.ACTIVE,
    },
  });

  const stemKit = await prisma.product.upsert({
    where: { sku: 'STEM-STARTER-KIT' },
    update: {},
    create: {
      name: 'STEM Starter Kit',
      slug: 'stem-starter-kit',
      sku: 'STEM-STARTER-KIT',
      description: 'Complete beginner kit with Arduino, sensors, and tutorials',
      categoryId: kits.id,
      basePriceLkr: 8500,
      b2bPriceLkr: 6500,
      stockQty: 15,
      preorderEnabled: false,
      status: ProductStatus.ACTIVE,
    },
  });

  const futureProduct = await prisma.product.upsert({
    where: { sku: 'AI-ML-KIT-V1' },
    update: {},
    create: {
      name: 'AI/ML Learning Kit',
      slug: 'ai-ml-learning-kit',
      sku: 'AI-ML-KIT-V1',
      description: 'Advanced AI and machine learning kit for advanced learners',
      categoryId: kits.id,
      basePriceLkr: 25000,
      b2bPriceLkr: 20000,
      stockQty: 0,
      preorderEnabled: true,
      status: ProductStatus.ACTIVE,
    },
  });

  // Create sample users
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      fullName: 'John Customer',
      phone: '+94701234567',
      role: UserRole.CUSTOMER,
    },
  });

  const b2bUser = await prisma.user.upsert({
    where: { email: 'b2b@example.com' },
    update: {},
    create: {
      email: 'b2b@example.com',
      fullName: 'B2B Manager',
      phone: '+94702234567',
      role: UserRole.B2B_CUSTOMER,
    },
  });

  // Create B2B account
  await prisma.b2bAccount.upsert({
    where: { userId: b2bUser.id },
    update: {},
    create: {
      userId: b2bUser.id,
      businessName: 'Tech School Supplies',
      businessRegistration: 'REG-123456',
      pricingTier: B2bTier.TIER_1,
      status: B2bStatus.APPROVED,
    },
  });

  // Create sample carts
  await prisma.cart.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      items: {
        create: [
          {
            productId: arduinoUno.id,
            quantity: 2,
            unitPriceLkr: 2500,
          },
          {
            productId: stemKit.id,
            quantity: 1,
            unitPriceLkr: 8500,
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Seeded Data:');
  console.log(`  Categories: ${[electronics.name, kits.name].join(', ')}`);
  console.log(`  Products: 4 products (3 in stock, 1 preorder)`);
  console.log(`  Users: 1 retail customer, 1 B2B customer`);
  console.log(`  Sample cart: ${customerUser.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

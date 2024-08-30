/*import bcrypt from 'bcrypt';
//import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { Client } from 'pg';


const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432
});
try {
await client.connect();
}
catch (error) {
  console.log("Connection errot");
  throw error;
}
//const client = await db.connect();

async function seedUsers() {
  try {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
  console.log(users);
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.query({
        text:`
        INSERT INTO users (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
      values: [user.id, user.name, user.email, hashedPassword]
    });
    }),
  );

  return insertedUsers;
  }
  catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices() {
  try {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.query({
        text: `
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
      values: [invoice.customer_id, invoice.amount, invoice.status, invoice.date]
    }),
    ),
  );

  return insertedInvoices;
  }
  catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers() {
  try {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `);

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.query({
        text: `
        INSERT INTO customers (id, name, email, image_url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
      values: [customer.id, customer.name, customer.email, customer.image_url]
    }),
    ),
  );

  return insertedCustomers;
  }
  catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue() {
  try {
  await client.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.query({
        text: `
        INSERT INTO revenue (month, revenue)
        VALUES ($1, $2)
        ON CONFLICT (month) DO NOTHING;
      `,
      values: [rev.month, rev.revenue]
    }),
    ),
  );

  return insertedRevenue;
  }
  catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}
*/
export async function GET() {
  return Response.json({ message: 'Delete this to seed database' });
  /*try {
    console.log('test');
    await seedUsers();
    console.log('user success');
    await seedCustomers();
    console.log('customer success');
    await seedInvoices();
    console.log('invoice success');
    await seedRevenue();
    console.log('revenue success');

    await client.end();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.query(`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }*/
}

const { Client } = require('pg');

async function testConnection() {
  const connectionStrings = [
    {
      name: 'Neon Database',
      url: 'postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
    },
  ];

  for (const conn of connectionStrings) {
    console.log(`\nTesting ${conn.name}...`);
    const client = new Client({
      connectionString: conn.url,
    });

    try {
      await client.connect();
      console.log(`✅ ${conn.name} - Connected successfully!`);
      
      // Check tables
      const tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
      `;
      
      const result = await client.query(tablesQuery);
      
      if (result.rows.length > 0) {
        console.log('\nExisting tables:');
        result.rows.forEach(row => {
          console.log(`  - ${row.table_name}`);
        });
      } else {
        console.log('\n⚠️  No tables found. Need to run Prisma migrations.');
      }
      
      await client.end();
      
      console.log('\n✅ Database URL for Vercel:');
      console.log(conn.url);
      
    } catch (error) {
      console.log(`❌ ${conn.name} - Failed: ${error.message}`);
    }
  }
}

testConnection().catch(console.error);

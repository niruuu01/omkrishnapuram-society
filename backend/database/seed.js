const bcrypt = require('bcrypt');
const { run } = require('./db');

async function seedDatabase() {
    console.log('Seeding database...');

    // Create default admin user
    const defaultPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    try {
        run(
            'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
            ['admin', hashedPassword, 'admin@omkrishnapuram.org', 'admin']
        );
        console.log('✓ Default admin user created (username: admin, password: admin123)');
    } catch (error) {
        console.log('Admin user already exists or error:', error.message);
    }

    // Seed initial content
    const contentData = [
        ['about_society', 'Omkrishnapuram Co-op Housing Society Ltd. is a vibrant residential community located in the heart of Shahad (W). Our society stands as a testament to cooperative living, where residents come together to create a harmonious and progressive environment.'],
        ['vision', 'To create a modern, sustainable living environment that enhances the quality of life for all residents through innovative redevelopment and community-focused initiatives.'],
        ['commitment', 'We are dedicated to transparent governance, inclusive decision-making, and the continuous improvement of our society\'s infrastructure and amenities.'],
        ['contact_email', 'info@omkrishnapuram.org'],
        ['contact_phone', '+91 XXXX XXXXXX'],
        ['contact_address', 'Near Patel Low Price Shop, Shahad (W), 421103']
    ];

    contentData.forEach(([key, value]) => {
        try {
            run('INSERT INTO content (key, value) VALUES (?, ?)', [key, value]);
            console.log(`✓ Content added: ${key}`);
        } catch (error) {
            console.log(`Content '${key}' already exists`);
        }
    });

    // Seed committee members
    const committeeData = [
        ['Mrs. Ragini Singh', 'Chairperson', 'ragini.singh@omkrishnapuram.org', '', 'Leading the society with vision and dedication, ensuring transparent governance and community welfare.', 'Leadership', 'RS', 'executive', 1],
        ['Mr. Sunil Parikh', 'Secretary', 'sunil.parikh@omkrishnapuram.org', '', 'Managing administrative operations and maintaining effective communication between members and management.', 'Administration', 'SP', 'executive', 2],
        ['Mr. Nitin Pawar', 'Treasurer', 'nitin.pawar@omkrishnapuram.org', '', 'Overseeing financial management and ensuring fiscal responsibility for all society operations.', 'Finance', 'NP', 'executive', 3],
        ['Mr. Bapu Wagh', 'Committee Member', 'bapu.wagh@omkrishnapuram.org', '', 'Contributing to the society\'s development and ensuring member welfare.', 'Member', 'BW', 'managing', 4],
        ['Mr. Mahindra Varma', 'Committee Member', 'mahindra.varma@omkrishnapuram.org', '', 'Supporting society initiatives and maintaining community standards.', 'Member', 'MV', 'managing', 5],
        ['Mr. Rawal', 'Committee Member', 'rawal@omkrishnapuram.org', '', 'Working towards the betterment of society facilities and services.', 'Member', 'R', 'managing', 6],
        ['Mr. Kishor', 'Committee Member', 'kishor@omkrishnapuram.org', '', 'Dedicated to enhancing resident experience and community engagement.', 'Member', 'K', 'managing', 7],
        ['Mr. Vishwanth Malji', 'Committee Member', 'vishwanth.malji@omkrishnapuram.org', '', 'Committed to society development and member satisfaction.', 'Member', 'VM', 'managing', 8]
    ];

    committeeData.forEach(([name, position, email, phone, bio, badge, initials, category, order]) => {
        try {
            run(
                'INSERT INTO committee_members (name, position, email, phone, bio, badge, initials, category, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, position, email, phone, bio, badge, initials, category, order]
            );
            console.log(`✓ Committee member added: ${name}`);
        } catch (error) {
            console.log(`Committee member '${name}' already exists`);
        }
    });

    console.log('\n✅ Database seeding complete!');
    console.log('\n📝 Default Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the default password after first login!\n');
}

seedDatabase().catch(console.error);

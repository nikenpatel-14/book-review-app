const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
const Review = require('./models/Review');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book-review-app')
    .then(() => console.log('MongoDB connected for seeding data'))
    .catch(err => console.error('MongoDB connection error:', err));

// Sample users
const users = [
    {
        name: 'Teacher Admin',
        email: 'teacher@example.com',
        password: 'password123',
        role: 'teacher'
    },
    {
        name: 'Student User',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
    },
    {
        name: 'Another Teacher',
        email: 'teacher2@example.com',
        password: 'password123',
        role: 'teacher'
    },
    {
        name: 'Another Student',
        email: 'student2@example.com',
        password: 'password123',
        role: 'student'
    }
];

// Sample books
const books = [
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A novel set in the American South during the 1930s, addressing issues of racism and morality through the eyes of a young girl named Scout Finch.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'
    },
    {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society that explores the dangers of government overreach, totalitarianism, and repressive regimentation of all persons and behaviors.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg'
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: 'A fantasy novel and children\'s book about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf to accompany 13 dwarves to help them reclaim their mountain home from the dragon Smaug.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Hobbit_cover.JPG'
    },
    {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        description: 'The first novel in the Harry Potter series, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday and goes to Hogwarts School of Witchcraft and Wizardry.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg'
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        description: 'A novel that follows the experiences of a teenager named Holden Caulfield in New York City over a few days after being expelled from prep school.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg'
    },
    {
        title: 'Lord of the Flies',
        author: 'William Golding',
        description: 'A novel about a group of British boys stranded on an uninhabited island who try to govern themselves with disastrous results.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/LordOfTheFliesBookCover.jpg'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description: 'A philosophical novel about a young Andalusian shepherd who dreams of finding worldly treasures and embarks on a journey to find a hidden treasure in the Egyptian pyramids.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c4/TheAlchemist.jpg'
    },
    {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        description: 'A dystopian novel set in a futuristic World State where citizens are environmentally engineered and conditioned to accept a social system where their destinies are predetermined.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg'
    },
    {
        title: 'The Odyssey',
        author: 'Homer',
        description: 'One of the oldest works of literature, this epic poem follows the Greek hero Odysseus on his journey home after the fall of Troy.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Odyssey-crop.jpg'
    },
    {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        description: 'A dystopian novel set in a future where books are outlawed and firemen burn any that are found, exploring themes of censorship and the effects of mass media.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Fahrenheit_451_1st_ed_cover.jpg'
    },
    {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        description: 'The story of the obsessive quest of Ahab, captain of the whaler the Pequod, for revenge on Moby Dick, the giant white sperm whale that bit off his leg on a previous voyage.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Moby-Dick_FE_title_page.jpg'
    },
    {
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry',
        description: 'A poetic tale about a young prince who visits various planets, addressing themes of loneliness, friendship, love, and loss.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.jpeg'
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        description: 'A novel that explores the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png'
    }
];

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Book.deleteMany({});
        await Review.deleteMany({});

        console.log('Cleared existing data');

        // Create users
        const createdUsers = await User.create(users);
        console.log(`Created ${createdUsers.length} users`);

        const teacherId = createdUsers.find(user => user.role === 'teacher' && user.email === 'teacher@example.com')._id;
        const teacher2Id = createdUsers.find(user => user.role === 'teacher' && user.email === 'teacher2@example.com')._id;

        // Create books (first half created by first teacher, rest by second teacher)
        const halfIndex = Math.ceil(books.length / 2);
        const firstTeacherBooks = books.slice(0, halfIndex).map(book => ({
            ...book,
            createdBy: teacherId
        }));

        const secondTeacherBooks = books.slice(halfIndex).map(book => ({
            ...book,
            createdBy: teacher2Id
        }));

        const booksToCreate = [...firstTeacherBooks, ...secondTeacherBooks];

        const createdBooks = await Book.create(booksToCreate);
        console.log(`Created ${createdBooks.length} books`);

        // Create some sample reviews
        const studentId = createdUsers.find(user => user.role === 'student' && user.email === 'student@example.com')._id;
        const student2Id = createdUsers.find(user => user.role === 'student' && user.email === 'student2@example.com')._id;

        const reviews = [
            {
                rating: 5,
                comment: 'A timeless classic that everyone should read!',
                book: createdBooks[0]._id,
                user: studentId
            },
            {
                rating: 4,
                comment: 'Thought-provoking and eerily prescient.',
                book: createdBooks[1]._id,
                user: studentId
            },
            {
                rating: 5,
                comment: 'One of the best fantasy books ever written!',
                book: createdBooks[4]._id,
                user: student2Id
            },
            {
                rating: 5,
                comment: 'Magical and captivating - perfect for all ages.',
                book: createdBooks[5]._id,
                user: studentId
            },
            {
                rating: 3,
                comment: 'Interesting but not as good as I expected.',
                book: createdBooks[2]._id,
                user: student2Id
            },
            {
                rating: 4,
                comment: 'A philosophical journey that makes you think about life differently.',
                book: createdBooks[8]._id,
                user: studentId
            },
            {
                rating: 5,
                comment: 'A classic that was ahead of its time.',
                book: createdBooks[9]._id,
                user: student2Id
            }
        ];

        const createdReviews = await Review.create(reviews);
        console.log(`Created ${createdReviews.length} reviews`);

        console.log('\nSample Login Credentials:');
        console.log('Teachers:');
        console.log('- teacher@example.com / password123');
        console.log('- teacher2@example.com / password123');
        console.log('\nStudents:');
        console.log('- student@example.com / password123');
        console.log('- student2@example.com / password123');

        console.log('\nData seeding completed successfully!');

        // Close the database connection
        mongoose.connection.close();

    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// Run the function
seedData(); 
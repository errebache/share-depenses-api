const User = require('../database/models/user.model');
const Currency = require('../database/models/currency.model');
const Expense = require('../database/models/expense.model');
const Photo = require('../database/models/photo.model');
const Notification = require('../database/models/notification.model');
const Group = require('../database/models/group.model');
const List = require('../database/models/list.model');

require('dotenv').config();
const dbName = process.env.DB_NAME;

const mongoose = require('mongoose');

const currencies = [
    { name: "Euro", symbol: "EUR", exchangeRate: 1.0 },
    { name: "US Dollar", symbol: "USD", exchangeRate: 1.2 },
    { name: "British Pound", symbol: "GBP", exchangeRate: 0.9 }
];

const expenses = [
    {
      paidBy: "65b62ebfae0f15a22af54c09",
      amount: 50.25,
      list: "65f1dfac7a9f8b32648af6d1",
      description: "Groceries",
      createdAt: "2024-03-13T08:00:00.000Z",
      splitAmong: [
        { userId: "65b62ebfae0f15a22af54c09", amount: 25.00 },
        { userId: "65b632bcce357e0ddae0e112", amount: 12.50 },
        { userId: "65b633c4a672c71454296f3e", amount: 12.75 }
      ],
      category: "Food",
      image: "https://example.com/image1.jpg"
    },
    {
      paidBy: "65b62ebfae0f15a22af54c09",
      amount: 30.00,
      list: "65f1dfac7a9f8b32648af6d1",
      description: "Movie tickets",
      createdAt: "2024-03-12T18:30:00.000Z",
      splitAmong: [
        { userId: "65b62ebfae0f15a22af54c09", amount: 15.00 },
        { userId: "65bf87c1096357ecfbbecb3c", amount: 7.50 },
        { userId: "65bf9c887fb261a4281747a4", amount: 7.50 }
      ],
      category: "Entertainment",
      image: "https://example.com/image2.jpg"
    },
    {
      paidBy: "65bfda03e3d08d228ee7ec48",
      amount: 100.00,
      list: "65f1dfac7a9f8b32648af6d1",
      description: "Dinner at a fancy restaurant",
      createdAt: "2024-03-11T20:00:00.000Z",
      splitAmong: [
        { userId: "65bfe8a58c3d0eacc73711ff", amount: 40.00 },
        { userId: "65b62ebfae0f15a22af54c09", amount: 30.00 },
        { userId: "65bfd8e99b60ccb7be7927c1", amount: 30.00 }
      ],
      category: "Dining",
      image: "https://example.com/image3.jpg"
    }    
    // Ajoutez plus d'objets Expense ici
];

const list = [
    {
      name: "Shopping List",
      currency: "USD",
      description: "Weekly grocery shopping",
      group: "658e0f3893c28db7b7d88af3",
      createdBy: "65b62ebfae0f15a22af54c09",
      image: {
        original: "https://example.com/shopping_list_image.jpg",
        large: "https://example.com/shopping_list_image_large.jpg",
        medium: "https://example.com/shopping_list_image_medium.jpg",
        small: "https://example.com/shopping_list_image_small.jpg"
      },
      permissions: {
        read: true,
        update: true,
        delete: false,
        image: {
          read: true,
          update: false,
          delete: false
        },
        settles: {
          index: true,
          create: true
        }
      }
    }
]

const groups = [
    {
      name: "Colocation Villa",
      description: "Activity with Family ",
      members: ["65f5c64596bf455a0852929c", "65f5c64596bf455a0852929d","65f5c64596bf455a0852929b"
    ],
      createdBy: "65f5c64596bf455a0852929c",
    }
    // Ajoutez plus d'objets Group ici
];

const notifications = [
    {
      userId: "658e0028e4c9d9814af58529",
      message: "You have a new expense to approve",
      isRead: false,
      createdAt: new Date()
    }
    // Ajoutez plus d'objets Notification ici
];

const photos = [
    {
      url: "http://example.com/photo1.jpg",
      uploadedBy: "658e0028e4c9d9814af58529",
      groupId: "658e0f3893c28db7b7d88af3",
      createdAt: new Date()
    }
    // Ajoutez plus d'objets Photo ici
];

const users = [
    {
      name: "Ahmed errebache",
      email: "ahmed.errebache@gmail.com.com",
      password: "password123",
      fullName: "Ahmed Errebache",
      profilePhoto: "http://example.com/john.jpg"
    },
    {
      name: "Hamza Errebache",
      email: "hamza.errebache@gmail.com",
      password: "password123",
      fullName: "Hamza errebache",
      profilePhoto: "http://example.com/jane.jpg"
    },
    {
        name: "Youssef errebache",
        email: "youssef.errebache@gmail.com",
        password: "password123",
        fullName: "Youssef Errebache",
        profilePhoto: "http://example.com/jane.jpg"
      },
    // Ajoutez plus d'objets User ici
];

mongoose
    .connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected...");

       // Insert sample data
        // List.insertMany(list);
        // User.insertMany(users);
        // Group.insertMany(groups);
        // Notification.insertMany(notifications);
        // Photo.insertMany(photos);
        // Currency.insertMany(currencies);
        // Expense.insertMany(expenses);

    }).catch((e) => {
        console.error("Connection error:", e);
    });

// Start server
console.log("Server is running on port 3000");
